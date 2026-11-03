import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import type { Side, ValueType } from './form.store';

export const formEvents = eventGroup({
  source: 'Form',
  events: {
    tabSelected: type<Side>(),
    typeSelected: type<ValueType>(),
    valueEntered: type<number>(),
    valueIncreased: type<void>(),
    valueDecreased: type<void>(),
  },
});
