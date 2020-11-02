import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../common/user';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../common/post';
import { PostService } from '../../services/post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentUser: User;
  posts: Post[];
  nextPost: Post;
  postForm: FormGroup;
  http: HttpClient;

  constructor(
    private formBuilder: FormBuilder,
    private pserv: PostService,
    private userv: UserService
  ) {
    this.nextPost = new Post();
  }

  ngOnInit(): void {
    this.pserv.getPostList().subscribe(
      data => {
        console.log(data);
        this.posts = data;
      }
    );

    this.postForm = this.formBuilder.group({
      subject: [''],
      content: ['']
    });

    this.currentUser = this.userv.getCurrentUser();
  }

  onSubmit(){
    console.log("pressed button");
    const subject = this.postForm.get('username').value;
    const content = this.postForm.get('password').value;
    this.nextPost.subject = subject;
    this.nextPost.content = content;
    this.nextPost.postDate = new Date();
    this.nextPost.postedBy = this.currentUser.username;
    this.nextPost.path = this.nextPost.postId.toString();
    this.pserv.save(this.nextPost);
  }

  listPosts(){
    this.pserv.getPostList().subscribe(
      data => { this.posts = data; }
    );
  }
}

