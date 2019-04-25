import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbToastrModule } from '@nebular/theme';
import { UiModule } from './ui/ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WalletProvider } from './shared/providers/wallet.provider';
import { CategoriesProvider } from './shared/providers/categories.provider';
import { RequestInterceptor } from './shared/interceptors/error.interceptor';

export function initFactory(
  walletProvider: WalletProvider,
  categoriesProvider: CategoriesProvider
) {
  return () =>
    Promise.all([
      walletProvider.init(),
      categoriesProvider.init()
    ]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UiModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot()
  ],
  providers: [
    WalletProvider,
    CategoriesProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [WalletProvider, CategoriesProvider],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
