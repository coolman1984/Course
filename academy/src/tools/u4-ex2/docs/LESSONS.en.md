# Lessons learned: from a PDF report to a page for management (unit 4, example 2)

## Lessons of this example
- **Look at the text before you extract.** The PDF's first 20 lines of text show the column order, the shape of the
  figures and the Total line, before a single line of extraction is written.
- **The Total line is a ready-made check.** The system itself printed the total, so the tool adds up the rows and
  compares; if they differ it stops before writing anything.
- **A text PDF is not a scanned PDF.** This method reads the text inside the file. If the report is an image, the
  answer is a CSV or Excel copy from the system.
- **? marks in SQL, not glued values.** The rows go into the database with executemany and ? marks, so a value with
  an odd character cannot break the sentence.
- **The page links to nothing outside.** No chart library, no web font, no picture from a site. Disconnect the
  internet and open it: everything must still be there.
- **Every value passes through html.escape.** So a name holding < or & shows as it is and leaves the page intact.

<!-- @include lessons-common.en.md -->
