import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storage: Storage) { }

  SetToken(token) {
    return this.storage.set('auth-token', token);
  }

  DeleteToken() {
    return this.storage.remove('auth-token');
  }

  GetPayload() {
    
  }
}
