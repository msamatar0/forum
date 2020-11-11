import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../common/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts/';

  currentPost: Post;
    
  constructor(private http: HttpClient) {}
 
  public save(post: Post): void{
    console.log("saving new post to db...");
    let body = {
      postId: post.id,
      post_date: post.timestamp.toLocaleDateString(),
      postedBy: post.poster,
      subject: post.subject,
      content: post.content,
      ancestorPath: post.path
    };
    console.log(JSON.stringify(body));
    this.http.post(this.baseUrl, JSON.stringify(body), httpOptions).toPromise();
  }

  public getMaxId(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}search/findMaxId`);
  }

  public getPostList(): Observable<Post[]> {
    return this.http.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.posts)
    );
  }

  public setPost(post: Post): void{
    this.currentPost = post;
  }

  public getPost(post_id: number): Observable<Post>{
    const url = `${this.baseUrl}${post_id}`;
    return this.http.get<Post>(url);
  }
}

interface GetResponse{
  _embedded: {
    posts: Post[];
    }

}
