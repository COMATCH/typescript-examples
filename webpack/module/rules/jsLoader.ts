/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, RuleSetRule } from 'webpack';

export default function(env: Configuration['mode']): RuleSetRule {
    return {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
    };
}
