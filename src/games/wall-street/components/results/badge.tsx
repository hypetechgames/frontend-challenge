import React,{ useContext} from 'react'
import { WallStreetResult } from './enums/wall-street-result.enum'
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'


type Props = {
  round_id: number
  trending: number
  grow: number
  showRoundInfo: Function
}


export default function MultiplierBadge({
  round_id,
  trending,
  grow,
  showRoundInfo,
}: Props) {

  const { soundClick } = useContext(WallStreetGameContext)

  const handleClick = (e) => {
    soundClick()
    showRoundInfo(e)
  }

  switch (trending) {
    case WallStreetResult.UP:
      return (
        <button
          onClick={() => handleClick(round_id)}
          className="bg-green-600 cursor-pointer text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
        >
          <ArrowTrendingUpIcon className="w-5 h-5" />
        </button>
      )

    case WallStreetResult.DOWN:
      return (
        <button
          onClick={() => handleClick(round_id)}
          className="bg-red-600 cursor-pointer text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
        >
          <ArrowTrendingDownIcon className="w-5 h-5" />
        </button>
      )

    case WallStreetResult.IDLE:
      return (
        <button
          onClick={() => handleClick(round_id)}
          className="bg-yellow-400 cursor-pointer min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      )
  }
}
