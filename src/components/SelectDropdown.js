import React from 'react'
import Select from 'react-select'

function SelectDropdown({
    genres,
    updateGenre
}) {

    const customstyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '9999px',
            borderStyle: 'none',
            backgroundColor: state.isFocused ? 'rgb(15, 23, 42)' : 'rgb(51, 65, 85)',
            boxShadow: 'none',
            width: '150px',
            minHeight: 'fit-content'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px'
        }),
        input: (provided) => ({
            ...provided,
            margin: '0'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgb(156, 163, 175)'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            margin: '-4px'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(15, 23, 42)'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgb(51, 65, 85)' : 'rgb(15, 23, 42)',
            paddingTop: '3px',
            paddingBottom: '3px'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'rgb(248 250 252)'
        })
    }


    return (
        <>
            {genres &&
                <Select
                    defaultValue={genres[0]}
                    options={genres}
                    styles={customstyles}
                    isSearchable={false}
                    placeholder='Genres...'
                    onChange={e => updateGenre(e)}
                />
            }
        </>
    )
}

export default SelectDropdown