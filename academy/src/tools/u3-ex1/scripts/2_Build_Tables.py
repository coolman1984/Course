"""Ready tool, unit 3, example 1 - step 2 of 3: the big table and every figure of the dashboard.

Reads the 13 weekly reports and Masters (from the CSV files Excel exported in step 1, or from the .xlsx files
themselves when they are not protected), stacks them, checks them, and writes:
  Output/Work/Production_Q3.csv   every row, with SourceFile and Month (step 3 puts it in Excel with VLOOKUP)
  Output/Work/Models.csv, Countries.csv   the two masters
  Output/Work/summary.json        every figure, which step 3 checks the workbook against
  Output/Check_Report.txt         the figures in plain words, the same as Answer_Key.txt
Pure Python: the standard library only. Nothing to install. Data/ is only read.
"""
STEP = "2_build_tables"
#@include helpers.py

HEAD = ["Date", "WorkOrder", "LineCode", "ModelCode", "CountryCode", "Qty", "Value"]


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    log("start")
    weeks = sorted((DATA / "Weekly_Reports").glob("Week_*.xlsx"))
    if not weeks:
        stop("no Week_nn.xlsx file in Data/Weekly_Reports")
    masters = DATA / "Masters.xlsx"
    models = two_col(sheet_rows(masters, "Models"), ["ModelCode", "ModelName"], "Masters.xlsx, sheet Models")
    countries = two_col(sheet_rows(masters, "Countries"), ["CountryCode", "CountryName"], "Masters.xlsx, sheet Countries")
    log(f"read Masters.xlsx: {len(models)} models, {len(countries)} countries")

    rows, sources, orders = [], [], set()
    for f in weeks:
        body = check_head(sheet_rows(f, "Production"), HEAD, f"{f.name}, sheet Production")
        qty = 0
        for i, r in enumerate(body, start=2):
            where = f"{f.name} row {i}"
            r = (r + [""] * 7)[:7]
            if any(not c.strip() for c in r):
                stop(f"{where}: an empty cell")
            day, wo, line, mc, cc = iso_date(r[0]), r[1].strip(), r[2].strip(), r[3].strip(), r[4].strip()
            q, v = number(r[5], where), number(r[6], where)
            if mc not in models:
                stop(f"{where}: the model {mc} is not in Masters")
            if cc not in countries:
                stop(f"{where}: the country {cc} is not in Masters")
            if wo in orders:
                stop(f"{where}: the work order {wo} appears twice")
            orders.add(wo)
            rows.append([day, wo, line, mc, cc, q, v, f.name, day[:7]])
            qty += q
        sources.append({"file": f.name, "rows": len(body), "qty": qty})
        log(f"read {f.name}: {len(body)} rows, {qty:,} sets")

    units = sum(r[5] for r in rows)
    if units != sum(s["qty"] for s in sources) or len(rows) != sum(s["rows"] for s in sources):
        stop("the big table does not add up to the weekly reports")
    log(f"stacked {len(weeks)} files: {len(rows):,} rows, {units:,} sets (the same as the files' own totals)")

    def by(key, val=lambda r: r[5]):
        out = {}
        for r in rows:
            out[key(r)] = out.get(key(r), 0) + val(r)
        return out

    months = by(lambda r: str(int(r[8][5:])))
    lines = dict(sorted(by(lambda r: r[2]).items()))
    by_country = dict(sorted(by(lambda r: countries[r[4]]).items(), key=lambda x: -x[1]))
    by_model = dict(sorted(by(lambda r: models[r[3]]).items(), key=lambda x: -x[1]))
    egypt = sum(r[5] for r in rows if r[4] == "EG")
    top_model = next(iter(by_model.items()))
    best_line = max(lines.items(), key=lambda x: x[1])
    summary = {
        "files": len(weeks), "weeks": [s["rows"] for s in sources], "rows": len(rows), "units": units,
        "value": sum(r[6] for r in rows), "months": months, "monthValue": by(lambda r: str(int(r[8][5:])), lambda r: r[6]),
        "lines": lines, "countries": by_country, "countryValue": by(lambda r: countries[r[4]], lambda r: r[6]),
        "models": by_model, "topModel": {"name": top_model[0], "units": top_model[1]},
        "bestLine": {"line": best_line[0], "units": best_line[1]},
        "exportShare": js_round((units - egypt) / units * 100, 1), "egypt": egypt,
        "first": min(r[0] for r in rows), "last": max(r[0] for r in rows), "monthList": sorted({r[8] for r in rows}),
        "sources": sources,
    }

    write_csv(WORK / "Production_Q3.csv", HEAD + ["SourceFile", "Month"], rows)
    write_csv(WORK / "Models.csv", ["ModelCode", "ModelName"], models.items())
    write_csv(WORK / "Countries.csv", ["CountryCode", "CountryName"], countries.items())
    write_json(WORK / "summary.json", summary)
    log("wrote Output/Work/Production_Q3.csv, Models.csv, Countries.csv and summary.json")

    month_name = {"7": "July", "8": "August", "9": "September"}
    report = [
        "Production, third quarter 2026 - the figures the dashboard must show",
        f"Period: {summary['first']} to {summary['last']}", "",
        f"Files: {summary['files']} · rows in the big sheet: {len(rows):,} · sets: {units:,} · value: EGP {summary['value']:,}",
        "By month: " + " · ".join(f"{month_name.get(m, m)} {q:,}" for m, q in months.items()),
        f"Export share: {summary['exportShare']:g}% · top model: {top_model[0]} ({top_model[1]:,}) · top line: {best_line[0]} ({best_line[1]:,})",
        "", "By line:", *[f"  {k}: {q:,}" for k, q in lines.items()],
        "", "By country:", *[f"  {k}: {q:,}" for k, q in by_country.items()],
        "", "By model:", *[f"  {k}: {q:,}" for k, q in by_model.items()], "",
    ]
    (OUT / "Check_Report.txt").write_text("\n".join(report), encoding="utf-8-sig")
    log("wrote Output/Check_Report.txt (compare it with Answer_Key.txt)")
    log("done")


if __name__ == "__main__":
    main()
