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
      {/* <section className="w-full flex items-center mb-2 justify-between px-3">
        <span className="text-xs uppercase">Todas Apostas</span>

        <button
          className={`btn btn-xs  gap-1 border w-38 text-xs btn-ghost font-normal ${
            loadPrevious
              ? 'border-red-500 hover:border-red-500'
              : 'border-gray-500'
          }`}
          onClick={loadBets}
        >
          <If condition={!loadPrevious}>
            <span className="flex items-center gap-1 text-gray-400">
              <ClockIcon className="h-4 w-4" />
              Rodada Anterior
            </span>
          </If>
          <If condition={loadPrevious}>
            <span className="flex items-center gap-1 text-red-500">
              <XMarkIcon className="h-4 w-4" />
              Rodada Anterior
            </span>
          </If>
        </button>
      </section> */}

      <section className="py-3  w-full">
        <div className="flex justify-between rounded bg-opacity-25 items-center ">
          <div className="flex items-center gap-1">
            <UserIcon className="h-3.5 w-3.5" />
            <div className="text-sm">{registeredBets.length}</div>
          </div>

          <span className="text-sm">R$ {sum(registeredBets)}</span>
        </div>
      </section>

      <Header />
      <section className="h-full flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        <BetList items={registeredBets} />
      </section>
    </div>
  )
}
