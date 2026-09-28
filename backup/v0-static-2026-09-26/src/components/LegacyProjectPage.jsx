/**
 * Compatibility boundary for the original, editorially approved project page.
 * It is kept intact while equivalent React components are introduced section by
 * section, so the published design never regresses during the migration.
 */
export default function LegacyProjectPage() {
  return <iframe className="legacy-project-page" src="./project-page.html" title="IQuest-Q1 project page" />
}
