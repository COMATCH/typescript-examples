import { networkInterfaces as getNetworkInterfaces } from 'os';

function getLocalIPs() {
    const networkInterfaces = getNetworkInterfaces();
    return Object.keys(networkInterfaces).reduce((acc: { [key: string]: string; localIP?: string }, interfaceName) => {
        let alias = 0;
        networkInterfaces[interfaceName].forEach(({ family, internal, address }) => {
            if (family !== 'IPv4' || internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                acc[`${interfaceName}:${alias}`] = address;
            } else {
                // this interface has only one ipv4 adress
                acc.localIP = address;
            }

            alias += 1;
        });

        return acc;
    }, {});
}

export { getLocalIPs };
