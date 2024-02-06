import "./style.scss";
import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicContext from "../../context/MusicContext";

export default function Album({ type }) {
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { setCurrentSong } = useContext(MusicContext);

  useEffect(() => {
    getAlbumDetails();
  }, []);

  const getAlbumDetails = async () => {
    setLoading(true);

    await fetch(`https://saavn.me/${type}?id=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setAlbumData(res.data);
      })
      .catch((err) => {
        console.log("There is some issue with this albums: ", err);
      });
  };

  const convertTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`;
  };

  const downLoadClickHandler = (song) => {
    fetch(song.downloadUrl[3].link)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${song.name}.mp4`;

        // Trigger a click to start the download
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <>
      <Header />
      <main className={loading ? "full-page" : ""}>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="container">
            {albumData !== null && (
              <div className="album-container d-flex">
                <div className="album-details-wrapper">
                  <img
                    src={albumData.image[2]?.link}
                    alt={albumData.name}
                    className="w-100"
                  />
                  <h2
                    className="text-center mt-3"
                    dangerouslySetInnerHTML={{ __html: albumData.name }}
                  ></h2>
                </div>
                <div className="music-list-wrapper w-100">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Song</th>
                        <th>Singer</th>
                        <th>Duration</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {albumData.songs.map((song) => {
                        return (
                          <tr
                            key={song.id}
                            className="mt-3 text-white song-row"
                          >
                            <td>
                              <button
                                className="music-play-btn"
                                onClick={() => {
                                  setCurrentSong(song);
                                }}
                              >
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"></path>
                                  <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z"></path>
                                </svg>
                              </button>
                            </td>
                            <td>
                              <span
                                dangerouslySetInnerHTML={{ __html: song.name }}
                              ></span>
                            </td>
                            <td>
                              <span>{song.primaryArtists}</span>
                            </td>
                            <td>
                              <span>
                                {convertTime(song.duration).padEnd(4, 0)}
                              </span>
                            </td>
                            <td>
                              <button
                                className="music-play-btn"
                                onClick={() => downLoadClickHandler(song)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  id="Layer_1"
                                  data-name="Layer 1"
                                  viewBox="0 0 24 24"
                                  height="1em"
                                  width="1em"
                                  stroke="currentColor"
                                  fill="currentColor"
                                >
                                  <path d="M18.147,7.191c-.44-.098-.805-.377-1-.766-1.615-3.224-5.103-4.943-8.675-4.279-3.135,.582-5.669,3.081-6.306,6.218-.19,.933-.218,1.873-.083,2.796,.083,.567-.058,1.073-.387,1.387C.604,13.592,.001,14.996,0,16.5c0,3.136,2.364,5.5,5.5,5.5h10.736c4.13,0,7.611-3.234,7.758-7.211,.134-3.612-2.325-6.808-5.847-7.598Zm-1.911,13.809H5.5c-2.607,0-4.5-1.893-4.5-4.499,.001-1.229,.495-2.376,1.388-3.231,.566-.54,.815-1.361,.685-2.254-.118-.808-.093-1.633,.074-2.452,.556-2.742,2.77-4.926,5.508-5.435,.448-.083,.895-.123,1.335-.123,2.637,0,5.052,1.45,6.263,3.867,.33,.659,.941,1.131,1.676,1.295,3.051,.685,5.182,3.453,5.066,6.584-.128,3.445-3.16,6.248-6.759,6.248Zm-.969-6.854c.195,.195,.195,.512,0,.707l-2.707,2.707c-.258,.257-.588,.381-.925,.412-.044,.013-.087,.027-.135,.027s-.091-.015-.135-.027c-.337-.031-.668-.155-.925-.412l-2.707-2.707c-.195-.195-.195-.512,0-.707s.512-.195,.707,0l2.561,2.561v-7.207c0-.276,.224-.5,.5-.5s.5,.224,.5,.5v7.207l2.561-2.561c.195-.195,.512-.195,.707,0Z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
