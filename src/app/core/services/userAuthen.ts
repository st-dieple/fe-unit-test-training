import { AuthStorageService } from './authStorage.service';

export class UserAuthen {
  authStorage: AuthStorageService;

  constructor() {
    this.authStorage = new AuthStorageService();
  }
  getToken() {
    return this.authStorage.getToken();
  }
  logIn(newToken: string) {
    return this.authStorage.setToken(newToken);
  }
  logOut() {
    return this.authStorage.removeToken();
  }
}
