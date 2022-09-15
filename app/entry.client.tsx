import { hydrate } from 'react-dom';
import { RemixBrowser } from '@remix-run/react';
import { ClientProvider } from '@mantine/remix';

hydrate(<ClientProvider><RemixBrowser /></ClientProvider>, document);
