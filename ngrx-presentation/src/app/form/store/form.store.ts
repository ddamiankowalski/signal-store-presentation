import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { tap } from 'rxjs';
import { MarketService } from '../services/market.service';
import { events } from './form.events';
import { onTabSelected, onTypeSelected, onInput, onIncreased, onDecreased } from './form.reducers';
import { withQuotations } from './with-quotations.feature';

export type Side = 'BUY' | 'SELL';
export type ValueType = 'TOKENS' | 'USD';

type FormStoreState = {
  selectedTab: Side;
  selectedType: ValueType;
  value: number;
};

const initialState: FormStoreState = {
  selectedTab: 'BUY',
  selectedType: 'TOKENS',
  value: 0,
};

export const FormStore = signalStore(
  withState(initialState),
  withQuotations(),
  withComputed(({ selectedTab, selectedType, value, marketPrice }) => {
    /**
     * Entered value converted to tokens
     */
    const tokens = computed(() =>
      selectedType() === 'TOKENS' ? value() : value() / marketPrice(),
    );

    /**
     * Entered value converted to USD
     */
    const usd = computed(() => tokens() * marketPrice());

    /**
     * Whether the submit button is disabled
     */
    const disabled = computed(() => value() <= 0);

    /**
     * Label of the submit button
     */
    const submitLabel = computed(() =>
      selectedTab() === 'BUY' ? 'Kup NGP Coin' : 'Sprzedaj NGP Coin',
    );

    return { tokens, usd, disabled, submitLabel };
  }),
  withReducer(
    on(events.tabSelected, onTabSelected),
    on(events.typeSelected, onTypeSelected),
    on(events.input, onInput),
    on(events.increased, onIncreased),
    on(events.decreased, onDecreased),
  ),
  withEventHandlers((_, dispatched = inject(Events), market = inject(MarketService)) => ({
    order$: dispatched.on(events.ordered).pipe(tap(() => market.order())),
  })),
);
