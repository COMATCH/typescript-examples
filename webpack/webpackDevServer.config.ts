/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack-dev-server';
import ENV_VARS from './environment';
import PATHS from './paths';

export default function(): Configuration {
    return {
        contentBase: PATHS.PUBLIC_FOLDER,
        compress: true,
        host: '0.0.0.0',
        hot: true,
        noInfo: true,
        port: ENV_VARS.PORT,
    };
}
