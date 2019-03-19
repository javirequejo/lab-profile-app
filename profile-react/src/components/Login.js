import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authService from '../services/authService';

const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/i;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const validations = {
  email: value => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid email pattern";
    }
    return message;
  },
  password: value => {
    let message;
    if (!value) {
      message = "Password is required";
    } else if (!PASSWORD_PATTERN.test(value)) {
      message =
        "Invalid password - It must contains capital letters, lowercase letters and numbers";
    }
    return message;
  }
};

class Login extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {
      email: true
    },
    touch: {},
    isAuthenticated: false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  };

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid) {
      authService.authenticate(this.state.user)
        .then(
          (user) => {
            this.setState({
              isAuthenticated: true
            })
          },
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  };

  isValid = () => {
    return !Object.keys(this.state.user)
    .some(attr => this.state.errors[attr])
  };

  render() {
    const { user, errors, touch, isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <h3>Log In</h3>
            <form id="login-form" className="mt-4" onSubmit={this.handleSubmit} >
              <div className="form-group">
                <label>Email</label>
                <input type="Email" name="email" value={user.email} className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} />
                <div className="invalid-feedback"> {errors.email}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="Password" name="password" value={user.password} className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} />
                <div className="invalid-feedback"> {errors.password}</div>
              </div>
            </form>
            <p className="mt-4"><small>If you don't have an account yet, you can create your account <Link to="/register">here</Link></small></p>
          </div>
          <div className="col-6 pt-4">
            <h5>Hello!</h5>
            <p className="lead mb-5">Awesome to have you at Ironprofile again!</p>
            <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
            <button className="btn btn-white" form="login-form" type="submit" disabled={!this.isValid()}> Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;