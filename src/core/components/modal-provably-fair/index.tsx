import Modal from '@/core/components/modal'
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function About({ show, toggle }: Props) {
  const modalRef = React.useRef()

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      toggle()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <Modal show={show} toggle={toggle}>
      <div className="py-0" ref={modalRef}>
        <section
          className="modal-header py-2 flex justify-between items-center px-3 relative"
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#141414',
            zIndex: 9999,
          }}
        >
          <h1 className="text-1xl uppercase font-bold pl-1 flex gap-4">
            O Que é Provably Fair?
          </h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6 opacity-30" />
          </button>
        </section>
        <div className="p-4 text-sm ">
          <div className="grid  gap-8 align-center py-4">
            <img
              src="../images/icons/SecureLogo.svg"
              className="h-35 mx-auto"
            />
            <p className=" flex justify-center text-white">
              ProvablyFair - 100% FAIR GAME
            </p>
            <div className=" flex bg-black opacity-bg-30 rounded p-3 border-gray-700 ">
              <p className="text-xs font-semibold">
                Este jogo é baseado em tecnologia criptográfica
                chamada "Provably Fair". Esta tecnologia garante 100%
                de justiça no resultado do jogo. Com esta tecnologia,
                é impossível que terceiros interfiram no processo do
                jogo.
              </p>
            </div>
          </div>

          <p className=" flex justify-center text-white mb-2">
            COMO ISTO FUNCIONA
          </p>
          <p className="  text-white mb-3">Explicação rápida</p>
          <p className="text-xs font-semibold mb-6">
            O resultado de cada rodada (multiplicador "Fly away" do
            jogo) não é gerado em nossos servidores. É gerado com a
            ajuda de jogadores redondos e é totalmente transparente.
            Dessa forma, é impossível alguém manipular a saída do
            jogo. Além disso, qualquer pessoa pode verificar e
            confirmar a imparcialidade do jogo
          </p>

          <p className="  text-white mb-3">Mais informações</p>
          <p className="text-xs font-semibold mb-3">
            O resultado da rodada é gerado a partir de quatro
            participantes independentes da rodada: o operador do jogo
            e os 3 primeiros apostadores da rodada. O operador está
            gerando a semente do servidor (16 símbolos aleatórios). A
            versão hash desta semente de servidor está disponível
            publicamente antes do início da rodada (no menu do
            usuário, marque "Configurações provavelmente justas" e
            depois "Semente do próximo servidor SHA256") A semente do
            cliente é gerada ao lado de cada jogador e quando a rodada
            começa, os 3 primeiros apostadores são participando na
            geração do resultado redondo.
          </p>

          <p className="text-xs font-semibold">
            Quando a rodada começa, o jogo mescla a semente do
            servidor com três sementes do cliente. A partir dos
            símbolos mesclados é gerado o hash SHA512, e a partir
            desse hash - o resultado do jogo.
          </p>

          <div className="p-3">
            <img
              src="../images/icons/provably.svg"
              className=" w-[100%] p-3 md:p-10 lg:p-20"
            />
            <p className=" flex justify-center text-white mb-2">
              COMO CHECAR
            </p>

            <li className="list text-xs font-semibold">
              Você pode verificar a justiça de cada rodada do jogo
              histórico, clicando no ícone verde.
            </li>
            <li className="list text-xs font-semibold">
              Na janela aberta, você verá a semente do servidor, 3
              pares de sementes dos jogadores, hash combinado e
              resultado da rodada.
            </li>
            <li className="list text-xs font-semibold">
              A versão hash da semente do servidor das próximas
              rodadas está disponível publicamente na janela de
              configurações (no menu do usuário, marque "Configurações
              provavelmente justas" e depois "Próxima semente do
              servidor SHA256"). Você também pode alterar a semente do
              seu cliente aqui.
            </li>
            <li className="list text-xs font-semibold">
              Se você quiser participar da geração de resultados da
              rodada, certifique-se de estar entre os 3 primeiros
              jogadores que apostam naquela rodada.
            </li>
          </div>
        </div>
      </div>
    </Modal>
  )
}
