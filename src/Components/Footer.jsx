export default function Footer () {
    return (

    <div className='bg-pink-600 text-white' >
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 pt-10 px-24 text-sm' >
            <div>
                <p className='text-xl font-medium mb-5' >Lo que sea</p>
                <p className='w-full md:w2/3' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5' >Lo que sea</p>
                <ul className='flex flex-col gap-1' >
                    <li>Inicio</li>
                    <li>Menu</li>
                    <li></li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5' >Lo que sea</p>
            </div>
        </div>
        <div>
            <hr className='bg-complementary' />
            <p className='py-5 text-sm text-center'>Todos los derechos reservados 2024</p>
        </div>
    </div>
    )
}