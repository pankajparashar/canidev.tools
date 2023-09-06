"use client"

import { NavLink, Grid } from "@mantine/core";

export function FeatureLayout({ features }) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        {features.map((f) => (
          <NavLink
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-md)",
              },
              description: {
                fontSize: "var(--mantine-font-size-md)",
              },
            }}
            key={f.Slug}
            label={f.Name}
            description={f.Description}
          />
        ))}
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>2</Grid.Col>
    </Grid>
  );
}
