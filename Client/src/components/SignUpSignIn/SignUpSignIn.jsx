import React from 'react';
import Classes from './SignUpSignIn.module.css'
import Register from './Register/Register'
import About from './About/About'
const SignUpSignIn = () => {
  return (
    <section className={Classes.home_container}>
      <div className={Classes.home_wrapper}>
        <div className={Classes.register_column}>
          <Register />
        </div>
        <div className={Classes.about_column}>
          <About />
        </div>
      </div>
    </section>
  );
}

export default SignUpSignIn;
