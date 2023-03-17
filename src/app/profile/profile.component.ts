import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  profileForm: FormGroup;
  addressForm: FormGroup;
  passwordForm: FormGroup;
  //Change any later
  user: any;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    //this.user = this.userService.getUser();

    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      bio: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    this.addressForm = new FormGroup({
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl('', [Validators.required, Validators.minLength(3)]),
      zip: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  saveProfile() {
    if (this.profileForm.valid) {
      // TODO: Implement save logic
      const { name, email, bio } = this.profileForm.value;
      console.log(`Saving profile: ${name}, ${email}, ${bio}`);
      this.toastr.success('Profile saved successfully!');
    } else {
      this.toastr.error('Please fill in all required fields.');
    }
  }

  cancelProfile() {
    // TODO: Implement cancel logic
    console.log('Canceling profile');
    this.toastr.info('Changes discarded.');
  }

}
