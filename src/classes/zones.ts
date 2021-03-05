import axios, { AxiosResponse } from 'axios';
import { config, httpHeadersConfig } from '../config';
import { Zone } from '../models/zones.model';
import { writeFileAsync } from '../utils';
import { DnsRecords } from './dns-records';

export class Zones {

	public static async listZones(): Promise<void> {
		try {
			const zones: Zone[] = await this.getAllZones();
			const output: string = zones.map(zone => `${zone.id} ${zone.name}`).join('\r\n');

			console.log('Here are the zones for your account: (they are also saved in output/list-zones.log)');
			console.table(zones, ['id', 'name']);

			try {
				await writeFileAsync('output/list-zones.log', output);
			} catch (error) {
				console.error('An error occurred while writing log', error);
			}

		} catch (error) {
			console.error('An error occurred while trying to list zones', error);
		}
	}

	public static async replaceIpInDnsOfAllZones(souceIp: string, targetIp: string): Promise<void> {
		try {
			const zones: Zone[] = await this.getAllZones();
			return this.replaceIpInDnsOfZones(souceIp, targetIp, zones);
		} catch (error) {
			console.error('An error occurred while trying to list zones', error);
		}
		return Promise.resolve();
	}

	public static async replaceIpInDnsOfZones(sourceIp: string, targetIp: string, zones: Zone[]): Promise<void> {
		for (const zone of zones) {
			try {
				await DnsRecords.replaceIp(sourceIp, targetIp, zone.id);
			} catch (error) {
				console.error('An error occurred while replacing the ip in zone with name', zone.name, error);
			}
		}
		return Promise.resolve();
	}

	public static async deleteMovedZones(): Promise<void> {
		const zones: Zone[] = await this.getAllZones();

		zones.filter(z => z.status !== 'moved').map(z => console.log('----- NOT DELETING (it is still active) -----', z.name));

		const movedZones: Zone[] = zones.filter((zone: Zone) => zone.status === 'moved');
		for (const zone of movedZones) {
			try {
				await this.deleteZone(zone);
			} catch (error) {
				console.error('An error occurred while trying to delete all moved zones');
			}
		}
		return Promise.resolve();
	}

	public static async findZoneIdForDomain(domain: string): Promise<string> {
		try {
			const zones: Zone[] = await this.getAllZones();
			const targetZone: Zone = zones.filter((zone: Zone) => zone.name.toLowerCase() === domain.toLowerCase())?.[0];
			if (!!targetZone) {
				return Promise.resolve(targetZone.id);
			} else {
				console.error('could not find the requested domain in the zones listed in your account');
				return Promise.reject('domain not found');
			}
		} catch (error) {
			console.error('An error occurred while trying to find the zone id for the provided domain name');
			return Promise.reject(error);
		}
	}

	private static async getAllZones(): Promise<Zone[]> {
		try {
			const response: AxiosResponse = await axios.get(`${config.cloudflareApiBaseUrl}/zones`, { params: { per_page: 1000 }, headers: httpHeadersConfig });
			const zones: Zone[] = response.data.result;
			return Promise.resolve(zones);
		} catch (error) {
			console.error('An error occurred while trying to list zones', error);
			return Promise.reject(error);
		}
	}

	private static async deleteZone(zone: Zone): Promise<void> {
		try {
			console.log('--- processing', zone.name, '---');
			const response: AxiosResponse = await axios.delete(`${config.cloudflareApiBaseUrl}/zones/${zone.id}`, { headers: httpHeadersConfig });
			if (response.data.success && response.data.errors.length === 0) {
				console.log('------------- success ------------');
				return Promise.resolve();
			} else {
				console.error('-------------- error ------------- moved zone', zone.name, 'could not be deleted', response.data.errors);
				return Promise.reject(response.data.errors);
			}
		} catch (error) {
			console.error('An error occurred while trying to delete zone', zone.name, error);
			return Promise.reject();
		}
	}
}
