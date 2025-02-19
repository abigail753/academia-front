import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CryptoService } from '../../../service/crypto.service';
import { SessionService } from '../../../service/session.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-shared-login-routed',
  templateUrl: './shared.login.routed.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  styleUrls: ['./shared.login.routed.component.css']
})
export class SharedLoginRoutedComponent implements OnInit {

  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private oRouter: Router,
    private oLoginService: LoginService,
    private oSessionService: SessionService,
    private oCryptoService: CryptoService
  ) {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }


  ngOnInit():void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const hashedPassword = this.oCryptoService.getHashSHA256(this.loginForm.value.password);
      
      this.oLoginService.login(this.loginForm.value.correo, hashedPassword).subscribe({
        next: (token: string) => {
          console.log('Token recibido:', token);

          this.oSessionService.login(token);
          this.oRouter.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud', error);
          alert('Correo o contraseña incorrectos');
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      });
    }
  }

}
