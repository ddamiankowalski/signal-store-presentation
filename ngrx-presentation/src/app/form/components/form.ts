import { Component, inject } from '@angular/core';
import { FormStore } from '../store/form.store';
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
  providers: [FormStore],
})
export class Form {
  public form = inject(FormStore);

  public tabs: TabOption<'LONG' | 'SHORT'>[] = [
    { value: 'LONG', label: 'Kup / Long', icon: 'lucideTrendingUp' },
    { value: 'SHORT', label: 'Sprzedaj / Short', icon: 'lucideTrendingDown' },
  ];

  public options: SelectOption[] = [
    { value: 'PRICE', label: 'Cena' },
    { value: 'PROFIT', label: 'Zysk (USD)' },
    { value: 'PERCENTAGE', label: 'Procent (%)' },
  ];

  public onTab(type: 'LONG' | 'SHORT'): void {
    this.form.setTab(type);
  }
}
