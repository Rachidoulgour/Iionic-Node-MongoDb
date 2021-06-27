import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private URL = "http://localhost:5050/api"

  constructor(private http:HttpClient) { }

//   getOfferBooks(page, city, searchQuery): Observable<any>{
//   console.log(city, searchQuery)
//   let params = new HttpParams().set('searchQuery',searchQuery).set('city', city)
//   //let params = JSON.stringify(filters);
//   let headers = new HttpHeaders().set('Content-Type', 'application/json') 
//   return this.http.get(this.URL + `/offer-books/page=${page}`, {
//     headers,
//   params});
// }

// getDonationBooks(page, city, searchQuery): Observable<any>{
  
//   let params = new HttpParams().set('searchQuery',searchQuery).set('city', city)
//   //let params = JSON.stringify(filters);
//   let headers = new HttpHeaders().set('Content-Type', 'application/json') 
//   return this.http.get(this.URL + '/donation-books/'+page, {
//     headers,
//   params});
// }

// getDemandBooks(page, city, searchQuery): Observable<any>{
//   console.log(city, searchQuery)
//   let params = new HttpParams().set('searchQuery',searchQuery).set('city', city)
//   //let params = JSON.stringify(filters);
//   let headers = new HttpHeaders().set('Content-Type', 'application/json') 
//   return this.http.get(this.URL + `/demand-books/page=${page}`, {
//     headers,
//   params});
// }

getHomepageExchangeBooks(): Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json') 
  return this.http.get(this.URL + '/home-exchange-books/' ,{headers});
}
getHomepageSellBooks(): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type', 'application/json') 
  return this.http.get(this.URL + '/home-sell-books/' ,{headers});
}
getHomepageDonationBooks(): Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json') 
  return this.http.get(this.URL + '/home-donation-books/' ,{headers});
}
getHomepageDemandBooks(): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type', 'application/json') 
  return this.http.get(this.URL + '/home-demand-books/' ,{headers});
}
}
