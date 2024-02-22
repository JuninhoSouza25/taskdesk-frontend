'use client'
import { store } from '@/store';
import './styles/style.scss'
import { Provider} from 'react-redux';
import NextAuthSessionProvider from '@/providers/sessionProviders'


export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <Provider store={store}>
          <body>
            {children}
          </body>
        </Provider>
      </NextAuthSessionProvider>
    </html>
  );
}
