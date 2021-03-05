import * as process from 'process';
import { isIPv4, isIPv6 } from 'net';
import { DnsRecords } from '../classes/dns-records';
import { Zones } from '../classes/zones';

async function execute(): Promise<void> {
	const [execPath, jsFilePath, sourceIp, targetIp, domain]: string[] = process.argv;

	if (!!sourceIp && !!targetIp && !!domain) {
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
			const zoneId: string = await Zones.findZoneIdForDomain(domain);
			await DnsRecords.replaceIp(sourceIp, targetIp, zoneId);
			return Promise.resolve();
		} catch (error) {
			console.error('could not perform the requested operation');
			return Promise.reject();
		}

	} else {
		console.error('You should provide the source ip (the one that will be replaced), the target ip (the replacement) and the domain name as listed in your account');
		console.error('Usage example: npm run replace-ip-for-all-zones <source_ip> <target_ip> example.com');
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
