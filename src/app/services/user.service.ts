import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../common/post';
import { User } from '../common/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public baseUrl = 'http://localhost:8080/api/users';
  
  currentUser: User;
  
  constructor(private http: HttpClient) {}
 
  public save(user: User): void{
    console.log("saving new user to db...");
    let body = {
      userId: user.id,
      email: user.email,
      username: user.username,
      password: user.password
    };
    console.log(body);
    this.http.post<Post>(this.baseUrl, body, httpOptions).toPromise();
  }

  public getMaxId(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/search/findMaxId`);
  }

  public getUserList(): Observable<User[]> {
    return this.http.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.users)
    );
  }

  public getUser(user_id: number): Observable<User>{
    const url = `${this.baseUrl}/${user_id}`;
    return this.http.get<User>(url);
  }

  public getUserByName(name: string): Observable<User>{
    //http://localhost:8080/api/users/search/findByUsername?username=root
    const url = `${this.baseUrl}/search/findByUsername?username=${name}`;
    return this.http.get<User>(url);
  }

  public changeUser(newUser: User): void{
    this.currentUser = newUser;
  }

  public getCurrentUser(): User{
    return this.currentUser;
  }
}

interface GetResponse{
  _embedded: {
    users: User[];
    }

}
