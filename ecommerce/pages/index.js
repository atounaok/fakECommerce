import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
          <title>Fake Commerce | Accueil</title>
      </Head>
      <div className='w-full h-screen text-center'>
          <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center'>
              <h1 className='text-5xl mb-5'>Accueil</h1>
          </div>
      </div>
    </>
  )
}
