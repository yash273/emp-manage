import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  // Hash the password using bcrypt
  hashPassword(plainPassword: string): string {
    const saltRounds = plainPassword.length;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(plainPassword, salt);
  }

  // Compare a plaintext password with a hashed password
  comparePasswords(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
