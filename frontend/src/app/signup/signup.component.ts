import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      username
    }
  }
`;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private apollo: Apollo, private router: Router) {}

  signup() {
    console.log('SIGNING UP WITH:', this.username, this.email, this.password);

    this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password,
      },
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.error = 'Signup failed. Try again.';
      }
    });
  }
}
