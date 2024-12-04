//Validation message use for form through out the app
import { Injectable } from '@angular/core';
@Injectable()
export class ValidationMessages {
  static validation_messages = {
    username: [
      { type: 'required', message: 'user Name cannot be empty' },
      { type: 'minlength', message: 'Requires minimum of 1 characters' },
    ],
    password: [{ type: 'required', message: 'Password cannot be empty' }],
    firstName: [
      { type: 'required', message: 'First Name cannot be empty' },
      { type: 'minlength', message: 'Requires minimum of 1 characters' },
    ],
    lastName: [
      { type: 'required', message: 'last Name cannot be empty' },
      { type: 'minlength', message: 'Requires minimum of 1 characters' },
    ],
    userId: [
      { type: 'required', message: 'User Id # is required' },
      { type: 'alphaNumeric', message: 'Invalid Booking #' },
      { type: 'minlength', message: 'Requires minimum of 1 characters' },
      { type: 'maxlength', message: 'Requires minimum of 3 characters' },
    ],
    email: [{ type: 'required', message: 'Email Id is required' }],
    mobile: [{ type: 'required', message: 'Mobile # is required' }],
    description: [{ type: 'required', message: 'Description is required' }],
  };
}
