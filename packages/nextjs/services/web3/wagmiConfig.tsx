// // Original path: packages/nextjs/services/web3/wagmiConfig.tsx
// import { createConfig } from "wagmi";
// import { appChains, wagmiConnectors } from "~~/services/web3/wagmiConnectors";
// import scaffoldConfig from "~~/scaffold.config";
import { ParticleNetwork } from "@particle-network/auth";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

new ParticleNetwork({
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID || "",
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY || "",
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID || "",
});

const { chains, publicClient, webSocketPublicClient } = configureChains([sepolia], [publicProvider()]);

const particleWallets = [
  particleWallet({ chains, authType: "google" }),
  particleWallet({ chains, authType: "facebook" }),
  particleWallet({ chains, authType: "apple" }),
  particleWallet({ chains }),
];

const popularWallets = {
  groupName: "Popular",
  wallets: [
    ...particleWallets,
    injectedWallet({ chains }),
    rainbowWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
    coinbaseWallet({ appName: "RainbowKit demo", chains }),
    metaMaskWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
    walletConnectWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
  ],
};

const connectors = connectorsForWallets([
  popularWallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
      trustWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
      omniWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
      imTokenWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
      ledgerWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// export const wagmiConfig = createConfig({
//   autoConnect: false,
//   connectors: wagmiConnectors,
//   publicClient: appChains.publicClient,
// });
