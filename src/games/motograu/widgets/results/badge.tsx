import React from 'react'

type Props = {
  multipler: string
  roundId: number
  textColor: string
  showRoundInfo: Function
}

export default function MultiplierBadge({
  multipler,
  roundId,
  textColor,
  showRoundInfo,
}: Props) {
  return (
    <>
      <button
        onClick={() => showRoundInfo(roundId)}
        className={`h-6 border border-gray-700 py-3 hover:border-gray-600 font-bold rounded-md flex capitalize hover:opacity-100 transition items-center justify-center cursor-pointer px-3 text-xs ${textColor}`}
      >
        {parseFloat(multipler).toFixed(2)}x
      </button>
    </>
  )
}
