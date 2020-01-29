/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Used the optimization plugins/setup from CRA.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, compilation, Options } from 'webpack';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import safePostCssParser from 'postcss-safe-parser';
import TerserPlugin from 'terser-webpack-plugin';

const terserPlugin = new TerserPlugin({
    terserOptions: {
        parse: {
            ecma: 8,
        },
        compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
        },
        mangle: {
            safari10: true,
        },
        keep_classnames: true,
        keep_fnames: true,
        output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
        },
    },
    sourceMap: true,
});

const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
        parser: safePostCssParser,
        map: {
            inline: false,
            annotation: true,
        },
    },
    cssProcessorPluginOptions: {
        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
    },
});

export default function(env: Configuration['mode']): Configuration['optimization'] {
    return {
        chunkIds: 'named',
        minimize: env === 'production',
        // Applies only on "production" :)
        minimizer: [terserPlugin, optimizeCSSAssetsPlugin],
        runtimeChunk: {
            name: (entryPoint) => `runtime-${entryPoint.name}`,
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This example is too small to create commons chunks
                },
                // Shared vendors:
                vendor: {
                    chunks: 'initial',
                    enforce: true,
                    priority: 10,
                    test: /node_modules/,
                },
                // Vendor bundle per package
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module, chunks, cacheGroupKey) {
                //         // get the name. E.g. node_modules/packageName/not/this/part.js
                //         // or node_modules/packageName
                //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                //         // npm package names are URL-safe, but some servers don't like @ symbols
                //         return `vendor.${packageName.replace('@', '')}`;
                //     },
                // },
            },
        },
    };
}
