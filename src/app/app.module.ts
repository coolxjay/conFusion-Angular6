import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatRadioModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { AuthService } from './services/auth.service';
import { baseURL } from './shared/baseurl';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatDatepickerModule,
		MatRadioModule,
		MatSliderModule,
		MatSlideToggleModule,
		HttpClientModule,
		FlexLayoutModule,
		AppRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfpyLehThhRhYPQtZyb1mNmBXfwb0lZsg'
    })
  ],
  providers: [
		DishService,
		LeaderService,
		PromotionService,
		ProcessHTTPMsgService,
		AuthService,
		{provide: 'BaseURL', useValue: baseURL}
	],
	 entryComponents: [
        LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
