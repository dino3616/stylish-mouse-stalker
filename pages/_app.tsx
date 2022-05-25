import type { AppProps } from 'next/app';
import { FC } from 'react';
import MouseStalker from '../components/MouseStalker';
import MouseProvider from '../contexts/MouseContext';
import '../styles/globals.css';

const CustomApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <div>
    <MouseProvider>
      <MouseStalker />
    </MouseProvider>
    <Component {...pageProps} />
  </div>
);

export default CustomApp;
