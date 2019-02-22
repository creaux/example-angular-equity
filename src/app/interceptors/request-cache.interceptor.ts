import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { REQUEST_CACHE_TOKEN, RequestCacheService } from './request-cache.service';

const TTL = 36000;

@Injectable({
  providedIn: 'root'
})
class RequestCacheInterceptor implements HttpInterceptor {
  constructor(
    @Inject(REQUEST_CACHE_TOKEN) private cache: RequestCacheService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(`RESPONSE_${req.url}${req.params.toString()}`);
    const cachedRequest = this.cache.get(`REQUEST_${req.url}${req.params.toString()}`);

    if (cachedResponse) {
      return of<any>(cachedResponse);
    }

    if (cachedRequest) {
      return cachedRequest;
    }

    return this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.cache.set(`RESPONSE_${req.url}${req.params.toString()}`, event, TTL);
      }
    }));
    this.cache.set(`REQUEST_${req.url}${req.params.toString()}`, request, TTL);
    return request;
  }
}

export const REQUEST_CACHE_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestCacheInterceptor,
  multi: true,
};
