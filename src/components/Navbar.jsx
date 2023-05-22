const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-evenly h-16">
                    <div className="flex items-center">
                        <a href="#" className="text-white font-bold text-lg">Logo</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/#colores_id" className="text-gray-300 hover:text-white">Juego Colores</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/#preguntas_id" className="text-gray-300 hover:text-white">Juego Preguntas</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Nosotros</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Nosotros</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
