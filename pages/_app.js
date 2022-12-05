// import { GlobalProvider } from "@utils/GlobalContext";
import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import "@styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" storageKey='theme'>
      {/* <GlobalProvider> */}
        <AxiosConfigProvider>
          <Component {...pageProps} />
          <Toaster />
        </AxiosConfigProvider>
      {/* </GlobalProvider> */}
    </ThemeProvider>
  )
}

export default MyApp