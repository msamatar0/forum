import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../common/user';

import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ForumComponent } from '../forum/forum.component';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {

  currentUser: User;
  postId: number;
  selectedPost: Post;
  route: ActivatedRoute;

  constructor(
    private userv: UserService,
    private pserv: PostService
  ) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');
    this.pserv.getPost(this.postId).subscribe(
      data => { this.selectedPost = data; }
    );
    this.currentUser = this.userv.currentUser;
    console.log(this.selectedPost.subject);
  }

}
