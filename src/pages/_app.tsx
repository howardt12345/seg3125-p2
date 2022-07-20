import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "@api/cart";
import { SSRProvider } from "react-bootstrap";
import "../styles/styles.css";
import Footer from "@components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SSRProvider>
        <Component {...pageProps} />
        <Footer />
      </SSRProvider>
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
