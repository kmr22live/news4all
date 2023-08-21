import { getFirestore } from "firebase/firestore";
import { db } from "../../services/Auth/Auth";
import React, { useState, useEffect } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { favourite } from "../../store/NewsSlice";
import { Link } from "react-router-dom";

export default function NewsDataSection({ data }) {
  const [isFavorite, setIsFavorite] = useState(true);

  const toggleFavorite = () => {
    setIsFavorite(false);
    addTodo();
  };

  const dispatch = useDispatch();
  const addTodo = async () => {
    // Get the current user's uid.
    const uid = localStorage.getItem("news4alluuid");

    const favouriteRef = collection(db, "favourite");
    const temp1 = await getDoc(doc(favouriteRef, uid));
    const temp = temp1.data();

    await setDoc(doc(favouriteRef, uid), {
      favouriteData: temp,
    });
    dispatch(favourite(temp));
  };

  useEffect(() => {}, []);
  return (
    <li>
      <div className="blog-card">
        <figure className="card-banner img-holder">
          <img
            src={data.urlToImage}
            loading="lazy"
            alt="Creating is a privilege but it’s also a gift"
            className="img-cover"
          />
        </figure>
        <div className="card-content">
          <ul
            className="card-meta-list"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <li>
              <a href="#" className="card-tag">
                Source: {data?.source?.name}
              </a>
            </li>
            <li>
              <i
                class={`${isFavorite ? "fa-regular" : "fa-solid"} fa-heart`}
                style={{
                  fontSize: "20px",
                  paddingRight: "10px",
                  color: !isFavorite && "red",
                }}
                onClick={() => toggleFavorite()}
              ></i>
            </li>
          </ul>
          <h3 className="h4">
            <Link
              to={`/fullnews/` + data}
              className="card-title hover:underline"
            >
              {data.title}
            </Link>
          </h3>
          <p className="card-text">{data.description}</p>
        </div>
      </div>
    </li>
  );
}
