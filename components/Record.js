import { useEffect, useRef, useState } from "react";
import { Details } from "./Details";

const browsers = ["Chrome", "Firefox", "Safari", "Edge"];

export function Record({ record, color, isFavorite: isFav }) {
  const [details, setDetails] = useState(null);
  const [activeBrowser, setActiveBrowser] = useState();
  const [isFavorite, setIsFavorite] = useState(isFav || false);

  const { fields } = record;
  const { Slug } = fields;

  const onClick = async (Browser) => {
    const details = {
      ...fields[Browser],
      Browser
    };
    setDetails((prevDetails) => {
      return prevDetails?.Browser === Browser ? null : details;
    });
    setActiveBrowser((prevBrowser) =>
      prevBrowser === Browser ? null : Browser
    );

    const url = new URL(window.location.href);
    const params = url.searchParams;
    params.set("id", Slug);
    params.set("browser", Browser);
    window.history.pushState({}, fields.Name, url);
  };

  const isMounted = useRef();
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const browser = params.get("browser");

      if (id === record.id || id === Slug) {
        onClick(browser);

        const target = document.getElementById(id);
        var headerOffset = document.getElementById("header").clientHeight;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });

  const onFavorite = () => {
    setIsFavorite(!isFavorite);

    let favorites = localStorage.getItem("cid_Favorites") || "[]";
    favorites = new Set(JSON.parse(favorites));

    if (favorites.has(record.id)) {
      favorites.delete(record.id);
    } else {
      favorites.add(record.id);
    }

    localStorage.setItem("cid_Favorites", JSON.stringify([...favorites]));
  };
  return (
    <>
      <div
        key={record.id}
        className={`d_grid gtc_320px`}
        id={Slug || record.id}
        style={{ borderLeft: `.25em solid ${color}` }}
      >
        <div className={`p_05em br_1px bb_1px pl_0`} data-color={color}>
          <button
            aria-label="Set as Favorite"
            title="Set as Favorite"
            style={{
              width: "auto",
              outline: "0px solid",
              textAlign: "left",
              padding: "0 .5em"
            }}
            onClick={onFavorite}
          >
            {isFavorite ? <span className="c_gold">★</span> : "☆"}
          </button>
          {fields.Name}
        </div>
        <div className={`d_grid gtc_4fr mh_3em`}>
          {browsers.map((browser) => {
            return (
              <div key={record.id + browser} className={`br_1px`}>
                <button
                  aria-label="Exists or not"
                  disabled={!Boolean(fields[browser])}
                  className={`p_05em but_1 ${
                    activeBrowser === browser ? "bgc_ws" : "bb_1px"
                  }`}
                  onClick={() => onClick(browser)}
                >
                  {fields[browser] ? (
                    <Yes color={color} />
                  ) : (
                    <No color={color} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {details ? <Details details={details} id={Slug || record.id} /> : null}
    </>
  );
}

const Yes = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M 3 3 L 3 21 L 21 21 L 21 13 L 21 6.4140625 L 11 16.414062 L 6.2929688 11.707031 L 7.7070312 10.292969 L 11 13.585938 L 21 3.5859375 L 21 3 L 3 3 z"></path>
  </svg>
);

const No = ({ color }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18"
    height="18"
    viewBox="0 0 96 96"
    fill={color}
  >
    <g
      transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path
        d="M150 480 l0 -330 330 0 330 0 0 330 0 330 -330 0 -330 0 0 -330z
m600 0 l0 -270 -270 0 -270 0 0 270 0 270 270 0 270 0 0 -270z"
      />
      <path d="M270 480 l0 -30 210 0 210 0 0 30 0 30 -210 0 -210 0 0 -30z" />
    </g>
  </svg>
);
