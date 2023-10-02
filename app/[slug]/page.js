import * as fs from "fs";
import path from "path";

import { SimpleGrid, Divider, Button, Alert } from "@mantine/core";
import { IconCheckbox, IconMinus } from "@tabler/icons-react";

export default function Page({ params }) {
    const filename = path.join("features", params.slug + ".json");
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} key={feature.Slug} verticalSpacing={0}>
            <div>
                <Alert variant="transparent" title={feature.Name}>
                    {feature.Description}
                </Alert>
            </div>
            <div>
                <SimpleGrid cols={6} h="100%">
                    <div>
                        <Button variant="transparent">{feature.Chrome ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                    <div>
                        <Button variant="transparent">{feature.Firefox ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                    <div>
                        <Button variant="transparent">{feature.Edge ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                    <div>
                        <Button variant="transparent">{feature.Safari ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                    <div>
                        <Button variant="transparent">{feature.Opera ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                    <div>
                        <Button variant="transparent">{feature.Polypane ? <IconCheckbox /> : <IconMinus />}</Button>
                    </div>
                </SimpleGrid>
                <Divider />
            </div>
        </SimpleGrid>
    );
}
