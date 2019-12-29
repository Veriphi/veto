import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

function execShellCommand(cmd: string, cwd?: string) {
  const exec = require("child_process").exec;
  return new Promise(resolve => {
    exec(cmd, { cwd }, (error: string, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/start") {
      const downloadRepo = await execShellCommand(
        "git clone https://github.com/SatoshiPortal/cyphernode.git"
      );
      const buildCypher = await execShellCommand('./build.sh', "cyphernode");

      console.log(downloadRepo);
      console.log(buildCypher);
      app.render(req, res, "/start", query);
    } else if (pathname === "/b") {
      console.log("hello I am callinb b");
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
