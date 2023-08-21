import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/Auth/Auth";
import { CircularProgress } from "@mui/material";
import { getUserData, storeUserData } from "../../services/storage/Storage.";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";

import img1 from "../../assets/image/image1.svg";
import img2 from "../../assets/image/image2.svg";
import img3 from "../../assets/image/image3.svg";
import img4 from "../../assets/image/logo.png";

function SignIn() {
  const authlogin = useSelector((state) => state.auth.authToken);

  const nav = useNavigate();
  useEffect(() => {
    if (authlogin) {
      nav("/home");
      // console.log("login mohan eeee");
    }
  }, [authlogin]);

  const dispatch = useDispatch();
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
    custom_error_status: false,
  };
  const initialStateErrorsReg = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
    custom_error_status: false,
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorsReg, setErrorsReg] = useState(initialStateErrors);

  const [loadingReg, setLoadingReg] = useState(false);

  const [inputsReg, setInputsReg] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleChangeReg = (event) => {
    setInputsReg({ ...inputsReg, [event.target.name]: event.target.value });
  };
  const handleErrorReg = () => {
    let errors = initialStateErrorsReg;
    let hasError = false;
    // console.log(inputsReg);
    if (inputsReg.name === "") {
      errors.name.required = true;
      hasError = true;
    }
    if (
      inputsReg.email === "" ||
      !Object.values(inputsReg.email).includes("@") ||
      !Object.values(inputsReg.email).includes(".")
    ) {
      errors.email.required = true;
      hasError = true;
    }

    if (inputsReg.password === "" || inputsReg.password.length < 6) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoadingReg(true);
      //   sending register api request
      createUserWithEmailAndPassword(auth, inputsReg.email, inputsReg.password)
        .then((res) => {
          // console.log(res.user.uid);
          storeUserData(res.user.uid);
          dispatch(login());
        })
        .catch((err) => {
          //    if(err.response.data.error.message=="EMAIL_EXISTS"){
          //         setErrors({...errors,custom_error:"Already this email has been registered!"})
          //    }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
          //         setErrors({...errors,custom_error:"Password should be at least 6 characters!"})
          //    }
          if (err.code === "auth/email-already-in-use") {
            setErrorsReg({
              ...errors,
              custom_error: "Account Already Exist",
              custom_error_status: true,
            });
          }
          if (err.code === "auth/invalid-email") {
            setErrorsReg({
              ...errors,
              custom_error: "Invalid Email Address",
              custom_error_status: true,
            });
          }
          //   setErrors({ ...errors, custom_error: true });
        })
        .finally(() => {
          setLoadingReg(false);
        });
    }
    // console.log(initialStateErrors, errors);
    setErrorsReg(errors);
  };

  const handleError = () => {
    let errors = initialStateErrors;
    let hasError = false;
    // console.log(inputs);

    if (
      inputs.email === "" ||
      !Object.values(inputs.email).includes("@") ||
      !Object.values(inputs.email).includes(".")
    ) {
      errors.email.required = true;
      hasError = true;
    }

    if (inputs.password === "" || inputs.password.length < 6) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      //   sending register api request
      signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((res) => {
          // console.log(res.user.uid);
          storeUserData(res.user.uid);
          dispatch(login());
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            setErrors({
              ...errors,
              custom_error: "Account Not exist",
              custom_error_status: true,
            });
          }
          if (err.code === "auth/wrong-password") {
            setErrors({
              ...errors,
              custom_error: "Wrong Password",
              custom_error_status: true,
            });
          }
          // console.log(err.code);
          //   setErrors({ ...errors, custom_error: true });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // console.log(initialStateErrors, errors);
    setErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleError();
  };
  const handleSubmitReg = (event) => {
    event.preventDefault();
    handleErrorReg();
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".input-field");
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector("main");
    const bullets = document.querySelectorAll(".bullets span");
    const images = document.querySelectorAll(".image");

    function handleFocus() {
      this.classList.add("active");
    }

    function handleBlur() {
      if (this.value !== "") return;
      this.classList.remove("active");
    }

    function handleToggle() {
      main.classList.toggle("sign-up-mode");
    }

    function moveSlider() {
      const index = this.dataset.value;

      const currentImage = document.querySelector(`.img-${index}`);
      images.forEach((img) => img.classList.remove("show"));
      currentImage.classList.add("show");

      const textSlider = document.querySelector(".text-group");
      textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

      bullets.forEach((bull) => bull.classList.remove("active"));
      this.classList.add("active");
    }

    inputs.forEach((inp) => {
      inp.addEventListener("focus", handleFocus);
      inp.addEventListener("blur", handleBlur);
    });

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", handleToggle);
    });

    bullets.forEach((bullet) => {
      bullet.addEventListener("click", moveSlider);
    });

    return () => {
      inputs.forEach((inp) => {
        inp.removeEventListener("focus", handleFocus);
        inp.removeEventListener("blur", handleBlur);
      });

      toggle_btn.forEach((btn) => {
        btn.removeEventListener("click", handleToggle);
      });

      bullets.forEach((bullet) => {
        bullet.removeEventListener("click", moveSlider);
      });
    };
  }, []);

  return (
    <div className="signinpage">
      <main>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              <form
                action="index.html"
                autoComplete="off"
                className="sign-in-form"
              >
                <div className="logo">
                  <img src={img4} alt="news4all" />
                  <h4>News4All</h4>
                </div>
                <div className="heading">
                  <h2>Welcome Back</h2>
                  <h6>Not registred yet?</h6>
                  <a href="#" className="toggle">
                    Sign up
                  </a>
                </div>
                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="email"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      required=""
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                    <label>Email</label>
                  </div>

                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      required=""
                      name="password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                    <label>Password</label>
                  </div>
                  <p className="text">
                    Forgotten your password or you login datails?
                    <a href="#">Get help</a> signing in
                  </p>
                  <input
                    // type="submit"
                    type="button"
                    defaultValue="Sign In"
                    className="sign-btn"
                    // onSubmit={handleSubmit}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
              <form
                action="index.html"
                autoComplete="off"
                className="sign-up-form"
              >
                <div className="logo">
                  <img src={img4} alt="news4all" />
                  <h4>News4All</h4>
                </div>
                <div className="heading">
                  <h2>Get Started</h2>
                  <h6>Already have an account?</h6>
                  <a href="#" className="toggle">
                    Sign in
                  </a>
                </div>
                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="text"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      required=""
                      name="name"
                      value={inputsReg.name}
                      onChange={handleChangeReg}
                    />
                    <label>Username</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="input-field"
                      autoComplete="off"
                      required=""
                      name="email"
                      value={inputsReg.email}
                      onChange={handleChangeReg}
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength={4}
                      className="input-field"
                      autoComplete="off"
                      required=""
                      name="password"
                      value={inputsReg.password}
                      onChange={handleChangeReg}
                    />
                    <label>Password</label>
                  </div>

                  <p className="text">
                    By signing up, I agree to the
                    <a href="#">Terms of Services</a> and
                    <a href="#">Privacy Policy</a>
                  </p>
                  <input
                    type="button"
                    defaultValue="Sign Up"
                    className="sign-btn"
                    onClick={handleSubmitReg}
                  />
                </div>
              </form>
            </div>
            <div className="carousel">
              <div className="images-wrapper">
                <img src={img1} className="image img-1 show" alt="" />
                <img src={img2} className="image img-2" alt="" />
                <img src={img3} className="image img-3" alt="" />
              </div>
              <div className="text-slider">
                <div className="text-wrap">
                  <div className="text-group">
                    <h2>Get All New Around the world</h2>
                    <h2>Customize as you like</h2>
                    <h2>Add this to favourite</h2>
                  </div>
                </div>
                <div className="bullets">
                  <span className="active" data-value={1} />
                  <span data-value={2} />
                  <span data-value={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
