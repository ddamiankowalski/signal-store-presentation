import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import type { Side, ValueType } from './form.store';

export const events = eventGroup({
  source: 'Form',
  events: {
    tabSelected: type<Side>(),
    typeSelected: type<ValueType>(),
    input: type<number>(),
    increased: type<void>(),
    decreased: type<void>(),
    ordered: type<void>(),
  },
});
