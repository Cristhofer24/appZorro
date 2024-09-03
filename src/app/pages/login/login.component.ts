import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UsersService } from '../../Services/users/users.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
  ReactiveFormsModule,
NzIconModule,
RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
form:FormGroup;
constructor(private fb:FormBuilder, private usersService: UsersService) {
  this.form=this.fb.group({
    email:["",[Validators.required]],
    password:["",[Validators.required]],
    remember:[true]
  }); 
}

onClickLogin(): void {
  this.usersService.login(this.form.value)
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
}
onClickLoginGoogle(): void {
  this.usersService.loginWithGoogle()
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
}

}
