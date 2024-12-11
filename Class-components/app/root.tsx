import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { TheProvider } from '../src/contex/contex';
import App from '../src/old_app/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <TheProvider>
            <App>
              <Outlet />
            </App>
          </TheProvider>
        </Provider>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}
