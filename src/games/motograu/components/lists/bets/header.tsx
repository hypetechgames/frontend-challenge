import React from 'react'

export default function Header() {
  return (
    <div className="w-full sticky top-0 bg-gray-700 rounded z-0 grid-cols-5 flex items-center mb-1 text-xs px-2 py-1">
      <h1 className="w-1/4 flex gap-3 items-center">Usuário</h1>
      <h1 className="w-1/4">Aposta</h1>
      <h1 className="w-1/4">Multiplicador</h1>
      <div className="w-1/4">Pagamento</div>
    </div>
  )
}
