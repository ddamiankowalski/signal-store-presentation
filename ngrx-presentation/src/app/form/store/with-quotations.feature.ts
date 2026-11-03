import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { MarketService } from '../services/market.service';

/**
 * Adds the market price updated by the quotes stream
 */
export function withQuotations() {
  return signalStoreFeature(
    withState({ marketPrice: 10 }),
    withMethods((store) => {
      /**
       * Keeps the market price in sync with the given quotes stream
       */
      const _fetchQuotes = rxMethod<number>(
        tap((marketPrice) => patchState(store, { marketPrice })),
      );

      return {
        _fetchQuotes,
      };
    }),
    withHooks({
      onInit(store) {
        const service = inject(MarketService);
        store._fetchQuotes(service.quotes$);
      },
    }),
  );
}
