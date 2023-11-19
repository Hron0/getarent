import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logoO from "../../public/logoO.svg"

const routes = [  /* TODO Перенести в отдельный файл */
  { query: 'HomePage', pathname: '/' },
  { query: 'Hosting', pathname: '/host' },
  { query: 'Parking', pathname: '/park' }
]

const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between w-full px-[5%] pt-[15px]'>
      <Image src={logoO} width={100} height={100} alt="logo"/>
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-row gap-[20px]">
          <Link href="/host">Сдать авто в аренду</Link>
          <Link href="/">О компании</Link>
          <Link href="/park">Блог</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar