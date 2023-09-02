import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css';

import theme from '~/styles/theme';
import { CHAIN } from '~/constants';

const { chains, publicClient } = configureChains(
  [...CHAIN],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Test App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={wagmiConfig.queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
              <ToastContainer transition={Bounce} position="bottom-left" />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
