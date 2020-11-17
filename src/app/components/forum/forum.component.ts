import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../common/post';
import { User } from '../../common/user';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentUser: User;
  currentPost: Post;
  posts: Post[];
  postForm: FormGroup;
  http: HttpClient;

  constructor(
    private formBuilder: FormBuilder,
    private pserv: PostService,
    private userv: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pserv.getPostList().subscribe(
      data => {
        console.log(data);
        this.posts = data;
      }
    );

    this.postForm = this.formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
    
    this.currentUser = this.userv.getCurrentUser();
    if(this.currentUser == undefined)
      this.router.navigate(['']);
  }

  viewPost(postId: number){
    this.pserv.getPost(postId).subscribe(data => {
      this.currentPost = data;
      this.pserv.setPost(data);
      console.log(data);
      this.router.navigate(['post/' + this.currentPost.postId]);
    });
  }


  onSubmit(){
    console.log("pressed button");
    let nextPost = new Post();
    const subject = this.postForm.get('subject').value;
    const content = this.postForm.get('content').value;
    this.pserv.getMaxId().subscribe(id => {
      nextPost.postId = id + 1;
      nextPost.postDate = new Date();
      nextPost.postedBy = this.currentUser.username;
      nextPost.subject = subject;
      nextPost.content = content;
      nextPost.ancestorPath =  nextPost.postId.toString();
      this.pserv.save(nextPost);
      this.userv.currentUser = this.currentUser;
      this.listPosts();
    });
  }

  listPosts(){
    this.pserv.getPostList().subscribe(data =>  this.posts = data);
  }
}

