import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() { }

  currentPage$ = new BehaviorSubject<number>(1);
  totalItems$ = new BehaviorSubject<number>(0);
  pageSize = 5;

  setTotalItems(totalItems: number) {
    this.totalItems$.next(totalItems);
  }

  getTotalItems(): Observable<number> {
    return this.totalItems$.asObservable();
  }

  getCurrentPage(): Observable<number> {
    return this.currentPage$.asObservable();
  }

  setPage(page: number) {
    console.log('!!!')
    this.currentPage$ .next(page);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems$.value / this.pageSize);
  }

  goToPage(items: any[]) {
    const start = (this.currentPage$.value - 1) * this.pageSize;
    const end = start + this.pageSize;
    return items.slice(start, end);
  }
}
