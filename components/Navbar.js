import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

// Top navbar
export default function Navbar() {
   const { user, username } = useContext(UserContext)

    //look up jsx
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link legacyBehavior href='/'>
                        <button className='btn-logo'>FEED</button>
                    </Link>
                </li>
                {/*  user is signed-in and has username */}
                {username && (
                    <>
                    <li className='push-left'>
                        <Link legacyBehavior href="/admin">
                            <button className='btn-blue'>Write Posts</button>
                        </Link>
                    </li>
                    <li>
                    <Link legacyBehavior href={`/${username}`}>
                        <img src={user?.photoURL} />
                    </Link>
                    </li>
                    </>
                )}

                {/* user is not signed OR has not created username */}
                {!username && (
                    <Link legacyBehavior href="/enter">
                        <button className='btn-blue'>Log in</button>
                    </Link>
                )}
            </ul>
        </nav>
    )
}