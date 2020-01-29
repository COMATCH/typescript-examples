import { existsSync, readdirSync } from 'fs';

function appsToEntryPoints(srcFolder: string, ...appNames: string[]) {
    const appsInSrc = readdirSync(`${srcFolder}/apps`);

    return appNames.reduce((acc, appName) => {
        const potentialAppLocation = `${srcFolder}/apps/${appName}`;

        if (!appsInSrc.includes(appName)) {
            return acc;
        }

        const hasJSIndex = existsSync(`${potentialAppLocation}/index.js`);
        const hasJSXIndex = existsSync(`${potentialAppLocation}/index.jsx`);
        const hasTSIndex = existsSync(`${potentialAppLocation}/index.ts`);
        const hasTSXIndex = existsSync(`${potentialAppLocation}/index.tsx`);

        if (!hasJSIndex && !hasJSXIndex && !hasTSIndex && !hasTSXIndex) {
            return acc;
        }

        let appSrc = '';
        if (hasJSIndex) {
            appSrc = `${potentialAppLocation}/index.js`;
        } else if (hasJSXIndex) {
            appSrc = `${potentialAppLocation}/index.jsx`;
        } else if (hasTSIndex) {
            appSrc = `${potentialAppLocation}/index.ts`;
        } else if (hasTSXIndex) {
            appSrc = `${potentialAppLocation}/index.tsx`;
        }

        return {
            ...acc,
            [appName]: appSrc,
        };
    }, {});
}

export { appsToEntryPoints };
