import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {

    const [home, setHome] = useState(true)

    return (
        <>
            <Navbar setHome={setHome} />
            <div>
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
