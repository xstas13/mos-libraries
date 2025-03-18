import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';

import { LibraryInfoService } from './library-info.service';
import { Library } from '../shared/library.model';

@Component({
  selector: 'app-library-info',
  imports: [ModalModule],
  providers: [BsModalService],
  templateUrl: './library-info.component.html',
  styleUrl: './library-info.component.scss'
})
export class LibraryInfoComponent implements OnDestroy {
  public modalRef?: BsModalRef;
  public libraryInfo?: Library;

  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('templateModal') templateModal!: TemplateRef<void>;

  constructor(
    private modalService: BsModalService,
    private libraryInfoService: LibraryInfoService,
  ) {
    this.libraryInfoService.libraryInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(libraryInfo => {
        this.libraryInfo = libraryInfo;
        this.openModal();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private openModal(): void {
    this.modalRef = this.modalService.show(this.templateModal, { class: 'modal-lg' });
  }
}
