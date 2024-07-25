'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const { data: session } = useSession();
    const [toggleDropdown, setToggleDropdown] = useState(false);

    if (!session) return null;


    return (
        <nav className='flex gap-2 justify-between p-5 items-center'>
            {/* Desktop nav */}
            <div className='hidden md:flex'>
                <Link className='hover:text-blue-950 px-2' href="/detalle">Detalle Trabajo</Link>
                <Link className='hover:text-blue-950 px-2' href="/search">Busqueda Trabajo</Link>
                <Link className='hover:text-blue-950 px-2' href="/users">Administrar Usuario</Link>
                <Link className='hover:text-blue-950 px-2' href="/mechanic">Administrar Tecnico</Link>
            </div>

            <div className='flex justify-center items-center'>
                <div className='hidden md:flex'>
                    <Image
                        src={session.user?.image}
                        className="object-cover rounded-full"
                        width={37}
                        height={37}
                        alt=''
                    />
                </div>
                <button
                    className="py-2 px-6 hidden md:block"
                    onClick={async () => {
                        await signOut({ redirect: true, callbackUrl: '/' });
                    }}
                >
                    Sign Out
                </button>
            </div>

            {/* Mobile nav */}
            <div className='md:hidden flex items-center'>
                <Image
                    src={session.user?.image}
                    className="object-cover rounded-full"
                    width={37}
                    height={37}
                    alt=''
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                />

                {toggleDropdown && (
                    <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-5 flex flex-col items-start z-10">
                        <Link className='hover:text-blue-950 py-2' href="/detalle">Detalle Trabajo</Link>
                        <Link className='hover:text-blue-950 py-2' href="/search">Busqueda Trabajo</Link>
                        <Link className='hover:text-blue-950 py-2' href="/users">Administrar Usuario</Link>
                        <Link className='hover:text-blue-950 py-2' href="/mechanic">Administrar Tecnico</Link>
                        <button
                            className="py-2 "
                            onClick={async () => {
                                await signOut({ redirect: true, callbackUrl: '/' });
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </nav >
    )
}

export default Navbar
