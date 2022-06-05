/* eslint:disable:* */

export function Footer() {
  return (
    <div className={`c_fff bot_0 bgc_333`}>
      <div className={`pos_abs right_0 p_1em`}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/pankajparashar/canidev.tools/issues/new?&labels=Add&template=custom.md"
        >
          +Add
        </a>
      </div>
      <details>
        <summary className={`p_1em bgc_000`}>Info</summary>
        <div className={`p_1em d_grid gtc_320px gap_1em`}>
          <div className={``}>
            <p className="mt_0">
              Can I DevTools is like{" "}
              <a href="https://caniuse.com/">caniuse.com</a> but for the browser
              devtools, created and curated by{" "}
              <a href="https://pankajparashar.com/">Pankaj Parashar</a>.
            </p>
            <p>
              There is a lot of coverage on browser devtools just exclusively
              focussed on Chrome. This tool attempts to fix that by comparing
              and contrasting devtool features across all major browsers.
            </p>
          </div>
          <div className="mr_1em">
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
            >
              <div className="pt_1em mr_1em">
                <input
                  placeholder="Enter your Email Id..."
                  type="email"
                  name="member[email]"
                  id="member_email"
                  className="mr_1em"
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
          </div>
          <div className={``}>
            <dl>
              <dt>
                <strong>Github:</strong>
              </dt>
              <dd className={`mb_1em`}>
                <a href="https://github.com/pankajparashar/canidev.tools">
                  canidev.tools
                </a>
              </dd>
              <dt>
                <strong>Twitter:</strong>
              </dt>
              <dd className={`mb_1em`}>
                <a href="https://twitter.com/CanIDevTools">@CanIDevTools</a>
              </dd>
              {/* <dd className={``}>
                <a
                  role="button"
                  onClick={() =>
                    document.body.scrollIntoView({ behavior: "smooth" })
                  }
                  href="javascript:void(0)"
                  rel="noreferrer"
                >
                  Top↑
                </a>
              </dd> */}
            </dl>
          </div>
        </div>
      </details>
    </div>
  );
}
