import { environment } from '@env/environment';

export class Api {
  public static get USER() {
    return `${environment.apiUrl}/api`;
  }
}
