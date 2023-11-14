import { Stack, Skeleton } from "@mantine/core";

export default function Loading() {
    return (
        <Stack p="md">
            <Skeleton height={250} />
            <Skeleton height={250} />
        </Stack>
    );
}
