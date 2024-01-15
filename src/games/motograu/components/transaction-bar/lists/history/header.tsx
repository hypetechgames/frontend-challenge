import React from 'react'

export default function Header() {
  return (
    <div className="w-full bg-transparent rounded z-10 grid-cols-5 flex items-center text-xs p-2">
      <h1 className="w-1/4 flex gap-3 items-center font-bold">#</h1>
      <h1 className="w-1/4 text-center font-bold">Valor</h1>
      <h1 className="w-1/4 text-center font-bold">Odd</h1>
      <div className="w-1/4 text-right font-bold">Fair</div>
    </div>
  )
}
