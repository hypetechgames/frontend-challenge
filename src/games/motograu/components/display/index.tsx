import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from '@/core/components/progress-bar';
import If from '@/core/components/conditions/if';
import { GameStatus } from '@/core/providers/enums/game-status';
import { CrashGameContext } from '@/core/providers/games/crash-game.provider';
import Countdown from './Countdown';

type Props = {
  color: string;
};

export default function Display({ color }: Props) {
  const { startTimeout, gameStatus, multiplier, restartGame } =
    useContext<any>(CrashGameContext);

  const [showProgressBar, setShowProgressBar] = useState(true);

  useEffect(() => {
    if (gameStatus === GameStatus.IDLE && showProgressBar) {
      // Inicia um temporizador para esconder o ProgressBar após chegar no segundo 3
      const hideProgressBarTimeout = setTimeout(() => {
        setShowProgressBar(false);
      }, 9000);

      // Limpando o timeout quando o componente for desmontado ou quando o ProgressBar não for mais necessário
      return () => {
        clearTimeout(hideProgressBarTimeout);
      };
    }
  }, [gameStatus, showProgressBar]);

  useEffect(() => {
    // Redefine o estado showProgressBar quando o jogo reinicia
    if (gameStatus === GameStatus.IDLE) {
      setShowProgressBar(true);
    }
  }, [gameStatus]);

  return (
    <div className="absolute top-0 pointer-events-none left-0 flex flex-col gap-3 justify-center items-center w-full h-full">
      <If condition={gameStatus === GameStatus.IDLE && showProgressBar}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-44">
            <ProgressBar max={10} value={startTimeout} color={color} />
          </div>
        </div>
      </If>

      <If condition={gameStatus === GameStatus.IDLE}>
        <Countdown />
      </If>

      <If condition={gameStatus === GameStatus.RUNNING}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-6xl md:text-6xl lg:text-6xl font-bold drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
              color: multiplier >= 2 && multiplier < 10 ? 'rgb(145, 62, 248)' : multiplier >= 10 && multiplier < 50 ? 'rgb(192, 23, 180)' : multiplier >= 50 ? 'rgb(12, 200, 10)' : 'rgb(52, 180, 255)',
            }}
          >
            {multiplier?.toFixed(2)}x
          </h1>
        </div>
      </If>

      <If condition={gameStatus === GameStatus.MAINTENANCE}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-2xl md:text-3xl uppercase lg:text-3xl font-bold text-gray-200 drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            Em manutenção!
          </h1>
        </div>
      </If>

      <If condition={gameStatus === GameStatus.GAME_OVER}>
        <h1
          className="text-2xl sm:text-2xl text-gray-200 font-extrabold uppercase "
          style={{
            WebkitTextStroke: '1px #000',
          }}
        >
          O piloto caiu!
        </h1>
        <h1
          className={`text-6xl md:text-6xl lg:text-6xl font-bold text-red-600 drop-shadow`}
          style={{
            WebkitTextStroke: '1px #000',
          }}
        >
          {multiplier.toFixed(2)}x
        </h1>
      </If>
    </div>
  );
}
