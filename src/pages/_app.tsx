import { useNextServerSidePropsInterception } from "@/intercept-getServerSideProps";
import { createQueryClient } from "@/query-client";
import "@/styles/globals.css";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [interceptEnabled, setInterceptEnabled] = useState(false);
  const queryClient = useMemo(() => createQueryClient(), []);

  useNextServerSidePropsInterception({
    enabled: interceptEnabled,
  });

  // Query client setup inspired by
  // https://tanstack.com/query/latest/docs/react/examples/react/nextjs

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <InterceptionBar
          interceptEnabled={interceptEnabled}
          toggleIntercept={() => setInterceptEnabled((enabled) => !enabled)}
        />

        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

function InterceptionBar({
  interceptEnabled,
  toggleIntercept,
}: {
  interceptEnabled: boolean;
  toggleIntercept: () => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#D2E4C4",
        padding: 8,
        textAlign: "center",
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={interceptEnabled}
          onChange={toggleIntercept}
        />{" "}
        Enable route interception
      </label>
    </div>
  );
}
