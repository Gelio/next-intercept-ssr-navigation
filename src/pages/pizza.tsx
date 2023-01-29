import { Layout } from "@/components/layout/Layout";
import {
  createQueryClient,
  fetchRandomPizzaName,
  randomPizzaNameQueryKey,
} from "@/query-client";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "@/styles/pizza-page.module.css";

export default function PizzaPage() {
  const result = useQuery({
    queryKey: randomPizzaNameQueryKey,
    queryFn: () => fetchRandomPizzaName(),

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      <Head>
        <title>Random pizza!</title>
      </Head>
      <Layout>
        <>
          <div className={styles["button-container"]}>
            <button
              className={styles.button}
              onClick={() => result.refetch()}
              disabled={result.isLoading}
            >
              Get me a new pizza 🍕
            </button>
          </div>

          {result.isLoading && <div>Loading...</div>}
          {result.error && <div>Sorry, cannot fetch your pizza 😿</div>}
          {result.data && (
            <p className={styles["pizza-name"]}>
              Your random pizza: {result.data} {result.isRefetching && "🔄"}
            </p>
          )}
        </>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = createQueryClient();

  // @see https://stackoverflow.com/a/65892809
  const protocol = req.headers["x-forwarded-proto"] ? "https" : "http";

  await queryClient.prefetchQuery({
    queryKey: randomPizzaNameQueryKey,
    queryFn: () => fetchRandomPizzaName(`${protocol}://${req.headers.host}`),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
