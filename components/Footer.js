/* eslint:disable:* */
import { CarbonAds } from "../components/CarbonAds";

export function Footer() {
  return (
    <div className={`c_fff bot_0 bgc_333`}>
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
            <dl>
              <dt className="fw_bold">Newsletter:</dt>
              <dd>
                Get weekly tips &amp; tricks for your favorite browser devtools,
              </dd>
            </dl>
            <form
              action="https://www.getrevue.co/profile/CanIDevTools/add_subscriber"
              method="post"
              id="revue-form"
              name="revue-form"
              target="_blank"
              style={{ overflow: "hidden" }}
            >
              <div className="pt_1em">
                <input
                  placeholder="Enter your Email Id..."
                  type="email"
                  name="member[email]"
                  id="member_email"
                  className="mr_1em"
                  autoComplete="off"
                />
                <input
                  type="submit"
                  value="Subscribe"
                  name="member[subscribe]"
                  id="member_submit"
                  className="mt_1em"
                />
              </div>
            </form>
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
