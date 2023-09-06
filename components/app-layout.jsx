"use client"

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, NavLink, ScrollArea, Anchor, Breadcrumbs } from '@mantine/core';

export function AppLayout({ categories, children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Breadcrumbs>
            <Anchor href="/">canidev.tools</Anchor>
          </Breadcrumbs>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" pt="0">
        <AppShell.Section grow my="md" component={ScrollArea}>
          {Object.entries(categories).map(([category, count]) => (
            <NavLink
              key={category}
              variant="subtle"
              label={category}
              rightSection={count}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-md)",
                },
              }}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
