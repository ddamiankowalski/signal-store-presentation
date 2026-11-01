import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { QuotesService } from '../services/quotes.service';

export type Side = 'BUY' | 'SELL';
export type ValueType = 'TOKENS' | 'USD';

type FormStoreState = {
  selectedTab: Side;
  selectedType: ValueType;
  value: number;
  marketPrice: number;
};

const initialState: FormStoreState = {
  selectedTab: 'BUY',
  selectedType: 'TOKENS',
  value: 0,
  marketPrice: 10,
};

export const FormStore = signalStore(
  withState(initialState),
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
  withMethods((store) => {
    /**
     * Selects a given tab in form
     */
    const setTab = (selectedTab: Side) => {
      patchState(store, { selectedTab });
    };

    /**
     * Selects a type of the entered value and converts the value to it,
     * because 100 tokens means something else than 100 USD
     */
    const setType = (selectedType: ValueType) => {
      const converted = {
        TOKENS: store.tokens(),
        USD: store.usd(),
      };

      patchState(store, { selectedType, value: converted[selectedType] });
    };

    /**
     * Sets the entered value
     */
    const setValue = (value: number) => {
      patchState(store, { value });
    };

    /**
     * Increases the entered value by one
     */
    const increment = () => {
      setValue(store.value() + 1);
    };

    /**
     * Decreases the entered value by one
     */
    const decrement = () => {
      setValue(store.value() - 1);
    };

    /**
     * Keeps the market price in sync with the given quotes stream
     */
    const connectQuotes = rxMethod<number>(
      tap((marketPrice) => patchState(store, { marketPrice })),
    );

    return {
      setTab,
      setType,
      setValue,
      increment,
      decrement,
      connectQuotes,
    };
  }),
  withHooks({
    onInit(store) {
      // The subscription ends together with the store, so no manual cleanup is needed
      store.connectQuotes(inject(QuotesService).quotes$);
    },
  }),
);
