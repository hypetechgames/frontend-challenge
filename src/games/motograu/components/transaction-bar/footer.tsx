import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import About from '../provably-fair/about'

export default function Footer() {
  const [dialog, setDialog] = useState(false)

  return (
    <div className="bg-slate-700 h-6 px-2 justify-between absolute w-full bottom-0 flex items-center">
      <div className="text-xs flex gap-1 items-center">
        <div className="flex text-xs items-center">
          <small className="text-gray-400 mr-1">Este jogo é </small>
          <div
            className="flex items-center opacity-75 hover:opacity-100 cursor-pointer"
            onClick={() => setDialog(true)}
          >
            <ShieldCheckIcon className="text-green-500 h-4 w-4 mr-1" />{' '}
            <small className="text-100-300">Provably Fair</small>
          </div>
        </div>
      </div>

      <div className="text-xs flex items-end ">
        <small className="text-gray-500">Powered by: </small>
        <small className="w-1"></small>
        <small>
          <a
            href="https://hypetech.games"
            target="_blank"
            className="text-gray-200 uppercase underline font-semibold"
          >
            Hypetech Games
          </a>
        </small>
      </div>

      <About show={dialog} toggle={setDialog} />
    </div>
  )
}
