import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { UiModule } from './ui/navbar/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { WalletProvider } from './shared/providers/wallet.provider';

export function walletFactory(provider: WalletProvider) {
  return () => provider.init();
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
  ],
  providers: [
    WalletProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: walletFactory,
      deps: [WalletProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
