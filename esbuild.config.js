import { build } from "esbuild";
import { chmodSync, readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

await build({
  entryPoints: ["index.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  outfile: "build/index.js",
  define: {
    __PACKAGE_VERSION__: JSON.stringify(pkg.version),
  },
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: ["open"],
});

chmodSync("build/index.js", "755");
console.log("Build complete: build/index.js");
