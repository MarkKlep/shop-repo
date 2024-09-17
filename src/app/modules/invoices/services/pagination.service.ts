import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private pageSize = 5;
  private totalItems = 0;

  constructor() { }

  get currentPage$(): Observable<number> {
    return this.currentPageSubject.asObservable();
  }

  setPage(page: number) {
    this.currentPageSubject.next(page);
  }

  getPageSize(): number {
    return this.pageSize;
  }

  setTotalItems(count: number) {
    this.totalItems = count;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
