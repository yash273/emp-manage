import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NameByIdPipe } from './pipes/name-by-id.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NameByIdPipe,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    NameByIdPipe,
    HeaderComponent,
    SidebarComponent,
    TranslateModule
  ]
})
export class SharedModule { }
