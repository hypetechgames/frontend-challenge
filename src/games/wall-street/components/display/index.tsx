import { GameStatus } from '@/core/providers/enums/game-status'
import ProgressBar from '@/games/wall-street/components/progress-bar'
import React, { useContext } from 'react'
import If from '@/core/components/conditions/if'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'

export default function GameTexts(props) {
  const { startTimeout, gameStatus, result } = useContext<any>(
    WallStreetGameContext
  )

  return (
    <div className="flex pointer-events-none justify-center align-sub h-full text-center absolute top-0 left-0 right-0">
      <div className="mt-8">
        <If condition={gameStatus == GameStatus.RESULT}>
          <h1 className="text-xl flex gap-4 font-medium text-white drop uppercase">
            {' '}
            {result == 0
              ? 'Stonks!'
              : result == 1
              ? 'O Mercado Subiu'
              : 'O Mercado Desceu'}
            !
          </h1>
        </If>

        <div className="transitionTest">
        <If condition={gameStatus == GameStatus.IDLE}>
          <div className="backdrop"></div>
          <div className="flex w-[300px] max-w-full">
            <ProgressBar
              max={10}
              value={startTimeout}
              color="blue"
              label="Recolhendo palpites - "
            />
          </div>
        </If>
        </div>

        <If condition={gameStatus == GameStatus.RUNNING}>
          <h1 className="text-xl flex gap-4 font-medium text-white drop uppercase">
            Analisando tendência <img className="h-[30px] mt-2 loading-gif" src="https://www.playgroup.org/images/loader-green.gif" />
          </h1>
        </If>
      </div>

      <If condition={gameStatus == GameStatus.MAINTENANCE}>
        <div className="relative my-auto flex justify-center items-center">
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
    </div>
  )
}
