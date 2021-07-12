import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  identity: string;
  constructor(private storage: Storage) { }
  
  SetToken(token) {
    return this.storage.set('auth-token', token);
  }

  SetUser(user) {
    return this.storage.set('auth-user', user);
  }

 async GetUser(){
  const identity = JSON.parse(await this.storage.get('auth-user'))
  
  if(identity != "undefined"){
    this.identity = identity
  }else{
    this.identity = null;
  }
  return this.identity;
 
  }

  DeleteToken() {
    return this.storage.remove('auth-token');
  }

  async GetPayload() {
    const token = await this.storage.get('auth-token')
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload))
    }

    return payload.data
  }
}
