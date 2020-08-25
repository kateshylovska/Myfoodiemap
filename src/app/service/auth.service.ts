import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  get idToken() {
    return localStorage.getItem('id_token');
  }

  authenticate(idToken, accessToken, expiresIn) {
    const tokenSections = (idToken || '').split('.');
    if (tokenSections && tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }

    let expiresAt = moment().add(expiresIn, 'second');

    localStorage.setItem('id_token', idToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getUserName(): string {
    let result = this.getAttribute('preferred_username');
    if (!result) {
      result = this.getEmail();
    }
    return result;
  }

  getEmail(): string {
    return this.getAttribute('email');
  }

  getUserId(): string {
    return this.getAttribute('sub');
  }

  getAttribute(attr: string) {
    if (this.isLoggedIn()) {
      const tokenSections = (this.idToken || '').split('.');
      if (tokenSections && tokenSections.length < 2) {
        throw new Error('requested token is invalid');
      }
      return (JSON.parse(atob(tokenSections[1])))[attr];
    }

    return '';
  }}
