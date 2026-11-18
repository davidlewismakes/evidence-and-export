# Answer evidence and spreadsheet export

Extracted TypeScript utilities from Mate for checking whether answer evidence is current, missing, or needs review. The same module escapes spreadsheet formula prefixes and quotes CSV cells.

This demonstrates two practical concerns in AI-assisted security reviews: evidence can expire or lose authorization, and answers may contain text that spreadsheets interpret as formulas.

Run the focused regression tests with Node 24 or later.

```sh
node --test evidence.test.mjs
```

Tests use fictional identifiers and fixed dates. This repository includes the standalone domain utilities, without tenant records, credentials, database connections, or production history.
