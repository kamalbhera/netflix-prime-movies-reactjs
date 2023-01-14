import { useState, useEffect, useRef } from 'react'
import tmdbApi from '../api/tmdbApi'

import { BiSearchAlt2 } from 'react-icons/bi'

import Loading from '../components/lazyloading/Loading'
import Grid from '../components/grids/Grid'


function Search({ setVisible }) {

    const [media, setMedia] = useState()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const getMedia = async () => {
        if (!search || search === '') {
            setMedia(null)
            setLoading(false)
        } else {
            const params = {
                language: 'fr',
                query: search
            }
            const response = await tmdbApi.search({ params })
            setMedia(response.results)
            setLoading(false)
        }

    }

    const inputFocus = () => {
        inputRef.current.focus()
    }

    const changeSearchValue = (e) => {
        setLoading(true)
        setSearch(e.target.value)
    }

    useEffect(() => {
        inputFocus()
        const timer = setTimeout(() => getMedia(), 500)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        return () => clearTimeout(timer)
    }, [search])

    return (
        <div className='min-h-[82vh]'>
            <div className='relative'>
                <input
                    type="search" name="search" id="search" placeholder='Films ou Séries...'
                    className='w-full h-12 md:h-16 bg-slate-800 focus:outline-none text-xl md:text-2xl pl-10 md:pl-14'
                    ref={inputRef}
                    onChange={e => changeSearchValue(e)}
                    onBlur={() => setVisible(true)}
                    onFocus={() => setVisible(false)}
                />
                <BiSearchAlt2 className='text-2xl md:text-3xl absolute top-[14px] md:top-5 left-2 md:left-3 text-slate-400' />
            </div>

            {loading ?
                <Loading height={'73vh'} />
                : media && media.length === 0 ?
                    <p className='p-4 m-auto w-fit font-semibold md:text-lg'>Aucun resultat pour votre recherche</p>
                    :
                    <div className='mb-16 md:mb-4 mx-4 lg:mx-16 mt-12 md:mt-16'>
                        <Grid media={media} />
                    </div>
            }


        </div>
    )
}

export default Search