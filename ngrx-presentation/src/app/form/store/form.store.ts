import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { tap } from 'rxjs';
import { MarketService } from '../services/market.service';
import { events } from './form.events';
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
    /**
     * Selects a given tab in form
     */
    on(events.tabSelected, ({ payload }) => ({ selectedTab: payload })),

    /**
     * Selects a type of the entered value and converts the value to it,
     * because 100 tokens means something else than 100 USD
     */
    on(events.typeSelected, ({ payload }, { value, marketPrice }) => ({
      selectedType: payload,
      value: payload === 'USD' ? value * marketPrice : value / marketPrice,
    })),

    /**
     * Sets the entered value
     */
    on(events.input, ({ payload }) => ({ value: payload })),

    /**
     * Increases the entered value by one
     */
    on(events.increased, (_, { value }) => ({ value: value + 1 })),

    /**
     * Decreases the entered value by one
     */
    on(events.decreased, (_, { value }) => ({ value: value - 1 })),
  ),
  withEventHandlers((_, dispatched = inject(Events), market = inject(MarketService)) => ({
    order$: dispatched.on(events.ordered).pipe(tap(() => market.order())),
  })),
);
