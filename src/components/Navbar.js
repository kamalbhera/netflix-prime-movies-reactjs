import { BiSearchAlt2, BiFilm } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { RiMovie2Fill } from 'react-icons/ri'
import { BsFillTvFill } from 'react-icons/bs'

import { NavLink } from 'react-router-dom'



function Navbar({ visible }) {

    return (
        <>
            {/* NAV MOBILE */}
            {visible &&
                <nav className='fixed bottom-0 right-0 left-0 z-30 border-t-[1px] border-slate-800 bg-[#020916] flex justify-evenly items-center text-2xl sm:text-3xl py-3 text-slate-400 md:hidden'>

                    <NavLink to='/' className={isActive => isActive.isActive ? 'text-slate-200' : ''}>
                        <AiFillHome />
                    </NavLink>
                    <NavLink to='/search' className={isActive => isActive.isActive ? 'text-slate-200' : ''}>
                        <BiSearchAlt2 />
                    </NavLink>
                    <NavLink to='/movie' className={isActive => isActive.isActive ? 'text-slate-200' : ''}>
                        <RiMovie2Fill />
                    </NavLink>
                    <NavLink to='/tv' className={isActive => isActive.isActive ? 'text-slate-200' : ''}>
                        <BsFillTvFill />
                    </NavLink>
                </nav>
            }

            {/* NAV DESK */}
            <nav className='hidden md:flex items-center py-2 shadow-md shadow-black/50 bg-slate-900 sticky top-0 z-30'>
                <NavLink to='/'>
                    <div className='flex items-center pl-4'>
                        <BiFilm className='text-3xl text-amber-400' />
                        <h1 className='m-0 text-2xl'>Netflix<span className='text-amber-400 ml-1'>Prime</span></h1>
                    </div>
                </NavLink>

                <ul className='flex space-x-4 ml-8 text-lg'>
                    <li className='flex items-center py-2 overflow-hidden'>
                        <NavLink
                            to='/'
                            className="nav-link"
                        >
                            <AiFillHome className='mr-1' />
                            <span className='link-text'>Accueil</span>
                        </NavLink>
                    </li>
                    <li className='flex items-center py-2 overflow-hidden'>
                        <NavLink
                            to='/search'
                            className="nav-link"
                        >
                            <BiSearchAlt2 className='mx-1' />
                            <span className="link-text">Recherche</span>
                        </NavLink>

                    </li>
                    <li className='flex items-center py-2 overflow-hidden'>
                        <NavLink
                            to='/movie'
                            className="nav-link"
                        >
                            <RiMovie2Fill className='mx-1' />
                            <span className='link-text'>Films</span>
                        </NavLink>
                    </li>
                    <li className='flex items-center py-2 overflow-hidden'>
                        <NavLink
                            to='/tv'
                            className="nav-link"
                        >
                            <BsFillTvFill className='mx-1' />
                            <span className='link-text'>Séries</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar