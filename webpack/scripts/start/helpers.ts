/* eslint-disable import/no-extraneous-dependencies */
import { blue, bold, green, italic } from 'chalk';
import clear from 'clear';
import { execSync } from 'child_process';
import WebpackDevServer from 'webpack-dev-server';

import { getLocalIPs } from '../../utils';

function openBrowser(port: number) {
    // Attempts to open the same tab in Google Chrome:
    execSync('ps cax | grep "Google Chrome"');
    execSync(`osascript openChrome.applescript "${encodeURI(`http://localhost:${port}`)}"`, {
        cwd: __dirname,
        stdio: 'ignore',
    });
}

function listenToCloseServerEvents(webpackDevServer: WebpackDevServer) {
    function onCloseWebpackDevServer() {
        webpackDevServer.close();
        process.exit();
    }

    process.on('SIGINT', onCloseWebpackDevServer);
    process.on('SIGTERM', onCloseWebpackDevServer);
}

function printStartingMessage() {
    clear();
    /* eslint-disable no-console */
    console.log('\n', blue('Starting Webpack Dev Server...', '\n'));
    /* eslint-enable no-console */
}

function buildTool<T>(builder: () => T, tool: string, toolToString?: (tool: T) => string): T {
    /* eslint-disable no-console */
    console.log(green('Building '), blue(tool), green('...'));
    let response: T;

    try {
        response = builder();

        if (toolToString) {
            console.log('\n', green('Tool:'), ' ', blue(toolToString(response)), '\n');
        }

        console.log(green('Finished building :)!'), '\n');
    } catch (error) {
        console.error(`Error while building ${tool}!`, error);
        throw error;
    }
    /* eslint-enable no-console */

    return response;
}

function printHostingInfo(port: number) {
    const { localIP = '' } = getLocalIPs();
    const localhost = `http://${blue('localhost')}:${italic(port)}`;
    const network = `http://${green(localIP)}:${italic(port)}`;

    clear();
    /* eslint-disable no-console */
    console.log('\n', green('------------------------------------------------------------'));
    console.log('\n', blue(`Your app is running in the ${bold('browser')}.`), '\n');
    console.log('\t', bold('Local:'), '\t\t', localhost);
    console.log('\t', bold('On Your Network:'), '\t', network);
    console.log('\n', green('------------------------------------------------------------'));
    /* eslint-enable no-console */
}

export { buildTool, listenToCloseServerEvents, openBrowser, printHostingInfo, printStartingMessage };
