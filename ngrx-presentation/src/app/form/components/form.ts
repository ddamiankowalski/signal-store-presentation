import { Component } from '@angular/core';
import { Select, SelectOption } from './select/select';
import { TabOption, Tabs } from './tabs/tabs';
import { Field } from './field/field';
import { FormInput } from './form-input/form-input';
import { Panel } from './panel/panel';
import { InfoRow } from './info-row/info-row';
import { StatGrid } from './stat-grid/stat-grid';
import { Button } from './button/button';

@Component({
  selector: 'app-form',
  host: { class: 'flex flex-col gap-4 w-full' },
  templateUrl: 'form.html',
  imports: [Tabs, Field, FormInput, Select, Panel, InfoRow, StatGrid, Button],
})
export class Form {
  public tabs: TabOption<'BUY' | 'SELL'>[] = [
    { value: 'BUY', label: 'Kup', icon: 'lucideTrendingUp' },
    { value: 'SELL', label: 'Sprzedaj', icon: 'lucideTrendingDown' },
  ];

  public options: SelectOption[] = [
    { value: 'TOKENS', label: 'Żetony' },
    { value: 'USD', label: 'USD' },
  ];
}
