import React, { useContext, useEffect } from 'react'
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'
import { Trending } from './enums/trending.enum'

type Props = {
  trending: Trending
}

function Tab({ trending }: Props) {
  const { registeredBets, getRegisteredBets } = useContext<any>(
    WallStreetGameContext
  )

  const list = registeredBets.filter(
    (bet) => bet.extras.trending == trending
  )

  useEffect(() => {
    getRegisteredBets()
  }, [])

  const sum = (bets: any) => {
    let sum = 0

    if (bets) {
      bets?.map((bet) => {
        if (!isNaN(bet?.amount)) sum += parseFloat(bet?.amount)
      })
    }

    return sum.toFixed(2)
  }

  return (
    <div className="h-auto border-r border-white border-opacity-10">

      <div className="flex border-b border-slate-600 p-3 justify-between hidden">
        <div className="flex items-center font-medium">
          <span className="text-sm mr-1 capitalize">Vitória</span>
          <span className="text-sm capitalize">
            {trending === Trending.IDLE ? '20x' : '2x'}
          </span>
        </div>

        {getRound(trending)}
      </div>

      <div className="flex justify-between rounded bg-opacity-25 items-center p-3">
        <div className="flex items-center gap-1">
          <UserIcon className="h-3.5 w-3.5" />
          <div className="text-sm">{list.length}</div>
        </div>

        <span className="text-sm">R$ {sum(list)}</span>
      </div>

      <div className="h-full flex-shrink-1 flex-grow basis-0  px-3 overflow-y-scroll scrollbar-w-0 min-h-[300px] max-h-[300px] scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">

        <div className="flex flex-col ">
          {list.map((item, index) => {
            if (item)
              return (
                <div
                  key={index}
                  className="border-b last:border-b-0 px-3 py-1 border-b-slate-700 grid grid-cols-12"
                >
                  <div className="col-span-8">
                    <span className="text-xs">
                      {item.player.username}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-xs">{item.amount}</span>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

const getRound = (trending) => {
  switch (trending) {
    case Trending.UP:
      return (
        <div className="bg-green-600 pointer-events-none text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center">
          <ArrowTrendingUpIcon className="w-5 h-5" />
        </div>
      )

    case Trending.DOWN:
      return (
        <div className="bg-red-600 pointer-events-none text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center">
          <ArrowTrendingDownIcon className="w-5 h-5" />
        </div>
      )

    case Trending.IDLE:
      return (
        <div className="bg-yellow-400 pointer-events-none min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center">
          <MinusIcon className="w-5 h-5" />
        </div>
      )
  }
}

export default Tab
