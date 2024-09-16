import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.interface';
import { USER_KEY } from 'src/app/core/web-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser = new BehaviorSubject<User | null>(null);

  private checkUser(name: string, email: string): Observable<boolean> {
    const userData = localStorage.getItem(USER_KEY);

    if(!userData) {
      return of(false).pipe(delay(1000));
    }

    const user: User = JSON.parse(userData);
    if(name === user.name || email === user.email) {
      return of(true).pipe(delay(1000));
    }
    
    return of(false).pipe(delay(1000));
  }

  logUser(name: string, password: string): Observable<boolean> {
    const userData = localStorage.getItem(USER_KEY);

    if(!userData) {
      return of(false).pipe(delay(1000));
    }

    const user: User = JSON.parse(userData);
    if(name === user.name && password === user.password) {
      this.loggedInUser.next(user);

      return of(true).pipe(delay(1000));
    }
    
    return of(false).pipe(delay(1000));
  }

  registerUser(user: User): Observable<boolean> {
    const name = user.name;
    const email = user.email;
    
    return this.checkUser(name, email)
    .pipe(
      delay(1000),
      map((isAlreadyLogged: boolean) => {
        if(isAlreadyLogged) {
          return false;
        }

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.loggedInUser.next(user);
        return true;
      })
    )
  }
}
