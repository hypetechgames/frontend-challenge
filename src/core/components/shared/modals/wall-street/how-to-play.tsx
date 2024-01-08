import Modal from '@/core/components/modal'
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function HowToPlay({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="overflow-hidden py-0">
        <section className="bg-gray-900  py-1 flex justify-between items-center px-3  relative">
          <h1 className="text-1xl uppercase ">Como Jogar?</h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>
        <div className="p-4  bg-gray-800">
          <div className="flex flex-col gap-3">
            <div className="w-full flex gap-3 items-center">
              <BanknotesIcon className="w-12 h-12 " />
              <p>
                Faça uma aposta, ou até 3 ao mesmo tempo (uma aposta
                em cada tendência) e espere a rodada começar.
              </p>
            </div>

            <div className="w-full  flex gap-3 items-center">
              <ClockIcon className="w-12 h-12 " />

              <p>
                Aguarde alguns segundos até o resultado da partida ser
                revelado.
              </p>
            </div>

            <div className="w-full flex gap-3 items-center">
              <ArrowRightOnRectangleIcon className="w-12 h-12 " />
              <p>
                Ao final de cada partida, se a tendência selecionada
                para sortada, você ganhará o valor equivalente ao seu
                multiplicador.
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-col pt-5">
            <p>
              Lembre-se de sempre jogar com responsabilidade e
              estabelecer limites de perda antes de começar a jogar.
            </p>

            <p>
              A prática leva à perfeição. Portanto, comece com apostas
              menores e pratique o jogo para se familiarizar com as
              tendências do multiplicador e desenvolver sua
              estratégia.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
