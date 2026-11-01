import { Component, computed, input, model } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-select',
  host: { class: 'flex' },
  imports: [NgIcon],
  template: `
    <select
      [id]="id()"
      [value]="value()"
      (change)="onChange($event)"
      class="h-full w-full cursor-pointer rounded-lg bg-surface-container-high px-4 py-3 text-lg text-on-surface transition-[background-color,color] hover:bg-surface-container-highest focus-visible:outline-4 focus-visible:outline-surface-container-highest"
    >
      <button class="flex h-full w-full items-center justify-between gap-2">
        <span>{{ selectedLabel() }}</span>
        <ng-icon name="lucideChevronDown" size="18" class="chevron transition-transform" />
      </button>

      @for (option of options(); track option.value) {
        <option
          [value]="option.value"
          [selected]="option.value === value()"
          class="cursor-pointer rounded-lg px-4 py-2 text-on-surface-variant transition-[background-color,color] hover:bg-surface-container-highest hover:text-on-surface focus-visible:outline-4 focus-visible:outline-surface-container-highest"
        >
          {{ option.label }}
        </option>
      }
    </select>
  `,
  styles: `
    select,
    ::picker(select) {
      appearance: base-select;
    }

    select::picker-icon {
      display: none;
    }

    select:open .chevron {
      rotate: 180deg;
    }

    ::picker(select) {
      margin-top: 0.5rem;
      padding: 0.25rem;
      border: 1px solid var(--color-outline);
      border-radius: 0.75rem;
      background: var(--color-surface-container-high);
    }

    option::checkmark {
      display: none;
    }

    option:checked {
      color: var(--color-primary);
    }
  `,
})
export class Select {
  /**
   * Id of the select
   */
  public id = input<string>();

  /**
   * Available options
   */
  public options = input.required<SelectOption[]>();

  /**
   * Currently selected value
   */
  public value = model<string | null>();

  /**
   * Label of the currently selected option
   */
  public selectedLabel = computed(
    () => this.options().find((option) => option.value === this.value())?.label,
  );

  public onChange(event: Event): void {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
