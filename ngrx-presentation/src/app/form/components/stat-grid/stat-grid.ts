import { Component, input } from '@angular/core';
import { Stat } from '../stat/stat';

@Component({
  selector: 'app-stat-grid',
  host: { class: 'grid grid-cols-2 gap-2 font-semibold' },
  imports: [Stat],
  template: `
    <app-stat label="Żetony">{{ tokens().toFixed(2) }}</app-stat>
    <app-stat label="Kwota (USD)">{{ usd().toFixed(2) }}</app-stat>
  `,
})
export class StatGrid {
  /**
   * Amount expressed in tokens
   */
  public tokens = input.required<number>();

  /**
   * Amount expressed in USD
   */
  public usd = input.required<number>();
}
