import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReceiptsListComponent } from './components/receipts-list/receipts-list.component';
import { ReceiptsSummaryComponent } from './components/receipts-summary/receipts-summary.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { LoadingComponent } from './components/loading/loading.component';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialsModule } from './mymaterial.module';

import { StoreModule } from '@ngrx/store';
import { reducers/*, metaReducers*/ } from './store/reducers/index';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';

export const firebaseConfig = {
  apiKey: 'AIzaSyB-ZJzHJnisEB1o9LzxQz8J7O6ItRVM4dM',
  authDomain: 'reziptsdb.firebaseapp.com',
  databaseURL: 'https://reziptsdb.firebaseio.com',
  projectId: 'reziptsdb',
  storageBucket: 'reziptsdb.appspot.com',
  messagingSenderId: '661235652834'
};

// tslint:disable-next-line:no-unused-expression


@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptsListComponent,
    ReceiptsSummaryComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers/*, { metaReducers }*/),
    NgbModule.forRoot(),
    FormsModule,
    MyMaterialsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
    }),
    RouterModule.forRoot([
      {
        path: 'editreceipt/:receipt_id',
        component: ReceiptComponent
      },
      {
        path: 'receipts',
        component: ReceiptsListComponent
      },
      {
        path: '',
        redirectTo: '/receipts',
        pathMatch: 'full'
      }
    ]),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
