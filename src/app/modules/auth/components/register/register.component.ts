import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/core/models/user.interface';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent {
  regForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatch });

  private passwordsMatch(group: any) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  formResponse: boolean | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit() {
    if(this.regForm.invalid) {
      this.formResponse = false;
      return;
    }

    const formData = this.regForm.value;

    const newUser: User = {
      name: formData['name'] ?? '',
      email: formData['email'] ?? '',
      password: formData['password'] ?? ''
    };

    this.authService.registerUser(newUser)
    .pipe(
      first(),
      tap((response: boolean) => {
        this.formResponse = response;

        if(response) {
          this.regForm.reset();
        }
      }),
      tap((response: boolean) => {
        if(response) {
          this.router.navigate(['/orders']);
        }
      }),
    )
    .subscribe();
  }
}
