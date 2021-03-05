import { Plan } from './plans.model';

export interface Zone {
	id: string;
	name: string; // the domain name
	status: 'active' | 'pending' | 'initializing' | 'moved' | 'deleted' | 'deactivated';
	paused: boolean;
	type: 'full' | 'partial';
	development_mode: number; // The interval (in seconds) from when development mode expires. 0 is off
	name_servers: string[];
	original_name_servers: string[];
	original_registrar: string | null;
	original_dnshost: string | null;
	modified_on: string; // example "2021-03-04T13:05:16.618741Z"
	created_on: string; // example "2021-03-04T12:54:01.959327Z"
	activated_on: string; // example "2021-03-04T13:05:16.618741Z"
	meta: ZoneMeta;
	owner: ZoneOwner;
	account: ZoneAccount;
	permissions: ZonePermissions[];
	plan: Plan;
}

interface ZoneMeta {
	step: number;
	wildcard_proxiable: boolean;
	custom_certificate_quota: number;
	page_rule_quota: number;
	phishing_detected: boolean;
	multiple_railguns_allowed: boolean;
}

interface ZoneOwner {
	id: string;
	type: string;
	email: string;
}

interface ZoneAccount {
	id: string;
	name: string;
}

enum ZonePermissions {
	'#access:edit',
	'#access:read',
	'#analytics:read',
	'#app:edit',
	'#auditlogs:read',
	'#billing:edit',
	'#billing:read',
	'#cache_purge:edit',
	'#dns_records:edit',
	'#dns_records:read',
	'#lb:edit',
	'#lb:read',
	'#legal:edit',
	'#legal:read',
	'#logs:edit',
	'#logs:read',
	'#member:edit',
	'#member:read',
	'#organization:edit',
	'#organization:read',
	'#ssl:edit',
	'#ssl:read',
	'#stream:edit',
	'#stream:read',
	'#subscription:edit',
	'#subscription:read',
	'#teams:edit',
	'#teams:read',
	'#teams:report',
	'#waf:edit',
	'#waf:read',
	'#webhooks:edit',
	'#webhooks:read',
	'#worker:edit',
	'#worker:read',
	'#zone:edit',
	'#zone:read',
	'#zone_settings:edit',
	'#zone_settings:read',
}
