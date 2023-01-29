import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next getServerSideProps navigation intercept</title>
      </Head>

      <Layout>
        <h1>Next SSR interception</h1>

        <p>
          This example app showcases how to hook into Next Router logic and
          avoid executing <code>getServerSideProps</code> when navigating to
          pages in the browser.
        </p>

        <p>
          See the code{" "}
          <a href="https://github.com/Gelio/next-intercept-ssr-navigation">
            on GitHub
          </a>{" "}
          or{" "}
          <a href="https://codesandbox.io/p/github/Gelio/next-intercept-ssr-navigation">
            in CodeSandbox
          </a>
          .
        </p>

        <p>
          Use links above to navigate to{" "}
          <Link href="/pizza">the pizza page</Link> and back to this page. Play
          around with the toggle at the top to see the difference between the
          default behavior (route interception disabled) and the updated
          behavior.
        </p>

        <p>
          <Link href="/pizza">The pizza page</Link> loads data that takes a long
          time to arrive. This is on purpose to show the difference in behavior.
        </p>

        <p>
          When the interception is <strong>disabled</strong>, after clicking the
          link, the browser does not show any loading information. It seems like
          the application is stuck, while it is waiting for{" "}
          <code>getServerSideProps</code> to be finished.
        </p>

        <p>
          When the interception is <strong>enabled</strong>, the client-side
          navigation is almost instant, as the browser skips{" "}
          <code>getServerSideProps</code>. This means that the page will be
          rendered with stale/empty <code>props</code>. The page component needs
          to handle that case and load the data in the browser while showing
          some loading indicator.
        </p>

        <p>
          In the case of this pizza page, if the page was already visited, the
          page will show data from the last time the page was shown. This gives
          it a more app-like experience, since navigating to an already-visited
          view shows that view as it looked before.
        </p>

        <hr />

        <p>
          This pattern could be useful when building a highly-interactive web
          app where each page navigation should have an app-like feel and be
          instant. If a page needs data to be loaded, it can do so on its first
          render.
        </p>

        <p>
          The benefit of this approach over simply removing{" "}
          <code>getServerSideProps</code> is that this interception approach
          still has{" "}
          <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
            SSR
          </a>{" "}
          enabled for these pages. The pages will work even if the user has
          JavaScript disabled. The HTML sent by the server will already have the
          page content visible.
        </p>
      </Layout>
    </>
  );
}
