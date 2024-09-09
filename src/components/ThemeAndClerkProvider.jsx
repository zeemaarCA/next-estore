'use client';

import { ThemeProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";

export default function ThemeAndClerkProvider({ children }) {
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark : light;

  return (
    <ThemeProvider defaultTheme="light">
      <ClerkProvider
        appearance={{
          baseTheme: clerkTheme,
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
}