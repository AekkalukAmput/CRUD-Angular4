import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { AccountComponent } from './components/account/account.component';
import { ImgslideComponent } from './components/imgslide/imgslide.component';

const appRoutes: Routes = [
  { path: 'app-account', component: AccountComponent },
  { path: 'app-imgslide', component: ImgslideComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ModalComponent,
    ToggleComponent,
    ImgslideComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
