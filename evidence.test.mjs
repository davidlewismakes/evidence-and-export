import { test } from "node:test";
import assert from "node:assert/strict";
import { evidenceCurrency, csvCell } from "./answer-evidence.ts";

test("unapproved direct evidence does not pass as current", () => {
  assert.equal(evidenceCurrency({
    status: "source_supported", factRevisionIds: [],
    documentCitations: [{ answerAuthorized: false }],
  }, "2026-01-01"), "needs_review");
});
test("expired citations require review and missing evidence stays missing", () => {
  assert.equal(evidenceCurrency({
    status: "source_supported", factRevisionIds: [],
    documentCitations: [{ answerAuthorized: true, sourceExpiresOn: "2025-12-31" }],
  }, "2026-01-01"), "needs_review");
  assert.equal(evidenceCurrency({
    factRevisionIds: ["fictional-fact"], evidence: [],
  }, "2026-01-01"), "missing");
});
test("formula-like text is escaped and quotes are doubled in CSV cells", () => {
  assert.equal(csvCell("=1+1"), '"\'=1+1"');
  assert.equal(csvCell('a "quote"'), '"a ""quote"""');
});
