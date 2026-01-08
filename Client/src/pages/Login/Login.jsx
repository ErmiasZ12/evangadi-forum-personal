import React from "react";
import SignIn from "../../components/SignIn/SignIn";
import About from "../../components/About/About";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContent}>
        <div className={styles.signInSection}>
          <SignIn />
        </div>
        
        {/* About Section */}
        <div className={styles.aboutWrapper}>
          <div className={styles.bgShape}></div>
          <div className={styles.aboutContent}>
            <About />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
