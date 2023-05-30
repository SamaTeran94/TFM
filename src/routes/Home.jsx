import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

const Home = () => {

    const [home, setHome] = useState(true)

    return (
        <>
            <div className="h-screen">
                <div className="flex justify-center gap-5 pt-5 ">
                    <Link to='/colores' onClick={() => setHome(false)} className="bg-blue-200 p-5 rounded">Juego Colores</Link>
                    <Link to='/preguntas' onClick={() => setHome(false)} className="bg-blue-200 p-5 rounded">Juego Preguntas</Link>
                    <Link className="bg-blue-200 p-5 rounded">Juego Memoria</Link>
                    <Link className="bg-blue-200 p-5 rounded">Nosotros</Link>
                </div>
                {home ? (<div className="flex items-center justify-center">
                    <div className="bg-gray-200 p-4 text-justify text-xl w-1/2 mt-40">
                        Bienvenidos al trabajo de fin de Master de diseño y desarrollo Front-End, el que hemos creado algunos juegos de ayuda para que de forma divertida y eficaz puedan ejercitar su mente.<br></br><br></br>
                        Los juegos de ayuda mental son una valuosa herramienta para ejercitar y fortalecer nuestras habilidades congnitivas.<br></br><br></br>
                        Estos juegos desafiantes y entretenidos nos permiten estimular nuestro cerebro, mejorar nuestra memoria, concentracion,
                        agilidad mental y desarrollar habilidades de resolucion de problemas.
                    </div>
                </div>) : null}
                <Outlet />
            </div>
        </>
    )
}

export default Home
