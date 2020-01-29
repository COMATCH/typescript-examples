/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, RuleSetRule } from 'webpack';

export default function(env: Configuration['mode']): RuleSetRule {
    return {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
            limit: '10000',
            // name: 'static/media/[name].[hash:8].[ext]',
        },
    };
}
