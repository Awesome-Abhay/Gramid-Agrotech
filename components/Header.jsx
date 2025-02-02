import Link from 'next/link'
import React from 'react'

export default function Header() {
    return(
        <header role='banner'>
            <nav role='navigation'>
                <ul>
                    <li aria-label='link to home page'><Link href='/client'>Home</Link></li>
                </ul>
            </nav>
        </header>
    )
}