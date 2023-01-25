import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import ContractProvider from "@/providers/ContractProvider";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [hardhat, goerli],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Job",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <ContractProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ContractProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
