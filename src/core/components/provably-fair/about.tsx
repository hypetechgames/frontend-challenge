import Modal from '@/core/components/modal'
import {
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function About({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="bg-gray-500 py-1 flex justify-between items-center px-3  relative">
        <h1 className="text-1xl uppercase ">
          O que é Probably Fair?
        </h1>
        <button
          onClick={(_) => toggle()}
          className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4 text-sm bg-slate-900">
        <div className="flex flex-col items-center mb-2">
          <ShieldCheckIcon className="text-green-500 h-24 w-24" />

          <h1>Comprovadamente Justo - JOGO 100% JUSTO</h1>
        </div>

        <div className="alert alert-info mb-2">
          Este jogo é baseado na tecnologia criptográfica chamada
          "Probably Fair". Esta tecnologia garante 100% de justiça no
          resultado do jogo. Com esta tecnologia, é impossível que
          terceiros interfiram no processo do jogo.
        </div>

        <h3 className="text-1xl text-white text-center font-bold mb-1">
          Como funciona
        </h3>

        <dl>
          <dt className="mb-1 text-white">Explicação rápida</dt>
          <dd className="mb-2">
            O resultado de cada rodada (multiplicador do jogo) não é
            gerado em nossos servidores. É gerado com a ajuda de
            jogadores redondos e é totalmente transparente. Dessa
            forma, é impossível para qualquer um manipular a saída do
            jogo. Além disso, qualquer pessoa pode verificar e
            confirmar a imparcialidade do jogo.
          </dd>

          <dt className="mb-1 text-white">Mais Informações</dt>
          <dd className="mb-2">
            O resultado da rodada é gerado a partir de quatro
            participantes independentes da rodada: o operador do jogo
            e os 3 primeiros apostadores da rodada.O operador está
            gerando a semente do servidor (16 símbolos aleatórios). A
            versão com hash desta semente do servidor está disponível
            publicamente antes do início da rodada (no menu do
            usuário, marque "Configurações provavelmente justas" e
            depois "Próxima semente do servidor SHA256"). A hash do
            cliente é gerada ao lado de cada jogador e, quando a
            rodada começa, os 3 primeiros jogadores irão participar da
            geração do resultado da rodada.
          </dd>
        </dl>

        <p>
          Quando a rodada começa, o jogo mescla a semente do servidor
          com três sementes do cliente. A partir dos símbolos
          mesclados é gerado o hash SHA512 e, a partir desse hash, o
          resultado do jogo.
        </p>
      </div>
    </Modal>
  )
}
