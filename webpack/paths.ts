import path from 'path';

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = `${ROOT_PATH}/clients`;

export default {
    BUILD_FOLDER: `${ROOT_PATH}/dist`,
    DOT_ENV: `${ROOT_PATH}/.env`,
    DOT_ENV_EXAMPLE: `${ROOT_PATH}/.env.example`,
    PUBLIC_FOLDER: `${ROOT_PATH}/public`,
    ROOT: ROOT_PATH,
    SRC_FOLDER: SRC_PATH,
    SRC_ROOT: `${SRC_PATH}/index.tsx`,
};
