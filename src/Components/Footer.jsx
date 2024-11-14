export default function Footer () {
    return (
    <footer class="bg-pink-600 py-6 text-white">

        <div class="mx-auto w-full max-w-screen-xl p-4 px-6 lg:py-8">

            <div class="md:flex md:justify-between">

                <div class="grid grid-cols-4 gap-2 sm:gap-6 sm:grid-cols-3 w-full text-center">

                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>

                    <div>
                        <h2 class="mb-6 text-lg font-semibold text-white uppercase ">Follow us</h2>
                        <ul class="text-white font-medium">
                            <li class="mb-4">
                                <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 class="text-lg" >Newsletter</h2>
                    </div>

                </div>

            </div>

        </div>

        <hr class="my-2 border-white sm:mx-aut lg:my-8" />
        <div class="text-center">
            <p>Todos los derechos reservados 2024™</p>
        </div>

    </footer>
    )
}