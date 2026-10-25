// Prints the two unit-3 examples' generated data as JSON, for make-finals.py (which builds the finished results).
// Usage: node academy/tools/export-data.mjs > data.json
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const DATA = JSON.parse(readFileSync(path.join(SRC, "..", "build.mjs"), "utf8").match(/const DATA = (\[[^\]]*\])/)[1]);
const ctx = { window: { ACADEMY: {} } };
vm.createContext(ctx);
for (const f of DATA) vm.runInContext(readFileSync(path.join(SRC, f), "utf8"), ctx, { filename: f });
const A = ctx.window.ACADEMY, O = A.officeProjects, X = A.xlProjects;

const models = X.modelsTable.map((m) => [m[0], m[1]]), countries = O.masters;
const ex1 = O.list[0], ex2 = O.list[1], C = O.commercial();
const weeks = ex1.data().filter((f) => f.path.includes("Weekly_Reports")).map((f) => ({ file: f.path.split("/").pop(), rows: f.sheets[0].rows.slice(1).map((r) => [r[0].d, ...r.slice(1)]) }));
process.stdout.write(JSON.stringify({
  serial0: X.serial0, models, countries,
  ex1: { head: O.head1, weeks, expected: ex1.expected() },
  ex2: {
    branches: Object.fromEntries(Object.entries(C.branch).map(([k, v]) => [k, v.map((x) => [X.serial0 + x.day, x.inv, x.mc, x.q, x.v])])),
    exports: C.exp.map((x) => [x.m, x.cc, x.mc, x.q, x.v]), ships: C.ships.map((x) => [x.m, x.ch, x.shipments, x.units, x.freight]),
    returns: C.returns.map((x) => [x.m, x.mc, x.q]), targets: O.channels.map((ch) => [ch, C.target[ch].u, C.target[ch].v]), expected: ex2.expected(),
  },
}));
