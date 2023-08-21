import React, { useState, useEffect } from "react";
import PersonalizeButton from "../PersonalizeButton";
import { useDispatch } from "react-redux";
import { feedChange } from "../../store/NewsSlice";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/Auth/Auth";
import { v4 } from "uuid";
import NewsDataSection from "../NewsDataSection";

export default function Newsdata() {
  let initialCat = {
    business: false,
    entertainment: false,
    general: false,
    health: false,
    science: false,
    sports: false,
    technology: false,
  };
  const [listActive, setListActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialCat, setIsInitialCat] = useState(initialCat);
  const [istempInitialCat, settempIsInitialCat] = useState(initialCat);

  const [newsApiData, setNewsApiData] = useState(null);

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

  const [sliceLength, setSliceLength] = useState(8);
  let length = 50;

  const handleloadmore = () => {
    if (sliceLength + 16 > length) {
      setSliceLength(length);
    } else {
      setSliceLength(sliceLength + 16);
    }
  };

  async function getNewsApi(data) {
    let newdata = Object.keys(data).filter((key) => data[key]);
    let apicategory = "";
    if (newdata.length > 0) {
      apicategory = "category=" + newdata.join("&") + "&";
    }
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?${apicategory}language=en&pageSize=50&apiKey=0328db9da2d44e268bc0bacb7ca0ebaa`
      );
      const data = await response.json();
      await console.log(data);
      setNewsApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // useEffect(() => {
  //   getNewsApi(isInitialCat);
  // }, [isInitialCat]);

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    settempIsInitialCat(isInitialCat);
  };
  const okModal = () => {
    setIsModalOpen(false);
    setIsInitialCat(istempInitialCat);
    console.log(isInitialCat);
    dispatch(feedChange(isInitialCat));
  };

  let categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  let news = {
    status: "ok",
    totalResults: 36,
    articles: [
      {
        source: {
          id: "al-jazeera-english",
          name: "Al Jazeera English",
        },
        author: "Al Jazeera",
        title:
          "Ukraine drone attack damages building in central Moscow: Russian officials - Al Jazeera English",
        description:
          "Moscow’s mayor says Ukrainian drone shot down by air defence and debris falls on city’s Expo Center causing damage.",
        url: "https://www.aljazeera.com/news/2023/8/18/ukraine-drone-attack-damages-building-in-central-moscow-russian-officials",
        urlToImage:
          "https://www.aljazeera.com/wp-content/uploads/2023/08/2023-08-18T041949Z_1560352436_RC24Q2AICWSZ_RTRMADP_3_UKRAINE-CRISIS-MOSCOW-DRONE-1692332865.jpg?resize=1920%2C1440",
        publishedAt: "2023-08-18T03:21:33Z",
        content:
          "A Ukrainian military drone crashed into a Moscow city building after it was shot down by air defence systems in the latest attack on the Russian capital by unmanned aerial vehicles.\r\nMoscow Mayor Ser… [+3256 chars]",
      },
      {
        source: {
          id: "abc-news",
          name: "ABC News",
        },
        author: "ANNE M. PETERSON AP Sports Writer",
        title:
          "Twila Kilgore tapped as interim coach for US women's national soccer team - ABC News",
        description:
          "Twila Kilgore will serve as interim coach of the U.S. women’s national team following the resignation of coach Vlatko Andonovski",
        url: "https://abcnews.go.com/Sports/wireStory/twila-kilgore-tapped-interim-coach-us-womens-national-102343246",
        urlToImage:
          "https://s.abcnews.com/images/Sports/wirestory_2946c91bfa4ac7797818ba30e1ac0f5d_16x9_992.jpg",
        publishedAt: "2023-08-18T03:20:35Z",
        content:
          "Twila Kilgore will serve as interim coach of the U.S. women's national soccer team following the resignation of coach Vlatko Andonovski, the U.S. Soccer Federation announced on Thursday. \r\nKilgore, t… [+4383 chars]",
      },
      {
        source: {
          id: "politico",
          name: "Politico",
        },
        author: null,
        title:
          "Prosecutors seek 30-year sentences for Proud Boys leaders in Jan. 6 case - POLITICO",
        description:
          "The proposed jail sentences would nearly double the lengthiest Jan. 6 sentence handed down to date.",
        url: "https://www.politico.com/news/2023/08/17/30-year-sentence-proud-boys-jan-6-00111796",
        urlToImage:
          "https://static.politico.com/40/a0/b3f6becc42adba5360742a8dedce/capitol-riot-proud-boys-44317.jpg",
        publishedAt: "2023-08-18T02:42:29Z",
        content:
          "Both Tarrio and Biggs were convicted of seditious conspiracy in May by a jury who also found allies Philadelphia Proud Boy leader Zachary Rehl and Seattle Proud Boy leader Ethan Nordean guilty of the… [+5492 chars]",
      },
      {
        source: {
          id: null,
          name: "The Guardian",
        },
        author: "Helen Sullivan",
        title:
          "US reportedly approves sending F-16 jets to Ukraine from Denmark and Netherlands - The Guardian",
        description:
          "Secretary of state Antony Blinken confers ‘full support’ for transfer of F-16s and training of pilots",
        url: "https://www.theguardian.com/world/2023/aug/18/us-reportedly-approves-sending-f-16-jets-to-ukraine-from-denmark-and-netherlands",
        urlToImage:
          "https://i.guim.co.uk/img/media/1e37e9566391acc7064b54541ebc2be626528a83/0_373_5633_3382/master/5633.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=039a5200aab6b64c743393f3a79f48ca",
        publishedAt: "2023-08-18T02:26:00Z",
        content:
          "The United States has approved sending F-16 fighter jets to Ukraine from Denmark and the Netherlands as soon as pilot training is completed, the US secretary of state, Antony Blinken, says in a lette… [+2878 chars]",
      },
      {
        source: {
          id: null,
          name: "NBCSports.com",
        },
        author: "Charean Williams",
        title:
          "Eagles WR Tyrie Cleveland leaves on stretcher with neck injury - NBC Sports",
        description:
          "Eagles receiver Tyrie Cleveland landed hard on his head and neck in the third quarter of Thursday's preseason game.",
        url: "https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/eagles-wr-tyrie-cleveland-taken-off-on-a-stretcher-with-neck-injury",
        urlToImage:
          "https://nbcsports.brightspotcdn.com/dims4/default/cc40e26/2147483647/strip/true/crop/8640x4860+0+450/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.amazonaws.com%2Fbrightspot%2Fdc%2Fb9%2F6937df2d41edbb81ee2058694b15%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F1560376582",
        publishedAt: "2023-08-18T02:00:49Z",
        content:
          "Eagles receiver Tyrie Cleveland landed hard on his head and neck in the third quarter of Thursdays preseason game. \r\nHe remained flat on his stomach after the play before medical personnel turned him… [+368 chars]",
      },
      {
        source: {
          id: "cnn",
          name: "CNN",
        },
        author: "Sara Murray",
        title:
          "Jeffrey Clark: Trump DOJ official urges judge to reject March 2024 trial date in Georgia case - CNN",
        description:
          "Former Justice Department official Jeffrey Clark – one of the 18 co-defendants indicted alongside Donald Trump in a sweeping racketeering case in Georgia – asked a judge Thursday to reject the Fulton County district attorney’s proposed March 2024 trial date, …",
        url: "https://www.cnn.com/2023/08/17/politics/jeffrey-clark-georgia-trial-date/index.html",
        urlToImage:
          "https://media.cnn.com/api/v1/images/stellar/prod/230814234854-jeffrey-clark-091420.jpg?c=16x9&q=w_800,c_fill",
        publishedAt: "2023-08-18T01:59:00Z",
        content:
          "Former Justice Department official Jeffrey Clark one of the 18 co-defendants indicted alongside Donald Trump in a sweeping racketeering case in Georgia asked a judge Thursday to reject the Fulton Cou… [+2063 chars]",
      },
      {
        source: {
          id: null,
          name: "Bloody Elbow",
        },
        author: "Anton Tabuena",
        title:
          "Sean O'Malley slams 'scumbag' MMA managers that are 'very close with the UFC' - Bloody Elbow",
        description:
          "UFC star Sean O'Malley is right to take shots at the very real problems with MMA management.",
        url: "https://bloodyelbow.com/2023/08/17/sean-omalley-slams-mma-managers-ufc-292/",
        urlToImage:
          "https://cdn.bloodyelbow.com/wp-content/uploads/2023/08/mma-ufc-269-omalley-vs-paiva-1016088641-1024x683.jpg",
        publishedAt: "2023-08-18T01:46:13Z",
        content:
          "Sean O’Malley is one of the UFC’s biggest stars. He recently landed lucrative sponsorships, and does a lot of press on top of running his own podcast and YouTube channel. He currently does all of tha… [+6736 chars]",
      },
      {
        source: {
          id: null,
          name: "NPR",
        },
        author: "Ravenna Koenig",
        title:
          "Maui County EMA director Herman Andaya resigns after scrutiny - NPR",
        description:
          "Herman Andaya has faced increasing scrutiny following last week's fires in Lahaina that killed more than 110 people. He's defended his decision not to activate emergency sirens as the town burned.",
        url: "https://www.npr.org/2023/08/17/1194539946/lahaina-maui-wildfires-hawaii-ema-herman-andaya-resigns",
        urlToImage:
          "https://media.npr.org/assets/img/2023/08/17/ap23230056267880_wide-586586d623ae4f7ca739db999ba6d3d058fc083c-s1400-c100.jpg",
        publishedAt: "2023-08-18T01:29:09Z",
        content:
          "Maui Emergency Management Agency Administrator Herman Andaya speaks during a news conference in Wailuku, Hawaii, Wednesday, Aug. 16, 2023.\r\nMike Householder/AP\r\nMAUI, Hawaii After facing criticism in… [+1251 chars]",
      },
      {
        source: {
          id: "reuters",
          name: "Reuters",
        },
        author: "David Ljunggren",
        title:
          "Canada wildfire: all 20000 Yellowknife residents evacuating - Reuters Canada",
        description:
          'Canadian fire crews on Thursday battled to prevent wildfires from reaching the northern city of Yellowknife, where all 20,000 residents are <a href="/world/americas/british-columbia-wildfire-strands-some-150-people-lodge-cbc-2023-08-16/">leaving by car and pl…',
        url: "https://www.reuters.com/world/americas/canada-wildfires-crews-battle-stop-blaze-yellowknife-evacuates-2023-08-17/",
        urlToImage:
          "https://www.reuters.com/resizer/_0mcTeb9k0KxJIqKOOayKTPLHNc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/LC2XLXLUPZMEPO2LMZCETKPVUY.jpg",
        publishedAt: "2023-08-18T01:10:00Z",
        content:
          "Aug 17 (Reuters) - Canadian fire crews on Thursday battled to prevent wildfires from reaching the northern city of Yellowknife, where all 20,000 residents are leaving by car and plane after an evacua… [+5662 chars]",
      },
      {
        source: {
          id: null,
          name: "The Guardian",
        },
        author: "Sian Cain",
        title:
          "Britney Spears' estranged husband Sam Asghari denies he will challenge prenup in their divorce - The Guardian",
        description:
          "Asghari says he and Spears will ‘hold onto the love and respect’ they have for each, after filing for divorce after 14 months of marriage",
        url: "https://www.theguardian.com/music/2023/aug/18/britney-spears-husband-sam-asghari-divorce-prenup-prenuptial-agreement",
        urlToImage:
          "https://i.guim.co.uk/img/media/fd59b953ff7f44f3970ab61166d0c2f5518ea067/0_63_4200_2519/master/4200.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=69bf776d1c642ca6c96f122905e57661",
        publishedAt: "2023-08-18T01:02:00Z",
        content:
          "Sam Asghari has denied he will challenge the prenuptial agreement he has with Britney Spears after filing for divorce after 14 months of marriage.\r\nIn a statement posted online on Thursday, the model… [+2818 chars]",
      },
      {
        source: {
          id: null,
          name: "NBC Bay Area",
        },
        author:
          "Jodi Hernandez, Velena Jones, Bob Redell, Kristofer Noceda, Bay City News",
        title: "East Bay police officers arrested in FBI raid - NBC Bay Area",
        description:
          "Here's what we know about the East Bay officers arrested during an FBI raid.",
        url: "https://www.nbcbayarea.com/news/local/fbi-pittsburg-antioch-officers-arrested/3297785/",
        urlToImage:
          "https://media.nbcbayarea.com/2023/08/Pittsburg-Antioch-Police-Departments.png?resize=1200%2C675&quality=85&strip=all",
        publishedAt: "2023-08-18T00:56:02Z",
        content:
          "Nine current and former police officers in the East Bay face federal charges after a raid Thursday by the Federal Bureau of Investigations.\r\nThe FBI's roundup of officers from the Antioch and Pittsbu… [+4902 chars]",
      },
      {
        source: {
          id: "nbc-news",
          name: "NBC News",
        },
        author: "Antonio Planas",
        title:
          "Pilot dies after mid-flight medical emergency, officials say - NBC News",
        description:
          "A veteran pilot for a Chilean airline died after a mid-flight medical emergency, the airline said.",
        url: "https://www.nbcnews.com/news/us-news/pilot-dies-flight-medical-emergency-officials-say-rcna100534",
        urlToImage:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-08/230817-latam-airlines-jet-2022-ac-805-d3dc03.jpg",
        publishedAt: "2023-08-18T00:42:00Z",
        content:
          "A veteran pilot for a Chilean airline died after a mid-flight medical emergency, the airline said.\r\nThe pilot was one of three crew members in command, Latam Airlines said. \r\nThe flight Monday from M… [+670 chars]",
      },
      {
        source: {
          id: null,
          name: "Dark Horizons",
        },
        author: "Garth Franklin",
        title: "Microsoft Closing Xbox 360 Store In 2024 - Dark Horizons",
        description:
          "Microsoft has announced it will close down the Xbox 360 Store next year. Specifically, users of the Xbox 360 console will no longer be able to buy content directly through the console or through the Xbox 360 Marketplace site from July 29th 2024. Players using…",
        url: "https://www.darkhorizons.com/microsoft-closing-xbox-360-store-in-2024/",
        urlToImage:
          "https://cdndh.darkhorizons.com/wp-content/uploads/2023/08/microsoft-closing-xbox-360-store-in-2024.jpg",
        publishedAt: "2023-08-18T00:39:23Z",
        content:
          "Microsoft has announced it will close down the Xbox 360 Store next year.\r\nSpecifically, users of the Xbox 360 console will no longer be able to buy content directly through the console or through the… [+1035 chars]",
      },
      {
        source: {
          id: null,
          name: "Motor1 ",
        },
        author: "Chris Bruce",
        title:
          "2025 Ford Mustang GTD Debuts With Over 800 HP, Pushrod Suspension, Starts At $300K - Motor1 ",
        description:
          "The 2025 Ford Mustang GTD just debuted as a limited-run, road-legal version of the GT3 race car. The starting price is around $300,000.",
        url: "https://www.motor1.com/news/682270/2025-ford-mustang-gtd/",
        urlToImage:
          "https://cdn.motor1.com/images/mgl/jl9yNg/s1/2025-ford-mustang-gtd.jpg",
        publishedAt: "2023-08-18T00:30:00Z",
        content:
          "The 2025 Ford Mustang GTD just debuted as a limited-run, road-legal version of the GT3 race car. Plus, it comes with technology like an adaptive suspension and active aerodynamics that are banned und… [+3939 chars]",
      },
      {
        source: {
          id: "nbc-news",
          name: "NBC News",
        },
        author: "Tom Winter, Dareh Gregorian",
        title:
          "Hunter Biden misdemeanor tax charges are dismissed — for now - NBC News",
        description:
          "A federal judge formally dismissed tax charges against Hunter Biden, but the president's son is expected to face the same or similar charges in the near future.",
        url: "https://www.nbcnews.com/politics/joe-biden/hunter-biden-misdemeanor-tax-charges-are-dismissed-now-rcna100527",
        urlToImage:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-07/230710-hunter-biden-se-450p-67d2b7.jpg",
        publishedAt: "2023-08-18T00:26:00Z",
        content:
          "A federal judge in Delaware formally dismissed misdemeanor tax charges against Hunter Biden on Thursday, but the president's son is expected to face the same charges or new ones in the near future.\r\n… [+2396 chars]",
      },
      {
        source: {
          id: "fox-news",
          name: "Fox News",
        },
        author: "Timothy Nerozzi",
        title:
          "Georgia state senator moves toward impeaching DA Fani Willis over Trump charges - Fox News",
        description:
          "Georgia state Sen. Colton Moore is demanding a special legislative session to consider the impeachment of Fulton County prosecutor Fani Willis.",
        url: "https://www.foxnews.com/politics/georgia-state-senator-moves-impeaching-da-fani-willis-trump-charges",
        urlToImage:
          "https://static.foxnews.com/foxnews.com/content/uploads/2023/08/Willis-Trump.jpg",
        publishedAt: "2023-08-17T23:46:00Z",
        content:
          "A state senator in Georgia is moving to impeach Fulton County District Attorney Fani Willis over the charges brought against former President Trump.\r\nGeorgia state Sen. Colton Moore is moving to impe… [+2512 chars]",
      },
      {
        source: {
          id: "financial-times",
          name: "Financial Times",
        },
        author: "Gloria Li, Gary Jones, William Langley",
        title:
          "Live news: China Evergrande files for bankruptcy in New York - Financial Times",
        description:
          "News, analysis and comment from the Financial Times, the worldʼs leading global business publication",
        url: "https://www.ft.com/content/0efc4936-9fe8-4e22-89c0-500c3516c0de",
        urlToImage: null,
        publishedAt: "2023-08-17T23:36:56Z",
        content:
          "What is included in my trial?\r\nDuring your trial you will have complete digital access to FT.com with everything in both of our Standard Digital and Premium Digital packages.\r\nStandard Digital includ… [+1494 chars]",
      },
      {
        source: {
          id: "business-insider",
          name: "Business Insider",
        },
        author: "Taylor Berman",
        title:
          "Mad at UPS workers making $170,000? Congress makes more and works less - Business Insider",
        description:
          "Members of Congress make $174,000 annually, and are only required to work about 155 days a year. UPS employees work much more.",
        url: "https://www.businessinsider.com/ups-worker-salary-benefits-congress-makes-more-and-works-less-2023-8",
        urlToImage:
          "https://i.insider.com/64de9990b698ac0019dbd2ff?width=1200&format=jpeg",
        publishedAt: "2023-08-17T23:08:00Z",
        content:
          "Earlier this summer, the Teamsters union secured a tentative contract agreement with UPS that could result in employees for the shipping company making up to $170,000 in annual pay and benefits in fi… [+1779 chars]",
      },
      {
        source: {
          id: "reuters",
          name: "Reuters",
        },
        author: "Reuters",
        title:
          "Moderna's updated COVID vaccine effective against 'Eris' variant in humans - Reuters",
        description:
          'Moderna <a href="https://www.reuters.com/markets/companies/MRNA.O" target="_blank">(MRNA.O)</a> said on Thursday an initial study data showed its updated COVID-19 vaccine to be effective against the "Eris" and "Fornax" subvariants in humans.',
        url: "https://www.reuters.com/business/healthcare-pharmaceuticals/modernas-updated-covid-vaccine-effective-against-eris-variant-humans-2023-08-17/",
        urlToImage:
          "https://www.reuters.com/resizer/Bn69e70U3aL3SXGvI08mekBy-p4=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/CQCROHCYVJOD5GJBOYX5MNZNOM.jpg",
        publishedAt: "2023-08-17T23:01:00Z",
        content:
          'Aug 17 (Reuters) - Moderna (MRNA.O) said on Thursday an initial study data showed its updated COVID-19 vaccine to be effective against the "Eris" and "Fornax" subvariants in humans.\r\nThe company expe… [+1386 chars]',
      },
      {
        source: {
          id: null,
          name: "Deadline",
        },
        author: "David Robb",
        title:
          "WGA And AMPTP Meet For Third Day In A Row; Studio CEOs Set To Huddle Friday - Deadline",
        description:
          "The Writers Guild and the AMPTP met Thursday for a third time this week in an attempt to hammer out a deal to end the ongoing writers’ strike. It remains uncertain whether they’ll meet …",
        url: "https://deadline.com/2023/08/writers-strike-update-studio-ceo-meeting-friday-1235522013/",
        urlToImage:
          "https://deadline.com/wp-content/uploads/2023/03/wga.jpg?w=1024",
        publishedAt: "2023-08-17T22:55:00Z",
        content:
          "The Writers Guild and the AMPTP met Thursday for a third time this week in an attempt to hammer out a deal to end the ongoing writers’ strike. It remains uncertain whether they’ll meet again Friday, … [+859 chars]",
      },
    ],
  };
  //   {
  //     source: {
  //       id: "politico",
  //       name: "Politico",
  //     },
  //     author: null,
  //     title:
  //       "Prosecutors seek 30-year sentences for Proud Boys leaders in Jan. 6 case - POLITICO",
  //     description:
  //       "The proposed jail sentences would nearly double the lengthiest Jan. 6 sentence handed down to date.",
  //     url: "https://www.politico.com/news/2023/08/17/30-year-sentence-proud-boys-jan-6-00111796",
  //     urlToImage:
  //       "https://static.politico.com/40/a0/b3f6becc42adba5360742a8dedce/capitol-riot-proud-boys-44317.jpg",
  //     publishedAt: "2023-08-18T02:42:29Z",
  //     content:
  //       "Both Tarrio and Biggs were convicted of seditious conspiracy in May by a jury who also found allies Philadelphia Proud Boy leader Zachary Rehl and Seattle Proud Boy leader Ethan Nordean guilty of the… [+5492 chars]",
  //   }
  return (
    <section className="section recent" aria-label="recent post">
      <div className="container">
        <div className="newsdata-heading">
          <div className="personalize">
            <h2>All News</h2>
            {/* <button>Personalize</button> */}
            <div className="modal-container">
              <button className="open-button" onClick={openModal}>
                Personalize
              </button>
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <div className="modal-header">
                      <h2>Modal Title</h2>
                      <button className="close-button" onClick={closeModal}>
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="modal-content">
                      {categories.map((data, i) => {
                        return (
                          <PersonalizeButton
                            category={data}
                            isInitialCat={istempInitialCat}
                            setIsInitialCat={settempIsInitialCat}
                            key={"modalcontent" + i}
                          />
                        );
                      })}
                      <div className="modal-close-btn">
                        <button className="close" onClick={closeModal}>
                          close
                        </button>
                        <button className="ok" onClick={okModal}>
                          ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="list-grid-i">
            <i
              className={`fa-solid fa-list ${listActive && "active"}`}
              onClick={() => setListActive(true)}
            ></i>
            <i
              className={`fa-solid fa-table-cells  ${!listActive && "active"}`}
              onClick={() => setListActive(false)}
            ></i>
          </div>
        </div>
        <ul className={listActive ? "list-view" : "grid-list"}>
          {/* grid-list */}
          {news &&
            news?.articles?.slice(0, sliceLength).map((data, i) => {
              return <NewsDataSection key={"blogcard" + i} data={data} />;
            })}
        </ul>
        {sliceLength < 50 && (
          <button className="btn" onClick={handleloadmore}>
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
