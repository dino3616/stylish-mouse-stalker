import type { AppProps } from 'next/app';
import { FC } from 'react';
import MouseStalker from '../components/MouseStalker';
import '../styles/globals.css';

const CustomApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <div>
    <MouseStalker />
    <Component {...pageProps} />
  </div>
);

export default CustomApp;
