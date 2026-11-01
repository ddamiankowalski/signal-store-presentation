import { Component } from '@angular/core';

@Component({
  selector: 'app-stat-grid',
  host: { class: 'grid grid-cols-3 gap-2 font-semibold' },
  template: `<ng-content />`,
})
export class StatGrid {}
