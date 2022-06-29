import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "@api/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
