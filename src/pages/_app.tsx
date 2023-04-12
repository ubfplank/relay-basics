import { RelayEnvironmentProvider } from "react-relay";
import { initRelayEnvironment } from "../RelayEnvironment";
import { RecordSource } from "relay-runtime";
import { useMemo, useEffect } from "react";
import { RelayPageProps } from "../relay-types";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps<RelayPageProps>) {
  const environment = useMemo(initRelayEnvironment, []);

  useEffect(() => {
    const store = environment.getStore();

    store.publish(new RecordSource(pageProps.initialRecords));

    store.notify();
  }, [environment, pageProps.initialRecords]);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}
