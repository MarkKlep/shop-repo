import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AuthUserGuard } from './core/guards/auth-user.guard';
import { PanelModule } from './core/panel/panel.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    OrdersModule,
    InvoicesModule,
    PanelModule
  ],
  providers: [AuthUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
