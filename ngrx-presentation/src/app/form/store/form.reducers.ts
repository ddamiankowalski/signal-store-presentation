import type { Side, ValueType } from './form.store';

/**
 * Selects a given tab in form
 */
export const onTabSelected = ({ payload }: { payload: Side }) => ({ selectedTab: payload });

/**
 * Selects a type of the entered value and converts the value to it,
 * because 100 tokens means something else than 100 USD
 */
export const onTypeSelected = (
  { payload }: { payload: ValueType },
  { value, marketPrice }: { value: number; marketPrice: number },
) => ({
  selectedType: payload,
  value: payload === 'USD' ? value * marketPrice : value / marketPrice,
});

/**
 * Sets the entered value
 */
export const onInput = ({ payload }: { payload: number }) => ({ value: payload });

/**
 * Increases the entered value by one
 */
export const onIncreased = (_: unknown, { value }: { value: number }) => ({ value: value + 1 });

/**
 * Decreases the entered value by one
 */
export const onDecreased = (_: unknown, { value }: { value: number }) => ({ value: value - 1 });
