import * as process from 'process';
import { Zones } from '../classes/zones';

async function execute(): Promise<void> {
	const [execPath, jsFilePath, enableProxy, onlyForSite]: string[] = process.argv;

	if (enableProxy === 'true' || enableProxy === 'false') { // to make sure that we accept only true or false
		try {
			console.log('----------- please wait -----------');
			await Zones.setProxiedStatusForAllZones(enableProxy === 'true', onlyForSite === 'true');
			return Promise.resolve();
		} catch (error) {
			return Promise.reject();
		}
	} else {
		console.error('You should provide enable_proxy argument. true means that the records will be proxied and false that the records will be dns only.');
		console.error('You can also provide the argument <only_for_site>. True means that ONLY the records example.com and www.example.com will be affected by the change');
		console.error('Usage example: npm run set-proxy-status-for-all-zones <enable_proxy(true|false)> <only_for_site(true|false -> optional default is false)>');
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
