import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-info-row',
  host: { class: 'flex justify-between gap-2' },
  imports: [NgIcon],
  template: `
    <div class="flex items-center">
      <div
        class="flex items-center justify-center p-4 rounded-lg bg-surface-container-high text-primary"
      >
        <ng-icon [name]="icon()" size="18" />
      </div>

      <p class="text-on-surface-variant mx-2 flex items-center">{{ label() }}</p>
    </div>

    <div class="flex items-center">
      <p>
        <ng-content />
        @if (unit(); as unit) {
          <span class="text-on-surface-variant">{{ unit }}</span>
        }
      </p>
    </div>
  `,
})
export class InfoRow {
  /**
   * Icon displayed on the left
   */
  public icon = input.required<string>();

  /**
   * Label describing the value
   */
  public label = input.required<string>();

  /**
   * Unit displayed after the value
   */
  public unit = input<string>();
}
