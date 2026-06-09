import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister(): void {

    console.log('Button Clicked');

    console.log('Form Valid:', this.registerForm.valid);
    console.log('Form Errors:', this.registerForm.errors);
    console.log('Name:', this.registerForm.get('name')?.errors);
    console.log('Email:', this.registerForm.get('email')?.errors);
    console.log('Password:', this.registerForm.get('password')?.errors);
    console.log('ConfirmPassword:', this.registerForm.get('confirmPassword')?.errors);
    if (this.registerForm.invalid) {
      return;
    }
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const request = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.isLoading = true;
    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        alert('Registration Failed');
      }
    });
  }
}