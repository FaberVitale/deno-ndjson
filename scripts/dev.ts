import { path } from "../dev_deps.ts";

function processFilePaths(
  cleanUp: () => void,
) {
  cleanUp();

  Deno.run({
    "cmd": [
      "deno",
      "fmt",
    ],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
}

async function main() {
  let timerIdRef = 0;

  const cleanUp: () => void = () => {
    timerIdRef = 0;
  };

  const currentRepoPath = path.resolve("./");

  console.log(`[dev] - development started at \`${currentRepoPath}\``);

  const repoWatcher = Deno.watchFs(currentRepoPath);
  const allFormattableFilesRegex = path.globToRegExp(
    path.join(currentRepoPath, "**", "*.ts"),
    { globstar: true, flags: "gi" },
  );

  for await (const event of repoWatcher) {
    if (event.kind !== "modify") {
      continue;
    }

    const matchedFiles = event.paths.filter((path) =>
      allFormattableFilesRegex.test(path)
    );

    if (matchedFiles.length > 0) {
      if (!timerIdRef) {
        timerIdRef = setTimeout(() => {
          processFilePaths(cleanUp);
        }, 300);
      }
    }
  }
}

main().catch((err) => {
  console.error("[dev] - error");

  throw err;
});
