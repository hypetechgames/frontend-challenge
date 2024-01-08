import React, { useEffect, useState } from 'react'
import ProgressBar from '@/core/components/progress-bar'
import If from '@/core/components/conditions/if'
import { GameStatus } from '@/core/providers/enums/game-status'
import { useSelector } from 'react-redux'

const messages = {
  bike: 'O motoqueiro se deu mal!',
}

const getVariantColor = (variant: string) => {
  switch (variant) {
    case 'blue':
      return 'text-blue-600'
    case 'lime':
      return 'text-lime-600'
    case 'yellow':
      return 'text-yellow-400'
    case 'red':
      return 'text-red-700'
    case 'pink':
      return 'text-pink-700'
    case 'rose':
      return 'text-rose-600'
  }
}

type Props = {
  multiplierColor: string
  progressBarColor: string
}

export default function Display({
  multiplierColor,
  progressBarColor,
}: Props) {
  const [isMultiple, setIsMultiple] = useState(false)
  const gameName = useSelector((state) => state.session.game)
  const multiplier = useSelector((state) => state.bet.currentOdd)
  const gameStatus = useSelector((state) => state.game.status)
  const timeout = useSelector((state) => state.bet.startTimeout)

  useEffect(() => {
    const value = parseFloat(multiplier + 0.01).toFixed(2)
    if (parseFloat(value) % 1 == 0) {
      setIsMultiple(true)
      setTimeout(() => {
        setIsMultiple(false)
      }, 200)
    }
  }, [multiplier])

  return (
    <div className="absolute top-0 pointer-events-none left-0 flex flex-col gap-3 justify-center items-center w-full h-full">
      <If condition={gameStatus == GameStatus.IDLE}>
        <div className="w-52">
          <ProgressBar
            max={10}
            value={timeout}
            variant={progressBarColor}
          />
        </div>
      </If>

      <If condition={gameStatus == GameStatus.RUNNING}>
        <div className="relative flex justify-center items-center">
          <h1
            className={`text-2xl md:text-3xl absolute font-bold ${getVariantColor(
              multiplierColor
            )} drop-shadow`}
            style={{
              fontFamily: 'monospace',
              WebkitTextStroke: '1px #000',
            }}
          >
            {multiplier.toFixed(2)}x
          </h1>
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              isMultiple ? 'animate-ping duration-1000' : ''
            } ${getVariantColor(multiplierColor)}`}
            style={{
              fontFamily: 'monospace',
              WebkitTextStroke: '1px #000',
            }}
          >
            {isMultiple
              ? Math.floor(multiplier).toFixed(2)
              : Math.abs(multiplier).toFixed(2)}
            x
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.GAME_OVER}>
        <h1
          className="text-xl md:text-2xl text-gray-200 font-extrabold uppercase game-texts"
          style={{
            fontFamily: 'monospace',
            WebkitTextStroke: '1px #000',
          }}
        >
          {messages[gameName]}
        </h1>
        <h1
          className={`text-2xl md:text-3xl font-bold text-red-600 drop-shadow`}
          style={{
            fontFamily: 'monospace',
            WebkitTextStroke: '1px #000',
          }}
        >
          {multiplier.toFixed(2)}x
        </h1>
      </If>
    </div>
  )
}
