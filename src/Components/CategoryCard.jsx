import template from '../temp/—Pngtree—iced coffee cappuccino cup_15683400.png';


export const CategoryCard = ({
    title,
    image
    
}) => {
    return (
        <div class="hover:-translate-y-2 duration-300">
            <a href="/menu">
                <div class="bg-pink-400 border border-pink-400 rounded-full p-7 size-60">
                    <img src={template} alt={title}/>   
                </div>
                <h2 class="text-center text-[28px] pt-2 text-pink-600 font-[500]" >{title}</h2>
            </a>
        </div>
    )
}