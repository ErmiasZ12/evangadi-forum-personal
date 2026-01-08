import React from 'react';
import Classes from './Register.module.css'
import SignUp from '../../components/SignUp/SignUp'
import About from '../../components/About/About'
const Register = () => {
  return (
    <section className={Classes.home_container}>
      <div className={Classes.home_wrapper}>
        <div className={Classes.register_column}>
          <SignUp />
        </div>
        <div className={Classes.about_column}>
          <About />
        </div>
      </div>
    </section>
  );
};

export default Register;