import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { RegisterComponent } from './components/register/register.component';
import { ReplyViewComponent } from './components/reply-view/reply-view.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {path: 'post/:id', component: PostViewComponent},
  {path: 'reply', component: ReplyViewComponent},
  {path: 'users', component: UserListComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
