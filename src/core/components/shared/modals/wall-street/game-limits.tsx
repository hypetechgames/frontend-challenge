import Modal from '@/core/components/modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function GameLimitsModal({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="w-full rounded-md bg-[#383A3E] opacity-100">
        <section className="bg-gray-900 py-1 flex justify-between items-center px-3  relative">
          <h1 className="text-1xl uppercase ">Limites de Jogo</h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="flex text-sm flex-col p-4 bg-gray-800">
          <div className="flex justify-between px-4 items-center border-b-0 text-sm w-full h-12 rounded-t-md border border-gray-600 bg-transparent">
            <span>Aposta mínima (R$):</span>

            <span className="bg-[#229607] font-bold py-1 px-3 rounded-full text-xs">
              1.00
            </span>
          </div>
          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border border-gray-600 bg-transparent">
            <span>Aposta máxima (R$):</span>

            <span className="bg-[#229607] font-bold py-1 px-3 rounded-full text-xs">
              500.00
            </span>
          </div>

          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border-t-0 rounded-b-md border border-gray-600 bg-transparent">
            <span>Ganho máximo por aposta (R$):</span>

            <span className="bg-[#229607] font-bold py-1 px-3 rounded-full text-xs">
              10000.00
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
