'use client';
import '../App.scss';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { TheProvider } from '../contex/contex';
import App from './app';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <TheProvider>
            <App>{children}</App>
          </TheProvider>
        </Provider>
      </body>
    </html>
  );
}
