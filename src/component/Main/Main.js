import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/css/main.css";
// import "../../assets/css/mainc.css";
import Header from "../Header";
import TopHeadlines from "../TopHeadlines";
import Newsdata from "../Newsdata";

export default function Main() {
  const authlogin = useSelector((state) => state.auth.authToken);

  const nav = useNavigate();
  useEffect(() => {
    if (!authlogin) {
      nav("/signin");
    }
  }, [authlogin]);

  return (
    <>
      {authlogin && (
        <div id="main">
          <Header />
          <section className="section hero" aria-label="home">
            <div className="container">
              <h1 className="h1 hero-title">
                <div className="strong">Hey, welcome Back.</div> All news are
                waiting for you.
              </h1>
              {/* <div className="wrapper">
                <form action="" className="newsletter-form">
                  <input
                    type="email"
                    name="email_address"
                    placeholder="Your email address"
                    className="email-field"
                  />
                  <button type="submit" className="btn">
                    Subscribe
                  </button>
                </form>
                <p className="newsletter-text">
                  Get the email newsletter and unlock access to members-only
                  content and updates
                </p>
              </div> */}
            </div>
          </section>
          <TopHeadlines />
          <Newsdata />
        </div>
      )}
    </>
  );
}
