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

export default function HowToPlay({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="overflow-hidden  py-5 sm:py-0">
        <section className="modal-header py-1 flex justify-between items-center px-3 relative">
          <h1 className="text-1xl uppercase font-bold pl-1 flex gap-4">
            <BanknotesIcon className="opacity-50 w-6 h-6" /> Regras do
            Jogo
          </h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
          >
            <XMarkIcon className="w-6 h-6 opacity-30" />
          </button>
        </section>
        <div className="p-4 text-sm ">
          <div className="grid lg:flex gap-8 align-center py-4">
            <img
              src="../images/logos/hypetech.png"
              className="h-10"
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
            <div className="grid lg:grid-cols-3 gap-12 mb-8">
              <div>
                <div className="image-step">
                  <div className="step-image step-1"></div>
                  <div className="description-box">
                    <p className="text-white text-[11px] font-semibold">
                      Digite o valor desejado e clique em APOSTA
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="image-step step-2">
                  <div className="description-box">
                    <p className="text-white text-[11px] font-semibold">
                      Veja como o crash ocorre e as probabilidades
                      sobem!
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="image-step">
                  <div className="step-image step-3"></div>
                  <div className="description-box">
                    <p className="text-white text-[11px] font-semibold">
                      Retirar antes do crash e ganhar X
                      vezes!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs font-light">
              No entanto, não se esqueça que tem um limite de tempo.
              Tem de se retirar antes do crash, caso
              contrário perderá a sua aposta.
            </p>

            <p className="text-base font-bold text-white mt-6 mb-6">
              Como jogar e quais são as regras?
            </p>
            <li className="list">
              Para fazer uma aposta, você precisa selecionar o valor
              desejado e clicar no botão "Aposta".
            </li>
            <li className="list">
              Dito isto, não há necessidade de se limitar a apenas uma
              aposta de cada vez. Você pode fazer duas apostas ao
              mesmo tempo usando o painel de apostas esquerdo e
              direito.
            </li>
            <li className="list">
              Para retirar os seus ganhos, precisa de clicar no botão
              "Retirar". Os seus ganhos consistem no total da sua
              aposta multiplicado pelo multiplicador de cashout.
            </li>
            <li className="list">
              Se não se retirar antes do Crash, a aposta
              é perdida.
            </li>

            <p className="text-base font-bold text-white mt-6 mb-6">
              Aposta automática e retirada automática
            </p>
            <li className="list">
              A aposta automática pode ser ativada no painel de
              qualquer aposta se você marcar a caixa "Aposta
              automática". Nesse caso, as apostas são feitas
              automaticamente. No entanto, para retirar os ganhos,
              você ainda precisa pressionar o botão "Retirada" para
              cada rodada.
            </li>
            <li className="list">
              Se você deseja automatizar completamente o jogo, é
              possível configurar a retirada automática de ganhos.
              Para fazer isso, você deve ativar no painel de apostas
              "Retirada automática". Em seguida, os fundos serão
              exibidos automaticamente quando você atingir o
              coeficiente especificado.
            </li>

            <p className="text-base font-bold text-white mt-6 mb-6">
              A nossa interface de jogo
            </p>
            <p className="text-[12px] text-light text-white opacity-1">
              Apostas ao vivo e Estatísticas
            </p>
            <li className="list">
              À esquerda (sob o quadro de apostas na interface móvel)
              existe o painel "Apostas ao vivo". Mostra as apostas que
              foram feitas na ronda actual.
            </li>
            <li className="list">
              O painel "As Minhas Apostas" contém informações sobre as
              apostas feitas e os levantamentos durante todo o tempo
              do jogo.
            </li>
            <li className="list">
              O painel "Top" é onde se encontram as estatísticas do
              jogo. Aqui pode estudar os ganhos de outros jogadores
              tanto em termos de montantes como de probabilidades de
              levantamento. Desta forma, é possível ver as maiores
              probabilidades numa ronda.
            </li>

            <p className="text-[12px] text-light text-white opacity-1 mt-6">
              Conversa dentro do jogo
            </p>
            <li className="list">
              À direita (se você usar a interface móvel, no canto
              superior direito), há uma barra de bate-papo geral. Ele
              é projetado para se comunicar com outros jogadores. Além
              disso, o bate-papo apresenta automaticamente informações
              sobre o recebimento de grandes ganhos.
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
