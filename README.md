# Next `getServerSideProps` interception

Showcase how Next can be tricked into not fetching `getServerSideProps` for some
client-side navigations.

By default, Next will always fetch `getServerSideProps` result when navigating
to a page that has it defined. This could be not intended in some
highly-interactive web applications that need to offer instant client-side
navigation while also having good SEO and fully rendering the pages in SSR.

[The Next `getServerSideProps` interception](./src/intercept-getServerSideProps.ts)
hooks into `next/router` and disables fetching `getServerSideProps` for routes.
The page will be rendered immediately during a client-side navigation and it is
up to the page to show the loading indicator and show the data otherwise loaded
by `getServerSideProps`.

Keep in mind that this could require additional code that avoids always using
page props, as they may not be present during such a client-side transition with
the interception enabled.

In this example, the `/pizza` page loads the pizza name from the API. The
request has an artificial delay. It renders fine in SSR, but it takes a long
time to render when navigating to that page using the link on the page, since
Next is waiting for the result of `getServerSideProps` before navigating to that
page.

With the intercept enabled, the in-browser navigation happens immediately, and
it is the page that displays a loading indicator and loads data in the
background.

This offers snappier user-experience while preserving SSR.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
