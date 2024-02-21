'use client'
import { store } from '@/store';
import './styles/style.scss'
import { Provider} from 'react-redux';

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          {children}
        </body>
      </Provider>
    </html>
  );
}
