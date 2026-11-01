import { Component } from '@angular/core';
import { Form } from './form/components/form';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  imports: [Form],
  host: { class: 'block min-h-screen bg-surface text-on-surface' },
})
export class App {}
