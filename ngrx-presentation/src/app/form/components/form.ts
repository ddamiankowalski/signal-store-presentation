import { Component, inject } from '@angular/core';
import { FormStore } from '../store/form.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: 'form.html',
  imports: [NgClass],
  providers: [FormStore],
})
export class Form {
  public form = inject(FormStore);

  public onTab(type: 'LONG' | 'SHORT'): void {
    this.form.setTab(type);
  }
}
