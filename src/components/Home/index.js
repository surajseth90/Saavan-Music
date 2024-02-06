import "./style.scss";
import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import AlbumWrapper from "./albumWrapper";
import MusicContext from "../../context/MusicContext";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const { dimension } = props;
  const [musicData, setMusicData] = useState(null);
  const { langArr } = useContext(MusicContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getMusicData(langArr.toString());
  }, [langArr]);

  const getMusicData = async (lang) => {
    await fetch(`https://saavn.me/modules?language=${lang}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setMusicData(res.data);
      })
      .catch((err) => {
        console.log("There is some issue while loadng songs : ", err);
        setTimeout(() => {
          navigate("/server-problem")          
        }, 1000);
      });
  };
  return (
    <>
      {loading ? (
        <div className="full-page" style={{ height: "100vh" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Header />
          <main className={loading ? "full-page" : ""}>
            <div className="container">
              {musicData &&
                musicData.trending.albums &&
                musicData.trending.albums?.length > 0 && (
                  <AlbumWrapper
                    id={"trending"}
                    dimension={dimension}
                    albumTitle={"TRENDING"}
                    album={musicData.trending.albums}
                  />
                )}

              {musicData &&
                musicData.playlists &&
                musicData.playlists.length > 0 && (
                  <AlbumWrapper
                    id={"playlists"}
                    dimension={dimension}
                    albumTitle={"TOP PLAYLISTS"}
                    album={musicData.playlists}
                  />
                )}

              {musicData && musicData.albums && musicData.albums.length > 0 && (
                <AlbumWrapper
                  id={"albums"}
                  dimension={dimension}
                  albumTitle={"TOP ALBUM"}
                  album={musicData.albums}
                />
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
