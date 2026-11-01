import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat',
  host: { class: 'flex flex-col gap-1 rounded-lg bg-surface-container-low p-3' },
  template: `
    <p class="text-sm font-semibold text-on-surface-variant">{{ label() }}</p>
    <p class="text-primary"><ng-content /></p>
  `,
})
export class Stat {
  /**
   * Label describing the value
   */
  public label = input.required<string>();
}
