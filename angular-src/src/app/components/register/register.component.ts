import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Require fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeOut: 3000});
      return false;
    }
    // validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please add a valid email ', {cssClass: 'alert-danger', timeOut: 3000});
      return false;
    }
    // register user
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.show('Your now register and can login ', {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/login']);
      }else {
        this.flashMessage.show('Something went wrong ', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
