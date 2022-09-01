import { GlobalProvider } from "@utils/GlobalContext";
import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AxiosConfigProvider>
        <Component {...pageProps} />
      </AxiosConfigProvider>
    </GlobalProvider>
  )
}

export default MyApp