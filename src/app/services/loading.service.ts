import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public IsLoading: Subject<boolean> = new Subject();

  constructor() { }

  public TurnOn(): void {
    this.IsLoading.next(true);
  }

  public TurnOff(): void {
    this.IsLoading.next(false);
  }
}
