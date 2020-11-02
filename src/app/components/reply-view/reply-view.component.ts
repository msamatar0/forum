import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.currentUser = this.userv.currentUser;
  }
  public onSubmit(): void {
    let reply = new Post();
    reply.content = this.replyForm.get('content').value;
    reply.path = this.parent.path + reply.postId;
    reply.postDate = new Date();
    reply.postedBy = this.userv.currentUser.username;
    reply.subject = "Re: " + this.parent.subject;
    
    this.pserv.save(reply);
  }
}
