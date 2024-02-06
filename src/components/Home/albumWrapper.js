import MusicCard from "../Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function AlbumWrapper(props) {
  const navigate = useNavigate();

  const { albumTitle, dimension, album, id } = props;
  return (
    <div className="albums-container" style={{ marginBottom: "60px" }}>
      <div className="d-flex justify-content-between">
        <h2 className="font-24" dangerouslySetInnerHTML={{ __html: albumTitle }}></h2>

        <div className="navigation-btn-wrapper">
          <button id={`left-${id}-btn`} className="text-white ">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
            </svg>
          </button>
          <button id={`right-${id}-btn`} className="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="albums-wrapper d-flex">
        <Swiper
          navigation={{
            prevEl: `#left-${id}-btn`,
            nextEl: `#right-${id}-btn`,
          }}
          modules={[Navigation]}
          spaceBetween={28}
          slidesPerView={
            dimension?.windowSize > 1080
              ? 5
              : dimension?.windowSize > 768
                ? 4
                : dimension?.windowSize > 425
                  ? 2
                  : 1
          }
        >
          {album &&
            album.length > 0 &&
            album.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <button
                    onClick={() => {
                      if (id === "playlists") {
                        navigate(`/playlists/${data.id}`);
                      } else {
                        navigate(`/albums/${data.id}`);
                      }
                    }}
                  >
                    <MusicCard CardData={data} />
                  </button>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
