import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdOutlineSort } from 'react-icons/md'


export async function getStaticProps() {
    const resP = await fetch('https://fakestoreapi.com/products')
    const resC = await fetch('https://fakestoreapi.com/products/categories')
    const dataP = await resP.json()
    const dataC = await resC.json()
  
    return {
      props: { produits: dataP,
                categories: dataC }
    }
  }

const index = ({ produits, categories }) => {

    const [produitsAffiches, setProduits] = useState(
        produits.map(produit => (
            <Link className='card w-[275px] min-h-[400px] mb-20 flex flex-col justify-start items-center hover:shadow-sm' key={produit.id} href={'/produits/' + produit.id}>
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
    )
    const [show, setShow] = useState(false)
    const [showT, setShowT] = useState(false)

    const showCategories = () =>{
        setShow(!show)
    }

    const showTrie = () =>{
        setShowT(!showT)
    }

    const afficherProduits = () =>{
        setProduits(
                produits.map(produit => (
                    <Link className='card w-[275px] min-h-[400px] mb-20 flex flex-col justify-start items-center hover:shadow-sm' key={produit.id} href={'/produits/' + produit.id}>
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
        )
    }

    const filtrerCategorie = async (e) =>{
        const categorie = e.target.value
        const res = await fetch('https://fakestoreapi.com/products/category/' + categorie)
        const data = await res.json()
        
        produits = data
        afficherProduits()
        console.log(produits)
    }

    const resetProduits = async () =>{
        const resP = await fetch('https://fakestoreapi.com/products')
        produits = await resP.json()
        afficherProduits()
    }

    const produitsDsc = async () =>{
        const resP = await fetch('https://fakestoreapi.com/products?sort=desc')
        produits = await resP.json()
        afficherProduits()
    }


  return (
    <>
        <Head>
            <title>Fake Commerce | Produits</title>
        </Head>
        <div className='w-full text-center'>
            <div className='max-w-[1240px] w-full mx-auto p-2 flex flex-col justify-center'>
                <h1 className='text-5xl my-10'>Notre collection</h1>
                <div className='flex justify-end'>
                    {/* <div className='card w-[25%] py-5 fixed h-[500px]'>
                        <h4 className='w-full text-3xl text-start text-wrap'>Filtrer</h4>
                    </div>  */}
                    <aside id="default-sidebar" class="card fixed left-36 z-40 w-64 h-[600px] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div class="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
                            <ul class="space-y-2 font-medium">
                                <li>
                                    <button type="button" onClick={showCategories} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                        <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Catégorie</span>
                                        <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-example" class={show? 'py-2 space-y-2' : 'hidden py-2 space-y-2'}>
                                        {
                                            categories.map(categorie => (
                                                <li>
                                                    <button onClick={filtrerCategorie} value={categorie} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{categorie}</button>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <button onClick={resetProduits} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Toutes</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <div className='flex flex-col w-[70%]'>
                        <div className='shadow-sm bg-gray-100  mb-10 py-5 flex justify-between px-5'>
                            <div>
                                <button type="button" onClick={showTrie} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    {/* <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg> */}
                                    <MdOutlineSort/>
                                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Trier</span>
                                    <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <ul id="dropdown-example" className={showT? 'py-2 space-y-2 absolute bg-gray-100' : 'hidden py-2 space-y-2'}>
                                    <li>
                                        <button onClick={resetProduits} class="flex items-center w-full p-2 text-gray-900 transition duration-75 pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">Prix | Ascendant </button>
                                    </li>
                                    <li>
                                        <button onClick={produitsDsc} class="flex items-center w-full p-2 text-gray-900 transition duration-75 pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">Prix | Descendant </button>
                                    </li>
                                </ul>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className='flex flex-wrap justify-between items-center'>
                            {produitsAffiches}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default index
