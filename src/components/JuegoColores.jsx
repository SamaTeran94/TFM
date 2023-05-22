/* eslint-disable react/prop-types */

const JuegoColores = ({ gameOver, setLevel, generateColors, setGameOver, setLevelCounter, level, juegoColores, levelCounter, win, setWin }) => {
  return (
    <>
      <div className="flex flex-col items-center mt-10 h-screen" id='colores_id'>
        <h1 className="mb-5 text-center">JUEGO DE COLORES</h1>
        <h1 className="text-center">SELECCIONA EL COLOR DIFERENTE</h1>

        <div className=" flex justify-center">
          <div className=" max-w-2/4 w-full md:max-w-2/3 lg:max-w-1/2 flex justify-center">
            {gameOver ? (
              <div className=" flex flex-col justify-center text-center">
                <h1 className="text-xl">Juego Finalizado</h1>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
                  onClick={() => {
                    setLevel(generateColors());
                    setGameOver(false);
                    setLevelCounter(1);
                  }}
                >
                  Jugar Nuevamente
                </button>
              </div>
            ) : win ? (
              <div className="flex flex-col justify-center text-center">
                <h1 className="text-xl">Felicitaciones</h1>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
                  onClick={() => {
                    setLevel(generateColors());
                    setLevelCounter(1);
                    setGameOver(false);
                    setWin(false);
                  }}
                >
                  Jugar Nuevamente
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                {level.map((mem, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 rounded-full m-10"
                    style={{ backgroundColor: mem.color }}
                    onClick={() => juegoColores(mem)}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-lg">Nivel: {levelCounter}</p>
        </div>
      </div>
    </>
  );
};


export default JuegoColores
