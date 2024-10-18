import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";
    // const isProd = options.mode === "production";

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
            }
        }
    };

    const postCssLoader = {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: ["autoprefixer", "tailwindcss"]
            }
        }
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            //добавлен postCssLoader для работы tailwind
            postCssLoader,
            // Compiles Sass to CSS
            "sass-loader"
        ]
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", postCssLoader]
    };

    const tsLoader = {
        //ts-loader умеет работать с jsx, если работаем без ts то устанавливаем babel
        test: /\.tsx?$/,
        use: {
            loader: "ts-loader",
            //убираем проверку типов и тем самым ускоряем сборку
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                })
            }
        },
        exclude: /node_modules/
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
    };

    const svgLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true,
                    //позволяет принимать иконке текущий цвет
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ]
    };

    return [
        //важен порядок
        svgLoader,
        assetLoader,
        scssLoader,
        cssLoader,
        tsLoader
    ];
}
