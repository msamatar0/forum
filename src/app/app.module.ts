import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModule, ErrorHandler } from "@angular/core";
import * as Sentry from "@sentry/angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './components/forum/forum.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ReplyViewComponent } from './components/reply-view/reply-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//Sentry.init({
//  dsn: "https://f3431af4e0db4f9f962bef05f5523773@o463916.ingest.sentry.io/5469529"
//});

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    PostViewComponent,
    ReplyViewComponent,
    NotFoundComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ForumComponent,
    PostViewComponent,
    ReplyViewComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
