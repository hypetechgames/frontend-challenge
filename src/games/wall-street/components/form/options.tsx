import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'
import React,{ useContext} from 'react'
import { Trending } from '../transaction-panel/enums/trending.enum'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'

type Props = {
  selected: string
  setSelected: Function
  handleMousePosition: Function
}


export default function OptionChooser({
  selected,
  setSelected,
  handleMousePosition
}: Props) {

  const { soundClick } = useContext(WallStreetGameContext)

  const handleClick = (event) => {
    soundClick()
    setSelected(event)
  }
  return (
    <div className="grid gap-4">
      <div className="font-medium text-xs">Selecionar Tendência</div>

      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4">
        <button
          type="button"
          onBlur={() => handleMousePosition('up')}
          onMouseOver={() => handleMousePosition('up')}
          onMouseOut={() => handleMousePosition('white')}
          onClick={() => handleClick(Trending.UP)}
          className={`flex justify-center items-center text-xs w-full font-medium ${
            selected == Trending.UP
              ? 'active'
              : 'border-transparent hover:border-transparent'
          } flex-1 text-xl rounded-sm bg-buy flex flex-col px-0 py-2 text-gray-200`}
        >
          <ArrowTrendingUpIcon className="w-7 h-7" /> 2x
        </button>

        <button
          type="button"
          onClick={() => handleClick(Trending.IDLE)}
          className={`flex justify-center items-center text-xs w-full font-medium ${
            selected == Trending.IDLE
              ? 'active'
              : 'border-transparent hover:border-transparent'
          } flex-1 text-xl rounded-sm bg-bull flex flex-col px-0 py-2 text-gray-200`}
        >
          <MinusIcon className="w-5 h-5" /> 20x
        </button>
        <button
          type="button"
          onBlur={() => handleMousePosition('down')}
          onMouseOver={() => handleMousePosition('down')}
          onMouseOut={() => handleMousePosition('white')}
          onClick={() => handleClick(Trending.DOWN)}
          className={`flex justify-center items-center text-xs w-full font-medium ${
            selected == Trending.DOWN
              ? 'active'
              : 'border-transparent hover:border-transparent'
          } flex-1 text-xl rounded-sm bg-sell flex flex-col px-0 py-2 text-gray-200`}
        >
          <ArrowTrendingDownIcon className="w-5 h-5" /> 2x
        </button>
      </div>
    </div>
  )
}
