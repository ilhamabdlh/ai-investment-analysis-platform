export function openCompanySelector() {
  try {
    window.dispatchEvent(new CustomEvent('open-company-selector'))
  } catch {
    // no-op
  }
}


