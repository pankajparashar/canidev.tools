import { useEffect, useRef } from "react";

export function CarbonAds() {
  const adContainerRef = useRef();
  const adRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools";
    script.async = true;
    script.id = "_carbonads_js";
    adRef.current.appendChild(script);
  }, []);

  const onClick = () => {
    adContainerRef.current.style.visibility = "hidden";
  };

  return (
    <div className="carbon-cad-container" ref={adContainerRef}>
      <div ref={adRef} className="carbon-cad" />
      {/* <div className="carbon-cad_close-btn" onClick={onClick}>
        Hide
      </div> */}
    </div>
  );
}
