import { Component, OnInit } from '@angular/core';
import { Receipt, Pay_Method, IReceipt } from '../../models/receipt';
import { Item } from '../../models/Item';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { map } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/reducers/index';
import { LoadSuccessReciptsAction } from 'src/app/store/actions/app.actions';
import { AddReciptAction, DeleteReciptAction, ADD_REZIPTS } from '../../store/actions/app.actions';

@Component({
  selector: 'app-receipts-list',
  templateUrl: './receipts-list.component.html',
  styleUrls: ['./receipts-list.component.css']
})
export class ReceiptsListComponent implements OnInit {

  public receipts: IReceipt[];

  constructor(private router: Router,
    public receiptService: ReceiptService,
    private loadingService: LoadingService,
    private store: Store<ApplicationState>) {
    this.receipts = [];
  }

  async ngOnInit() {
    console.log('init');
    setTimeout(() => {
      this.loadingService.IsLoading.next(true);
    }, 0);

    // this.receipts = this.receiptService.getReceipts();
    this.receiptService.getReceipts().subscribe(val => {


      this.receipts = val;
      this.loadingService.IsLoading.next(false);
      console.log(val);
      this.store.dispatch(new LoadSuccessReciptsAction(val));
    },
      err => {
        console.log(err);
        this.loadingService.IsLoading.next(false);
      });
  }

  userClickedOnRecipe(recipe_id: string): void {
    this.router.navigateByUrl(`editreceipt/${recipe_id}`);
  }

  AddNewReciept(): void {
    // tslint:disable-next-line:max-line-length
    const rec = Receipt.createBlankReceipt();
    this.receiptService.AddNewReceipt(rec);
    this.store.dispatch(new AddReciptAction([rec]));
    // this.store.dispatch({ type: ADD_REZIPTS, payload: [rec] });
  }

  userClickedOnDeleteRecipe(recipe_id: string): void {
    const rec = this.receipts.find(val => val.receipt_id === recipe_id);
    this.receiptService.DeleteReceipt(recipe_id);
    this.store.dispatch(new DeleteReciptAction([rec]));
  }
}
