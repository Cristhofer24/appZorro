import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore';
import { UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UsersService, LoginInfo } from '../users.service';


export interface Register {
  uid: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  photoURL: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  currentRegister?: Register;

  constructor(private firestore: Firestore, private usersService: UsersService) { }

  getRegister(uid: string): Observable<Register> {
    const docRef = doc(this.firestore, `registers/${uid}`);
    return docData(docRef, { idField: 'uid' });
  }
  //Obtener Informacion de Registro (Read)
  getRegisters(): Observable<Register[]> {
    const registersRef = collection(this.firestore, 'registers');
    return collectionData(registersRef, { idField: 'uid' });
  }
  //Crear un nuevo Registro(Create)
  async createRegisters(loginInfo: LoginInfo, {email,nickname,phoneNumber,photoURL,role}: Register): Promise<any> {
    //creacion de usuario en el autentificador
    const userCredential: UserCredential = await this.usersService.register(loginInfo)
      .catch((error) => {
        console.log(error);
        return error;
      });
// creacion de usuario en la base de datos
    const uid = userCredential.user.uid;
    this.currentRegister = {uid,email,nickname,phoneNumber,photoURL,role};
    const registersRef = collection(this.firestore, 'registers');

    return addDoc(registersRef, {uid,email,nickname,phoneNumber,photoURL,role});
  
  }

  async createRegisterWithGoogle(): Promise<any> {
    const userCredential: UserCredential = await this.usersService.loginWithGoogle()
    .catch((error) => {
      console.log(error);
      return error;
    })

    const uid: string = userCredential.user.uid;
    const photoURL = userCredential.user.photoURL!;
    const email = userCredential.user.email!;
    const nickname = userCredential.user.displayName!;
    const phoneNumber = userCredential.user.phoneNumber!;
    const role = 'empleado';
    this.currentRegister = {uid,email,nickname,phoneNumber,photoURL,role};
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef, {uid,email,nickname,phoneNumber,photoURL,role});
  }




  //Actualizar un Registro(Update)
  // updateTodo(register: Register) : Promise<any> {
  //   const docRef = doc(this.firestore, registers/${register.uid});
  //   return updateDoc(docRef, {title: todo.title, completed: todo.completed});
  // }

  //Eliminar un Registro(Delete)
  // deleteTodo(todo: Todo) : Promise<any> {
  //   const docRef = doc(this.firestore, todos/${todo.id});
  //   return deleteDoc(docRef);
  // }

}