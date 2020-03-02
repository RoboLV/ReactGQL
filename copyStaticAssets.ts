// @ts-ignore
import shell from "shelljs";

shell.mkdir('dist/public');
shell.cp("src/public/index.html", "dist/public/index.html");
