import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image'

export default function Home() {
  return (
      <>
        <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
        />
        <Button variant="contained">Hello World</Button>
      </>
  )
}
