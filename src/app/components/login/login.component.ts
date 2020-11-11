import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../common/user';

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
    private pserv: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userv.getMaxId().subscribe(id => console.log(id));
    this.pserv.getMaxId().subscribe(id => console.log(id));

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.userv.getUserByName(username).subscribe(data => {
      this.user = data;
      let success = (this.user.username == username && this.user.password == password);
      console.log(success);
      if(success){
        this.userv.changeUser(this.user);
        console.log(this.user);
        this.router.navigate(['forum'], { relativeTo: this.route });
      }
    });
  }
}
