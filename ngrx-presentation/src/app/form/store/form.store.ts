import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type Side = 'LONG' | 'SHORT';
export type ValueType = 'PRICE' | 'PROFIT' | 'PERCENTAGE';

type FormStoreState = {
  selectedTab: Side;
  selectedType: ValueType;
  value: number | null;
  price: number;
  profit: number;
  percent: number;
};

const initialState: FormStoreState = {
  selectedTab: 'LONG',
  selectedType: 'PRICE',
  value: null,
  price: 0,
  profit: 0,
  percent: 0,
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
    const setValue = (value: number | null) => {
      patchState(store, { value });

      switch (store.selectedType()) {
        case 'PRICE':
          patchState(store, { price: value ?? 0 });
          break;
        case 'PROFIT':
          patchState(store, { profit: value ?? 0 });
          break;
        case 'PERCENTAGE':
          patchState(store, { percent: value ?? 0 });
          break;
      }
    };

    /**
     * Increases the entered value by one
     */
    const increment = () => {
      setValue((store.value() ?? 0) + 1);
    };

    /**
     * Decreases the entered value by one
     */
    const decrement = () => {
      setValue((store.value() ?? 0) - 1);
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
