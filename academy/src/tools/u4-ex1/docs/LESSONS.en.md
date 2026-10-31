# Lessons learned: two weeks in one table (unit 4, example 1)

## Lessons of this example
- **A small step is easier to check than a big tool.** Each script does one thing and logs its check, so when
  something goes wrong you know where from the first STOPPED line.
- **Code that runs is not code that is right.** The first version of the report said "Kuwait: 8" with no error,
  because it counted rows with COUNTIF instead of adding up the quantity with SUMIF. A review against a fixed list
  caught it.
- **The CSV is written by PowerShell, not by Excel's Save As.** On a laptop with a DRM, a file Excel saves may be
  encrypted even as CSV, and then Python cannot read it. PowerShell reads the values from Excel and writes plain text.
- **Every step has a launcher.** That lets you explain and try one step on its own in a lecture, while Run_Tool.bat
  runs them all in order.
- **The database checks itself.** After writing the rows, Python reads COUNT and SUM back from the database and
  compares them with the file.

## The code review checklist (step 4)
1. Does the script do one job, the one in its name?
2. Is every import or command from the standard library or PowerShell itself, with no pip and no internet?
3. Are the Data files opened read-only?
4. Does the log hold the row count, the total and every check?
5. Does it stop with a clear message if a column is missing or renamed?
6. Does it quit Excel even after an error?
7. Is any figure or path written inside the code that should have been read from the file?

<!-- @include lessons-common.en.md -->
