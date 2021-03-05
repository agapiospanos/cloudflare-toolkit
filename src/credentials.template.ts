// -------------------------- YOU ONLY HAVE TO CARE ABOUT THIS FILE ---------------------------
// ------------ RENAME THIS FILE TO credentials.ts AND REPLACE apiKey AND authEmail -----------

export const credentials: Credentials = {
	apikey: '', // Add your global api key here. https://dash.cloudflare.com/profile/api-tokens
	authEmail: '', // Add your login email here.
};

export interface Credentials {
	apikey: string;
	authEmail: string;
}
