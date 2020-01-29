/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import path from 'path';

import ENV_VARS from './environment';
import generateModuleRules from './module/rules';
import generateOptimization from './optimization';
import generatePlugins from './plugins';
import PATHS from './paths';

function generateAppConfig({ entry, mode, output }: Pick<Configuration, 'entry' | 'mode' | 'output'>): Configuration {
    return {
        mode,
        entry,
        output,

        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [PATHS.SRC_FOLDER, 'node_modules'],
        },

        module: {
            strictExportPresence: true,
            rules: generateModuleRules(mode),
        },
        optimization: generateOptimization(mode),
        plugins: generatePlugins(mode),
    };
}

export default function(mode: Configuration['mode']) {
    const { APPS, DEPLOY_URL } = ENV_VARS;
    const { BUILD_FOLDER, ROOT } = PATHS;
    const IS_PRODUCTION = mode === 'production';

    if (IS_PRODUCTION) {
        const buildFolder = !DEPLOY_URL ? BUILD_FOLDER : path.resolve(__dirname, `${ROOT}${DEPLOY_URL}`);

        return Object.keys(APPS).map((appName) =>
            generateAppConfig({
                mode,
                entry: { [appName]: APPS[appName] },
                output: {
                    path: `${buildFolder}/clients/${appName}`,
                    filename: '[name].app.js',
                    chunkFilename: '[name].bundle.js',
                    ...(DEPLOY_URL && { publicPath: `${DEPLOY_URL}/clients/${appName}/` }),
                },
            }),
        );
    }

    return generateAppConfig({
        mode,
        entry: { ...APPS },
        output: {
            path: BUILD_FOLDER,
            filename: '[name].app.js',
            chunkFilename: '[name].bundle.js',
        },
    });
}
