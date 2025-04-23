import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { ClientComponent } from './client/client.component';
import { CreatemeetComponent } from './createmeet/createmeet.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientJoinComponent } from './client-join/client-join.component';

@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    ClientComponent,
    CreatemeetComponent,
    ClientJoinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
