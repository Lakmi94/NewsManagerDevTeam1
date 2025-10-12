import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Login } from '../interfaces/login'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { News } from '../services/news';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private user: Login | null = null;

  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private newsService = inject(News);

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<Login> {
    const usereq = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

    return this.http.post<Login>(this.loginUrl, usereq).pipe(
      tap(user => {
        this.user = user;
        this.newsService.setUserApiKey(user.apikey);
      }), 
      catchError(
        (error): Observable<any> => {
          console.log("Authentication Failed");
          this.newsService.setAnonymousApiKey();
          return of(null);
        },
      )
   );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    this.newsService.setAnonymousApiKey();
  }


  private handleError<User>(operation = 'operation', result?: User) {
    return (error: any): Observable<User> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as User);
    };
  }

}
