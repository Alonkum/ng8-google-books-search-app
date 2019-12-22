import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SharedService } from 'src/app/auth/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private router: Router,
              private fb: FormBuilder,
              private storageService: LocalStorageService,
              private sharedService: SharedService) {
               }



  ngOnInit() {
 
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  login(){
    this.sharedService.emitChange(this.email.value);
    this.storageService.store('currentUser', this.email.value)
    this.router.navigateByUrl('/search');
  }

}
