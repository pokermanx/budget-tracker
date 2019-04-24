import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule } from '@nebular/theme';
import { UiModule } from './ui/navbar/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { WalletProvider } from './shared/providers/wallet.provider';
import { CategoriesProvider } from './shared/providers/categories.provider';

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
  ],
  providers: [
    WalletProvider,
    CategoriesProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [WalletProvider, CategoriesProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
