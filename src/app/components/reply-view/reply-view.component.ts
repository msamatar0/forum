import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { User } from '../../common/user';
import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { UrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-reply-view',
  templateUrl: './reply-view.component.html',
  styleUrls: ['./reply-view.component.css']
})
export class ReplyViewComponent implements OnInit {

  currentUser: User;
  parent: Post;
  replyId: number;
  replyForm: FormGroup;

  constructor(
    private userv: UserService,
    private pserv: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.parent = this.pserv.currentPost;
  }

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.currentUser = this.userv.currentUser;

    this.currentUser = this.userv.getCurrentUser();
    if(this.currentUser == undefined)
      this.router.navigate(['']);
  }
  public onSubmit(): void {
    let reply = new Post();
    this.pserv.getMaxId().subscribe(id => {
      console.log(this.parent);
      reply.id = id + 1;
      reply.timestamp = new Date();
      reply.poster = this.userv.currentUser.username;
      reply.subject = "Re: " + this.parent.subject;
      reply.content = this.replyForm.get('content').value;
      reply.path = reply.id.toString() + ':' + this.parent.path;
      console.log(reply);
    });

    
    this.pserv.save(reply);
  }
}
