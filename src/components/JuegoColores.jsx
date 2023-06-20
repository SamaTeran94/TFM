import { useContext } from "react";
import { ColoresContext } from "./ColoresContextProvider";

const JuegoColores = () => {
  const {
    gameOver,
    setLevel,
    generateColors,
    setGameOver,
    setLevelCounter,
    level,
    juegoColores,
    levelCounter,
    win,
    setWin,
    timer,
    setTimer,
    gameStarted,
    setGameStarted
  } = useContext(ColoresContext);

  return (
    <>
      <div className="flex flex-col items-center place-content-center content-center justify-evenly bg-slate-300 h-screen py-8">
        {gameOver || win ? null : <h1 className="text-center bg-colorestxbg text-4xl border-2 mb-5 p-2 border-black">Selecciona El Color Diferente</h1>}

        <div className="flex justify-around w-full">
          {gameStarted || gameOver || win ? null : <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            setLevel(generateColors());
            setGameOver(false);
            setLevelCounter(1);
            setTimer(20);
            setGameStarted(true);
          }}>Comenzar El Juego</button>}
          {gameOver || win ? <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            setLevel(generateColors());
            setGameOver(false);
            setLevelCounter(1);
            setTimer(20);
            setGameStarted(true);
          }}>Reiniciar Juego</button> : null}
          {!gameStarted || gameOver || win ? null : (<h1 className="bg-colorestxbg text-3xl border-2 p-2 border-black">Tiempo Restante: {timer}</h1>)}
          {!gameStarted || gameOver || win ? null : (<div className="">
            {levelCounter > 0 && levelCounter <= 5 && (
              <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel Inicial: {levelCounter}</p>
            )}
            {levelCounter > 5 && levelCounter <= 10 && (
              <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel Facil: {levelCounter}</p>
            )}
            {levelCounter > 10 && levelCounter <= 15 && (
              <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel Intermedio: {levelCounter}</p>
            )}
            {levelCounter > 15 && (
              <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel Dificil: {levelCounter}</p>
            )}
          </div>)}
        </div>

        <div className="flex justify-center">
          <div className="max-w-2/4 w-full md:max-w-2/3 lg:max-w-1/2 flex justify-center">
            {gameOver && timer !== 0 ? <div className="flex flex-col justify-center text-center">
              <h1 className="text-3xl bg-colorestxbg border-2 p-2 border-black">Juego Finalizado, escogiste el color equivocado!</h1>
            </div> : gameOver && timer === 0 ? <div className="flex flex-col justify-center text-center">
              <h1 className="text-3xl bg-colorestxbg border-2 p-2 border-black">Juego Finalizado, se terminó el tiempo!</h1>
            </div> : null}
            {win ? <div className="flex flex-col justify-center text-center">
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
            </div> : null}
            {!gameOver && !win && (
              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                {level.map((mem, index) => (
                  <button
                    disabled={!gameStarted}
                    key={index}
                    className={`${!gameStarted ? 'cursor-default w-24 h-24 rounded-full m-10' : 'w-24 h-24 rounded-full m-10 cursor-pointer'
                      } border-2 border-white`}
                    style={{ backgroundColor: mem.color }}
                    onClick={() => juegoColores(mem)}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JuegoColores;
