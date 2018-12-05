import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Receipt } from '../../models/receipt';
import { Item } from '../../models/Item';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Location } from '@angular/common';
import { ReceiptService } from '../../services/receipt.service';
import { initializeApp } from 'firebase';
import { LoadingService } from '../../services/loading.service';
import { load } from '@angular/core/src/render3/instructions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit, OnDestroy {

  public receipt: Receipt = Receipt.createBlankReceipt();

  private subs: Subscription[] = [];

  constructor(private route: ActivatedRoute,
    private location: Location,
    private receiptService: ReceiptService,
    private loadingService: LoadingService) {

  }

  async ngOnInit() {

    const pm = await this.route.paramMap.toPromise();

    this.loadingService.IsLoading.next(true);

    const receipt_id = pm.get('receipt_id');

    try {
      this.receipt = await this.receiptService.getReceiptById(receipt_id);
    } catch (res) {
      console.log(res);
      this.loadingService.IsLoading.next(false);
    }

    this.loadingService.IsLoading.next(false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(o => o.unsubscribe());
  }

  public updateReceipt(): void {
    this.receiptService.UpdateReceipt(this.receipt.receipt_id, this.receipt);
  }


  // public addNewItemClicked(): void {
  //   this.receipt.items_list.push(new Item('Blanked', 0));
  // }

  private CalcTotalPrice(arr: Item[]): number {
    let total = 0.0;

    arr.forEach(v => {
      total += parseFloat(v.cost.toString());
    });

    return total;
  }

  public PriceChange(): void {
    this.receipt.total_amount = this.CalcTotalPrice(this.receipt.items_list);
  }

  public CloseReceipt(): void {
    this.location.back();
  }
  // public DeleteItem(index: number): void {
  //   this.receipt.items_list.splice(index, 1);
  //   this.PriceChange();
  // }
}
