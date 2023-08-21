import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NewsDataSection from "../NewsDataSection";

import { db } from "../../services/Auth/Auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { favourite } from "../../store/NewsSlice";

export default function FavouriteNews() {
  const [listActive, setListActive] = useState(true);
  const [news, setNews] = useState(null);
  const dispatch = useDispatch();

  async function getfav() {
    const uid = localStorage.getItem("news4alluuid");

    const favouriteRef = collection(db, "favourite");
    const temp1 = await getDoc(doc(favouriteRef, uid));
    const temp = temp1.data();
    setNews(temp);
  }

  useEffect(() => {
    getfav();
    console.log(news);
  }, []);

  // const handleSend = async (data) => {
  //   let uuid = v4();
  //   let localDataauth = localStorage.getItem("news4alluuid");

  //   await updateDoc(doc(db, "favourite", localDataauth), {
  //     [uuid + ".heart"]: {
  //       data,
  //     },
  //     [uuid + ".date"]: serverTimestamp(),
  //   });
  // };

  // useEffect(() => {
  //   getNewsApi(isInitialCat);
  // }, [isInitialCat]);

  const newsdata = useSelector((store) => store.news.favourite);
  console.log(news);
  return (
    <div id="main">
      <section className="section recent" aria-label="recent post">
        <div className="container">
          <div className="newsdata-heading">
            <div className="personalize">
              <h2>Favourite News</h2>
            </div>

            <div className="list-grid-i">
              <i
                className={`fa-solid fa-list ${listActive && "active"}`}
                onClick={() => setListActive(true)}
              ></i>
              <i
                className={`fa-solid fa-table-cells  ${
                  !listActive && "active"
                }`}
                onClick={() => setListActive(false)}
              ></i>
            </div>
          </div>
          <ul className={listActive ? "list-view" : "grid-list"}>
            {/* grid-list */}
            {news && (
              <NewsDataSection
                key={"blogcard-favourite"}
                data={news.favouriteData.data}
              />
            )}
          </ul>
        </div>
        <div className="h3" style={{ color: "red" }}>
          ( At the time we can able to add only one favourite, updates coiming
          up)
        </div>
      </section>
    </div>
  );
}
