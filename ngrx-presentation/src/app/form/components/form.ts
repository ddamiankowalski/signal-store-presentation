import { Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { FormStore, Side, ValueType } from '../store/form.store';
import { Select, SelectOption } from './select/select';
import { TabOption, Tabs } from './tabs/tabs';
import { Field } from './field/field';
import { FormInput } from './form-input/form-input';
import { Panel } from './panel/panel';
import { InfoRow } from './info-row/info-row';
import { StatGrid } from './stat-grid/stat-grid';
import { Button } from './button/button';
import { events } from '../store/form.events';

@Component({
  selector: 'app-form',
  host: { class: 'flex flex-col gap-4 w-full' },
  templateUrl: 'form.html',
  imports: [Tabs, Field, FormInput, Select, Panel, InfoRow, StatGrid, Button],
  providers: [FormStore],
})
export class Form {
  public form = inject(FormStore);

  public dispatch = injectDispatch(events);

  public tabs: TabOption<Side>[] = [
    { value: 'BUY', label: 'Kup', icon: 'lucideTrendingUp' },
    { value: 'SELL', label: 'Sprzedaj', icon: 'lucideTrendingDown' },
  ];

  public options: SelectOption<ValueType>[] = [
    { value: 'TOKENS', label: 'Żetony' },
    { value: 'USD', label: 'USD' },
  ];

  public onButtonClick(): void {
    this.dispatch.ordered();
  }
}
