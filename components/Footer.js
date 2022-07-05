/* eslint:disable:* */
import { CarbonAds } from "../components/CarbonAds";

export function Footer() {
  return (
    <div className={`c_fff bot_0 bgc_333 bt_1px`} style={{ marginTop: "2.5em" }}>
      <div className={`pos_abs right_0 p_1em`}>
        <button data-tally-open="3XxGGP">+Add</button>
      </div>
      <details open>
        <summary className={`p_1em bgc_000`}>About</summary>
        <div className={`d_grid gtc_320px`}>
          <div className="p_1em bb_1px_dark br_1px_dark pb_0 pt_0">
            <ol>
              <li>
                <strong>Can I DevTools?</strong> is like{" "}
                <a href="https://twitter.com/caniuse">@CanIUse</a> but for the
                browser devtools. It is created by{" "}
                <a href="https://twitter.com/pankajparashar">Pankaj Parashar</a>{" "}
                and curated by the community.
              </li>
              <li>
                There is a lot of coverage on browser devtools just exclusively
                focused on Chrome. <strong>Can I DevTools</strong> attempts to
                fix that by comparing and contrasting devtool features across
                all major browsers.
              </li>
            </ol>
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

            <div className="wrapper"><iframe src="https://canidevtools.substack.com/embed" width="480" height="320" frameborder="0" scrolling="no"></iframe></div>

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
