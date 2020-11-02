import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../common/user';
import { UserService } from 'src/app/services/user.service';
import { relative } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private userv: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.userv.getUserByName(username).subscribe(
      data => { this.user = data; }
    );
    
    let success = (this.user.username == username && this.user.password == password);
    console.log(success);
    if(success){
      this.userv.changeUser(this.user);
      console.log(this.userv.getCurrentUser().username);
      this.router.navigate(['forum'], { relativeTo: this.route });
    }
  }
}
