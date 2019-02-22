import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { EquityComponent } from './components/equity/equity.component';
import { ID_PROVIDER } from './providers/id/id.provider';
import { HttpClientModule } from '@angular/common/http';
import { ExchangePipe } from './pipes/exchange.pipe';
import { REQUEST_CACHE_INTERCEPTOR } from './interceptors/request-cache.interceptor';
import { REQUEST_CACHE_SERVICE } from './interceptors/request-cache.service';
import { ProgressComponent } from './components/progress/progress.component';
import { ERROR_HANDLER_INTERCEPTOR } from './interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    EquityComponent,
    ExchangePipe,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ID_PROVIDER,
    [
      REQUEST_CACHE_INTERCEPTOR,
      ERROR_HANDLER_INTERCEPTOR,
    ],
    REQUEST_CACHE_SERVICE,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
