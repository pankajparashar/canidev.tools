"use client"

import { NavLink, Grid } from "@mantine/core";

export function FeatureLayout({ features }) {
  return (

    <Grid>
      <Grid.Col span={4}>      {features.map((f) => (
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
      ))}</Grid.Col>
      <Grid.Col span={8}>2</Grid.Col>
    </Grid>

  );
}
