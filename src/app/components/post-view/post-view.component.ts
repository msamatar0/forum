import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../common/user';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {

  currentUser: User;
  postId: number;
  selectedPost: Post;

  constructor(
    private userv: UserService,
    private pserv: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.route);
    this.postId = +this.route.snapshot.paramMap.get('id');
    this.pserv.getPost(this.postId).subscribe(
      data => { this.selectedPost = data; }
    );
    this.currentUser = this.userv.currentUser;
    //console.log(this.selectedPost.subject);

    this.currentUser = this.userv.getCurrentUser();
    if(this.currentUser == undefined)
      this.router.navigate(['']);
  }
}
