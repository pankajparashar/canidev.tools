import {
  IconBoxMargin,
  IconAccessible,
  IconReportMedical,
  IconTerminal2,
  IconCrosshair,
  IconBrandNextjs,
  IconAffiliate,
  IconHexagons,
  IconCode,
  IconBrandSpeedtest,
  IconDatabase,
  IconPlayCard,
  IconStar,
} from "@tabler/icons-react";

export const IconBrandPolypane = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-brand-polypane"
    width="25"
    height="25"
    viewBox="0 0 24 24"
    strokeWidth={props.stroke}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
  </svg>
);

export const IconBrandSubStack = (props) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={props.size}
    height={props.size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
    />
  </svg>
);

export const ICONS = {
  CSS: <IconBoxMargin size={20} stroke={1.5} />,
  Accessibility: <IconAccessible size={20} stroke={1.5} />,
  Audit: <IconReportMedical size={20} stroke={1.5} />,
  Console: <IconTerminal2 size={20} stroke={1.5} />,
  Elements: <IconCrosshair size={20} stroke={1.5} />,
  JavaScript: <IconBrandNextjs size={20} stroke={1.5} />,
  Network: <IconAffiliate size={20} stroke={1.5} />,
  Other: <IconHexagons size={20} stroke={1.5} />,
  Debugger: <IconCode size={20} stroke={1.5} />,
  Performance: <IconBrandSpeedtest size={20} stroke={1.5} />,
  Storage: <IconDatabase size={20} stroke={1.5} />,
  Tricks: <IconPlayCard size={20} stroke={1.5} />,
  Favorites: <IconStar size={20} stroke={1.5} />,
};
