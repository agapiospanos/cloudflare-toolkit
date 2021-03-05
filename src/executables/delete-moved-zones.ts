import { Zones } from '../classes/zones';

async function execute(): Promise<void> {
	try {
		console.log('----------- please wait -----------');
		await Zones.deleteMovedZones();
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
}

execute()
	.then(() => console.log('-------------- completed --------------'))
	.catch(e => console.log('-------------- failed -----------------'));
