import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SharedService } from './service/shared.service';
import { EncryptDecryptService } from './service/encrypt-decrypt.service';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    EncryptDecryptService
  ]
})
export class SharedModule { }
