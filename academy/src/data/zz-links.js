/* Runs after every other data file (alphabetical order): derives the links that would otherwise be typed twice.
   - glossary.lessons / glossary.units  ← every lesson whose `terms` list names the term */
(function () {
  const byId = Object.fromEntries(ACAD.glossary.map((g) => [g.id, g]));
  for (const l of ACAD.lessons) for (const id of l.terms || []) {
    const g = byId[id]; if (!g) continue;
    g.lessons = g.lessons || []; if (!g.lessons.includes(l.id)) g.lessons.push(l.id);
    g.units = g.units || []; if (!g.units.includes(l.unit)) g.units.push(l.unit);
  }
})();
