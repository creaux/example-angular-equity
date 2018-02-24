
import { Injectable, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  private cache = new Map<string, [Date, Observable<HttpEvent<any>>]>();

  get(key): Observable<HttpEvent<any>> {
    const tuple = this.cache.get(key);
    if (!tuple) {
      return null;
    }

    const expires = tuple[0];
    const httpResponse = tuple[1];

    // Don't observe expired keys
    const now = new Date();
    if (expires && expires.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return httpResponse;
  }

  set(key, value, ttl = null) {
    if (ttl) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + ttl);
      this.cache.set(key, [expires, value]);
    } else {
      this.cache.set(key, [null, value]);
    }
  }
}
