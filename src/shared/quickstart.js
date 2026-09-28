import { t } from './i18n.js'

// Serving snippets for the How-to-use section, from the draft model card. Lines marked TODO wait
// for the community recipes.
export const serveSnippets = [
  {
    id: 'vllm', label: 'vLLM',
    code: `# Official prebuilt image; TODO: link the vLLM recipe once published
docker run --gpus all \\
  -p 8000:8000 \\
  --ipc=host \\
  -v ~/.cache/huggingface:/root/.cache/huggingface \\
  vllm/vllm-openai:iquest-q1 IQuestLab/IQuest-Q1 \\
    --tensor-parallel-size 8 \\
    --speculative-config '{"num_speculative_tokens":1,"method":"mtp"}' \\
    --tool-call-parser iquest_q1 \\
    --reasoning-parser iquest_q1`,
  },
  {
    id: 'sglang', label: 'SGLang',
    code: `# TODO: follow the SGLang cookbook once it is published
python -m sglang.launch_server \\
  --model-path IQuestLab/IQuest-Q1 \\
  --tp 8`,
  },
  {
    id: 'api', label: t('Python API', 'Python 调用'),
    code: `# pip install openai
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="sk-iquest")
response = client.chat.completions.create(
    model="IQuest-Q1",
    messages=[
        {"role": "user", "content": "Hello! Can you briefly introduce yourself?"},
    ],
    temperature=0.9,
    top_p=1.0,
)
print(response.choices[0].message.content)`,
  },
]
