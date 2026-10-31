"""Ready tool, unit 3, example 2 - step 2 of 4: eleven files in three formats become four clean tables.

Reads the three branch sales workbooks and Masters (Excel), the six PDF reports (export sales and shipments) and
the two Word memos (returns and targets). Excel and Word files come from the CSV files step 1 exported through COM
(or from the files themselves when they are not protected); the PDFs are read as text by pure Python. Writes:
  Output/Work/Sales.csv, Shipments.csv, Returns.csv, Targets.csv, Sources.csv, Models.csv, Countries.csv
  Output/Work/summary.json        every figure, which steps 3 and 4 check the workbook and the deck against
  Output/Check_Report.txt         the figures in plain words, the same as Answer_Key.txt
Pure Python: the standard library only. Nothing to install. Data/ is only read.
"""
STEP = "2_build_tables"
#@include helpers.py

BRANCHES = ["Cairo", "Alexandria", "Delta"]
CHANNELS = BRANCHES + ["Export"]
MONTHS = {"Jul": "2026-07", "Aug": "2026-08", "Sep": "2026-09"}


def pct(a, b):
    return js_round(a / b * 100, 1)


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    log("start")
    masters = DATA / "Excel" / "Masters.xlsx"
    models = two_col(sheet_rows(masters, "Models"), ["ModelCode", "ModelName"], "Masters.xlsx, sheet Models")
    countries = two_col(sheet_rows(masters, "Countries"), ["CountryCode", "CountryName"], "Masters.xlsx, sheet Countries")
    log(f"read Masters.xlsx: {len(models)} models, {len(countries)} countries")
    sales, sources, invoices = [], [], set()

    def known(where, mc, cc="EG"):
        if mc not in models:
            stop(f"{where}: the model {mc} is not in Masters")
        if cc not in countries:
            stop(f"{where}: the country {cc} is not in Masters")

    # 1. the branches (Excel): Channel is the branch in the file name, CountryCode is EG
    for b in BRANCHES:
        f = DATA / "Excel" / f"Sales_{b}_Q3.xlsx"
        body = check_head(sheet_rows(f, "Sales"), ["Date", "InvoiceNo", "ModelCode", "Qty", "NetSales"], f"{f.name}, sheet Sales")
        for i, r in enumerate(body, start=2):
            where = f"{f.name} row {i}"
            day, inv, mc = iso_date(r[0]), r[1].strip(), r[2].strip()
            known(where, mc)
            if inv in invoices:
                stop(f"{where}: the invoice {inv} appears twice")
            invoices.add(inv)
            sales.append([day[:7], b, "EG", mc, number(r[3], where), number(r[4], where), f.name])
        part = [s for s in sales if s[6] == f.name]
        sources.append(["Excel", f.name, len(part), sum(s[5] for s in part)])
        log(f"read {f.name}: {len(part)} rows, EGP {sources[-1][3]:,}")

    # 2. export sales (PDF): one table per month; the month comes from the file name
    for month in MONTHS.values():
        f = DATA / "PDF" / f"Export_Sales_{month}.pdf"
        if not f.exists():
            stop(f"missing file {rel(f)}")
        rows = pdf_table(f, ["CountryCode", "ModelCode", "Qty", "NetSales"])
        for i, r in enumerate(rows, start=1):
            known(f"{f.name} table row {i}", r[1], r[0])
            sales.append([month, "Export", r[0], r[1], number(r[2], f.name), number(r[3], f.name), f.name])
        sources.append(["PDF", f.name, len(rows), sum(number(r[3], f.name) for r in rows)])
        log(f"read {f.name}: {len(rows)} rows, EGP {sources[-1][3]:,}")

    # 3. shipments (PDF): one row per channel and month
    ships = []
    for month in MONTHS.values():
        f = DATA / "PDF" / f"Shipments_{month}.pdf"
        if not f.exists():
            stop(f"missing file {rel(f)}")
        rows = pdf_table(f, ["Channel", "Shipments", "Units", "FreightEGP"])
        if sorted(r[0] for r in rows) != sorted(CHANNELS):
            stop(f"{f.name}: the channels are {', '.join(r[0] for r in rows)}, expected {', '.join(CHANNELS)}")
        for r in rows:
            ships.append([month, r[0], number(r[1], f.name), number(r[2], f.name), number(r[3], f.name), f.name])
        sources.append(["PDF", f.name, len(rows), sum(number(r[3], f.name) for r in rows)])
        log(f"read {f.name}: {len(rows)} rows, freight EGP {sources[-1][3]:,}")

    # 4. returns and targets (Word): one table each
    f = DATA / "Word" / "Returns_Q3.docx"
    body = check_head(word_table(f), ["ModelCode"] + list(MONTHS), f.name)
    returns = []
    for r in body:
        known(f.name, r[0])
        returns += [[r[0], MONTHS[m], number(r[k + 1], f.name)] for k, m in enumerate(MONTHS)]
    sources.append(["Word", f.name, len(body), sum(x[2] for x in returns)])
    log(f"read {f.name}: {len(body)} models, {sources[-1][3]:,} sets returned")
    f = DATA / "Word" / "Targets_Q3.docx"
    body = check_head(word_table(f), ["Channel", "TargetUnits", "TargetSales"], f.name)
    targets = [[r[0], number(r[1], f.name), number(r[2], f.name)] for r in body]
    if sorted(t[0] for t in targets) != sorted(CHANNELS):
        stop(f"{f.name}: the channels are {', '.join(t[0] for t in targets)}, expected {', '.join(CHANNELS)}")
    sources.append(["Word", f.name, len(body), sum(t[2] for t in targets)])
    log(f"read {f.name}: {len(body)} channels, target EGP {sources[-1][3]:,}")

    # 5. the figures, each checked: the parts must add up to the whole
    value = sum(s[5] for s in sales)
    if value != sum(x[3] for x in sources if x[1].startswith(("Sales_", "Export_Sales_"))):
        stop("the Sales table does not add up to its source files")
    qty = sum(s[4] for s in sales)
    ship_units = sum(s[3] for s in ships)
    if ship_units != qty:
        stop(f"the shipments carry {ship_units:,} sets, but {qty:,} were sold")
    log(f"Sales table: {len(sales)} rows, {qty:,} sets, EGP {value:,} (the same as the source files)")

    channels = {c: {"q": sum(s[4] for s in sales if s[1] == c), "v": sum(s[5] for s in sales if s[1] == c)} for c in CHANNELS}
    target = {t[0]: {"u": t[1], "v": t[2]} for t in targets}
    freight = {c: {"n": sum(s[2] for s in ships if s[1] == c), "u": sum(s[3] for s in ships if s[1] == c),
                   "f": sum(s[4] for s in ships if s[1] == c)} for c in CHANNELS}
    exp_by = {}
    for s in sales:
        if s[1] == "Export":
            exp_by[countries[s[2]]] = exp_by.get(countries[s[2]], 0) + s[5]
    rates = []
    for mc, name in models.items():
        ret = sum(x[2] for x in returns if x[0] == mc)
        sold = sum(s[4] for s in sales if s[3] == mc)
        rates.append({"mc": mc, "name": name, "ret": ret, "sold": sold, "rate": pct(ret, sold)})
    rates.sort(key=lambda x: -x["ret"] / x["sold"])
    all_target = sum(t[2] for t in targets)
    summary = {
        "files": len(sources), "salesRows": len(sales),
        "branchRows": {b: sum(1 for s in sales if s[1] == b) for b in BRANCHES},
        "exportRows": {str(int(m[5:])): sum(1 for s in sales if s[1] == "Export" and s[0] == m) for m in MONTHS.values()},
        "salesQty": qty, "salesValue": value, "channels": channels,
        "months": {str(int(m[5:])): sum(s[5] for s in sales if s[0] == m) for m in MONTHS.values()},
        "countries": dict(sorted(exp_by.items(), key=lambda x: -x[1])),
        "achievement": {c: pct(channels[c]["v"], target[c]["v"]) for c in CHANNELS}, "target": target,
        "shipments": sum(s[2] for s in ships), "shipUnits": ship_units, "freight": sum(s[4] for s in ships),
        "freightPerUnit": {c: js_round(freight[c]["f"] / freight[c]["u"], 1) for c in CHANNELS},
        "returns": sum(x[2] for x in returns), "topReturns": rates[:3], "returnRates": rates,
        "achievementAll": pct(value, all_target), "freightPerSet": js_round(sum(s[4] for s in ships) / ship_units, 1),
        "sources": [{"kind": s[0], "file": s[1], "rows": s[2], "total": s[3]} for s in sources],
    }

    write_csv(WORK / "Sales.csv", ["Month", "Channel", "CountryCode", "ModelCode", "Qty", "NetSales", "SourceFile"], sales)
    write_csv(WORK / "Shipments.csv", ["Month", "Channel", "Shipments", "Units", "FreightEGP", "SourceFile"], ships)
    write_csv(WORK / "Returns.csv", ["ModelCode", "Month", "Returned"], returns)
    write_csv(WORK / "Targets.csv", ["Channel", "TargetUnits", "TargetSales"], targets)
    write_csv(WORK / "Sources.csv", ["Kind", "File", "Rows", "Total"], sources)
    write_csv(WORK / "Models.csv", ["ModelCode", "ModelName"], models.items())
    write_csv(WORK / "Countries.csv", ["CountryCode", "CountryName"], countries.items())
    write_json(WORK / "summary.json", summary)
    log("wrote Output/Work/Sales.csv, Shipments.csv, Returns.csv, Targets.csv, Sources.csv and summary.json")

    g = lambda x: f"{x:g}"
    report = [
        "Commercial review, third quarter 2026 - the figures the workbook and the deck must show", "",
        f"Sales rows: {len(sales)} · net sales: EGP {value:,} · {qty:,} sets",
        *[f"  {c}: {channels[c]['q']:,} sets · EGP {channels[c]['v']:,} · target {target[c]['v']:,} · achievement {g(summary['achievement'][c])}%" for c in CHANNELS],
        "By month (EGP): " + " · ".join(f"{n} {summary['months'][str(int(m[5:]))]:,}" for n, m in zip(["July", "August", "September"], MONTHS.values())),
        f"Shipments: {summary['shipments']} · {ship_units:,} sets · freight EGP {summary['freight']:,}",
        "Freight per set: " + " · ".join(f"{c} {g(summary['freightPerUnit'][c])}" for c in CHANNELS) + " EGP",
        f"Returns: {summary['returns']} sets · top 3 rates: " + " · ".join(f"{x['mc']} ({g(x['rate'])}%)" for x in rates[:3]),
        f"Achievement, all channels: {g(summary['achievementAll'])}% · freight per set, all: EGP {g(summary['freightPerSet'])}",
        "", "Export sales by country (EGP):", *[f"  {k}: {v:,}" for k, v in summary["countries"].items()], "",
    ]
    (OUT / "Check_Report.txt").write_text("\n".join(report), encoding="utf-8-sig")
    log("wrote Output/Check_Report.txt (compare it with Answer_Key.txt)")
    log("done")


if __name__ == "__main__":
    main()
