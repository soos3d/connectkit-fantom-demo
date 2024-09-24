"use client";

// Particle imports
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import {
  evmWalletConnectors,
  passkeySmartWallet,
} from "@particle-network/connectkit/evm";
import { fuse, fuseSparknet } from "@particle-network/connectkit/chains";

import { EntryPosition, wallet } from "@particle-network/connectkit/wallet";

import React from "react";

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  appearance: {
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "coinbaseWallet", label: "popular" },
    ],
    language: "en-US",
    mode: "light", // dark or auto.
    theme: {
      // Modal
      "--pcm-overlay-background": "rgba(0, 0, 0, 0.5)", // Softer, more transparent overlay
      "--pcm-overlay-backdrop-filter": "blur(4px)", // Gentle blur effect
      "--pcm-modal-box-shadow": "0px 0px 12px rgba(255, 255, 255, 0.3)", // Subtle white shadow

      // Background
      "--pcm-body-background": "#EAF7E4", // Light pastel green background
      "--pcm-body-background-secondary": "#DFF4E0", // Slightly darker pastel green
      "--pcm-body-background-tertiary": "#C7EBC6", // Another variation of soft green

      // Foreground (Text Colors)
      "--pcm-body-color": "#1B3B1A", // Dark green text for readability
      "--pcm-body-color-secondary": "#1F481B", // Slightly lighter dark green text
      "--pcm-body-color-tertiary": "#2B5F26", // Softer mid-green text

      "--pcm-body-action-color": "#2C7F4A", // Darker green for actions (buttons, hover, etc.)
      "--pcm-accent-color": "#2C7F4A", // Accent color in line with the button actions
      "--pcm-focus-color": "#1F481B", // Focus color similar to secondary green

      // Button
      "--pcm-button-font-weight": "500",
      "--pcm-button-hover-shadow": "0px 0px 8px rgba(255, 255, 255, 0.2)", // Light white shadow on hover
      "--pcm-button-border-color": "#2C7F4A", // Dark green border for buttons

      // Primary Button
      "--pcm-primary-button-color": "#FFFFFF", // White text for contrast
      "--pcm-primary-button-bankground": "#2C7F4A", // Dark green background for primary buttons
      "--pcm-primary-button-hover-background": "#265F39", // Slightly darker green on hover

      // Font
      "--pcm-font-family": `'Segoe UI', Helvetica, Arial, sans-serif`, // Clean sans-serif font for modern style

      // Radius
      "--pcm-rounded-sm": "6px", // Keep the original rounded values
      "--pcm-rounded-md": "12px",
      "--pcm-rounded-lg": "18px",
      "--pcm-rounded-xl": "24px",
      "--pcm-rounded-full": "9999px",

      "--pcm-success-color": "#2C7F4A", // Dark green for success
      "--pcm-warning-color": "#E0A600", // Muted yellow for warning
      "--pcm-error-color": "#E04A4A", // Soft red for error

      "--pcm-wallet-lable-color": "#1F481B", // Dark green label for wallets
    },
  },

  walletConnectors: [
    evmWalletConnectors({
      // Replace this with your app metadata.
      metadata: {
        name: "Connectkit Demo",
        icon:
          typeof window !== "undefined"
            ? `${window.location.origin}/favicon.ico`
            : "",
        description: "Particle Connectkit Next.js Scaffold.",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      walletConnectProjectId: process.env
        .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),

    authWalletConnectors({
      authTypes: [
        "email",
        "google",
        "twitter",
        "github",
        "apple",
        "discord",
        "linkedin",
      ], // Optional, restricts the types of social logins supported
    }),
  ],

  plugins: [
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR, // Use BR (bottom right), BL (bottom left), TR (top right), TL (top left) to move the wallet entry position
    }),
  ],

  // List the chains you want to include
  chains: [fuse, fuseSparknet],
});

// Wrap your application with this exported component, or ConnectKitProvider directly.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
