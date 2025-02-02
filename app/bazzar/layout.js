import { Header } from './components/All'
import { CartProvider } from '@cart/cartContext'
//  className='bg-gradient-to-r from-gray-50 to-gray-100 font-sans'
export default function Layout({ children }) {
    return (
            <CartProvider>
                <Header />
                {children}
            </CartProvider>
    )
}