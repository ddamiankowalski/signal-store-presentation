import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  host: { role: 'status', class: 'block' },
  imports: [NgClass],
  template: `
    <p
      class="rounded-xl px-4 py-3 text-center font-semibold"
      [ngClass]="{
        'bg-primary-container text-primary': type() === 'success',
        'bg-sell-short/15 text-sell-short': type() === 'error',
      }"
    >
      <ng-content />
    </p>
  `,
})
export class Message {
  /**
   * Visual variant of the message
   */
  public type = input.required<'success' | 'error'>();
}
