import { path } from "../dev_deps.ts";

function fmt(): Deno.Process {
  return Deno.run({
    "cmd": [
      "vr",
      "run",
      "fmt",
    ],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
}

function lint(): Deno.Process {
  return Deno.run({
    "cmd": [
      "vr",
      "run",
      "lint",
    ],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
}

function processFilePaths(
  cleanUp: () => void,
) {
  lint().status().then(({ success }) => {
    if (success) {
      return fmt().status();
    }
  }).finally(cleanUp);
}

// Very simple format on save powered by `deno fmt`.
async function main() {
  let timerIdRef = 0;
  const cleanUp: () => void = function cleanUp() {
    timerIdRef = 0;
  };

  const currentRepoPath = path.resolve("./");

  console.log(`[dev] - development started at \`${currentRepoPath}\``);

  const repoWatcher = Deno.watchFs(currentRepoPath);
  const allFormattableFilesRegex = path.globToRegExp(
    path.join(currentRepoPath, "**", "*.ts"),
    { globstar: true },
  );

  for await (const event of repoWatcher) {
    if (event.kind !== "modify") {
      continue;
    }

    const matchedFiles = event.paths.filter((path) =>
      allFormattableFilesRegex.test(path)
    );

    if (matchedFiles.length > 0 && !timerIdRef) {
      timerIdRef = setTimeout(processFilePaths, 300, cleanUp);
    }
  }
}

main().catch((err) => {
  console.error("[dev] - error");

  throw err;
});
