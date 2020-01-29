const core = ['@types/webpack', '@types/webpack-dev-server', 'webpack', 'webpack-cli', 'webpack-dev-server'];
const plugins = [
    '@types/clean-webpack-plugin',
    '@types/html-webpack-plugin',
    '@types/optimize-css-assets-webpack-plugin',
    '@types/terser-webpack-plugin',
    '@types/webpack-bundle-analyzer',
    '@types/webpack-manifest-plugin',
    'clean-webpack-plugin',
    'dotenv-webpack',
    'html-webpack-plugin',
    'optimize-css-assets-webpack-plugin',
    'postcss-safe-parser',
    'terser-webpack-plugin',
    'webpack-bundle-analyzer',
    'webpack-manifest-plugin',
];

export default [...core, ...plugins];
