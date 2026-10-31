/* The course plan: which lessons each unit holds, in teaching order. The plan, not the file a lesson lives in, sets
   its unit and its number; lesson ids never change (links and saved progress depend on them). */
(function (A) {
  A.courseOrder = {
    u0: ["f1", "f2", "f4", "f6", "f7", "f3", "f5", "f8"],                 // 1 foundations
    u1: ["x1", "x2", "x3", "x4", "x5", "x7", "x8", "x6"],                   // 2 Excel automation, one project per lesson: describe · first tool · three tools · purchasing · materials · fixing
    u2: ["a1", "a2", "a3", "a4", "a5", "a6"],                               // 3 two big Office examples (production dashboard · Excel + PDF + Word → PowerPoint) · Claude Code · skills
    u3: ["k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9"],       // 4 trusted tools, simply: the two CLIs · pure Python · PowerShell and COM · two weeks step by step · review · SQL · PDF → database · HTML page · skills
    u4: ["b1", "y4", "p9", "w1", "m1", "p10", "m3"],                  // 5 big data · the editor · intelligence levels · Office · Claude Code basics · PDF · cloud or local
    u5: ["d1", "d2", "y6", "y5", "m2"],                                     // 6 dashboards · Codex · companies and models
    u6: ["y1", "y2", "y3", "y7", "w3", "w4", "w5", "w6", "g1", "g2"],       // 7 tools · shared features · studying with AI
    u7: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p11", "p12"],     // 8 assistant at work · choosing tools · career
    u8: ["s1", "s2", "t1", "t2"],                                           // 9 the big picture
  };
  const rank = {};
  let k = 0;
  for (const u of A.units) for (const id of A.courseOrder[u.id] || []) rank[id] = { k: k++, unit: u.id };
  for (const l of A.lessons) if (rank[l.id]) l.unit = rank[l.id].unit;
  A.lessons.sort((a, b) => (rank[a.id] ? rank[a.id].k : 1e9) - (rank[b.id] ? rank[b.id].k : 1e9));
  // the book pages each unit draws on (units follow teaching logic, so these are a set, not a range)
  for (const u of A.units) u.bookPages = [...new Set(A.lessons.filter((l) => l.unit === u.id).flatMap((l) => l.pages))].sort((a, b) => a - b);
})(window.ACADEMY);
