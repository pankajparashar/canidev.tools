import { marked } from "marked";

export function Details({ details, id }) {
  const {
    Video,
    Image,
    Name,
    Notes,
    References,
    Browser,
    Platform,
    LastModified,
    Share,
    Version
  } = details;

  const countOfReferences = References
    ? (References.match(new RegExp("http", "g")) || []).length
    : 0;

  return (
    <div className={`d_grid gtc_320px bgc_ws`}>
      <div className={`br_1px bb_1px p_1em`}>
        {Video ? (
          <details open>
            <summary className={`fw_bold`}>Video</summary>
            <video controls key={Video} preload="metadata">
              <source src={Video + "#t=0.1"} type="video/mp4" />
            </video>
          </details>
        ) : null}

        {Image ? (
          <details open>
            <summary className={`fw_bold`}>Image</summary>
            <img src={Image} alt="" width="100%" className={`b_1px`} />
          </details>
        ) : null}

        {!Video && !Image ? (
          <a
            href={`https://github.com/pankajparashar/canidev.tools/issues/new?&labels=Improve&template=custom.md&title=${Name}`}
            rel="noreferrer"
            target="_blank"
          >
            +Add
          </a>
        ) : null}
      </div>
      <div className={`br_1px bb_1px p_1em`}>
        <details open>
          <summary className={`fw_bold`}>Notes</summary>
          <div
            dangerouslySetInnerHTML={{
              __html: Notes ? marked.parse(Notes) : ""
            }}
          />
        </details>
        <details>
          <summary className={`fw_bold`}>
            References
            {`(${countOfReferences})`}
          </summary>
          <div
            dangerouslySetInnerHTML={{
              __html: References ? marked.parse(References) : ""
            }}
          />
        </details>
      </div>
      <div className={`p_1em bb_1px`}>
        <dl>
          <dt className={`fw_bold`}>Browser:</dt>
          <dd className={`mb_1em`}>
            {Browser}
            {Version ? `(${Version})` : null}
          </dd>

          <dt className={`fw_bold`}>Platform:</dt>
          <dd className={`mb_1em`}>{Platform?.map((p) => p).join(", ")}</dd>

          <dt className={`fw_bold`}>Last Modified:</dt>
          <dd className={`mb_1em`}>
            {new Date(LastModified).toLocaleString()}
          </dd>

          <dt>
            <a
              href={`https://github.com/pankajparashar/canidev.tools/issues/new?&labels=Improve&template=custom.md&title=${Name}`}
              rel="noreferrer"
              target="_blank"
            >
              Issue
            </a>
            {" | "}
            <a
              href={`https://twitter.com/intent/tweet?text=${Share}&via=canidev_tools`}
              rel="noreferrer"
              target="_blank"
            >
              Share
            </a>
          </dt>
        </dl>
      </div>
    </div>
  );
}
