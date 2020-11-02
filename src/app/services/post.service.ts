import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Post } from '../common/post';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  headers= new HttpHeaders()
    .set('content-type', 'application/json');
    
  constructor(private http: HttpClient) {}
 
  public save(post: Post) {
    console.log("saving new post to db...")
    return this.http.post<Post>(this.baseUrl, post);
  }
  
  public getPostList(): Observable<Post[]> {
    return this.http.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.posts)
    );
  }

  public getPost(post_id: number): Observable<Post>{
    const url = `${this.baseUrl}/${post_id}`;
    return this.http.get<Post>(url);
  }
}

interface GetResponse{
  _embedded: {
    posts: Post[];
    }

}
