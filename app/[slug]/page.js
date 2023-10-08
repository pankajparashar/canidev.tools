"use client";

import { useContext } from "react";
import { DataContext } from "../../components/data-provider";

import { ScrollArea, Timeline, Text } from "@mantine/core";
import { IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair } from "@tabler/icons-react";

export default function Page({ params }) {
    const { features } = useContext(DataContext);
    const feature = features.find(f => f.Slug === params.slug);

    const icons = {
        CSS: <IconBoxMargin stroke={1.5} />,
        Accessibility: <IconAccessible stroke={1.5} />,
        Audit: <IconReportMedical stroke={1.5} />,
        Console: <IconTerminal2 stroke={1.5} />,
        Elements: <IconCrosshair stroke={1.5} />,
        JavaScript: <IconBrandNextjs stroke={1.5} />,
        Network: <IconAffiliate stroke={1.5} />,
        Other: <IconHexagons stroke={1.5} />,
        Sources: <IconCode stroke={1.5} />,
        Performance: <IconBrandSpeedtest stroke={1.5} />,
    };

    return <ScrollArea></ScrollArea>;
}

const IconBrandPolypane = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-polypane" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
    </svg>
);
