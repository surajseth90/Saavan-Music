import "./style.scss";
import SearchIcon from "../../assets/images/search-icon.png";
import Checkbox from "../app/Checkbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicContext from "../../context/MusicContext";

export default function Header() {
  const [focusInput, setInputFocus] = useState(false);
  const dropDownBtnRef = useRef(null);
  const navigate = useNavigate();
  const { setLangArr, searchQuery, setSearchQuery } = useContext(MusicContext);

  const langHandler = () => {
    const langCheckboxes = document.querySelectorAll(".lang-checkbox");
    const valArr = [];
    const labelArr = [];
    let checkedLength = 0;
    let lastCheckbox = null;
    langCheckboxes.forEach((ch) => {
      if (ch.checked) {
        lastCheckbox = ch;
        checkedLength++;
        valArr.push(ch.value);
        labelArr.push(ch.id);
      }
    });
    if (checkedLength === 1) {
      lastCheckbox.disabled = true;
    } else {
      langCheckboxes.forEach((ch) => {
        ch.disabled = false;
      });
    }
    dropDownBtnRef.current.innerHTML = labelArr;
    return valArr;
  };

  const langOnChangeHandler = () => {
    const arr = langHandler();
    setLangArr(arr);
  };

  useEffect(() => {
    langHandler();
  }, []);

  return (
    <header style={{ marginBottom: "40px" }}>
      <div className="container d-flex justify-content-between">
        <div className="header-left">
          <button onClick={() => navigate("/")}>
            <h1 className="text-white">SAAVAN</h1>
          </button>
        </div>
        <div className="header-right d-flex">
          <nav className="d-flex">
            <div
              className={`dropdown d-flex ${
                searchQuery.length > 0 || focusInput ? "visually-hidden" : ""
              }`}
            >
              <button
                className="btn btn-secondary text-white lang-span"
                ref={dropDownBtnRef}
              >
                Hindi
              </button>
              <button
                className="btn btn-secondary dropdown-toggle text-white d-flex align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Checkbox
                    classes="lang-checkbox"
                    value="hindi"
                    label="Hindi"
                    id="Hindi"
                    defaultChecked={true}
                    onChange={langOnChangeHandler}
                  />
                </li>
                <li>
                  <Checkbox
                    classes="lang-checkbox"
                    value="english"
                    label="English"
                    id="English"
                    onChange={langOnChangeHandler}
                  />
                </li>
                <li>
                  <Checkbox
                    classes="lang-checkbox"
                    value="punjabi"
                    label="Punjabi"
                    id="Punjabi"
                    onChange={langOnChangeHandler}
                  />
                </li>
                <li>
                  <Checkbox
                    classes="lang-checkbox"
                    value="marathi"
                    label="Marathi"
                    id="Marathi"
                    onChange={langOnChangeHandler}
                  />
                </li>
              </ul>
            </div>
            {/* <button className="text-white px-3">Upcoming Movies</button> */}
            {/* <button className="text-white px-3">Account</button> */}
          </nav>
        </div>

        <div
          className={`input-wrapper d-flex position-absolute ${
            focusInput ? "focused" : ""
          }`}
        >
          <img src={SearchIcon} alt="search" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search Music"
            className={`ps-4 w-100 text-white `}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setInputFocus(true);
            }}
            onBlur={() => {
              setInputFocus(false);
            }}
          />
        </div>
      </div>
    </header>
  );
}
