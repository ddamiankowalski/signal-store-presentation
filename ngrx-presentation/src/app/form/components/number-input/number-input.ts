import { Component, input, model, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-number-input',
  host: { class: 'flex flex-1' },
  imports: [NgIcon],
  template: `
    <button
      (click)="decrement.emit()"
      aria-label="Zmniejsz"
      class="flex items-center justify-center rounded-lg hover:bg-surface-container-highest focus-visible:outline-4 focus-visible:outline-surface-container-highest cursor-pointer p-4 bg-surface-container-high"
    >
      <ng-icon name="lucideMinus" size="18" />
    </button>

    <input
      [id]="inputId()"
      [value]="value()"
      (input)="onInput($event)"
      type="number"
      class="min-w-0 flex-1 appearance-none bg-transparent text-left px-4 text-lg outline-none transition-colors hover:text-on-surface focus:text-on-surface"
    />

    <button
      (click)="increment.emit()"
      aria-label="Zwiększ"
      class="flex items-center justify-center rounded-lg hover:bg-surface-container-highest focus-visible:outline-4 focus-visible:outline-surface-container-highest cursor-pointer p-4 bg-surface-container-high"
    >
      <ng-icon name="lucidePlus" size="18" />
    </button>
  `,
})
export class NumberInput {
  /**
   * Id of the input
   */
  public inputId = input<string>();

  /**
   * Current value
   */
  public value = model<number | null>(null);

  /**
   * Emitted when the plus button is clicked
   */
  public increment = output<void>();

  /**
   * Emitted when the minus button is clicked
   */
  public decrement = output<void>();

  public onInput(event: Event): void {
    const { valueAsNumber } = event.target as HTMLInputElement;
    this.value.set(Number.isNaN(valueAsNumber) ? null : valueAsNumber);
  }
}
