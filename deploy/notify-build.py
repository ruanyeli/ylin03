"""Send CI results to a Feishu custom bot without logging its credentials."""
import base64
import hashlib
import hmac
import json
import os
import sys
import time
import urllib.error
import urllib.request


def payload(status, env):
    if status not in ('started', 'success', 'failed'):
        raise ValueError('Unsupported notification status')
    image = env.get('IQUEST_PUBLISH_IMAGE', '')
    if status == 'success' and not image:
        raise ValueError('Missing IQUEST_PUBLISH_IMAGE artifact; cannot announce a published image')
    if status == 'started':
        repository = (env['REGISTRY_HOST'] + '/' + env['REGISTRY_IMAGE']
                      if env.get('REGISTRY_HOST') and env.get('REGISTRY_IMAGE') else env.get('CI_REGISTRY_IMAGE', ''))
        image = repository + ':' + env.get('CI_COMMIT_SHORT_SHA', '') if repository else ''
    project_url = env.get('CI_PROJECT_URL', '')
    branch = env.get('CI_COMMIT_TAG') or env.get('CI_MERGE_REQUEST_SOURCE_BRANCH_NAME') or env.get('CI_COMMIT_REF_NAME', '')
    commit_sha = env.get('CI_COMMIT_SHA', '')
    job_id = env.get('BUILD_JOB_ID') or env.get('CI_JOB_ID', '')
    job_url = env.get('BUILD_JOB_URL') or env.get('CI_JOB_URL', '')
    job_label = 'Job ID' if env.get('BUILD_JOB_ID') else '通知 Job ID'
    trigger = env.get('GITLAB_USER_NAME', '')
    if env.get('GITLAB_USER_LOGIN'):
        trigger += ' (' + env['GITLAB_USER_LOGIN'] + ')'
    lines = [env.get('FEISHU_NOTIFY_KEYWORD') or 'IQuest Publish 镜像构建',
             {'started': '🚀 测试通过，准备开始镜像构建',
              'success': '✅ 镜像构建并推送成功',
              'failed': '❌ 流水线失败，镜像构建或前置测试未通过'}[status],
             '仓库: ' + env.get('CI_PROJECT_PATH', ''),
             '分支/Tag: ' + branch,
             'Commit: ' + env.get('CI_COMMIT_SHORT_SHA', '') + ' - ' + env.get('CI_COMMIT_TITLE', ''),
             '作者: ' + env.get('CI_COMMIT_AUTHOR', ''),
             '触发人: ' + trigger,
             '触发源: ' + env.get('CI_PIPELINE_SOURCE', ''),
             '流水线 ID: ' + env.get('CI_PIPELINE_ID', '') + '  ' + job_label + ': ' + job_id]
    if status in ('started', 'success') and image:
        lines.append('目标镜像: ' + image)
        # Only report aliases that were actually pushed by the build job.
        if status == 'success' and env.get('IQUEST_PUBLISH_REF_IMAGE'):
            lines.append('镜像 (Ref): ' + env['IQUEST_PUBLISH_REF_IMAGE'])
    lines.extend(['🔗 查看任务进度: ' + job_url,
                  '查看流水线: ' + env.get('CI_PIPELINE_URL', ''),
                  '查看 Commit: ' + project_url + '/-/commit/' + commit_sha])
    body = {'msg_type': 'text', 'content': {'text': '\n'.join(lines)}}
    if env.get('FEISHU_WEBHOOK_SECRET'):
        timestamp = str(int(time.time()))
        key = (timestamp + '\n' + env['FEISHU_WEBHOOK_SECRET']).encode()
        body.update(timestamp=timestamp, sign=base64.b64encode(hmac.new(key, b'', hashlib.sha256).digest()).decode())
    return body


def main(status, env=None):
    env = os.environ if env is None else env
    webhook = env.get('FEISHU_WEBHOOK_URL', '').strip()
    if not webhook:
        print('Notification not sent: configure FEISHU_WEBHOOK_URL and make it available to this pipeline job.', file=sys.stderr)
        return 1
    try:
        body = payload(status, env)
        request = urllib.request.Request(webhook, data=json.dumps(body, ensure_ascii=False).encode(),
                                         headers={'Content-Type': 'application/json'}, method='POST')
        with urllib.request.urlopen(request, timeout=15) as response:
            result = json.load(response)
        if not isinstance(result, dict) or result.get('code', result.get('StatusCode', -1)) != 0:
            # Do not echo the response; it may include the private webhook URL.
            print('Feishu rejected notification; check bot keyword, signature and IP restrictions.', file=sys.stderr)
            return 1
    except (OSError, ValueError, urllib.error.URLError):
        print('Notification failed; check webhook configuration and network access. Credentials omitted.', file=sys.stderr)
        return 1
    print('Feishu build notification sent.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else ''))
