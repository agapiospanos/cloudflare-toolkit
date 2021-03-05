import * as process from 'process';
import { isIPv4, isIPv6 } from 'net';
import { DnsRecords } from '../classes/dns-records';

async function execute(): Promise<void> {
	const [execPath, jsFilePath, sourceIp, targetIp, zoneId]: string[] = process.argv;

	if (!!sourceIp && !!targetIp && !!zoneId) {
		if (!isIPv4(sourceIp) && !isIPv6(sourceIp)) {
			console.error('invalid source ip', sourceIp);
			return;
		}

		if (!isIPv4(targetIp) && !isIPv6(targetIp)) {
			console.error('invalid target ip', targetIp);
			return;
		}

		try {
			console.log('----------- please wait -----------');
			await DnsRecords.replaceIp(sourceIp, targetIp, zoneId);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject();
		}

	} else {
		console.error('You should provide the source ip (the one that will be replaced), the target ip (the replacement) and the zone id');
		console.error('Usage example: npm run replace-ip-for-all-zones <source_ip> <target_ip> <zone_id>');
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
