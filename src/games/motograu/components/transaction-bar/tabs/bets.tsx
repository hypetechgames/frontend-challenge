import React, { useContext, useEffect, useState } from 'react'
import BetList from '../lists/bets'
import { UserIcon } from '@heroicons/react/24/outline'

import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import Header from '../lists/bets/header'

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
      <section className="py-3 w-full">
        <div className="flex justify-between rounded bg-opacity-25 items-center">
          <div className="flex flex-col items-start">
            <h3 className="ml-1 mb-2 text-xs">APOSTADORES</h3>
            <div className='flex items-center gap-1'>
              <UserIcon className="h-3.5 w-3.5 text-blue-500" />
              <div className="text-sm text-blue-600">{registeredBets.length}</div>
            </div>
          </div>

          <div>
            <h3 className='text-xs mb-1'>TOTAL APOSTADO</h3>
            <span className="text-sm text-blue-600">R$ {sum(registeredBets)}</span>
          </div>

        </div>
      </section>

      <Header />
      <section className="h-full flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        <BetList items={registeredBets} />
      </section>
    </div>
  )
}
