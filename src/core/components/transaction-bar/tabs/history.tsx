import React, { useContext, useEffect, useState } from 'react'
import BetList, { TransactionStatus } from '../lists/history'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import Header from '../lists/history/header'

export default function HistoryTab() {
  const { betsHistory, getBetsHistory } = useContext(CrashGameContext)

  const sum = (bets = []) => {
    let sum = 0
    bets.map((bet) => {
      sum += parseFloat(bet.amount)
    })

    return sum.toFixed(2)
  }

  useEffect(() => {
    getBetsHistory()
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <section className="py-3 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-sm">{betsHistory.length}x</div>
          </div>

          <span className="text-sm">R$ {sum(betsHistory)}</span>
        </div>
      </section>
      <Header />
      <section className="h-full flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        <BetList items={betsHistory} />
      </section>
    </div>
  )
}
