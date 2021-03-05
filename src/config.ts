import { credentials } from './credentials';

export const config: Config  = {
	cloudflareApiBaseUrl: 'https://api.cloudflare.com/client/v4', // You don't have to change this unless cloudflare decides to change the API url
};

interface Config {
	cloudflareApiBaseUrl: string;
}

interface HttpHeadersConfig {
	'X-Auth-Email': string;
	'X-Auth-Key': string;
}

export const httpHeadersConfig: HttpHeadersConfig = {
	'X-Auth-Email': credentials.authEmail,
	'X-Auth-Key': credentials.apikey
};
