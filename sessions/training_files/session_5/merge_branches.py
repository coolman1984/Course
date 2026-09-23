# أداة مرجعية (نسخة احتياطية للمدرب) - دمج وتنظيف ملفات الفروع
# التشغيل: ضع ملفات الفروع في مجلد data بجوار هذا الملف، ثم: python merge_branches.py
import sys, datetime as dt
from pathlib import Path
import pandas as pd

BASE = Path(__file__).resolve().parent
DATA, OUT = BASE / "data", BASE / "output"
REQUIRED = ["التاريخ", "المنتج", "الكمية", "سعر الوحدة", "المندوب"]
log_lines = []

def log(msg):
    line = f"{dt.datetime.now():%H:%M:%S}  {msg}"
    log_lines.append(line)
    print(line)

def stop(msg):
    log("توقف: " + msg)
    write_log()
    sys.exit(1)

def write_log():
    OUT.mkdir(exist_ok=True)
    (OUT / f"سجل_التشغيل_{dt.date.today()}.txt").write_text("\n".join(log_lines), encoding="utf-8")

def read_branch(path):
    raw = pd.read_excel(path, header=None)
    header_idx = next((i for i in range(min(5, len(raw))) if "التاريخ" in raw.iloc[i].astype(str).tolist()), None)
    if header_idx is None:
        stop(f"الملف {path.name} لا يحتوي صف عناوين فيه عمود التاريخ")
    df = pd.read_excel(path, header=header_idx)
    missing = [c for c in REQUIRED if c not in df.columns]
    if missing:
        stop(f"الملف {path.name} ينقصه العمود: {', '.join(missing)}")
    df = df[REQUIRED].dropna(how="all")
    df["الفرع"] = path.stem
    log(f"قرأت {path.name}: {len(df)} صف")
    return df

def clean(df):
    before = len(df)
    df = df.drop_duplicates()
    log(f"حذفت {before - len(df)} صف مكرر")
    df["التاريخ_الأصلي"] = df["التاريخ"].astype(str)
    df["التاريخ"] = pd.to_datetime(df["التاريخ"], errors="coerce", dayfirst=True)
    bad_dates = df[df["التاريخ"].isna()]
    if len(bad_dates):
        log(f"{len(bad_dates)} تاريخ غير مفهوم (مسجّل في ورقة الأخطاء، لم يُحذف بصمت)")
    missing_vals = df[df["الكمية"].isna() | df["سعر الوحدة"].isna()]
    if len(missing_vals):
        log(f"{len(missing_vals)} صف ناقص الكمية أو السعر (مسجّل في ورقة الأخطاء)")
    errors = pd.concat([bad_dates, missing_vals]).drop_duplicates()
    good = df.drop(errors.index)
    returns = good[good["الكمية"] < 0]
    sales = good[good["الكمية"] >= 0].copy()
    log(f"{len(returns)} مرتجع (كمية سالبة) في ورقة منفصلة")
    sales["الإجمالي"] = sales["الكمية"] * sales["سعر الوحدة"]
    return sales, returns, errors

def summarize(sales):
    return (sales.groupby(["الفرع", "المنتج"], as_index=False)
            .agg(الكمية=("الكمية", "sum"), الإجمالي=("الإجمالي", "sum"))
            .sort_values(["الفرع", "الإجمالي"], ascending=[True, False]))

def main():
    log("بدء التشغيل")
    files = sorted(DATA.glob("*.xlsx")) if DATA.exists() else []
    if not files:
        stop("لا توجد ملفات في مجلد data")
    df = pd.concat([read_branch(f) for f in files], ignore_index=True)
    log(f"إجمالي الصفوف المقروءة: {len(df)}")
    sales, returns, errors = clean(df)
    summary = summarize(sales)
    OUT.mkdir(exist_ok=True)
    out = OUT / f"تقرير_الفروع_{dt.date.today()}.xlsx"
    with pd.ExcelWriter(out) as w:
        sales.drop(columns=["التاريخ_الأصلي"]).to_excel(w, sheet_name="البيانات المدموجة", index=False)
        summary.to_excel(w, sheet_name="الملخص", index=False)
        returns.drop(columns=["التاريخ_الأصلي"]).to_excel(w, sheet_name="المرتجعات", index=False)
        errors.to_excel(w, sheet_name="الأخطاء", index=False)
    log(f"تم الحفظ: {out.name} | مبيعات سليمة: {len(sales)} | الإجمالي: {sales['الإجمالي'].sum():,.0f}")
    write_log()

if __name__ == "__main__":
    main()
