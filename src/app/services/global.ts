import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const GLOBAL = {
  API_URL: environment.apiURL,
  JSON_HEADERS: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
  },
};
