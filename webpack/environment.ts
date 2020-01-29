/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'dotenv-defaults';
import { Configuration } from 'webpack';
import { readdirSync } from 'fs';

import { appsToEntryPoints } from './utils';
import PATHS from './paths';

config({
    path: PATHS.DOT_ENV,
    encoding: 'utf8',
    defaults: PATHS.DOT_ENV_EXAMPLE,
});

function generateAppEntryPoints() {
    const { APPS, SKIP_APPS_FROM_SRC, SKIP_MAIN_APP } = process.env;
    const skipDynamicAdditionOfAppsFromSrc = SKIP_APPS_FROM_SRC.toLowerCase() === 'true';
    const skipMainApp = SKIP_MAIN_APP.toLowerCase() === 'true';

    return {
        ...(!skipMainApp && { main: PATHS.SRC_ROOT }),
        ...appsToEntryPoints(PATHS.SRC_FOLDER, ...APPS.split(', ')),
        ...(!skipDynamicAdditionOfAppsFromSrc &&
            appsToEntryPoints(PATHS.SRC_FOLDER, ...readdirSync(`${PATHS.SRC_FOLDER}/apps`))),
    };
}

export default (function generateEnvVariables() {
    const { DEPLOY_URL, NODE_ENV, PORT = 9000, USE_BUNDLE_ANALYZER } = process.env;
    let ENV: Configuration['mode'] = 'none';

    switch (NODE_ENV.toLocaleLowerCase()) {
        case 'prod':
        case 'production':
            ENV = 'production';
            break;

        case 'dev':
        case 'development':
            ENV = 'development';
            break;

        default:
            ENV = 'none';
    }

    return {
        APPS: generateAppEntryPoints(),
        NODE_ENV: ENV,
        PORT: Number(PORT),
        USE_BUNDLE_ANALYZER: USE_BUNDLE_ANALYZER.toLowerCase() === 'true',
        ...(DEPLOY_URL && { DEPLOY_URL }),
    };
})();
