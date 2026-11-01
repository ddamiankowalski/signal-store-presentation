import { signalStore, withState } from '@ngrx/signals';

type FormStoreState = {
  selectedTab: 'LONG' | 'SHORT';
};

const initialState: FormStoreState = {
  selectedTab: 'LONG',
};

export const FormStore = signalStore(withState(initialState));
