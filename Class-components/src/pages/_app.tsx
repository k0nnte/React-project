import { AppProps } from 'next/app';
import '../App.scss';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { TheProvider } from '../contex/contex';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TheProvider>
        <Component {...pageProps} />
      </TheProvider>
    </Provider>
  );
}
