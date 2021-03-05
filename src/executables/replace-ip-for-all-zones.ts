import * as process from 'process';
import { Zones } from '../classes/zones';
import { isIPv4, isIPv6 } from 'net';

async function execute(): Promise<void> {
	const [execPath, jsFilePath, sourceIp, targetIp]: string[] = process.argv;

	if (!!sourceIp && !!targetIp) {
		if (!isIPv4(sourceIp) && !isIPv6(sourceIp)) {
			console.error('invalid source ip', sourceIp);
			return Promise.reject();
		}

		if (!isIPv4(targetIp) && !isIPv6(targetIp)) {
			console.error('invalid target ip', targetIp);
			return Promise.reject();
		}

		try {
			console.log('----------- please wait -----------');
			await Zones.replaceIpInDnsOfAllZones(sourceIp, targetIp);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject();
		}

	} else {
		console.error('You should provide the source ip (the one that will be replaced) and the target ip (the replacement)');
		console.error('Usage example: npm run replace-ip-for-all-zones <source_ip> <target_ip>');
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
