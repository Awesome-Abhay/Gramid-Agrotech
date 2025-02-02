import React from 'react'
import { Auth } from '@hook/authContext'
import "./globals.css"

export default function RootLayout({ children }){
    return(
        <html lang='en'>
            <head>
                <meta name='author' content='gourav-sharma' />
                <meta name='description' content='Gramid provides farmers with everything they need from best market rates to purchasing agriculture products' />
                <meta name='keywords' content='agriculture, farming, market rates, agriculture products, farmers, Gramid' />
                {/* Opengraph */}
                <meta property='title' content='Gramid | Revolution in Agriculture' />
                <meta property='description' content='Gramid provides farmers with everything they need from best market rates to purchasing agriculture products' />
                <meta property='url' content='https://gramid-zid.vercel/app/' />
                <meta property='image' content='https://gramid-zid.vercel/app/icon.png' />
                <meta property='type' content='website' />
                {/* Icon */}
                <link rel='icon' href='/icon.png' />
                {/* Title */}
                <title>Gramid | Revolution in Agriculture</title></head>
                <body>
                    <Auth>
                        { children }
                    </Auth>
                </body>
        </html>
    )
}