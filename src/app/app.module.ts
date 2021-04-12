import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CardsComponent } from './cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule, NavbarModule, WavesModule, ButtonsModule, CollapseModule  } from 'angular-bootstrap-md';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { UserComponent } from './user/user.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from "@angular/forms";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    NavbarComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    CollapseModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
