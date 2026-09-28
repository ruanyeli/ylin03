import { useState } from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import { capabilities, metrics } from '../data/content'

const bibtex = '@techreport{iquest-q1-2026, title={IQuest-Q1: Learning to Build the Next Model}, institution={IQuest Institute}, year={2026}}'

export default function ProjectPage({ language, onLanguageToggle, labels }) {
  const [copied, setCopied] = useState(false)
  const copyCitation = async () => {
    try { await navigator.clipboard?.writeText(bibtex); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { setCopied(false) }
  }
  return <><Header language={language} onToggle={onLanguageToggle} labels={labels} />
    <main id="top">
      <section className="hero"><div className="container"><p className="eyebrow">{labels.kicker}</p><h1>{labels.title}</h1><p className="lead">{labels.subtitle}</p><div className="actions"><a className="button primary" href="#citation">{labels.report}</a><a className="button" href="#results">{labels.evaluation}</a></div><div className="metrics">{metrics.map(([value, text]) => <div key={value}><strong>{value}</strong><span>{language === 'zh' ? ({'30B / 3B':'总 / 每 token 激活专家数','48':'Transformer 层数，混合 SWA + GQA 注意力','512K':'32K → 128K → 512K 上下文课程','1.3×':'相对匹配基线的扩展效率'}[value]) : text}</span></div>)}</div></div></section>
      <Section id="overview" title={labels.overview} muted><p className="intro">{labels.overviewText}</p><div className="cards">{capabilities.map(([en, zh], i) => <article className="card" key={en}><span>0{i + 1}</span><h3>{language === 'zh' ? zh : en}</h3><p>{language === 'zh' ? '在可验证的任务、专业训练和人工审阅之间建立清晰的工程闭环。' : 'A clear engineering loop connects verified tasks, specialized training, and researcher review.'}</p></article>)}</div></Section>
      <Section id="rsi" title={labels.rsi}><p className="intro">{labels.rsiText}</p><div className="flywheel"><div><b>01</b><h3>{language === 'zh' ? '能力飞轮' : 'Capability flywheel'}</h3><p>{language === 'zh' ? '改善模型与训练数据，提升性能或降低推理成本。' : 'Improve the model and training data to raise performance or reduce inference cost.'}</p></div><div><b>02</b><h3>{language === 'zh' ? '研发飞轮' : 'Development flywheel'}</h3><p>{language === 'zh' ? '把实验中的经验转化为可复用的研究工具与流程。' : 'Turn lessons from experiments into reusable research tools and workflows.'}</p></div></div></Section>
      <Section id="training" title={labels.training} muted><p className="intro">{labels.trainingText}</p><ol className="pipeline">{['Pre-training','Code-focused pre-training','Mid-training','Post-training'].map((step, index) => <li key={step}><small>STAGE {index + 1}</small><b>{language === 'zh' ? ['预训练','代码预训练','中期训练','后训练'][index] : step}</b></li>)}</ol></Section>
      <Section id="results" title={labels.results}><p className="intro">{labels.resultsText}</p><div className="result-grid"><div><strong>61.04%</strong><span>PaperBench-CodeDev</span></div><div><strong>512K</strong><span>{language === 'zh' ? '长上下文课程' : 'long-context curriculum'}</span></div><div><strong>20</strong><span>{language === 'zh' ? '评测任务' : 'evaluation tasks'}</span></div></div></Section>
      <Section id="demos" title={labels.demos} muted><p className="intro">{labels.demosText}</p><div className="cards compact"><article className="card"><span>CASE 01</span><h3>{language === 'zh' ? '递归自我改进' : 'Recursive Self-Improvement'}</h3><p>{language === 'zh' ? '基于研究人员把关的实验与迭代。' : 'Researcher-guided experiments and iterations.'}</p></article><article className="card"><span>CASE 02</span><h3>{labels.frontend}</h3><p>{language === 'zh' ? '从任务描述到可运行网页产物。' : 'From task descriptions to browser-runnable artifacts.'}</p></article></div></Section>
      <Section id="citation" title={labels.citation}><p className="intro">{labels.quote}</p><pre>{bibtex}</pre><button className="button" onClick={copyCitation}>{copied ? labels.copied : labels.copy}</button></Section>
    </main><footer>© 2026 IQuest Institute</footer></>
}
