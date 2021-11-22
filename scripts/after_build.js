const fs = require("fs");

const fname = "build/index.html";
const buf = fs.readFileSync(fname, "utf8");
fs.writeFileSync(fname, buf.replace("<body>", "<body><!--nobanner-->"));
