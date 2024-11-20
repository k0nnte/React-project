import { AppProps } from 'next/app';
import '../App.scss';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { TheProvider } from '../contex/contex';
// import App from './index';
import Loyaut from './loyaut';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TheProvider>
        <Loyaut>
          {/* <App children={<Component {...pageProps} />} /> */}
          <Component {...pageProps} />
        </Loyaut>
      </TheProvider>
    </Provider>
  );
}
