import Link from 'next/link'
import React from 'react'

const routes = [
  {title: 'HomePage', href: '#site'},
  {title: 'Hosting', href: '#host'},
  {title: 'Parking', href: '#park'}
]

const Navbar = () => {
  return (
    <header>
      <Link href={'/'}>HomePage</Link>
    </header>
  )
}

export default Navbar