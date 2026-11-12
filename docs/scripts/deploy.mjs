// Публікує зібраний сайт (dist/library-api) у гілку gh-pages без GitHub Actions.
// Запуск: npm run deploy  (спочатку виконується npm run build)
import { execSync } from "node:child_process";
import { copyFileSync, rmSync, writeFileSync } from "node:fs";

const out = "dist/library-api";
const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
const run = (cmd) => execSync(cmd, { cwd: out, stdio: "inherit" });

copyFileSync("dist/404.html", `${out}/404.html`);
writeFileSync(`${out}/.nojekyll`, "");
rmSync(`${out}/server`, { recursive: true, force: true });
rmSync(`${out}/.git`, { recursive: true, force: true });

run("git init -q -b gh-pages");
run("git add -A");
run('git commit -q -m "Deploy docs"');
run(`git push -f ${remote} gh-pages`);
rmSync(`${out}/.git`, { recursive: true, force: true });

console.log("Deployed: https://soft41.github.io/library-api/");
