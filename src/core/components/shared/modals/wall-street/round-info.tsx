import Modal from '@/core/components/modal'
import {
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React,{ useContext} from 'react'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'

export interface IRoundInfo {
  id: number
  seed: string
  extras: {
    hash: string
    trending: number
    decimal: number
    slice: string
  }
}

type Props = {
  show: boolean
  toggle: Function
  data: IRoundInfo
}

export default function RoundInfoModal({
  show,
  toggle,
  data,
}: Props) {
  
  const { soundClick } = useContext(WallStreetGameContext);

  const handleClick = () => {
    soundClick()
    toggle();
  }

  return (
    <Modal show={show} toggle={toggle}>
      <div className="w-full rounded-md">
        <section className="bg-gray-900 py-1 flex justify-between items-center px-3  relative">
          <h1 className="text-1xl uppercase ">Partida #{data.id}</h1>
          <button
            onClick={() => handleClick()}
            className="btn p-0 btn-sm hover:bg-slate-900 bg-opacity25 input focus:outline-none focus:shadow-none input-sm0 hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="w-full text-sm bg-slate-800">
          <div className="px-6 py-4 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <ServerIcon className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="text-gray-50">Server Seed:</span>
                  <span className="text-gray-400">
                    Gerado por nosso servidor
                  </span>
                </div>
              </div>

              <div className="w-full px-2">
                <input
                  type="text"
                  value={data.seed}
                  className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <ShieldCheckIcon className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="text-gray-50">SHA512 Hash:</span>
                  <span className="text-gray-400">
                    Este é o resultado do jogo
                  </span>
                </div>
              </div>

              <div className="w-full px-2">
                <input
                  type="text"
                  value={data.extras?.hash}
                  className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col gap-2">
                <div className="text-center text-gray-400">Hex:</div>

                <div className="w-full px-2">
                  <input
                    type="text"
                    value={data.extras?.slice}
                    className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text text-center"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-center text-gray-400">
                  Decimal:
                </div>

                <div className="w-full px-2">
                  <input
                    type="text"
                    value={data.extras?.decimal}
                    className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text text-center"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-center text-gray-400">
                  Resultado:
                </div>

                <div className="w-full px-2">
                  <input
                    type="text"
                    value={data.extras?.trending}
                    className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text text-center"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
