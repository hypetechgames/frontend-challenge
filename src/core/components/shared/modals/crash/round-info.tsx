import Modal from '@/core/components/modal'
import {
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export interface IRoundInfo {
  id: number
  seed: string
  extras: {
    hash: string
    point: number
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
  return (
    <Modal show={show} toggle={toggle}>
      <div className="w-full rounded-md">
        <section className="modal-header py-1 flex justify-between items-center px-3  relative">
          <h1 className="text-1xl uppercase flex gap-4 p-3">Partida #{data.id} <span className="default-badget block mt-[-3px]">{data.extras?.point} x</span></h1>
          <button
            onClick={() => toggle()}
            className="btn p-0 btn-sm hover:bg-slate-900 bg-opacity25 input focus:outline-none focus:shadow-none input-sm0 hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="w-full text-sm">
          <div className="px-6 py-4 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <ServerIcon className="w-8 h-8 pt-1 text-[#6c73a8] mt-[27px]" />
                <div>
                  <p className="text-base font-bold text-white mt-6">Server Seed</p>
                  <p className="text-xs">Gerado por Provably Fair</p>
                </div>

              </div>

              <div className="w-full fake-box">
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
                <ShieldCheckIcon className="w-8 h-8 pt-1 text-[#6c73a8] mt-[27px]" />
                <div>
                  <p className="text-base font-bold text-white mt-6">Hash SHA512 combinada</p>
                  <p className="text-xs">A seed acima mencionada é convertidas em hash SHA512. Este é o resultado deste jogo</p>
                </div>
              </div>

              <div className="w-full fake-box">
                <input
                  type="text"
                  value={data.extras?.hash}
                  className="w-full rounded-md border-gray-600 bg-slate-900 bg-opacity-25 input input-sm focus:shadow-none focus:outline-0 cursor-text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex fake-box justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-center text-gray-400 text-xs">HEX</div>

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
                <div className="text-center text-xs text-gray-400">
                  DEC
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
                <div className="text-center text-xs text-gray-400">
                  Resultado
                </div>

                <div className="w-full px-2">
                  <input
                    type="text"
                    value={data.extras?.point}
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
