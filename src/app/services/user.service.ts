import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../common/user';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public baseUrl = 'http://localhost:8080/api/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  headers= new HttpHeaders()
    .set('content-type', 'application/json');
  
  currentUser: User;
  
  constructor(private http: HttpClient) {}
 
  public save(user: User) {
    return this.http.post<User>(this.baseUrl, user);
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
