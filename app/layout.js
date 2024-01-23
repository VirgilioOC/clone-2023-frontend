import './styles/globals.css'
import { Inter } from 'next/font/google'
import Home from './page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  icon: './favicon.ico',
  title: 'Pedidos Ya',
  description: 'Lo que quieras en el momento que quieras',
}

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Home/>
      </body>
    </html>
  )
}