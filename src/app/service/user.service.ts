import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Address } from '../models/Address.model';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';
////
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  public login(loginData: any) {
    console.log(loginData)

    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  // --------------User Address----------------
  public saveAddress(addressData: Address){
    return this.httpclient.post(this.PATH_OF_API + '/addUserAddress', addressData, {

    });
  }
  public loadUserAddresses(){
    return this.httpclient.get(this.PATH_OF_API + '/getAllUserAddresses', {
      responseType: 'json',
    });
  }

  public deleteAddress(addressId: number){
    return this.httpclient.delete(this.PATH_OF_API + '/deleteUserAddress/'+addressId, {

    });
  }
  //-----------------USER PASSWORD--------------------------
  saveNewPassword(passwordData: ChangePasswordRequest){
    return this.httpclient.post(this.PATH_OF_API + '/changeUserPassword', passwordData, {
    });
  }
  //Load user data
  public loadUserData() {
    return this.httpclient.get(this.PATH_OF_API + '/loadUserData', {
      responseType: 'json',
    });
  }
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any): any {
    let isMatch = false;
    const userRoles: any = this.authService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
