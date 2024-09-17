import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private totalItems = 0;
  pageSize$ = new BehaviorSubject<number>(5);

  constructor() { }

  get currentPage$(): Observable<number> {
    return this.currentPageSubject.asObservable();
  }

  setPage(page: number) {
    this.currentPageSubject.next(page);
  }

  setPageSize(size: number) {
    this.pageSize$.next(size);
  }

  getPageSize(): number {
    return this.pageSize$.value;
  }

  setTotalItems(count: number) {
    this.totalItems = count;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize$.value);
  }
}
