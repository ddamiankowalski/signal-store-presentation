import { computed } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
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
    on(events.tabSelected, ({ payload }) => ({ selectedTab: payload })),
    on(events.typeSelected, ({ payload }, { value, marketPrice }) => ({
      selectedType: payload,
      value: payload === 'USD' ? value * marketPrice : value / marketPrice,
    })),
    on(events.valueEntered, ({ payload }) => ({ value: payload })),
    on(events.valueIncreased, (_, { value }) => ({ value: value + 1 })),
    on(events.valueDecreased, (_, { value }) => ({ value: value - 1 })),
  ),
);
