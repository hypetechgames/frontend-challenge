import React, { useContext, useEffect, useState } from 'react'
import BetList from './bets.index'

import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import Header from './header'

export default function BetsTab() {
  const { registeredBets, getRegisteredBets } =
    useContext(CrashGameContext)

  const sum = (bets = []) => {
    let sum = 0
    bets.map((bet) => {
      sum += parseFloat(bet.amount)
    })

    return sum.toFixed(2)
  }

  useEffect(() => {
    getRegisteredBets()
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <section className="py-3  w-full">
        <div className="flex justify-between rounded items-center text-xs">
          <div className="flex items-center gap-1 text-xs">
            Overall
          </div>

          <span className="text-xs">R$ {sum(registeredBets)}</span>
        </div>
      </section>

      <Header />
      <section className="h-full flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded ml-[-0.8rem] w-[calc(100% + 1.6rem)]" style={{
        width: 'calc(100% + 1.6rem)',
      }}>
        <BetList items={registeredBets} />
      </section>
    </div>
  )
}
