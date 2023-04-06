import { FirebaseProvider } from "@/components/firebase/FirebaseProvider";
import type { AppProps } from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./../app/globals.css";

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </FirebaseProvider>
  );
}
