import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="box mx-auto">
      <div className="row">
        <div className="col-6">
          <h3>IronProfile</h3>
          <p className="mb-5">App with authorization, adding some cool styles!</p>
          <Link className="btn btn-red mb-3" to="/register">Sign Up</Link>
          <Link className="btn btn-red mb-3" to="/login">Login</Link>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
}