import * as esbuild from "esbuild";
import { config } from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";

const DIR = import.meta.dirname;

const watch = process.argv.indexOf("--watch") >= 0;

const env = process.env.NODE_ENV ?? "dev";
const { parsed } = config({ path: `${DIR}/env/${env}.env` });

const define: Record<string, string> = {};
for (const [key, value] of Object.entries(parsed ?? {})) {
    define[`process.env.${key}`] = JSON.stringify(value);
}

const opts = {
    entryPoints: {
        main: "src/apps/main/index.ts"
    },
    bundle: true,
    format: "esm",
    sourcemap: true,
    minify: env === "prod",
    
    publicPath: "/assets",

    // Uncomment this for Rails apps
    // adding ".digested" to the asset filename is a marker for Rails/Sprockets
    // to prevent it from requiring an additional fingerprint.
    // assetNames: "[name]-[hash].digested",

    // If this is a Rails it's probably best to remove this and use the Rails
    // asset pipeline.
    plugins: [
        sassPlugin({ loadPaths: ["sass", "node_modules"] }
    )],

    define,
    loader: {
        ".png": "file",
        ".jpg": "file",
        ".svg": "file",
        ".wasm": "file",
        ".css": "css"
    }
};

if (env === "dev") {
    esbuild.context({ ...opts, outdir: "www/assets" }).then(async (ctx) => {
        if (watch) {
            await ctx.watch();
        } else {
            await ctx.rebuild();
            await ctx.dispose();
        }
    });
} else {
    esbuild.build({ ...opts, outdir: "www/assets" }).then(() => {

    });
}