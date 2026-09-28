export const copy = {
  en: {
    report: 'Technical Report', evaluation: 'Evaluation Results',
    kicker: 'IQuest Research · Technical Report · 2026',
    title: 'IQuest-Q1: Learning to Build the Next Model',
    subtitle: 'An open-source agentic foundation model developed through Human-on-the-Loop Recursive Self-Improvement (RSI).',
    overview: 'Overview', rsi: 'Recursive Self-Improvement', training: 'Training Pipeline', results: 'Evaluation',
    demos: 'Model R&D Cases', frontend: 'Frontend Generation', citation: 'Citation',
    overviewText: 'IQuest-Q1 combines code reasoning, repository-level development, information gathering, and tool use in a model designed for efficient agentic work.',
    rsiText: 'Researchers guide two connected cycles: the model improves capabilities and the development system turns experimental lessons into reusable workflows.',
    trainingText: 'Pre-training establishes broad knowledge. Mid-training adds reasoning, agent trajectories, and a context curriculum from 32K to 512K. Post-training unifies specialized capabilities.',
    resultsText: 'The technical report documents evaluation across coding, agentic reasoning, and general-purpose tool-use benchmarks.',
    demosText: 'Selected cases demonstrate research assistance, document workflows, and browser-runnable frontend generation.',
    quote: 'If you use IQuest-Q1 in your research, please cite the technical report.',
    copied: 'Copied', copy: 'Copy citation'
  },
  zh: {
    report: '技术报告', evaluation: '评测结果',
    kicker: 'IQuest Research · 技术报告 · 2026',
    title: 'IQuest-Q1：学习构建下一代模型',
    subtitle: '一个通过研究人员参与的递归自我改进（RSI）研发的开源智能体基础模型。',
    overview: '概览', rsi: '递归自我改进', training: '训练流程', results: '评测结果',
    demos: '模型研发案例', frontend: '前端生成', citation: '引用',
    overviewText: 'IQuest-Q1 将代码推理、仓库级开发、信息获取和工具使用整合到一个面向高效智能体工作的模型中。',
    rsiText: '研究人员引导两条相互关联的循环：模型提升能力，研发系统将实验经验沉淀为可复用的工作流。',
    trainingText: '预训练建立广泛知识；中期训练引入推理、智能体轨迹与从 32K 到 512K 的上下文课程；后训练统一专门能力。',
    resultsText: '技术报告记录了模型在编程、智能体推理和通用工具使用基准上的评测结果。',
    demosText: '精选案例展示研究协作、文档工作流与可在浏览器运行的前端生成能力。',
    quote: '若在研究中使用 IQuest-Q1，请引用技术报告。',
    copied: '已复制', copy: '复制引用'
  }
}

export const metrics = [
  ['30B / 3B', 'Routed experts, total / activated per token'],
  ['48', 'Transformer layers, hybrid SWA + GQA attention'],
  ['512K', 'Context via a 32K → 128K → 512K curriculum'],
  ['1.3×', 'Scaling efficiency over matched baseline'],
]

export const capabilities = [
  ['Models that contribute to their own development', '模型参与自身研发'],
  ['Coding and general-purpose tool use', '兼顾编程与通用任务'],
  ['Training across agent frameworks', '在多种智能体框架中训练'],
  ['Bringing specialist capabilities together', '整合不同领域的能力'],
]
