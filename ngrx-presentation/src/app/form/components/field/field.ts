import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-field',
  host: { class: 'flex flex-col text-on-surface-variant text-sm font-semibold' },
  imports: [NgIcon],
  template: `
    <label [for]="inputId()" class="flex items-center gap-1 mb-2">
      @if (icon(); as icon) {
        <ng-icon [name]="icon" size="14" />
      }
      {{ label() }}
    </label>

    <div class="flex flex-col sm:flex-row gap-2 w-full rounded-xl bg-surface-container p-2">
      <ng-content />
    </div>
  `,
})
export class Field {
  /**
   * Label of the field
   */
  public label = input.required<string>();

  /**
   * Icon displayed next to the label
   */
  public icon = input<string>();

  /**
   * Id of the input the label points to
   */
  public inputId = input<string>();
}
