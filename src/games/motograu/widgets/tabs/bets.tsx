import React, { useContext, useState } from 'react'
import If from '@/core/components/conditions/if'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { dateToHumanReadable } from '@/core/helpers/date'
import { itemIsOdd, number } from '../transaction-bar/lists/bets/list-item'

type Props = {
  data: any
  showRoundInfo: Function
  id: number
}

export default function ListItem({ data, showRoundInfo, id }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'

  return (
    <>
      <div
        className={`flex items-center text-xs text-white p-1.5 gap-1 bg-primary ${itemIsOdd(id)}`}
      >
        {/* <div className="w-1/4 flex items-center justify-end relative gap-1">
          <div className="z-0">
            
          </div>
        </div> */}
        <h1 className="w-1/4 flex gap-3 items-center">
          <button
            className="btn btn-xs btn-ghost p-1 h-1"
            onClick={() => showRoundInfo(data.round_id)}
          >
            <ShieldCheckIcon className="w-4 h-4" />
          </button>
          {dateToHumanReadable(data.updated_at)}
        </h1>
        <h1 className="w-1/4 flex items-center justify-center gap-2 text-center">
          R$ {data.amount}
        </h1>
        <div className={`w-1/4 text-success text-center`}>
          {`R$ ${Number(data.profit).toFixed(2)}`}
        </div>
        <h1 className="w-1/4 flex items-center gap-2">
          <If condition={data.outcome == 'win'}>
            <span className={`bg-[#894aff] bg-opacity-40 rounded text-xs h-4 flex items-center justify-center w-5 p-2`}>
              x
            </span>
            {number(Number(data.payout))}x
          </If>
        </h1>
      </div>
    </>
  )
}
