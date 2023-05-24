import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineMail } from 'react-icons/ai'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { BsFillPersonLinesFill } from 'react-icons/bs'

const Navbar = () => {

    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

  return (
    <div>
        <div className='sticky w-full h-20 shadow-xl z-[100%] px-5'>
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link href='/'>
            <Image src='/../public/assets/navlogo.png' width='60' height='40' alt="logo" />
        </Link>
        <div>
          <ul className='hidden md:flex'>
              <Link href='/'>
                  <li className=' p-3 text-sm uppercase hover:bg-gray-900 hover:text-white'>Accueil</li>
              </Link>
              <Link href='/produits/'>
                  <li className='ml-5 p-3 text-sm uppercase hover:bg-gray-900 hover:text-white'>Produits</li>
              </Link>
              <Link href='/authentifier/connexion'>
                  <li className='ml-5 p-3 text-sm uppercase hover:bg-gray-900 hover:text-white'>Se connecter</li>
              </Link>
              <Link href='/authentifier/creer_compte'>
                  <li className='ml-5 p-3 text-sm uppercase hover:bg-gray-900 hover:text-white'>Créer un compte</li>
              </Link>
          </ul>
          <div className='md:hidden cursor-pointer' onClick={handleNav}>
              <AiOutlineMenu size={25} />
          </div>
        </div>

      </div>
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 ' : ''}>
        <div className={nav ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500' 
          :'fixed p-10 left-[-100%] top-0 ease-in duration-500' }>
          <div>
            <div className='flex w-full items-center justify-between'>
              <Image src="/../public/assets/navlogo.png" alt="logo" width='60' height='40'/>
              <div onClick={handleNav} className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'>
                <AiOutlineClose />
              </div>
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4'>Toujours présent pour vous!</p>
            </div>
          </div>
          <div className='py-4 flex flex-col'>
            <ul className='uppercase'>
              <Link href='/'>
                <li className='py-4 text-sm'>Accueil</li>
              </Link>
              <Link href='/'>
                <li className='py-4 text-sm'>Se connecter</li>
              </Link>
              <Link href='/'>
                <li className='py-4 text-sm'>Créer un compte</li>
              </Link>
            </ul>
            <div className='pt-40'>
              <p className='uppercase tracking-widest text-[#5651e5]'>Let's connect</p>
              <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-100'>
                  <FaLinkedinIn />
                </div>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-100'>
                  <FaGithub href='https://github.com/atounaok7600'/>
                </div>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-100'>
                  <AiOutlineMail />
                </div>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-100'>
                  <BsFillPersonLinesFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Navbar
