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

enum DnsRecordTypes {
	A,
	AAAA,
	CNAME,
	HTTPS,
	TXT,
	SRV,
	LOC,
	MX,
	NS,
	SPF,
	CERT,
	DNSKEY,
	DS,
	NAPTR,
	SMIMEA,
	SSHFP,
	SVCB,
	TLSA,
	URI
}
