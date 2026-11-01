import { Component } from '@angular/core';

/**
 * Card that separates its children with dividers
 */
@Component({
  selector: 'app-panel',
  host: {
    class:
      'flex flex-col w-full p-4 rounded-xl bg-surface-container divide-y divide-outline-variant [&>*]:py-2 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0',
  },
  template: `<ng-content />`,
})
export class Panel {}
