import React, { useContext } from 'react'

import { UserIcon } from '@heroicons/react/24/outline'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

export default function Header() {
  const { registeredBets } =
    useContext(CrashGameContext)

  return (
    <div className="w-full bg-transparent rounded z-10 grid-cols-5 flex items-center text-white p-2" style={{ fontSize: '10px' }}>
      <UserIcon className="h-3.5 w-3.5" />
      <h1 className="w-1/4 flex gap-3 items-center font-bold text-center ml-1">
        {registeredBets.length} players
      </h1>
      <h1 className="w-1/4 text-center font-bold">Valor</h1>
      <div className="w-1/5 text-center font-bold">Lucro</div>
      <h1 className="w-1/4 text-center font-bold ml-3">Odd</h1>
    </div>
  )
}
