import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL ="http://localhost:5050"
  constructor(
    private http: HttpClient
  ) { }


  signUp(user): Observable<any>{
    console.log(user)
    return this.http.post<any>(this.URL + '/signup', user)
  }

  logIn(user): Observable<any>{
    console.log(user)
    return this.http.post<any>(this.URL + '/login', user)
  }
}
