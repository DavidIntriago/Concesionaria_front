import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Autos</title>
      </head>


      <body className={inter.className}>
        <div className='container-fluid'>
          {/*
          <header>
            <Menu></Menu>
          </header>
          */}
          <section>
            {children}
          </section>
        </div>  
      </body>
    </html>
  )
}