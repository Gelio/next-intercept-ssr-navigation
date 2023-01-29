import SingletonRouter from "next/router";
import { useEffect } from "react";

export const useNextServerSidePropsInterception = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  useEffect(() => {
    // NOTE: remove existing information about the /pizza route
    // so Next does not "remember" whether it had getServerSideProps or not
    // @see https://github.com/vercel/next.js/blob/13b32ba98179aa94ac2e402f272e5c6a3356d310/packages/next/src/shared/lib/router/router.ts#L971
    delete SingletonRouter.router?.components["/pizza"];

    if (!enabled) {
      return;
    }

    const pageLoader = SingletonRouter.router?.pageLoader;
    if (!pageLoader) {
      return;
    }

    const { loadPage: originalLoadPage } = pageLoader;

    // NOTE: intercept `loadPage` calls to prevent fetching Next data when
    // navigating to some pages
    // @see https://github.com/vercel/next.js/blob/9c6d56122bfe7cc6aef066cad88ee477a60a340a/packages/next/src/client/page-loader.ts#L155-L169
    pageLoader.loadPage = async (...args) => {
      return originalLoadPage.apply(pageLoader, args).then((pageCache) => ({
        ...pageCache,
        mod: {
          ...pageCache.mod,
          // NOTE: behave as if there is no `getServerSideProps` for the
          // page so Next won't fetch the result from the server
          // @see https://github.com/vercel/next.js/blob/9c6d56122bfe7cc6aef066cad88ee477a60a340a/packages/next/src/shared/lib/router/router.ts#L2165
          __N_SSP: false,
        },
      }));
    };

    return () => {
      pageLoader.loadPage = originalLoadPage;
    };
  }, [enabled]);
};
