import { FirebaseProvider } from "@/components/firebase/FirebaseProvider";
import type { AppProps } from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./../app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </QueryClientProvider>
  );
}
