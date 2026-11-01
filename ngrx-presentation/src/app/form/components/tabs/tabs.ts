import { Component, model, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

export type TabOption<T extends string = string> = {
  value: T;
  label: string;
  icon: string;
};

@Component({
  selector: 'app-tabs',
  host: { role: 'tablist', class: 'flex gap-2 bg-surface-container rounded-xl' },
  imports: [NgClass, NgIcon],
  template: `
    @for (option of options(); track option.value) {
      @let active = option.value === value();

      <button
        (click)="value.set(option.value)"
        [attr.aria-label]="option.label"
        [attr.aria-selected]="active"
        role="tab"
        class="flex justify-center gap-2 items-center focus-visible:outline-4 focus-visible:outline-primary/50 w-full flex-1 cursor-pointer font-semibold text-base sm:text-lg text-nowrap transition-colors py-2 rounded-lg"
        [ngClass]="{
          'text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active': active,
          'text-on-surface-variant': !active,
        }"
      >
        <ng-icon [name]="option.icon" size="18" />
        <span class="hidden sm:inline">{{ option.label }}</span>
      </button>
    }
  `,
})
export class Tabs<T extends string> {
  /**
   * Available tabs
   */
  public options = input.required<TabOption<T>[]>();

  /**
   * Currently selected tab
   */
  public value = model.required<T>();
}
