import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { LibrariesService } from './shared/libraries.service';
import { DatasetsRowsResp, Library } from './shared/library.model';
import { HighlighterPipe } from '../shared/pipes/highlighter.pipe';
import { LibraryInfoComponent } from './library-info/library-info.component';
import { LibraryInfoService } from './library-info/library-info.service';

@Component({
  selector: 'app-libraries',
  imports: [
    ReactiveFormsModule,
    HighlighterPipe,
    LibraryInfoComponent,
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss'
})
export class LibrariesComponent implements OnDestroy {
  public searchForm!: UntypedFormGroup;
  public loadLibrariesErr: string|null = null;
  public loadLibrariesProgress: boolean = false;
  public libraries: Library[] = [];
  public searchText!: string;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private librariesService: LibrariesService,
    private libraryInfoService: LibraryInfoService,
  ) {
    this.createSearchForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitSearchForm(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.loadLibraries();
  }

  public showLibrayInfo(library: Library): void {
    this.libraryInfoService.showLibraryInfo(library);
  }

  private createSearchForm(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  private loadLibraries(): void {
    const { name } = this.searchForm.value;

    this.libraries = [];
    this.searchText = name;
    this.loadLibrariesErr = null;
    this.loadLibrariesProgress = true;
    this.searchForm.disable();

    this.librariesService.mosLibraries(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: DatasetsRowsResp<Library>[]) => {
          this.loadLibrariesProgress = false;
          this.searchForm.enable();
          this.libraries = resp.map(item => item.Cells);
        },
        error: resp => {
          this.loadLibrariesProgress = false;
          this.searchForm.enable();
          this.loadLibrariesErr = resp;
        },
      });
  }
}
