"use client";

import { useContext } from "react";

import { Paper, NavLink, SimpleGrid, Button, Box, TextInput } from "@mantine/core";
import { IconCheckbox, IconChevronRight, IconMinus, IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera } from "@tabler/icons-react";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

import { DataContext } from "../components/data-provider";

export default function Page({ children }) {
    const { features } = useContext(DataContext);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <Paper className="column" shadow="xs" withBorder visibleFrom="md">
            1
        </Paper>
    );
}

const IconBrandPolypane = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-polypane" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
    </svg>
);
