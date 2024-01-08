import React, { useContext, useEffect, useRef, useState } from 'react'
import Tabs from '../tabs'
import If from '@/core/components/conditions/if'
import TextField from '@/core/components/text-field'
import { GameStatus } from '@/core/providers/enums/game-status'

import {
  formatCurrencyToNumber,
  formatOdd,
  formatBRLCurrency,
} from '@/core/helpers/format-currency'
import Options from './options'
import {
  TransactionMode,
  TransactionStatus,
} from '@/core/providers/enums/transaction'
import { MAX_AMOUNT, MIN_AMOUNT } from '@/core/constants'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'

type Props = {
  secondEnabled?: boolean
  toggleSecond?: Function
  hideSelf?: Function
  variant?: string
  position: string
}

export default function CrashForm({ position }: Props) {
  const formRef = useRef<any>(null)



  const {
    transactions,
    registerTransaction,
    executeAction,
    setTransactions,
    gameStatus,
    soundClick
  } = useContext<any>(WallStreetGameContext)

  const transaction = transactions[position]

  useEffect(() => {
    updateAmount(formatBRLCurrency(1.0))
  }, [])

  const updateMode = (value: string) => {
    transaction.mode = value
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateTrending = (trending: string) => {
    transaction.trending = trending
    setTransactions({ ...transactions, [position]: transaction })
  }

  function submitTransaction(e) {
    e.preventDefault()
    registerTransaction(position)
  }

  const cancelFuterTransaction = () => {
    transaction.status = TransactionStatus.UNREGISTERED
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateAmount = (value: string) => {
    let newAmount = formatCurrencyToNumber(value)

    if (newAmount < MIN_AMOUNT) newAmount = MIN_AMOUNT
    else if (newAmount > MAX_AMOUNT) newAmount = MAX_AMOUNT

    transaction.amount = formatOdd(newAmount)
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateRoundCount = (value) => {
    let parsed = parseInt(value)

    if (isNaN(parsed)) parsed = 0
    else if (parsed < 0) parsed = 0
    else if (parsed > 10) parsed = 10

    transaction.roundCount = parsed
    setTransactions({ ...transactions, [position]: transaction })
  }

  const doubleAmount = () => {
    soundClick();
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount * 2))
  }

  const divideAmount = () => {
    soundClick();
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount / 2))
  }

  const tabs = [
    { key: TransactionMode.COMMON, title: 'Normal' },
    { key: TransactionMode.AUTO, title: 'Auto' },
  ]

  const handleMousePosition = (direction: string) => {
    executeAction('setLine', { color: direction })
  }

    const [showCheck, setShowCheck] = useState(false);

  const betPlacing = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };


  return (
    <div className="w-full  relative">
      <form
        ref={formRef}
        method="POST"
        className="w-full  justify-center"
        onSubmit={submitTransaction}
      >
        <input type="hidden" name="teste" />
        <div className="w-full flex justify-center mb-3">
          <Tabs
            tabs={tabs}
            size="w-1/2"
            active={transaction.mode}
            toggle={updateMode}
            variant={'slate'}
          />
        </div>
        <section className="flex flex-col gap-3 justify-center">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <TextField
                id="valueInput"
                name="amount"
                class="h-full"
                value={transaction.amount}
                setValue={updateAmount}
                label="Valor"
              />
            </div>

            <div className="col-span-1">
              <div className="grid w-full gap-2">
                <button
                  onClick={divideAmount}
                  type="button"
                  className="btn min-h-8 max-h-10 rounded grow text-xl btn-ghost font-normal border-gray-700"
                >
                  &frac12;
                </button>

                <button
                  onClick={doubleAmount}
                  type="button"
                  className="btn min-h-8 max-h-10 rounded grow text-sm capitalize btn-ghost font-normal border-gray-700"
                >
                  2x
                </button>
              </div>
            </div>
          </div>

          <Options
            selected={transaction.trending}
            handleMousePosition={handleMousePosition}
            setSelected={updateTrending}
          />

          <If condition={transaction.mode == 'auto'}>
            <div className="flex ">
              <TextField
                id="valueInput"
                name="amount"
                value={transaction.roundCount}
                setValue={updateRoundCount}
                label="Quantidade"
              />
            </div>
          </If>

          <If condition={transaction.mode == 'auto'}>
            <If
              condition={
                transaction.autoStarted == false &&
                transaction.status != TransactionStatus.PENDING
              }
            >
              <button
                className={`btn bg-blue-700 hover:bg-blue-800 border-none font-bold min-h-8 max-h-10 rounded text-gray-200 text-xs`}
              >
                Iniciar Entrada Auto
              </button>
            </If>

            <If condition={transaction.autoStarted === true}>
              <button
                type="button"
                onClick={cancelFuterTransaction}
                className={`btn bg-red-700 hover:bg-red-800 border-none font-bold min-h-8 max-h-10 rounded text-gray-200 text-xs`}
              >
                Finalizar Entrada Auto ({transaction.roundCount})
              </button>
            </If>
          </If>
          <If condition={transaction.mode == 'common'}>
            <If
              condition={
                transaction == null ||
                transaction.status != TransactionStatus.PENDING
              }
            >
              <button
                onClick={betPlacing}
                className={`bet-btn min-h-[50px] md:min-h-[100px] font-bold min-h-8 max-h-10 rounded text-gray-200 text-xs`}
              >
                {showCheck ? <svg className="w-12 h-12 text-center mx-auto text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> : 'Realizar entrada'}
              </button>
            </If>

            <If
              condition={
                gameStatus != GameStatus.IDLE &&
                transaction.status == TransactionStatus.PENDING
              }
            >
              <div className="flex flex-col min-w-6/12">
                <button
                  type="button"
                  className={`cancel-btn min-h-[50px] md:min-h-[100px] font-bold min-h-8 max-h-10 rounded text-gray-200 text-xs`}
                  onClick={cancelFuterTransaction}
                >
                  Cancelar <br /> entrada
                </button>
              </div>
            </If>

          </If>
        </section>
      </form>
    </div>
  )
}
