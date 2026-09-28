import { t } from './i18n.js'

// External links. '#' means "not published yet": pages show them as inert placeholders.
export const links = {
  report: '#',
  github: 'https://github.com/IQuestLab/IQuest-Q1',
  huggingface: 'https://huggingface.co/IQuestLab/IQuest-Q1',
  modelscope: 'https://www.modelscope.cn/IQuestLab/IQuest-Q1',
  license: '#',
}

export const downloads = [
  { id: 'huggingface', name: 'Hugging Face', body: t('Model weights and model card', '模型权重与模型卡') },
  { id: 'modelscope', name: t('ModelScope (pending)', 'ModelScope（待上线）'), body: t('Model weights and model card', '模型权重与模型卡') },
  { id: 'github', name: 'GitHub', body: t('Inference code, examples, and issues', '推理代码、示例与问题反馈') },
  { id: 'license', name: t('License', '许可证'), body: t('License terms to be confirmed', '许可证条款待确认') },
]

export const isPlaceholder = href => !href || href === '#'
