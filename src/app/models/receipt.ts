import { Item } from './Item';

export enum Pay_Method {
    cash,
    credit,
    cheque
}

export interface IReceipt {

    receipt_id: string;
    date: Date;
    store_name: string;
    items_list: Item[];
    cashier_name: string;
    total_amount: number;
    payment_method: Pay_Method;
}


export class Receipt implements IReceipt {

    constructor(public receipt_id: string,
        public date: Date,
        public store_name: string,
        public items_list: Item[],
        public cashier_name: string,
        public total_amount: number,
        public payment_method: Pay_Method) {
    }

    public static createBlankReceipt() {
        return new Receipt('Blanked', new Date(), 'Blanked', [new Item('Blanked', 0)], 'Blanked', 0, Pay_Method.cash);
    }
}
