/* eslint-disable import/no-extraneous-dependencies */
import clear from 'clear';
import webpack, { Configuration } from 'webpack';
import generateWebpackConfig from '../../webpack.config';
import { buildTool, printStartingMessage } from './helpers';

clear();
const appConfigurations = buildTool(() => generateWebpackConfig('production') as Configuration[], 'App configurations');
const webpackCompiler = buildTool(() => webpack(appConfigurations), 'Webpack Compiler');

printStartingMessage();
webpackCompiler.run((error, stats) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    console.log(
        stats.toString({
            colors: true,
            entrypoints: false,
            modules: false,
        }),
    );
});
