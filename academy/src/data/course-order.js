/* The course plan: which lessons each unit holds, in teaching order. The plan, not the file a lesson lives in, sets
   its unit and its number; lesson ids never change (links and saved progress depend on them). */
(function (A) {
  A.courseOrder = {
    u0: ["f1", "f2", "f4", "f6", "f7", "f3", "f5", "f8"],                 // 1 foundations
    u1: ["x1", "x2", "x3", "x4", "x5", "x7", "x8", "x6"],                   // 2 Excel automation, one project per lesson: describe · first tool · three tools · purchasing · materials · fixing
    u2: ["a1", "a2", "a3", "a4", "a5", "a6"],                               // 3 two big Office examples (production dashboard · Excel + PDF + Word → PowerPoint) · Claude Code · skills
    u3: ["b1", "y4", "p9", "w1", "m1", "p10", "w2", "m3"],                  // 4 big data · the editor · intelligence levels · Office · Claude Code basics · PDF · cloud or local
    u4: ["d1", "d2", "y6", "y5", "m2"],                                     // 5 dashboards · Codex · companies and models
    u5: ["y1", "y2", "y3", "y7", "w3", "w4", "w5", "w6", "g1", "g2"],       // 6 tools · shared features · studying with AI
    u6: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p11", "p12"],     // 7 assistant at work · choosing tools · career
    u7: ["s1", "s2", "t1", "t2"],                                           // 8 the big picture
  };
  const rank = {};
  let k = 0;
  for (const u of A.units) for (const id of A.courseOrder[u.id] || []) rank[id] = { k: k++, unit: u.id };
  for (const l of A.lessons) if (rank[l.id]) l.unit = rank[l.id].unit;
  A.lessons.sort((a, b) => (rank[a.id] ? rank[a.id].k : 1e9) - (rank[b.id] ? rank[b.id].k : 1e9));
  // the book pages each unit draws on (units follow teaching logic, so these are a set, not a range)
  for (const u of A.units) u.bookPages = [...new Set(A.lessons.filter((l) => l.unit === u.id).flatMap((l) => l.pages))].sort((a, b) => a - b);
})(window.ACADEMY);
