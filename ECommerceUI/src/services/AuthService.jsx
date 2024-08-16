import { refreshTokenLogin } from "../api/auth";

class AuthService {
  static getToken() {
    const token = localStorage.getItem("authToken");
    return token ? JSON.parse(token) : null;
  }

  static setToken(token) {
    localStorage.setItem("authToken", JSON.stringify(token));
  }

  static async getAccessToken() {
    return this.isTokenExpired()
      ? (await this.refreshToken())
        ? this.getToken().accessToken
        : null
      : this.getToken().accessToken;
  }

  static getRefreshToken() {
    const token = this.getToken();
    return token ? token.refreshToken : null;
  }

  static getExpiration() {
    const token = this.getToken();
    return token ? new Date(token.expiration) : null;
  }

  static isTokenExpired() {
    const expiration = this.getExpiration();
    if (expiration) return new Date() > expiration;
    return true;
  }

  static async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      try {
        const response = await refreshTokenLogin(refreshToken);
        this.setToken(response.token);

        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    }
    return false;
  }

  static logout() {
    localStorage.removeItem("authToken");
  }
}

export default AuthService;
