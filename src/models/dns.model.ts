export interface Dns {
	id: string;
	zone_id: string;
	zone_name: string;
	name: string;
	type: DnsRecordTypes;
	content: string;
	proxiable: boolean;
	proxied: boolean;
	ttl: number;
	locked: boolean;
	meta: DnsRecordMeta;
	created_on: string; // example "2021-03-04T12:39:40.637219Z"
	modified_on: string; // example "2021-03-04T12:39:40.637219Z"
}

interface DnsRecordMeta {
	auto_added: boolean;
	managed_by_apps: boolean;
	managed_by_argo_tunnel: boolean;
	source: string;
}

export const DnsRecordTypes = {
	A: 'A',
	AAAA: 'AAAA',
	CNAME: 'CNAME',
	HTTPS: 'HTTPS',
	TXT: 'TXT',
	SRV: 'SRV',
	LOC: 'LOC',
	MX: 'MX',
	NS: 'NS',
	SPF: 'SPF',
	CERT: 'CERT',
	DNSKEY: 'DNSKEY',
	DS: 'DS',
	NAPTR: 'NAPTR',
	SMIMEA: 'SMIMEA',
	SSHFP: 'SSHFP',
	SVCB: 'SVCB',
	TLSA: 'TLSA',
	URI: 'URI',
};

export type DnsRecordTypes = typeof DnsRecordTypes[keyof typeof DnsRecordTypes];
