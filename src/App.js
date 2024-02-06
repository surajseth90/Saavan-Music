import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveWrapper from "./components/app/ResponsiveWrapper";
import { useEffect, useState } from "react";
import Album from "./components/Album";
import "react-h5-audio-player/lib/styles.css";
import MusicContext from "./context/MusicContext";
import AudioPlayer from "react-h5-audio-player";
import SearchedMusic from "./components/SearchedMusic";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const [dimension, setDimension] = useState();
  const [currentSong, setCurrentSong] = useState(null);
  const [langArr, setLangArr] = useState(["hindi"]);
  const [searchQuery, setSearchQuery] = useState("");

  const onResize = (data) => {
    setDimension(data);
  };

  useEffect(() => {
    if (currentSong === null) {
      setIsMusicPlayerVisible(true);
    } else {
      setIsMusicPlayerVisible(false);
    }
  }, [currentSong]);

  return (
    <div className="app">
      <ResponsiveWrapper
        breakpoints={{
          small: [0, 639],
          medium: [640, 1023],
          large: [1024, "~"],
        }}
        onResize={onResize}
      >
        <MusicContext.Provider
          value={{
            currentSong,
            setCurrentSong,
            langArr,
            setLangArr,
            searchQuery,
            setSearchQuery,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home dimension={dimension} />} />
              <Route path="/albums/:id" element={<Album type={"albums"} />} />
              <Route
                path="/playlists/:id"
                element={<Album type={"playlists"} />}
              />
              <Route path="/server-problem" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
          <div
            className={`music-player-container w-100 ${
              isMusicPlayerVisible ? "d-none" : ""
            }`}
          >
            <div className="wave-container w-100 h-100 position-absolute left-0 bottom-0 right-0 d-flex justify-content-center align-items-center">
              {/* <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div> */}

            </div>
            <AudioPlayer
              autoPlay
              src={currentSong?.downloadUrl[4]?.link}
              header={
                <div
                  className="py-3 text-white"
                  dangerouslySetInnerHTML={{ __html: currentSong?.name }}
                />
              }
              volume={0.5}
            />
          </div>
          <SearchedMusic />
        </MusicContext.Provider>
      </ResponsiveWrapper>
    </div>
  );
}

export default App;
