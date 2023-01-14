import { BiLoaderAlt } from 'react-icons/bi'

function Loading({ height }) {

    const defaultHeight = '82vh'

    return (
        <div className={`w-full h-[93vh] md:h-[${height ? height : defaultHeight}] flex flex-col justify-center items-center`}>
            <BiLoaderAlt className="text-4xl animate-spin text-amber-400" />
        </div>
    )
}

export default Loading