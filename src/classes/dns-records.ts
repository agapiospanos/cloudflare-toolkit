import axios, { AxiosResponse } from 'axios';
import { config, httpHeadersConfig } from '../config';
import { Dns, DnsRecordTypes } from '../models/dns.model';

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

	public static async deleteRecord(zoneId: string, type: DnsRecordTypes, recordName: string): Promise<void> {
		try {
			const response: AxiosResponse = await axios.get(`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records`, { headers: httpHeadersConfig });
			const dnsRecords: Dns[] = response.data.result;
			for (const record of dnsRecords) {
				if (record.type === type && record.name === recordName) {
					await this.deleteDnsRecord(zoneId, record);
				}
			}
			return Promise.resolve();
		} catch (error) {
			console.error('An error occurred while trying to delete record', error);
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

	private static async deleteDnsRecord(zoneId: string, record: Dns): Promise<void> {
		try {
			console.log('--- deleting', record.name, '---');
			const response: AxiosResponse = await axios.delete(
				`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records/${record.id}`,
				{ headers: httpHeadersConfig });
			if (response.data.success && response.data.errors.length === 0) {
				console.log('------------- success ------------');
				return Promise.resolve();
			} else {
				console.error('-------------- error ------------- Could not delete record', record.name, response.data.errors);
				return Promise.reject(response.data.errors);
			}
		} catch (error) {
			console.error('Could not delete record', record.name, error);
			return Promise.reject(error);
		}
	}

	/**
	 * Changes proxy status to Proxied or Dns Only for Dns records
	 * @param zoneId The zone id for this domain
	 * @param enableProxy If true the record will be Proxied, If false the record will be Dns Only.
	 * @param onlyForSite (default: false) If true this will change the proxied status only for the records domain.com and www.domain.com
	 */
	public static async changeProxyStatus(zoneId: string, enableProxy: boolean, onlyForSite = false) {
		try {
			const response: AxiosResponse = await axios.get(`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records`, { headers: httpHeadersConfig });
			const dnsRecords: Dns[] = response.data.result;
			for (const record of dnsRecords) {
				await this.changeProxyStatusForDnsRecord(zoneId, record, enableProxy, onlyForSite);
			}
			return Promise.resolve();
		} catch (error) {
			console.error('An error occurred while trying to replace ip', error);
			return Promise.reject(error);
		}
	}

	private static async changeProxyStatusForDnsRecord(zoneId: string, record: Dns, enableProxy: boolean, onlyForSite = false): Promise<void> {
		try {
			if (record.proxiable) {
				if (onlyForSite && !(record.name === record.zone_name || record.name.includes('www'))) {
					console.log('------ skipping', record.name, 'because onlyForSite flag is set to true ------');
					return Promise.resolve();
				}
				console.log('--- processing', `(${record.type})`, record.name);
				record.proxied = enableProxy;
				const response: AxiosResponse = await axios.patch(
					`${config.cloudflareApiBaseUrl}/zones/${zoneId}/dns_records/${record.id}`,
					record,
					{ headers: httpHeadersConfig },
				);
				if (response.data.success && response.data.errors.length === 0) {
					console.log('------------- success ------------');
					return Promise.resolve();
				} else {
					console.error('-------------- error ------------- Proxy status for', record.name, 'could not be updated');
					return Promise.reject(response.data.errors);
				}
			}
			// If record is not proxiable then we just resolve the promise.
			console.log('---------', `(${record.type})`, record.name, 'is not a proxiable record. Will be skipped ---------');
			return Promise.resolve();
		} catch (error) {
			console.error('Proxy status for', record.name, 'could not be updated');
			return Promise.reject(error);
		}
	}
}
