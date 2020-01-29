/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, RuleSetRule } from 'webpack';

export default function(env: Configuration['mode']): RuleSetRule {
    return {
        test: /\.html$/,
        loader: require.resolve('html-loader'),
    };
}
