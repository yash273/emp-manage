import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
// import { HeaderComponent } from './components/header/header.component';
import { EncryptDecryptService } from './service/encrypt-decrypt.service';
import { NameByIdPipe } from './pipes/name-by-id.pipe';

@NgModule({
  declarations: [
    // HeaderComponent,

    NameByIdPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    // HeaderComponent,
    NameByIdPipe
  ],
  providers: [
    EncryptDecryptService
  ]
})
export class SharedModule { }
