import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type Side = 'BUY' | 'SELL';
export type ValueType = 'TOKENS' | 'USD';

type FormStoreState = {
  selectedTab: Side;
  selectedType: ValueType;
  value: number;
  tokens: number;
  usd: number;
};

const initialState: FormStoreState = {
  selectedTab: 'BUY',
  selectedType: 'TOKENS',
  value: 0,
  tokens: 0,
  usd: 0,
};

export const FormStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    /**
     * Selects a given tab in form
     */
    const setTab = (selectedTab: Side) => {
      patchState(store, { selectedTab });
    };

    /**
     * Selects a type of the entered value
     */
    const setType = (selectedType: ValueType) => {
      patchState(store, { selectedType });
    };

    /**
     * Sets the entered value in the currently selected type
     */
    const setValue = (value: number) => {
      patchState(store, { value });

      switch (store.selectedType()) {
        case 'TOKENS':
          patchState(store, { tokens: value });
          break;
        case 'USD':
          patchState(store, { usd: value });
          break;
      }
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

    return {
      setTab,
      setType,
      setValue,
      increment,
      decrement,
    };
  }),
);
