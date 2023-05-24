import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

export const getStaticPaths = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()

  const paths = data.map(produit => {
    return{
      params: { id: produit.id.toString() }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch('https://fakestoreapi.com/products/' + id)
  const data = await res.json()

  return {
    props: { produit: data }
  }
}

const Details = ({produit}) => {
  const src = `${produit.image}`;
  return (
    <>
      <Head>
          <title>Fake Commerce | {produit.id}</title>
      </Head>
      <div className='w-full h-screen text-center'>
          <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center'>
              <h1 className='text-5xl mb-5'>{produit.title}, {produit.description}</h1>
              <Image loader={() => src} src={src} alt={'produit: ' + produit.id} width='300' height='100'/>
          </div>
      </div>
    </>
  )
}

export default Details
