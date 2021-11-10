import { DnsRecordTypes } from '../models/dns.model';
import * as process from 'process';
import { isIPv4, isIPv6 } from 'net';
import { DnsRecords } from '../classes/dns-records';
import { Zones } from '../classes/zones';

async function execute(): Promise<void> {
	const [execPath, jsFilePath, type, recordName, domain]: string[] = process.argv;

	if (!!type && !!recordName && !!domain && Object.values(DnsRecordTypes).includes(type)) {
		let adjustedRecordName = recordName;
		// We have to add the domain to the record name since cloudflare api returns the absolute records that include the domain name in the end
		if (!recordName.endsWith(domain)) {
			adjustedRecordName = `${recordName}.${domain}`;
		}
		try {
			console.log('----------- please wait -----------');
			const zoneId: string = await Zones.findZoneIdForDomain(domain);
			await DnsRecords.deleteRecord(zoneId, type, adjustedRecordName);
			return Promise.resolve();
		} catch (error) {
			console.error('could not perform the requested operation');
			return Promise.reject();
		}

	} else {
		console.error('You should provide the source ip (the one that will be replaced), the target ip (the replacement) and the domain name as listed in your account');
		console.error('Usage example: npm run delete-record-for-domain <type> <record_name> example.com');
		console.error('<type> can be one of the following:', DnsRecordTypes);
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
