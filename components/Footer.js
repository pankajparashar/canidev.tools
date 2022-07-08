/* eslint:disable:* */
import { CarbonAds } from "../components/CarbonAds";

export function Footer() {
  return (
    <div className={`c_fff bot_0 bgc_333 bt_1px`} style={{ marginTop: "2.5em" }}>
      <details open>
        <summary className={`bgc_000 ai_center p_1em`}>About</summary>
        <div className={`d_grid gtc_320px`}>
          <div className="p_1em bb_1px_dark br_1px_dark pb_0 pt_0">
            <p className="has-dropcap">
                <strong>Can I DevTools?</strong> is like{" "}
                <a href="https://twitter.com/caniuse">@CanIUse</a> but for the
                browser devtools. It is created by{" "}
                <a href="https://twitter.com/pankajparashar">Pankaj Parashar</a>{" "}
                and curated by the community. There is a lot of coverage on browser devtools just exclusively
                focused on Chrome. This attempts to fix that by comparing and contrasting devtool features across
                all major browsers.
              </p>
            <dl>
              <dt>
                <strong>Github</strong> / <strong>Twitter:</strong>
              </dt>
              <dd className={`mb_1em`}>
                <a href="https://github.com/pankajparashar/canidev.tools">
                  canidev.tools
                </a>
                {" / "}
                <a href="https://twitter.com/CanIDevTools">@CanIDevTools</a>
              </dd>
            </dl>
          </div>
          <div className="p_1em bb_1px_dark br_1px_dark">

            <div className="wrapper"><iframe src="https://canidevtools.substack.com/embed" width="480" height="320" frameBorder="0" scrolling="no"></iframe></div>

            <div className="mt_1em">
              <button
                style={{ width: "auto" }}
                className="bb_1px_dashed"
                onClick={() => { }}
              >
                Day/Night
              </button>
              {" | "}
              <button
                style={{ width: "auto" }}
                className="bb_1px_dashed"
                onClick={() =>
                  document.body.scrollIntoView({ behavior: "smooth" })
                }
              >
                Top ↑
              </button>
            </div>
          </div>
          <div className="p_1em bb_1px_dark d_flex jc_center ai_center">
            <CarbonAds />
          </div>
        </div>
      </details>
    </div>
  );
}
