import Card from "../cards/Card"

function Grid({ media, category }) {

    return (
        <div className='grid grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-5'>
            {media && media.map((m) =>
                <Card key={m.id} id={m.id} poster={m.poster_path} category={category ? category : m.media_type && m.media_type} dimentions={null} />
            )}
        </div>
    )
}

export default Grid