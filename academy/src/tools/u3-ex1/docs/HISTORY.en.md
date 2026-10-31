# The tool's history: the production dashboard (unit 3, example 1)

The planning engineer kept this log while building the tool with the model, one step after another. Each version added
one thing and was checked before the next.

| Version | What was added | The check that passed |
|---|---|---|
| 1 | 13 weekly reports stacked in one sheet, with a SourceFile column and a Month column | 1,267 rows and 29,384 sets, the same as the files' sum |
| 2 | Two VLOOKUP columns from Masters: the model name and the country name; the table named tblProduction | no cell shows #N/A |
| 3 | Pivot tables (month x line, country, model) and a Report sheet made only of formulas | every pivot's grand total = 29,384 |
| 4 | A Dashboard sheet: four figures, three charts, slicers for month, line and country | the L01 slicer = a filter on L01 in the table |
| 5 | The tool split into three steps in one click: Excel exports the files through COM, pure Python computes and checks, Excel builds the dashboard | Check_Report.txt = Answer_Key.txt |

## Why version 5 is split this way
- **Excel reads the files, not Python.** On a laptop with a DRM such as NASCA, Office files are encrypted on disk and
  only Office itself may open them. So Excel opens them through COM, read-only, and PowerShell writes the values as
  plain CSV files.
- **Pure Python does all the arithmetic.** No package, because packages are blocked. Every check is made here once,
  and the result goes to summary.json.
- **Excel builds the final shape.** Formulas, pivot tables, charts and slicers; then it compares its own figures with
  summary.json, and stops if a single figure differs.

## If you carry on
Add a row to this table for each change: what changed, and how it was checked.
