import html from "bun-plugin-html";

await Bun.build({
  entrypoints: ["./src/template.html"],
  outdir: "./dist",
  minify: true,
  target: "browser",
  splitting: false,
  sourcemap: "none",
  plugins: [html()],
});
