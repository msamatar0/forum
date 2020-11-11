import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private userv: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email:    ['', Validators.required]
    })
  }

  public onSubmit(): void {
    console.log("In register function!");
    let user = new User();
    this.userv.getMaxId().subscribe(id => {
      user.id = id + 1;
      user.email = this.registerForm.get('email').value;
      user.username = this.registerForm.get('username').value;
      user.password = this.registerForm.get('password').value;
      this.userv.save(user);
      this.userv.changeUser(user);
      console.log(user);
      this.router.navigate(['forum']);
    });
  }
}
