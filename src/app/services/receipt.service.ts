import { Injectable } from '@angular/core';
import { Receipt, Pay_Method, IReceipt } from '../models/receipt';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {


  public receipts: Observable<IReceipt[]>;

  constructor(private db: AngularFireDatabase/*AngularFirestore*/) { }

  public getReceipts(): Observable<IReceipt[]> {
    this.receipts = this.db.list<IReceipt>('ReceiptsList').valueChanges();
    // this.receipts = this.db.list<IReceipt>('/databases/reziptsdb/ReceiptsList').
    // this.db.collection('/ReceiptsList').valueChanges();
    // console.log(this.receipts);
    return this.receipts; /*[new Receipt(1, new Date('27/08/2018'), 'H&M', [new Item('Shirt', 50.5)], 'Yaniv', 50.5, Pay_Method.cash),
      new Receipt(2, new Date('27/08/2018'), 'Castro', [new Item('Shirt', 50.5)], 'Yaniv', 50.5, Pay_Method.cheque),
      new Receipt(3, new Date('27/08/2018'), 'Zara', [new Item('Shirt', 50.5)], 'Yaniv', 50.5, Pay_Method.credit)]*/
  }

  AddNewReceipt(rec: Receipt): void {
    const newGenKey = this.db.list<IReceipt>('ReceiptsList').push(rec).key;
    rec.receipt_id = newGenKey;
    this.db.list<IReceipt>('ReceiptsList').update(newGenKey, rec);
  }

  getReceiptById(receipt_id: string): Promise<IReceipt> {
    return this.db.object<IReceipt>(`ReceiptsList/${receipt_id}`).valueChanges().toPromise();
  }

  async UpdateReceipt(receipt_id: string, receipt: Receipt): Promise<void> {
    return await this.db.list<IReceipt>('ReceiptsList').update(receipt_id, receipt);
  }

  async DeleteReceipt(recipe_id: string): Promise<void> {
    return await this.db.object<IReceipt>(`ReceiptsList/${recipe_id}`).remove();
  }
}
