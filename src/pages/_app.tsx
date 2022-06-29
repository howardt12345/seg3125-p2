import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "@api/cart";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
