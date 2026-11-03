import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-form-input',
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
      id="value"
      [value]="value()"
      (input)="onInput($event)"
      (keydown.enter)="confirm.emit()"
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
export class FormInput {
  /**
   * Current value
   */
  public value = input<number | null>(null);

  /**
   * Emitted when a valid number is entered
   */
  public valueChange = output<number>();

  /**
   * Emitted when the plus button is clicked
   */
  public increment = output<void>();

  /**
   * Emitted when the minus button is clicked
   */
  public decrement = output<void>();

  /**
   * Emitted when Enter is pressed in the input
   */
  public confirm = output<void>();

  public onInput(event: Event): void {
    const { valueAsNumber } = event.target as HTMLInputElement;

    if (Number.isNaN(valueAsNumber)) {
      return;
    }

    this.valueChange.emit(valueAsNumber);
  }
}
