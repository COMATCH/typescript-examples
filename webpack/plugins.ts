/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, IgnorePlugin, Plugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackManifestPlugin from 'webpack-manifest-plugin';

import ENV_VARIABLES from './environment';
import PATHS from './paths';

const HTML_PLUGIN_EXCLUDED_CHUNKS = {
    excludeChunks: Object.keys(ENV_VARIABLES.APPS).filter((chunkName) => chunkName !== 'main'),
};

const HTML_PLUGIN_OPTIMIZATIONS = {
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    },
};

function generatePlugins(env: Configuration['mode']): Plugin[] {
    const IS_DEVELOPMENT = env === 'development';
    const IS_PRODUCTION = env === 'production';

    return [
        new CleanWebpackPlugin(),
        new DotEnv({
            path: PATHS.DOT_ENV, // load this now instead of the ones in '.env'
            safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            silent: false, // hide any errors
            defaults: false, // load '.env.defaults' as the default values if empty.
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.PUBLIC_FOLDER}/index.html`,
            filename: './index.html',
            ...(IS_DEVELOPMENT && HTML_PLUGIN_EXCLUDED_CHUNKS),
            ...(IS_PRODUCTION && HTML_PLUGIN_OPTIMIZATIONS),
        }),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new WebpackManifestPlugin(),
        ...(ENV_VARIABLES.USE_BUNDLE_ANALYZER ? [new BundleAnalyzerPlugin()] : []),
    ];
}

export default generatePlugins;
