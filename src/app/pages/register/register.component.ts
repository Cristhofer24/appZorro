import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RegistersService } from '../../Services/users/registers/registers.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
  ReactiveFormsModule,
NzIconModule,
RouterLink,
NzSelectModule,NzIconModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form:FormGroup;
   constructor(private fb:FormBuilder,private registersService:RegistersService) {

    this.form=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]],
      confirmPassword:["",[this.confirmationValidator]],
      nickname:["",[Validators.required]],
      phoneNumber:["",[Validators.required]],
      agree:[false],
      photoURL:[""],
      role:["empleado"]
    })
    }
   
    updateConfirmValidator(): void {
    
      Promise.resolve().then(() => this.form.controls['confirmPassword'].updateValueAndValidity());
    }
  
    confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.form.controls['password'].value) {
        return { confirm: true, error: true };
      }
      return {};
    };
onClickRegister():void{
  this.registersService.createRegisters(this.form.value, this.form.value)
  .then((response)=>{
    console.log(response);
  })
  .catch(error => console.log(error));
}
onClickRegisterWithGoogle():void{
  this.registersService.createRegisterWithGoogle().then
  ((response)=>{
    console.log(response);
  }).catch(error => console.log(error));
}
}
