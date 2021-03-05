export interface Plan {
	id: string;
	name: string;
	price: number;
	currency: string;
	frequency: string;
	is_subscribed: boolean;
	can_subscribe: boolean;
	legacy_id: string;
	legacy_discount: boolean;
	externally_managed: boolean;
}
