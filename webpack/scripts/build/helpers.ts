/* eslint-disable import/no-extraneous-dependencies */
import { blue, bold, green, italic } from 'chalk';

function printStartingMessage() {
    /* eslint-disable no-console */
    console.log('\n', blue('Starting Webpack Compiler...', '\n'));
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

export { buildTool, printStartingMessage };
