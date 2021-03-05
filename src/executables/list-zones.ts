import { Zones } from '../classes/zones';

async function execute(): Promise<void> {
	console.log('----------- please wait -----------');
	try {
		await Zones.listZones();
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
