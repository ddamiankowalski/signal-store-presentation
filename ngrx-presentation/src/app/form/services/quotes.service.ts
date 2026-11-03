import { Injectable } from '@angular/core';
import { interval, Observable, scan } from 'rxjs';

/**
 * Mock of the NGP Coin quotes stream
 */
@Injectable({ providedIn: 'root' })
export class QuotesService {
  public readonly quotes$: Observable<number> = interval(1000).pipe(
    scan((price) => price + (Math.random() - 0.5) / 10, 10),
  );
}
