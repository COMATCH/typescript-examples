/* eslint-disable import/no-extraneous-dependencies */
import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import generateDevServerConfig from '../../webpackDevServer.config';
import generateWebpackConfig from '../../webpack.config';
import { buildTool, listenToCloseServerEvents, openBrowser, printHostingInfo, printStartingMessage } from './helpers';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (error) => {
    throw error;
});

printStartingMessage();

const appConfiguration = buildTool(() => generateWebpackConfig('development') as Configuration, 'App configuration');
const webpackCompiler = buildTool(() => webpack(appConfiguration), 'Webpack Compiler (with options)');
const { host, port, ...restOfDevServerConfig } = buildTool(
    generateDevServerConfig,
    'Webpack Dev Server (Configuration)',
    (config) => JSON.stringify(config, null, 4),
);
const webpackDevServer = buildTool(
    () => new WebpackDevServer(webpackCompiler, restOfDevServerConfig),
    'Webpack Dev Server (Instance)',
);

webpackDevServer.listen(port, host, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return;
    }

    printHostingInfo(port);
    openBrowser(port);
});

listenToCloseServerEvents(webpackDevServer);
