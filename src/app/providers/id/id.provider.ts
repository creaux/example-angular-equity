import { InjectionToken } from '@angular/core';

export const ID_PROVIDER_TOKEN = new InjectionToken<string>('ID_PROVIDER_TOKEN');

export function IdProvider() {
  return Math.random().toString(36).substr(2, 9);
}

export const ID_PROVIDER = {
  provide: ID_PROVIDER_TOKEN,
  useValue: IdProvider,
};
