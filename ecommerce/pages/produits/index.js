import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'


export const getStaticProps = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
  
    return {
      props: { produits: data }
    }
  }

const index = ({ produits }) => {
  return (
    <>
        <Head>
            <title>Fake Commerce | Produits</title>
        </Head>
        <div className='w-full text-center'>
            <div className='max-w-[1240px] w-full mx-auto p-2 flex flex-col justify-center'>
                <h1 className='text-5xl my-10'>Produits</h1>
                <div className='flex flex-wrap justify-between items-center'>
                    {
                        produits.map(produit => (
                            <Link className='card w-[390px] h-[400px] mb-20 flex flex-col justify-start items-center hover:shadow-sm' key={produit.id} href={'/produits/' + produit.id}>
                                <div className='h-[200px] w-full flex justify-center items-center'>
                                    <Image loader={() => produit.image} src={produit.image} alt={'produit: ' + produit.id} width='100' height='100'/>
                                </div>
                                <h3 className='text-3xl text-start text-wrap line-clamp-2'>{produit.title}</h3>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default index
