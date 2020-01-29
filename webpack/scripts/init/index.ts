/* eslint-disable import/no-extraneous-dependencies */
import clear from 'clear';
import { blue, bold, green, red } from 'chalk';
import { spawnSync } from 'child_process';
import npmDependencies from './dependencies';

const [, , packageManager = 'yarn'] = process.argv;
const commands = {
    add: packageManager === 'yarn' ? 'add' : 'install',
    devDep: packageManager === 'yarn' ? '-D' : '--save-dev',
    prodDep: packageManager === 'yarn' ? '' : '--save',
};

/* eslint-disable no-console */
function printInitialMessage() {
    clear();
    console.log(blue('Thank you for choosing the custom Webpack Config!'));
    console.log(`${green("I'll add some dependencies to your")} ${blue('package.json')} ${green(':)')}`);
    console.log();
}

function printAboutToInstallDevDepsMessage() {
    console.log(`${green('I will install some')} ${bold('dev')} ${green('dependencies now ;)')}`);
    console.log(
        green('I will make use of them while building with '),
        bold('Webpack / Webpack Dev Server'),
        green(' :)'),
    );
    console.log();
}

function printAboutToInstallProdDepsMessage() {
    console.log(`${green('I will install some')} ${green('dependencies now ;)')}`);
    console.log(green('You will make use of them while building your app(s) :)'));
    console.log();
}

function printSuccessMessage() {
    console.log(blue('Thank you for choosing the custom Webpack config!'));
    console.log(
        `${blue("I've managed to install all")} ${bold('dependencies - dev & prod -')} ${blue(
            'Which I need to function :)',
        )}`,
    );
}

function printFailureMessage() {
    console.log(blue('Thank you for choosing the custom Webpack config!'));
    console.log(red('Unfortunately there was an error while installing my dependencies :('));
    console.log(red('Please contact the developer to debug...'));
}
/* eslint-enable no-console */

export default (function installDependencies() {
    printInitialMessage();

    const managedToInstallDependencies = ([
        [
            printAboutToInstallDevDepsMessage,
            `${packageManager} ${commands.add} ${npmDependencies.dev.join(' ')} ${commands.devDep}`,
            `${red('Failed to install my')} ${bold('dev')} ${red('dependencies :(')}`,
        ],
        [
            printAboutToInstallProdDepsMessage,
            `${packageManager} ${commands.add} ${npmDependencies.prod.join(' ')} ${commands.prodDep}`,
            `${red('Failed to install my')} ${bold('prod')} ${red('dependencies :(')}`,
        ],
    ] as [Function, string, string][]).reduce((proceedToNextCommand, [printFunc, command, errorMessage]) => {
        if (!proceedToNextCommand) {
            return false;
        }

        printFunc();
        const process = spawnSync(command, {
            stdio: 'inherit',
        });

        if (process.status !== 0) {
            /* eslint-disable no-console */
            console.error(errorMessage);
            console.error(red('\nError:\t'), process.error);
            /* eslint-enable no-console */
            return false;
        }

        return true;
    }, true);

    if (managedToInstallDependencies) {
        printSuccessMessage();
    } else {
        printFailureMessage();
    }
})();
