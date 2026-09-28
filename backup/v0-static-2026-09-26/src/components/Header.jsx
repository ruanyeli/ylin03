export default function Header({ language, onToggle, labels }) {
  return <header className="site-header"><a className="brand" href="#top"><span>IQ</span>IQuest</a><nav><a href="#overview">{labels.overview}</a><a href="#results">{labels.results}</a><button onClick={onToggle} aria-label="Switch language">{language === 'zh' ? 'EN' : '中文'}</button></nav></header>
}
