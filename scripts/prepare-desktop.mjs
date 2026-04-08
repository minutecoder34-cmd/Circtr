import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, ".desktop-app");

async function main() {
  const rootPackage = JSON.parse(
    await readFile(path.join(rootDir, "package.json"), "utf8"),
  );

  await rm(buildDir, { recursive: true, force: true });
  await mkdir(buildDir, { recursive: true });

  await cp(path.join(rootDir, "dist"), path.join(buildDir, "dist"), {
    recursive: true,
  });
  await cp(path.join(rootDir, "electron"), path.join(buildDir, "electron"), {
    recursive: true,
  });
  await cp(path.join(rootDir, "node_modules", "clsx"), path.join(buildDir, "node_modules", "clsx"), {
    recursive: true,
    dereference: true,
  });

  const desktopPackage = {
    name: rootPackage.name,
    version: rootPackage.version,
    description: rootPackage.description,
    author: rootPackage.author,
    main: rootPackage.main,
    type: rootPackage.type,
    dependencies: {
      clsx: rootPackage.dependencies.clsx,
    },
  };

  await writeFile(
    path.join(buildDir, "package.json"),
    `${JSON.stringify(desktopPackage, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
