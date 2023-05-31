/* eslint-disable react/prop-types */

const JuegoColores = ({ gameOver, setLevel, generateColors, setGameOver, setLevelCounter, level, juegoColores, levelCounter, win, setWin }) => {
  return (
    <>
      <div className="flex flex-col items-center place-content-center content-center justify-evenly bg-coloresbg h-screen" >
        {gameOver || win ? null : <h1 className="text-center bg-colorestxbg text-3xl">Juego De Colores</h1>}
        {gameOver || win ? null : <h1 className="text-center bg-colorestxbg text-3xl">Selecciona El Color Diferente</h1>}
        <div className=" flex justify-center">
          <div className=" max-w-2/4 w-full md:max-w-2/3 lg:max-w-1/2 flex justify-center">
            {gameOver ? (
              // Código cuando gameOver es true
              <div className=" flex flex-col justify-center text-center">
                <h1 className="text-3xl bg-colorestxbg">Juego Finalizado</h1>
                <button
                  className="mt-4 py-2 text-center bg-blue-500 text-white text-3xl rounded-md"
                  onClick={() => {
                    setLevel(generateColors());
                    setGameOver(false);
                    setLevelCounter(1);
                  }}>
                  Jugar Nuevamente
                </button>
              </div>
            ) : win ? (
              // Código cuando win es true
              <div className="flex flex-col justify-center text-center">
                <h1 className="text-3xl bg-colorestxbg">Felicitaciones, Ganaste El Juego!</h1>
                <button
                  className="mt-4 py-2 bg-blue-500 text-white text-3xl rounded-md"
                  onClick={() => {
                    setLevel(generateColors());
                    setLevelCounter(1);
                    setGameOver(false);
                    setWin(false);
                  }}
                >
                  Reiniciar Juego
                </button>
              </div>
            ) : (
              // Código cuando gameOver y win son false
              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                {level.map((mem, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 rounded-full m-10 cursor-pointer"
                    style={{ backgroundColor: mem.color }}
                    onClick={() => juegoColores(mem)}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {levelCounter > 0 && levelCounter <= 5 && (
            <p className="bg-colorestxbg text-3xl">Nivel Inicial: {levelCounter}</p>
          )}
          {levelCounter > 5 && levelCounter <= 10 && (
            <p className="bg-colorestxbg text-3xl">Nivel Facil: {levelCounter}</p>
          )}
          {levelCounter > 10 && levelCounter <= 15 && (
            <p className="bg-colorestxbg text-3xl">Nivel Intermedio: {levelCounter}</p>
          )}
          {levelCounter > 15 && (
            <p className="bg-colorestxbg text-3xl">Nivel Dificil: {levelCounter}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default JuegoColores;
