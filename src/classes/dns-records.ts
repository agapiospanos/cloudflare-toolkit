import axios, { AxiosResponse } from 'axios';
import { config, httpHeadersConfig } from '../config';
import { Dns } from '../models/dns.model';

export class DnsRecords {
	public static async replaceIp(sourceIp: string, targetIp: string, zoneId: string): Promise<void> {
		try {
			const response: AxiosResponse = await axios.get(`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records`, { headers: httpHeadersConfig });
			const dnsRecords: Dns[] = response.data.result;
			for (const record of dnsRecords) {
				await this.replaceIpForDnsRecord(zoneId, record, sourceIp, targetIp);
			}
			return Promise.resolve();
		} catch (error) {
			console.error('An error occurred while trying to replace ip', error);
			return Promise.reject(error);
		}
	}

	private static async replaceIpForDnsRecord(zoneId: string, record: Dns, sourceIp: string, targetIp: string): Promise<void> {
		try {
			record.content = record.content.replace(sourceIp, targetIp);
			console.log('--- processing', record.name, '---');
			const response: AxiosResponse = await axios.patch(
				`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records/${record.id}`,
				record,
				{ headers: httpHeadersConfig });
			if (response.data.success && response.data.errors.length === 0) {
				console.log('------------- success ------------');
				return Promise.resolve();
			} else {
				console.error('-------------- error ------------- Ip', sourceIp, 'could not be replaced with', targetIp, 'for', record.name, response.data.errors);
				return Promise.reject(response.data.errors);
			}
		} catch (error) {
			console.error('Ip', sourceIp, 'could not be replaced with', targetIp, 'for', record.name, error);
			return Promise.reject(error);
		}
	}
}
