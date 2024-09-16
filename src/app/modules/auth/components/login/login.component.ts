import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    name: [''],
    password: ['']
  });

  formResponse: boolean | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private autthService: AuthService, private router: Router) {}

  onSubmit() {
    const name = this.loginForm.controls['name'].value ?? '';
    const password = this.loginForm.controls['password'].value!;
    
    this.autthService.logUser(name, password)
      .pipe(
        first(),
        tap((response: boolean) => {
          this.formResponse = response;

          if(response) {
            this.loginForm.reset();
          }
        }),
        tap((response: boolean) => {
          if(response) {
            this.router.navigate(['/orders']);
          }
        })
      ).subscribe();  
  }
}
