import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIcons } from '@ng-icons/core';
import {
  lucideTrendingDown,
  lucideTrendingUp,
  lucideCircleDollarSign,
  lucideEdit,
  lucidePlus,
  lucideMinus,
  lucideChevronDown,
} from '@ng-icons/lucide';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({
      lucideTrendingDown,
      lucideTrendingUp,
      lucideCircleDollarSign,
      lucideEdit,
      lucidePlus,
      lucideMinus,
      lucideChevronDown,
    }),
  ],
};
