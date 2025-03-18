import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Library } from '../shared/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryInfoService {
  public libraryInfo$: Subject<Library> = new Subject<Library>();

  public showLibraryInfo(libraryInfo: Library): void {
    this.libraryInfo$.next(libraryInfo);
  }
}
