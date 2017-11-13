import { Injectable } from '@angular/core';
import JwtDecode from 'jwt-decode';
import intersection from 'lodash/intersection';
import {LOGIN_API_URL, ACCESS_TOKEN} from './app.constants';

const logger = console;

@Injectable()
export class UserService {

  constructor() { }

  public login(credentials: {email: string, password: string}) {
    return fetch(LOGIN_API_URL, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials)
    })
      .then((res) => res.json())
      .then((data) => {
        const {error, accessToken, tokenType} = data;
        if (error) {
          return {success: false, error: error.message};
        }
        localStorage.setItem(ACCESS_TOKEN, `${tokenType} ${accessToken}` || '');
        return {success: true, error: null};
      })
      .catch((ex) => {
        logger.error(ex);
        return {success: false, error: 'Could not connect to the server'};
      });
  }

  private getAccessTokenContent(): any {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token !== null) {
      return JwtDecode(token);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const tokenData = this.getAccessTokenContent();
    if (tokenData !== null) {
      try {
        // expired in second
        let {exp} = tokenData;
        exp *= 1000;
        const now = new Date();
        if (exp > now.getTime()) {
          return true;
        }
      } catch (error) {
        logger.error(error);
        localStorage.removeItem(ACCESS_TOKEN);
      }
    }
    return false;
  }

  public isAuthorized(permissions: string[]): boolean {
    const tokenData = this.getAccessTokenContent();
    if (tokenData !== null) {
      try {
        const {user} = tokenData;
        if (user) {
          const {roles} = user;
          return intersection(permissions, roles).length !== 0;
        }
      } catch (error) {
        logger.error(error);
        localStorage.removeItem(ACCESS_TOKEN);
      }
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  public getUserProfile(): any {
    const tokenData = this.getAccessTokenContent();
    if (tokenData !== null) {
      const {user} = tokenData;
      return user;
    }
    return null;
  }

}
