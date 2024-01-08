import Modal from '@/core/components/modal'
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
/* import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider' */

type Props = {
  show: boolean
  toggle: Function
}

export default function HowToPlay({ show, toggle }: Props) {
/*   const { soundClick } = useContext(WallStreetGameContext) */

  const handleClick = () => {
 /*    soundClick() */
    toggle()
  }

  return (
    <Modal show={show} toggle={toggle}>
      <div className="py-0">
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
            <BanknotesIcon className="opacity-50 w-6 h-6" /> Regras do
            Jogo - Wall Street Bull
          </h1>
          <button
            onClick={(_) => handleClick()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6 opacity-30" />
          </button>
        </section>
        <div className="p-4 text-sm ">
          <div className="grid lg:flex gap-8 align-center py-4">
            <img
              src="../images/logos/hypetech.png"
              className="h-10 mx-auto"
            />
            <p className="text-xs font-semibold">
              A Hypetech é o último grito em entretenimento de jogo
              para uma nova geração de jogadores. Poderá ganhar várias
              vezes essa quantia em apenas alguns segundos! Nossos
              Jogos Turbo baseiam-se em uma forma que pode ser
              verificado no momento e é considerado como a única
              garantia real de funcionamento de justiça na indústria
              do jogo.
            </p>
          </div>
          <hr />
          <div className="p-3">
            <div className="grid lg:grid-cols-2 gap-12 mb-8 mx-auto">
              <div className="image-step sm:w-[60%] md:w-[45%] lg:w-[85%]  lg:h-[230px] h-[280px] mx-auto">
                <img
                  className="step-image mx-auto w-full h-[80%] lg:h-[73%] md:h-[78%] sm:h-[80%] h-[78%]"
                  src="../images/HTP/wall-street/step-1.png"
                />
                <div
                  className="description-box"
                  style={{ minHeight: '61px' }}
                >
                  <p
                    className="text-white text-[11px] font-semibold mx-auto"
                    style={{ lineHeight: '2' }}
                  >
                    Digite o valor desejado e selecione a tendência
                    que quer apostar, após, clique em REALIZAR
                    ENTRADA.
                  </p>
                </div>
              </div>
              <div className="image-step sm:w-[60%] md:w-[45%] lg:w-[85%]  lg:h-[230px] h-[280px] mx-auto">
                <img
                  className="step-image mx-auto w-full h-[80%] lg:h-[73%] md:h-[78%] sm:h-[80%] h-[78%]"
                  src="../images/HTP/wall-street/step-2.png"
                />
                <div
                  className="description-box"
                  style={{ minHeight: '61px' }}
                >
                  <p
                    className="text-white text-[11px] font-semibold mx-auto"
                    style={{ lineHeight: '2' }}
                  >
                    Espere a barra se fixar e descubra se ganhou!
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs font-light">
              No entanto, não se esqueça que tem um limite de tempo.
              Tem de se fazer a aposta apenas durante a fase de
              apostas. Jogar <b>Wall Street Bull</b> é puro jogo de
              azar! É aqui que se arrisca e ganha. Tudo depende de si!
            </p>

            <p className="text-base font-bold text-white mt-6 mb-6">
              Como jogar e quais são as regras?
            </p>
            <li className="list">
              Para fazer uma aposta, você precisa selecionar o valor
              desejado, após isto selecionar a tendência que você
              acredita que sairá! por fim clicar no botão
              <b> "REALIZAR ENTRADA"</b>.
            </li>

            <li className="list">
              Para retirar os seus ganhos, precisa esperar a tendência
              da barra se fixar. Os seus ganhos consistem no total da
              sua aposta multiplicado pelo multiplicador de cashout.
            </li>

            {/*  <p className="text-base font-bold text-white mt-6 mb-6">
              Aposta automática e retirada automática
            </p>
            <li className="list">
              A aposta automática pode ser ativada no painel de
              qualquer aposta ao clicar na aba <b>Auto</b> no canto
              superior esquerdo da tela. Para usar este modo, você
              deve definir no painel de apostas a face que você
              acredita que irá sair e quantas vezes deseja repetir
              esta jogada no campo "Quantidade", e então, iniciar o
              jogo automático clicando em "INICIAR APOSTA AUTO".
            </li> */}

            <p className="text-base font-bold text-white mt-6 mb-6">
              A nossa interface de jogo
            </p>
            <p className="text-[12px] text-light text-white opacity-1">
              Apostas ao vivo e Estatísticas
            </p>
            <li className="list">
              O painel <b>"LANCES ANTERIORES"</b> que ha abaixo da
              tela do jogo (ou acima na versão mobile) contém
              informações sobre os últimos resultados que saíram
              durante os últimos jogos.
            </li>

            <li className="list">
              Abaixo do painel do jogo existe o painel "APOSTAS AO
              VIVO" onde mostra as apostas que foram feitas na rodada
              atual.
            </li>

            <p className="text-[12px] text-light text-white opacity-1 mt-6">
              Lidar com problemas técnicos
            </p>
            <li className="list">
              O operador não é responsável pela perda de uma aposta
              devido a uma interrupção da conexão com a Internet.
              Recomendamos jogar se você tiver uma conexão estável.
            </li>
            <li className="list">
              Caso ocorra uma falha no equipamento de jogo ou no
              software do jogo, todas as apostas e pagamentos serão
              confiscados. Entretanto, as apostas serão reembolsadas
              na íntegra aos jogadores afetados no prazo de 1 hora.
            </li>
          </div>
        </div>
      </div>
    </Modal>
  )
}
