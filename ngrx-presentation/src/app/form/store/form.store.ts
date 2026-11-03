import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { MarketService } from '../services/market.service';
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
  withMethods((store, market = inject(MarketService)) => {
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
     * Places an order
     */
    const order = () => {
      market.order();
    };

    return {
      setTab,
      setType,
      setValue,
      increment,
      decrement,
      order,
    };
  }),
);
