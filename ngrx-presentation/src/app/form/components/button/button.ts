import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'button[appButton]',
  host: {
    class:
      'flex items-center justify-center gap-2 focus-visible:outline-4 focus-visible:outline-primary/50 w-full font-semibold text-lg cursor-pointer bg-primary hover:bg-primary-hover active:bg-primary-active transition-colors px-4 py-4 text-on-primary rounded-xl',
  },
  imports: [NgIcon],
  template: `
    @if (icon(); as icon) {
      <ng-icon [name]="icon" size="18" />
    }
    <ng-content />
  `,
})
export class Button {
  /**
   * Icon displayed before the content
   */
  public icon = input<string>();
}
