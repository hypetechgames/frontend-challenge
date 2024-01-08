import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import Tabs from '@/core/components/tabs'
import If from '@/core/components/conditions/if'
import TextField from '@/core/components/text-field'
import store from '@/store'
import { useSelector } from 'react-redux'
import { GameStatus } from '@/core/providers/enums/game-status'
import { TransactionStatus } from '@/core/providers/enums/transaction'

import {
  formatCurrencyToNumber,
  formatOdd,
  formatBRLCurrency,
} from '@/core/helpers/format-currency'

type Props = {
  secondEnabled?: boolean
  toggleSecond?: Function
  hideSelf?: Function
  variant?: string
  position: string
}

export default function CrashForm({
  toggleSecond,
  secondEnabled,
  hideSelf,
  variant = 'blue',
  position,
}: Props) {
  const formRef = useRef<any>(null)
  const [activeTab, setActiveTab] = useState<string>('common')
  const [amount, setAmount] = useState<string>(1.0)
  const [exitValue, setExitValue] = useState<string>('100.00')
  const [roundCount, setRoundCount] = useState('1')
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(500.0)

  const transaction = useSelector(
    (state) => state.transaction.registered[position]
  )

  const handler = useSelector((state) => state.game.handler)
  const multiplier = useSelector((state) => state.bet.currentOdd)
  const gameStatus = useSelector((state) => state.game.status)

  useEffect(() => {
    updateAmount(formatBRLCurrency(1.0))
  }, [])

  function registerTransaction(e) {
    e.preventDefault()
    document
      .getElementById('reactIFrame')
      .contentWindow.dispatchEvent(
        new CustomEvent('soundsPlayOneTime', {
          detail: {
            som: 'inicioDaPartida',
          },
        })
      )

    const transaction = {
      autoExit: activeTab == 'auto',
      status: TransactionStatus.PENDING,
      exitValue,
      autoRegister: false,
      index: position,
      amount,
    }

    store.dispatch({
      type: 'transaction/register',
      transaction,
    })

    if (gameStatus == GameStatus.IDLE) {
      handler.registerTransaction(transaction, position)
    }
  }

  function cancelTransaction() {
    if (gameStatus == GameStatus.IDLE) {
      handler.cancelTransaction(transaction)
    } else {
      cancelFuterTransaction()
    }
  }

  function cancelFuterTransaction() {
    store.dispatch({
      type: 'transaction/update',
      payload: {
        index: position,
        status: TransactionStatus.UNREGISTERED,
      },
    })
  }

  function cashOut() {
    document
      .getElementById('reactIFrame')
      .contentWindow.dispatchEvent(
        new CustomEvent('soundsPlayOneTime', {
          detail: {
            som: 'cashout',
          },
        })
      )

    handler.cashOut(transaction, multiplier)
  }

  const updateAmount = (value: string) => {
    const newAmount = formatCurrencyToNumber(value)

    if (newAmount < minAmount) setAmount(formatOdd(minAmount))
    else if (newAmount > maxAmount) setAmount(formatOdd(maxAmount))
    else setAmount(formatOdd(newAmount))
  }

  const updateExitValue = (value: string) => {
    const multiplier = formatCurrencyToNumber(value)

    transaction.exitValue = formatOdd(multiplier)
    // Verifica se o novo valor é menor que 1.5, se for, define como 1.5 - NUNCA pode ser menor que 1.5 pois reflete em um grande problema
    if (multiplier < 1.5) {
      transaction.exitValue = formatOdd(1.5);
    } else {
      transaction.exitValue = formatOdd(multiplier);
    }
    setTransactions({ ...transactions, [position]: transaction })
  }

  const doubleAmount = () => {
    const realAmount = formatCurrencyToNumber(amount)
    updateAmount(formatBRLCurrency(realAmount * 2))
  }

  const updateRoundCount = () => {
    setRoundCount('1')
  }

  const divideAmount = () => {
    const realAmount = formatCurrencyToNumber(amount)
    updateAmount(formatBRLCurrency(realAmount / 2))
  }

  const tabs = [
    { key: 'common', title: 'Normal' },
    { key: 'auto', title: 'Auto' },
  ]

  return (
    <div className="w-full  relative">
      <form
        ref={formRef}
        method="POST"
        className="w-full  justify-center"
        onSubmit={(e) => registerTransaction(e)}
      >
        <input type="hidden" name="teste" />
        <div className="w-full flex justify-center mb-3">
          <Tabs
            tabs={tabs}
            size="w-1/2"
            active={activeTab}
            toggle={setActiveTab}
            variant={'slate'}
          />
        </div>
        <section className="flex flex-col gap-3 justify-center">
          <div className="flex gap-2">
            <div className="w-1/2">
              <TextField
                id="valueInput"
                name="amount"
                value={amount}
                setValue={updateAmount}
                label="Valor"
              />
            </div>

            <div className="w-1/2">
              <div className="flex w-full gap-2">
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

          <div className="flex gap-3">
            <div className="w-full">
              <TextField
                id="valueInput"
                name="amount"
                value={exitValue}
                setValue={updateExitValue}
                label="Auto Retirar"
              }}
              />
            </div>

            <If condition={activeTab == 'auto'}>
              <TextField
                id="valueInput"
                name="amount"
                value={roundCount}
                setValue={updateRoundCount}
                label="Quantidade"
              />
            </If>
          </div>

          <If
            condition={
              transaction == null ||
              transaction?.status == TransactionStatus.UNREGISTERED
            }
          >
            <button
              className={`btn min-h-8 max-h-10 rounded btn-success text-gray-200 text-xs`}
            >
              Apostar
            </button>
          </If>

          <If
            condition={
              gameStatus != GameStatus.RUNNING &&
              transaction?.status == TransactionStatus.REGISTERED
            }
          >
            <button
              className={`btn min-h-8 max-h-10 rounded bg-red-700 w-full grow hover:bg-red-800 flex flex-col px-0 text-gray-200 border-none text-xs`}
              onClick={cancelTransaction}
            >
              Cancelar
            </button>
          </If>

          <If
            condition={
              gameStatus != GameStatus.IDLE &&
              transaction?.status == TransactionStatus.PENDING
            }
          >
            <div className="flex flex-col min-w-6/12">
              <button
                className={`btn min-h-8 max-h-10 rounded bg-red-700 w-full grow hover:bg-red-800 flex items-center px-0 text-gray-200 border-none text-xs`}
                onClick={cancelFuterTransaction}
              >
                Na Fila (Clique para Cancelar)
              </button>
            </div>
          </If>

          <If
            condition={
              gameStatus == GameStatus.RUNNING &&
              transaction?.status == TransactionStatus.REGISTERED
            }
          >
            <button
              className={`btn min-h-8 max-h-10 rounded bg-orange-700 hover:bg-orange-800 flex flex-col px-0 text-gray-200 border-none`}
              onClick={cashOut}
            >
              {(amount * multiplier).toFixed(2)} BRL
            </button>
          </If>
        </section>
      </form>
    </div>
  )
}
