import { TranslationProvider } from '../translations';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  );
}

export default MyApp;
