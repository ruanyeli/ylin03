import { caseFacts as F, demoCategories, enWord, frontendDemos, larkScenarios, rdRecordings, t } from '../../shared'
import { richPair } from '../../lib/rich'

// Recordings, demos, and every number come from the shared layer; v1 adds its own prose.
const recording = id => rdRecordings.find(r => r.id === id)
const lark = id => larkScenarios.find(r => r.id === id)

export const rdCases = {
  title: t('IQuest-Q1 in Model Development', 'IQuest-Q1 参与模型研发'),
  intro: t(
    'Four recordings from everyday research work. Pick one to watch; the notes beside the player explain what the model found and how it was checked.',
    '四段来自日常研发的录屏。选择一段观看，播放器旁的说明介绍模型发现了什么、又是如何验证的。',
  ),
  items: [
    {
      ...recording('rsi-run'),
      lead: t(
        'Successive iterations of the loop: the agent diagnoses gaps, repairs training data, synthesizes tasks, and reports results, while researchers discuss, redirect, and review each update.',
        '多轮迭代的完整过程：智能体诊断短板、修复训练数据、合成任务并汇报结果；研究人员参与讨论、调整方向并评审每一次更新。',
      ),
      flow: [t('Diagnose', '问题定位'), t('Repair data', '数据修复'), t('Train', '模型训练'), t('Deploy & evaluate', '部署评测')],
      notes: [
        [t('Diagnosis', '问题'), t(`After ${F.schemaIteration.consecutiveErrors} consecutive tool-call errors, the model audited ${F.schemaIteration.callsAudited} calls and found a bias toward one format and inconsistencies between tool definitions and arguments.`, `连续 ${F.schemaIteration.consecutiveErrors} 次工具调用错误后，模型抽查了 ${F.schemaIteration.callsAudited} 次调用，发现数据偏向单一格式，且工具定义与参数不一致。`)],
        [t('Repair', '修复'), t(`It repaired the data and mixed tool-call schemas for supervised fine-tuning on ${F.schemaIteration.trajectories} trajectories. The run took ${F.schemaIteration.gpuHours} GPU hours.`, `模型修复数据，并混合不同工具调用格式，用 ${F.schemaIteration.trajectories} 条轨迹进行监督微调，消耗 ${F.schemaIteration.gpuHours} GPU 小时。`)],
        [t('Human role', '人工参与'), t('The model carried out diagnosis, repair, training, and evaluation. Key operations, including formal training, required human authorization.', '模型执行诊断、修复、训练与评测；正式训练等关键操作经研究人员授权后启动。')],
      ],
      stats: [
        { value: `${F.schemaIteration.before} → ${F.schemaIteration.after}`, label: t(`${F.schemaIteration.benchmark}, ${F.schemaIteration.tasks} tasks`, `${F.schemaIteration.benchmark}，${F.schemaIteration.tasks} 题均分`) },
        { value: F.schemaIteration.gain, label: t('Gain after the fix', '修复后提升') },
      ],
    },
    {
      ...recording('case-1'),
      lead: t('Working in Claude Code, IQuest-Q1 traced an unusual reward curve to an extra space in decoded text that left only the final turn in the training loss.', 'IQuest-Q1 在 Claude Code 中排查奖励异常，发现解码时多出的空格导致训练只覆盖最后一轮回答。'),
      flow: [t('Locate the issue', '定位问题'), t('Fix the bug', '修复 Bug'), t('Reward improves', '效果提升')],
      notes: [
        [t('Cause', '原因'), t('Extra spaces inserted during decoding broke prefix matching. Earlier turns remained in context but dropped out of the training loss.', '解码器额外插入的空格破坏了前缀匹配。前几轮回答仍在上下文中，却不再参与损失计算。')],
        [t('Fix', '修复'), t('Disable injected separator spaces while preserving generated whitespace, and keep streamed and stored text consistent.', '关闭额外分隔空格，保留模型生成的空白字符，并确保流式文本与存储轨迹一致。')],
        [t('Result', '结果'), t(`Multi-turn training was restored. Mean reward rose from ${F.extraSpace.before} to ${F.extraSpace.after}, reaching ${F.extraSpace.later} later in training.`, `多轮训练恢复，奖励均值从 ${F.extraSpace.before} 升至 ${F.extraSpace.after}，后续达到 ${F.extraSpace.later}。`)],
      ],
      stats: [
        { value: F.extraSpace.before, label: t('Reward mean, before', '修复前均值') },
        { value: F.extraSpace.after, label: t('After the fix', '修复后均值') },
        { value: F.extraSpace.later, label: t('Later in training', '训练后段') },
      ],
    },
    {
      ...recording('case-2'),
      lead: t('After an environment update, previously solvable tasks began receiving low rewards. IQuest-Q1 investigated the execution and grading pipeline in Claude Code.', '环境更新后，原本能完成的任务开始大量得低分。IQuest-Q1 在 Claude Code 中排查任务执行与评分流程。'),
      flow: [t('Cluster failures', '失败聚类'), t('Trace the timeline', '时间线排查'), t('Repair environment & grading', '修复环境与评分'), t('Re-validate', '复验')],
      notes: [
        [t('Cause', '原因'), t('Dependency, test-startup, and service-access faults caused some tasks to fail before the model’s patch ran. The grader counted these as model failures.', '依赖、测试启动与服务访问故障，使部分任务在补丁执行前就失败，并被计入模型的负奖励。')],
        [t('Fix', '修复'), t('Repair the environment, add health checks, and exclude confirmed infrastructure faults from policy updates. Genuine model failures still receive negative reward.', '修复环境并增加健康检查，将确认的基础设施故障排除出策略更新；模型自身的失败仍保留负奖励。')],
        [t('Validation', '验证'), t('Re-run the same tasks and patches to check scoring recovery. Restored scoring is judged separately from improved model capability.', '用同一批任务与补丁复验评分恢复情况；评分恢复与模型能力提升分别判断。')],
      ],
    },
    {
      ...recording('case-3'),
      lead: t('A researcher asked IQuest-Q1 to build a workbench for inspecting research sessions—failed commands, logs, diffs, tests, and reports tied to the right code version—and then to repair a failed export from within that page.', '研究人员请 IQuest-Q1 搭建一个研发工作台，用来查看研发会话中的失败命令、日志、代码改动、测试和报告，并与对应代码版本绑定；随后在工作台上发起修复一个失败的导出任务。'),
      flow: [t('Build the workbench', '搭建工作台'), t('Inspect the failure', '查看失败记录'), t('Minimal fix', '最小修复'), t('Verify the artifact', '校验产物')],
      notes: [
        [t('Cause', '原因'), t(<>The review-bundle export failed because some source files carried a modification time of 0 (1970), and Python’s <code>zipfile</code> rejects timestamps before 1980.</>, <>部分源文件的修改时间为 0（1970 年），而 Python 的 <code>zipfile</code> 不接受 1980 年之前的时间戳，导致评审包导出失败。</>)],
        [t('Fix', '修复'), t(<>A minimal change—<code>strict_timestamps=False</code> on the archive—plus a regression test with mixed modern and pre-1980 timestamps. Project data was left untouched.</>, <>只做最小改动：为归档设置 <code>strict_timestamps=False</code>，并补充一条混合新旧时间戳的回归测试；项目数据保持不变。</>)],
        [t('Verification', '验证'), t('Workbench and project tests pass. An integrity report confirms every file in the archive is present and byte-identical to its source.', '工作台与项目测试全部通过；完整性报告确认归档中的所有文件齐全，且与源文件逐字节一致。')],
      ],
    },
  ],
}

export const office = {
  title: t('Working Across Lark', '在飞书中处理完整的工作任务'),
  intro: t(
    <>In a sandboxed Feishu workspace, IQuest-Q1 uses <code>lark-cli</code> to check chats and documents, make evidence-based judgments, and deliver the follow-up—documents, decks, tasks, meetings, and notices.</>,
    <>在飞书沙盘环境中，IQuest-Q1 通过 <code>lark-cli</code> 核对消息与文档，形成有依据的判断，再完成文档、幻灯片、任务、会议与通报等后续交付。</>,
  ),
  items: [
    {
      ...lark('api-incident'),
      tag: t(`${F.apiIncident.deliverables} deliverables · report as you go`, `${F.apiIncident.deliverables} 项交付 · 边做边报`),
      lead: t('A customer received another customer’s record from the v1 API. The model must determine the scope and keep the response team informed.', '客户通过 v1 接口读到了其他客户的记录。模型需要查清影响范围，并及时同步处置进展。'),
      notes: [
        [t('Judgment', '判断'), t(`Using incident records and policy text, the model graded the incident Level ${F.apiIncident.level}: between ${F.apiIncident.from} and ${F.apiIncident.to} the v1 endpoint returned other customers’ records ${F.apiIncident.records} times, affecting ${enWord(F.apiIncident.customers)} customers.`, `模型根据事件记录与制度原文，将事件定为 ${F.apiIncident.level} 级：${F.apiIncident.from} 至 ${F.apiIncident.to} 期间，v1 接口共 ${F.apiIncident.records} 次返回了不属于请求方的记录，涉及 ${F.apiIncident.customers} 家客户。`)],
        [t('Delivery', '交付'), t('It prepared the incident report and remediation records, scheduled the post-incident review, and updated the response group and progress board after each step.', '完成事件报告与整改记录，安排事后复盘会议，每一步完成后同步处置群和进度看板。')],
      ],
      versions: lark('api-incident').recordings,
    },
    {
      ...lark('residency'),
      tag: t('Evidence-based decisions', '依据事实作出判断'),
      lead: t(`Question ${F.residency.question} of a ${F.residency.questions}-item security questionnaire: can the customer’s data be guaranteed to stay in mainland China? Pre-sales cannot commit, and the customer needs a final answer by ${F.residency.deadline}.`, `${F.residency.questions} 题安全合规问卷的第 ${F.residency.question} 题：客户的数据能否保证不出中国大陆境内？售前无法拍板，而客户 ${F.residency.deadline} 就要最终答复。`),
      notes: [
        [t('Situation', '背景'), t('A customer needs to know whether its data can stay in mainland China, with technical measures and an SLA to support the commitment.', '客户需要确认数据能否留在中国大陆境内，以及相应的技术方案与 SLA 承诺。')],
        [t('Task', '任务'), t('Check the POC history and company policies; assess feasibility, timing, and cost; prepare options for sales and legal review.', '查阅 POC 历史与公司制度，评估可行性、周期和成本，形成方案供商务与法务审核。')],
      ],
    },
    {
      ...lark('data-incident'),
      tag: t(`${F.dataIncident.deliverables} deliverables · ${F.dataIncident.groups} groups`, `${F.dataIncident.deliverables} 项交付 · ${F.dataIncident.groups} 个群`),
      lead: t('Production data appeared in a test table. The model acts as the data-platform lead to establish the facts and coordinate the response.', '测试表中出现了生产数据。模型以数据平台负责人的身份核实事实，协调后续处置。'),
      notes: [
        [t('Judgment', '判断'), t('Reconcile engineering, compliance, and sales records to establish incident severity, discovery time, and notification duties.', '交叉核对技术、合规与商务记录，确定事件级别、发现时间和告知义务。')],
        [t('Delivery', '交付'), t('Prepare the review report, impact list, and remediation tasks; arrange a review meeting and send audience-specific notices.', '形成复盘报告、影响清单和整改任务，安排复盘会议，并向各方发送相应通报。')],
      ],
    },
    {
      ...lark('roster'),
      tag: t(`${F.roster.deliverables} deliverables · multi-bot group`, `${F.roster.deliverables} 项交付 · 多机器人协同`),
      lead: t(`The ${F.roster.names} names on a course sign-up sheet do not match classroom and exam-system records. The model must verify the roster before registration closes.`, `认证班报名表上的 ${F.roster.names} 人与场地、考试系统记录不符。模型需要在截止前核实名单。`),
      notes: [
        [t('Judgment', '判断'), t('Reconcile sign-ups with registration records, separating confirmed, pending, and duplicate entries.', '将报名表与注册记录逐项核对，区分已确认、待审批与重复记录。')],
        [t('Delivery', '交付'), t('Update the source worksheet, publish a verified roster, and arrange follow-up tasks and make-up exams. Keep unconfirmed items open and personal details private.', '回写底表、整理正式名单，安排跟进任务与补考。未确认事项保留待办，个人隐私不对外公开。')],
      ],
    },
  ],
}

export const frontend = {
  title: t('From a Brief to a Browser', '从一段需求，到可交互的网页'),
  intro: t(
    'IQuest-Q1 turns written briefs into browser-based experiences—games, personal tools, design studies, and scientific visualizations. Every item below runs in the browser; some also come with a recorded walkthrough.',
    '从海底沙盒、落日赛车，到花园规划、星球探索和科学可视化，IQuest-Q1 把文字需求写成可直接运行的网页。下面每个作品都可以在浏览器中打开，部分附有操作录屏。',
  ),
  categories: demoCategories,
  items: frontendDemos.map(item => ({ ...item, body: richPair(item.body) })),
}

// Which section each shareable item lives in, for ?demo=<id> links.
export const sectionOfItem = id =>
  rdCases.items.some(i => i.id === id) ? 'rd-cases'
    : office.items.some(i => i.id === id) ? 'office'
      : frontend.items.some(i => i.id === id) ? 'frontend' : null
