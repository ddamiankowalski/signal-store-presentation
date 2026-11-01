import { Component, inject, signal } from '@angular/core';
import { FormStore } from '../store/form.store';
import { NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Select, SelectOption } from './select/select';

@Component({
  selector: 'app-form',
  templateUrl: 'form.html',
  imports: [NgClass, NgIcon, Select],
  providers: [FormStore],
})
export class Form {
  public form = inject(FormStore);

  public options: SelectOption[] = [
    { value: 'PRICE', label: 'Cena ($)' },
    { value: 'PROFIT', label: 'Zysk ($)' },
    { value: 'PERCENTAGE', label: 'Procent (%)' },
  ];

  public onTab(type: 'LONG' | 'SHORT'): void {
    this.form.setTab(type);
  }
}
