import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types";
import path from "path";

import { register as tsNodeRegister } from "ts-node";
import { register as tsConfigPathsRegister } from "tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();

tsNodeRegister({
    project: "tsconfig.json"
});
tsConfigPathsRegister();

interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        public: path.resolve(__dirname, "public"),
        src: path.resolve(__dirname, "src")
    };
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? (process.env.PORT ? Number(process.env.PORT) : 3000),
        mode: env.mode ?? (process.env.MODE as BuildMode) ?? "development",
        paths,
        analyzer: env.analyzer ?? process.env.ANALYZER === "true",
        platform: env.platform ?? (process.env.PLATFORM as BuildPlatform) ?? "desktop"
    });
    return config;
};
