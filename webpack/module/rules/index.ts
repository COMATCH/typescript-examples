/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, RuleSetRule } from 'webpack';
import getFileURLLoader from './fileLoader';
import getHTMLLoader from './htmlLoader';
import getJSLoader from './jsLoader';
import getURLLoader from './urlLoader';

function factory(env: Configuration['mode']): RuleSetRule[] {
    return [
        { parser: { requireEnsure: false } },
        {
            oneOf: [getHTMLLoader(env), getJSLoader(env), getURLLoader(env), getFileURLLoader(env)],
        },
    ];
}

export default factory;
