import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { PageNotFoundComponent } from 'src/shared/components/page-not-found/page-not-found.component';
import { AlertComponent } from 'src/shared/components/alert/alert.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from 'src/shared/service/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
