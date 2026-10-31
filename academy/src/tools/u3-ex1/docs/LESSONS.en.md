# Lessons learned: the production dashboard (unit 3, example 1)

## Lessons of this example
- **Start from the table, not the charts.** Every figure on the dashboard is calculated from tblProduction, so the
  first step is always the big table, then the pivot tables, and the charts last.
- **The code is for the tool, the name for the manager.** The codes stayed in the table and the names were added
  beside them with VLOOKUP, not in their place, because joins and checks work on the code.
- **One slicer drives every pivot table.** With each slicer connected to all four pivot tables, every chart changes
  together. If an older Excel could not add the slicers, the tool says so in the log, and you can add them by hand
  from PivotChart Analyze > Insert Slicer.
- **The top model comes from the pivot table.** PT_Model is sorted largest first, so its first row is the top model,
  and the report reads it with a formula.
- **The last check is on the result itself.** Once the dashboard is built, the tool reads the figures back from the
  sheet and compares them with summary.json: the total, the value, the export share, every month and the top model.

<!-- @include lessons-common.en.md -->
