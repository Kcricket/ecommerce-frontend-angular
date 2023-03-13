import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['']
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
