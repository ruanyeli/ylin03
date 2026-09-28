// Link to one recording or demo on this page, keeping the language.
export function shareUrl(id, language) {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = ''
  url.searchParams.set('demo', id)
  if (language === 'zh') url.searchParams.set('lang', 'zh')
  return url.toString()
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    window.prompt('', text)
    return false
  }
}
