import { Component, input } from '@angular/core';
import { Stat } from '../stat/stat';

@Component({
  selector: 'app-stat-grid',
  host: { class: 'grid grid-cols-3 gap-2 font-semibold' },
  imports: [Stat],
  template: `
    <app-stat label="Cena">{{ price() }}</app-stat>
    <app-stat label="Zysk (USD)">{{ profit() }}</app-stat>
    <app-stat label="Procent (%)">{{ percent() }}</app-stat>
  `,
})
export class StatGrid {
  /**
   * Value expressed as price
   */
  public price = input.required<number>();

  /**
   * Value expressed as profit in USD
   */
  public profit = input.required<number>();

  /**
   * Value expressed as percentage
   */
  public percent = input.required<number>();
}
