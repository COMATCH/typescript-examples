/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, RuleSetRule } from 'webpack';

export default function(env: Configuration['mode']): RuleSetRule {
    return {
        loader: require.resolve('file-loader'),
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(m|j|t)sx?$/, /\.html$/, /\.json$/],
        options: {
            name: 'static/media/[name].[hash:8].[ext]',
        },
    };
}
