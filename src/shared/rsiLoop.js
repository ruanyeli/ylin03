import { t } from './i18n.js'

// Human-on-the-loop RSI loop (redrawn from Figure 6 of the report). The dialogue is an
// illustrative iteration adapted from report §6.1.2 (tool-schema generalization) and rsi_demo.md.
export const rsiLoop = {
  researchers: t('Researchers', '研究人员'),
  supervision: t('Human-on-the-loop supervision', '人类监督（human-on-the-loop）'),
  discuss: t('discuss', '讨论'),
  agent: t('RSI Agent', 'RSI 智能体'),
  model: t('Model', '模型'),
  harness: t('Harness', '脚手架'),
  agentName: t('IQuest-Q1 · RSI agent', 'IQuest-Q1 · RSI 智能体'),
  humanName: t('Researcher', '研究人员'),
  lobes: [
    { title: t('Capability flywheel', '能力飞轮'), short: [t('Capability', '能力'), t('flywheel', '飞轮')], sub: t('model updates', '更新模型') },
    { title: t('Development flywheel', '研发飞轮'), short: [t('Development', '研发'), t('flywheel', '飞轮')], sub: t('harness updates', '更新脚手架') },
  ],
  rules: [
    { title: t('Agree', '先共识'), sub: t('before execution', '再执行'), full: t('Agree before execution', '先达成共识，再执行') },
    { title: t('Discuss', '先讨论'), sub: t('before redirection', '再调整方向'), full: t('Discuss before redirection', '先讨论，再调整方向') },
    { title: t('Review', '先评审'), sub: t('before adoption', '再采纳'), full: t('Review before adoption', '先评审，再采纳') },
  ],
  steps: [
    {
      label: [t('Observe & Propose', '观察与提出')], short: [t('Observe &', '观察与'), t('Propose', '提出')], rule: 0,
      messages: [
        ['agent', t('Tool calls keep failing on unfamiliar tool schemas, and our training data leans toward one schema. I propose augmenting it with mixed schemas.', '当脚手架使用陌生的工具格式时，工具调用频繁出错，而训练数据偏向单一格式。我建议混入多种工具格式来扩充训练数据。')],
        ['human', t('Keep some unfamiliar schemas out of the training data so we can check that it generalizes. Agreed—go ahead.', '留出一部分陌生格式不进训练数据，用来检验泛化效果。同意，开始吧。')],
      ],
    },
    {
      label: [t('Train &', '训练与'), t('Evaluate', '评测')], rule: 1,
      messages: [
        ['agent', t('Rewriting every trajectory could weaken calls in the native format. Mix rewritten and native trajectories, or convert them all?', '如果全部改写，原生格式下的调用可能变弱。是把改写数据与原生数据混合，还是全部转换？')],
        ['human', t('Keep the native trajectories in the mix so calls stay consistent. Rewrite only part, and continue.', '保留原生格式的数据一起训练，保证调用一致；只改写一部分，继续。')],
      ],
    },
    {
      label: [t('Select model', '选定模型')], short: [t('Select', '选定'), t('model', '模型')], rule: 2, bump: 0,
      messages: [
        ['agent', t('The candidate improves on held-out schemas, while familiar schemas and retained capabilities hold steady. Adopt it?', '候选模型在留出的陌生格式上有提升，熟悉格式与原有能力保持稳定。是否采纳？')],
        ['human', t('The evidence supports the gain. Adopt the checkpoint.', '证据支持这一提升，采纳该检查点。')],
      ],
      event: t('Checkpoint adopted', '检查点已采纳'),
    },
    {
      label: [t('Revise harness', '修订脚手架')], short: [t('Revise', '修订'), t('harness', '脚手架')], rule: 0,
      messages: [
        ['agent', t('These interface errors could recur in later iterations. I will turn the schema check into a reusable step in the data pipeline.', '这类接口错误在后续迭代中可能反复出现。我把格式检查做成数据流水线中可复用的一步。')],
        ['human', t('Agreed—make it callable by later agents.', '同意，做成后续智能体可以直接调用的工具。')],
      ],
    },
    {
      label: [t('Validate', '验证'), t('changes', '改动')], rule: null,
      messages: [
        ['agent', t('Replaying earlier runs to confirm the new check catches the recurring tool-call errors before training starts.', '回放以往的运行记录，确认新检查能在训练开始前拦截反复出现的工具调用错误。')],
      ],
    },
    {
      label: [t('Update harness', '更新脚手架')], short: [t('Update', '更新'), t('harness', '脚手架')], rule: 2, bump: 1,
      messages: [
        ['agent', t('The schema check and the data augmentation passed validation. Add them to the next harness?', '格式检查与数据增强已通过验证。是否加入下一版脚手架？')],
        ['human', t('Approved. Adopt the harness update.', '批准，采纳这次脚手架更新。')],
      ],
      event: t('Harness update adopted', '脚手架更新已采纳'),
    },
  ],
  note: t('Illustrative dialogue, adapted from the RSI iteration described in §6.1.2 of the technical report.', '示意对话，改编自技术报告第 6.1.2 节描述的 RSI 迭代。'),
  play: t('Play', '播放'),
  pause: t('Pause', '暂停'),
  prev: t('Previous step', '上一步'),
  next: t('Next step', '下一步'),
  stepLabel: t('Step', '步骤'),
}

// Steps (0-based) governed by each supervision rule, and the Model / Harness versions shown
// before the illustrated iteration.
rsiLoop.ruleSteps = [[0, 3], [1], [2, 5]]
rsiLoop.initialVersions = [3, 2]
