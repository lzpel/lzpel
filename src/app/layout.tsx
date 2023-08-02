import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Interというフォントを使う
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'lzpel',
  description: '備忘録',
}

const defaultTheme = createTheme();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
      </body>
    </html>
  )
}
