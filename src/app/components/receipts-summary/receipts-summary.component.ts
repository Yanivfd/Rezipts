import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Receipt } from '../../models/receipt';

@Component({
  selector: 'app-receipts-summary',
  templateUrl: './receipts-summary.component.html',
  styleUrls: ['./receipts-summary.component.css']
})
export class ReceiptsSummaryComponent implements OnInit {

  @Input()
  public receipt: Receipt;

  @Output()
  userClick: EventEmitter<string> = new EventEmitter();

  @Output()
  deleteReceiptClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log(this.receipt);
  }

  public userClicked(): void {
    this.userClick.emit(this.receipt.receipt_id);
  }

  public deleteReceipt(): void {
    this.deleteReceiptClick.emit(this.receipt.receipt_id);
  }
}
