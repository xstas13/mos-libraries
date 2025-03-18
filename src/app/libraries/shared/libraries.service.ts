import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { API_KEY, DATASETS_LIB_ERR_MESS, DATASETS_LIB_ID, DATASETS_PATH } from './libraries.config';
import { DatasetsRowsResp, Library } from './library.model';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {
  constructor(private http: HttpClient) { }

  /**
   * Получение списка библиотек Москвы
   */
  public mosLibraries(searchStr: string): Observable<any> {
    const url = `${DATASETS_PATH}/${DATASETS_LIB_ID}/rows`;

    const params = {
      api_key: API_KEY,
      q: searchStr
    };

    return this.http.get<DatasetsRowsResp<Library>[]>(url, { params })
      .pipe(catchError(() => throwError(() => new Error(DATASETS_LIB_ERR_MESS))));
  }
}
