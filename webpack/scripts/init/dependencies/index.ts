import babelDeps from './dev/babel';
import eslintDeps from './dev/eslint';
import loadersDeps from './dev/loaders';
import prettierDeps from './dev/prettier';
import reactTypesDeps from './dev/reactTypes';
import typescriptDeps from './dev/typescript';
import utilsDeps from './dev/utils';
import webpackDeps from './dev/webpack';

import prodBabelDeps from './prod/babel';
import prodReactDeps from './prod/react';

export default {
    dev: [
        ...babelDeps,
        ...eslintDeps,
        ...loadersDeps,
        ...prettierDeps,
        ...reactTypesDeps,
        ...typescriptDeps,
        ...utilsDeps,
        ...webpackDeps,
    ],
    prod: [...prodBabelDeps, ...prodReactDeps],
};
