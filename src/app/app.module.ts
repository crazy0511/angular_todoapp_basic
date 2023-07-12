import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule là một module của Angular được sử dụng để xử lý các form trong ứng dụng của bạn.
    FormsModule,
    // HttpClientModule là một module của Angular được sử dụng để cung cấp HttpClient cho ứng dụng Angular của bạn. 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
