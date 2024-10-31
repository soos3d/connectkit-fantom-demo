"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";

// Define the Lumia testnet
const LumiaTestnet = defineChain({
  id: 1952959480,
  name: "Lumia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LUMIA",
    symbol: "LUMIA",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.lumia.org"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet-explorer.lumia.org/" },
  },
  testnet: true,
});

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  walletConnectors: [
    authWalletConnectors({
      authTypes: ["email", "google", "apple", "twitter", "github"], // Optional, restricts the types of social logins supported
    }),
  ],

  chains: [LumiaTestnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
