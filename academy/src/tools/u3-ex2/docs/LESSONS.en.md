# Lessons learned: the commercial review (unit 3, example 2)

## Lessons of this example
- **Each format has its reader; the table is one.** Excel and Word through COM, the PDFs through pure Python, but all
  of them land in the same columns: Month, Channel, CountryCode, ModelCode, Qty, NetSales, SourceFile.
- **What is not inside a file comes from its name.** The channel (Cairo, Alexandria, Delta) from the Excel file's
  name, the month from the PDF's name, and the country of the branches is always EG.
- **PDF figures carry thousands separators.** "1,234" must become 1234 before any sum, or the arithmetic goes wrong
  or stops.
- **Shipments check the sales.** The sets shipped must add up to the sets sold; if they differ the tool stops,
  because a file is missing or repeated.
- **The deck's numbers come from the workbook, not from memory.** Step 3 reads them from the Report sheet after the
  calculation and saves them in deck_figures.json; step 4 puts them on the slides as they are.
- **Conclusions belong to the director.** The last slide is empty on purpose: the tool shows the figures, the
  decision stays with its owner.
- **A scanned PDF won't do here.** This method reads a PDF holding real text. If the report is an image or encrypted,
  ask the system for a CSV or Excel copy.

<!-- @include lessons-common.en.md -->
