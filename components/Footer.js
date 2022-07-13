/* eslint:disable:* */
import { CarbonAds } from "../components/CarbonAds";

export function Footer() {
  return (
    <div className={`c_fff bot_0 bgc_333 bt_1px`} style={{ marginTop: "2.5em" }}>
      <details open>
        <summary className={`bgc_000 ai_center p_1em`}>About</summary>
        <div className={`d_grid gtc_320px`}>
          <div className="p_1em bb_1px_dark br_1px_dark pb_0 pt_0">
            <p style={{ textIndent: "3em" }}>
                <strong>Can I DevTools?</strong> is like{" "}
                <a href="https://twitter.com/caniuse">@CanIUse</a> but for the
                browsers devtools. It is created by{" "}
                <a href="https://twitter.com/pankajparashar">Pankaj Parashar</a>{" "}
                and curated by the community.</p> 
            <p style={{ textIndent: "3em" }}>
              There is a lot of coverage on browser devtools just exclusively
                focused on Chrome. This attempts to fix that by comparing and contrasting devtool features across
                all major browsers.
              </p>
              <div className="d_grid gap_5px ta_center" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="bgc_000 p_05em"><a href="https://github.com/pankajparashar/canidev.tools">Github</a></div>
                <div className="bgc_000 p_05em"><a href="https://twitter.com/CanIDevTools">Twitter</a></div>
                <div className="bgc_000 p_05em"><a href="https://canidevtools.substack.com/feed">RSS</a></div>
              </div>
          </div>
          <div className="p_1em bb_1px_dark br_1px_dark">

            <div className="wrapper"><iframe src="https://canidevtools.substack.com/embed" width="480" height="320" frameBorder="0" scrolling="no"></iframe></div>

          </div>
          <div className="p_1em bb_1px_dark d_flex jc_center ai_center fd_col gap_1em">
            <CarbonAds />
            <div className="d_grid gap_5px" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <button
                onClick={() => { }}
              >
                Day/Night
              </button>
              <button
                onClick={() =>
                  document.body.scrollIntoView({ behavior: "smooth" })
                }
              >
                Top ↑
              </button>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
