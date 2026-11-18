export type AnswerEvidence = {
  factRevisionId: string;
  sourceRevisionId: string;
  sourceTitle: string;
  sourceExpiresOn: string | null;
  sourceReplaced: boolean;
  factCurrent: boolean;
  pageReference: string | null;
  excerpt: string | null;
};

export function evidenceCurrency(
  answer: { status?: string; factRevisionIds: string[]; evidence?: AnswerEvidence[]; documentCitations?: { sourceExpiresOn?: string | null; sourceReplaced?: boolean; answerAuthorized?: boolean }[] } | null,
  today = new Date().toISOString().slice(0, 10),
): "current" | "needs_review" | "missing" {
  if (answer?.status === "source_supported") {
    const citations = answer.documentCitations ?? [];
    return citations.length === 1 && citations.every(c => c.answerAuthorized === true && !c.sourceReplaced && (!c.sourceExpiresOn || c.sourceExpiresOn >= today)) ? "current" : "needs_review";
  }
  if (!answer?.factRevisionIds.length) return "missing";
  const evidence = answer.evidence ?? [];
  if (answer.factRevisionIds.some(id => !evidence.some(entry => entry.factRevisionId === id))) return "missing";
  return evidence.some(entry => !entry.factCurrent || entry.sourceReplaced || (entry.sourceExpiresOn && entry.sourceExpiresOn < today))
    ? "needs_review"
    : "current";
}

export function spreadsheetText(value: unknown): string {
  const text = String(value ?? "");
  return /^[\s\uFEFF]*[=+@-]|^[\t\r\n]/u.test(text) ? "'" + text : text;
}

export function csvCell(value: unknown): string {
  return '"' + spreadsheetText(value).replaceAll('"', '""') + '"';
}

export const isUsableAnswerStatus = (status: string | undefined) => status === "approved" || status === "source_supported";
