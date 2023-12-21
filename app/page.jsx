"use client";

import { Paper } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function Page() {
    const { height } = useViewportSize();
    return (
        <Paper className="column d_flex ai_center" w="100%" withBorder style={{ borderTop: 0, borderBottom: 0 }}>
            <iframe height={Math.min(800, height - 50)} id="testimonialto-f12-tag-all-light-animated" src="https://embed-v2.testimonial.to/w/f12?animated=on&theme=dark&shadowColor=ffffff&speed=0.75&tag=all" frameborder="0" width="100%"></iframe>
        </Paper>
    );
}
