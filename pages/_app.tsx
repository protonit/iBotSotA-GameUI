import '../styles/globals.css'
import '../styles/animations.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


function HelloWorld(stringValue:string, numberValue:number) {
  alert("kukka " + stringValue + " " + numberValue);
}

export default MyApp
