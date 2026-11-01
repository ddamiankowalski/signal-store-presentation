import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type FormStoreState = {
  selectedTab: 'LONG' | 'SHORT';
};

const initialState: FormStoreState = {
  selectedTab: 'LONG',
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
