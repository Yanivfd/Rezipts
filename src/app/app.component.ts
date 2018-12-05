import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rezipts';
  public loading = false;
  private subs: Subscription[] = [];
  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
    this.subs.push(
      this.loadingService.IsLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

