import "./style.scss";
import { useContext, useEffect, useRef, useState } from "react";
import MusicContext from "../../context/MusicContext";

function SearchMusic() {
  const { searchQuery, setCurrentSong, setSearchQuery } =
    useContext(MusicContext);
  const [musicList, setMusicList] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      document.body.style.overflow = "hidden";
      findSearchData();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchQuery]);

  const findSearchData = () => {
    if (timeoutRef.current && timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      timeoutRef.current = null;
      await fetch(`https://saavn.me/search/songs?query=${searchQuery}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setMusicList(res.data.results);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("There is some issue while loadng songs : ", err);
        });
    }, 500);
  };

  return (
    <section
      className={`search-item-section ${
        searchQuery.length > 0 ? "search-item-section-visible" : ""
      }`}
    >
      <div className="container">
        {musicList.length > 0 ? (
          <ul className="d-flex flex-wrap song-cards-wrapper justify-content-center">
            {musicList &&
              musicList.length > 0 &&
              musicList.map((song) => {
                return (
                  <li key={song.id} className="song-card">
                    <button
                      className="position-relative"
                      onClick={() => {
                        setCurrentSong(song);
                        setSearchQuery("");
                      }}
                    >
                      <div className="img-wrapper">
                        <img
                          src={song.image[2].link}
                          className="w-100"
                          alt={song.name}
                        />
                        <div className="shadow text-white">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="5em"
                            width="5em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"></path>
                            <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="text-white">{song.name}</p>
                    </button>
                  </li>
                );
              })}
          </ul>
        ) : (
          <div className="w-100 h100 d-flex justify-content-center align-items-center">
            <h2>No Music Found</h2>
          </div>
        )}
      </div>
    </section>
  );
}
export default SearchMusic;
