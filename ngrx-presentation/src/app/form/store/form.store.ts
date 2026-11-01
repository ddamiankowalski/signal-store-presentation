import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type FormStoreState = {
  selectedTab: 'LONG' | 'SHORT';
  selectedType: 'PRICE' | 'PROFIT' | 'PERCENTAGE';
};

const initialState: FormStoreState = {
  selectedTab: 'LONG',
  selectedType: 'PRICE',
};

export const FormStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    /**
     * Selets a given tab in form
     */
    const setTab = (selectedTab: 'LONG' | 'SHORT') => {
      patchState(store, { selectedTab });
    };

    return {
      setTab,
    };
  }),
);
