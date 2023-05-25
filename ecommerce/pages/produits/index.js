import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'


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
                            <Link className='card w-[290px] min-h-[400px] mb-20 flex flex-col justify-start items-center hover:shadow-sm' key={produit.id} href={'/produits/' + produit.id}>
                                <div className='h-[200px] w-full flex justify-center items-center'>
                                    <Image loader={() => produit.image} src={produit.image} alt={'produit: ' + produit.id} width='100' height='100'/>
                                </div>
                                <div className='flex flex-col justify-between h-[180px]'>
                                    <h3 className='w-full text-2xl text-start text-wrap line-clamp-2'>{produit.title}</h3>
                                    <div className='flex justify-between w-full'>
                                        <p className='text-left text-2xl font-thin'>{produit.price}$</p>
                                        <MdOutlineFavoriteBorder className='text-2xl'/>
                                    </div>
                                </div>
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
