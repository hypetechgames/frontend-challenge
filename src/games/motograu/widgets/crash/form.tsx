import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Tabs from '@/core/components/tabs'
import If from '@/core/components/conditions/if'
import TextField from '@/core/components/text-field'
import { GameStatus } from '@/core/providers/enums/game-status'

import {
  formatCurrencyToNumber,
  formatOdd,
  formatBRLCurrency,
} from '@/core/helpers/format-currency'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { TransactionStatus } from '@/core/providers/enums/transaction'
import { TransactionMode } from '@/core/providers/enums/transaction'
import { MAX_AMOUNT, MIN_AMOUNT } from '@/core/constants'

type Props = {
  secondEnabled?: boolean
  toggleSecond?: Function
  hideSelf?: Function
  color?: string
  position: string
}

const   getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600 hover:bg-blue-700'
    case 'lime':
      return 'bg-[#7f047f] hover:bg-[#7f047f] border-[#7f047f]'
    case 'amber':
      return 'bg-amber-600 hover:bg-amber-700'
    case 'yellow':
      return 'bg-yellow-400 hover:bg-yellow-500'
    case 'red':
      return 'bg-red-700 hover:bg-red-800'
    case 'redDark':
      return 'bg-red-800 hover:bg-red-800'
    case 'pink':
      return 'bg-pink-700 hover:bg-pink-800'
    case 'rose':
      return 'bg-rose-700 hover:bg-rose-800'
    case 'custom-freestyle-v2':
      return 'custom-button-freestyle-v2'
    case 'purple':
      return 'bg-purple-600 hover:bg-purple-700'
    case 'blue2':
      return 'bg-blue-800 hover:bg-blue-700'
  }
}

export default function CrashForm({
  toggleSecond,
  secondEnabled,
  hideSelf,
  color = 'lime',
  position,
}: Props) {
  if (color === 'custom-freestyle-v2') {
    // Set hideSelf to true and secondEnabled to false when color is blue
    if (hideSelf) hideSelf()
    if (toggleSecond) toggleSecond()
  }

  const backgroundColor = getBackgroundColor(color)
  const formRef = useRef<any>(null)
  const [oddMultiplier, setOddMultiplier] = useState(1);

  const {
    gameStatus,
    multiplier,
    registerTransaction,
    cancelTransaction,
    transactions,
    setTransactions,
    cashOut,
    setShowChat,
    startTimeout,
  } = useContext<any>(CrashGameContext)

  const transaction = transactions[position]

  useEffect(() => {
    updateAmount(formatBRLCurrency(1.0))
    updateExitValue(formatBRLCurrency(100.0))
  }, [])

  function submitTransaction(e) {
    e.preventDefault()
    registerTransaction(position)
  }

  function cancelFuterTransaction() {
    transaction.status = TransactionStatus.UNREGISTERED
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateMode = (value: string) => {
    transaction.mode = value
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateAmount = (value: string) => {
    let newAmount = formatCurrencyToNumber(value)

    if (newAmount < MIN_AMOUNT) newAmount = MIN_AMOUNT
    else if (newAmount > MAX_AMOUNT) newAmount = MAX_AMOUNT

    transaction.amount = formatOdd(newAmount)
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateExitValue = (value: string) => {
    const multiplier = formatCurrencyToNumber(value)

    transaction.exitValue = formatOdd(multiplier)
    // Verifica se o novo valor é menor que 1.5, se for, define como 1.5 - NUNCA pode ser menor que 1.5 pois reflete em um grande problema
    if (multiplier < 1.5) {
      transaction.exitValue = formatOdd(1.5)
    } else {
      transaction.exitValue = formatOdd(multiplier)
    }
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateRoundCount = (value) => {
    let parsed = parseInt(value)

    if (isNaN(parsed)) parsed = 0
    else if (parsed < 0) parsed = 0
    else if (parsed > 100) parsed = 100

    transaction.roundCount = parsed
    setTransactions({ ...transactions, [position]: transaction })
  }

  const doubleAmount = () => {
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount * 2))
  }

  const setAmount = (value: number) => {
    updateAmount(formatBRLCurrency(value))
  }

  const divideAmount = () => {
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount / 2))
  }

  const tabs = [
    { key: TransactionMode.COMMON, title: 'Normal' },
    { key: TransactionMode.AUTO, title: 'Auto' },
  ]

  useEffect(() => {
    if (gameStatus == GameStatus.RUNNING) {
      setShowChat(false)
    } else {
      setShowChat(true)
    }
  }, [gameStatus])

  const values = [10, 20, 50, 100, 200, 500];

  return (
    <div className="bg-black border border-gray-600 bg-opacity-20 border-opacity-20 crash-form w-full h-45 md:w-1/2 flex rounded-md p-3 relative">
      <If condition={toggleSecond && !secondEnabled}>
        <button
          onClick={toggleSecond}
          className={`btn border-none bg-[#ffffff] bg-opacity-10 btn-xs btn-circle absolute px-1 mt-1 right-3 text-white`}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </If>

      <If condition={hideSelf}>
        <button
          onClick={() => hideSelf()}
          className={`btn border-none btn-xs bg-[#ffffff] bg-opacity-10 hover:bg-opacity-95 btn-circle absolute px-1 mt-1 right-3 text-white`}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
      </If>

      <form
        ref={formRef}
        method="POST"
        className="w-full xl:w-[94%] mx-auto flex gap-3"
        onSubmit={(e) => submitTransaction(e)}
        style={{ margin: 0 }}
      >
        <div className="w-[50%]">
          <input type="hidden" name="teste" />
          <div className="w-full flex justify-center mb-3">
            <div className="w-[100%]">
              <Tabs
                tabs={tabs}
                size="w-1/2"
                active={transaction.mode}
                toggle={updateMode}
                variant={'gray'}
              />
            </div>
          </div>
          <section className="flex mx-auto gap-3 w-full">
            <div className="flex flex-col w-full">
              <div className="flex gap-2">
                <TextField
                  id="valueInput"
                  name="amount"
                  disabled={
                    transaction.status != TransactionStatus.UNREGISTERED
                  }
                  value={transaction.exitValue}
                  setValue={updateExitValue}
                  label="Auto Retirar"
                />
                <If
                  condition={transaction.mode == TransactionMode.AUTO}
                >
                  <TextField
                    id="valueInput"
                    name="amount"
                    disabled={
                      transaction.status !=
                      TransactionStatus.UNREGISTERED
                    }
                    value={transaction.roundCount}
                    setValue={updateRoundCount}
                    label="Quantidade"
                  />
                </If>
              </div>
            </div>
          </section>
          <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:mr-2"
          >
            {values.map((item) => (
              <div className="col-span-1 h-full">
                <button
                  onClick={() =>setAmount(item)}
                  type="button"
                  disabled={
                    transaction.status !=
                    TransactionStatus.UNREGISTERED
                  }
                  className="btn btn-ghost min-h-0 grow w-full h-full rounded capitalize text-normal font-normal disabled:bg-gray-700 disabled:bg-opacity-30 border-gray-700 border-opacity-40 py-1"
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[20rem] flex flex-col gap-2">
            <If
              condition={
                transaction == null ||
                transaction?.status == TransactionStatus.UNREGISTERED
              }
            >
              <button
                className={`btn border-2 hover:border-[#7f047f] text-[22px] hover:text-[24px] rounded-[20px] border-[#7f047f]-400 
                bg-rose flex flex-col px-0 text-white h-[60%] w-full ${getBackgroundColor(color)}`}
              >
                <span className="text-sm font-normal text-white">
                  {transaction.mode == TransactionMode.COMMON
                    ? 'Apostar'
                    : 'Aposta Auto'}
                </span>
                <span className="mt-[3px] font-normal text-shadow-sm">
                  R$ {transaction.amount}
                </span>
              </button>
            </If>

            <If
              condition={
                gameStatus != GameStatus.RUNNING &&
                transaction?.status == TransactionStatus.REGISTERED
              }
            >
              <button
                className={`btn border-2 text-[22px] hover:text-[24px] flex flex-col px-0 text-white h-[60%] w-full bg-red-700 rounded-[20px] hover:bg-red-800 border-[#ffffff40] hover:border-gray-400 `}
                onClick={() => cancelTransaction(position)}
              >
                <If condition={transaction.autoStarted}>
                  <span className="text-sm">
                    Cancelar ({transaction.roundCount + 1})
                  </span>
                </If>

                <If condition={!transaction.autoStarted}>
                  <span className="text-sm">Cancelar</span>
                </If>

                <span className="text-xl font-semibold">
                  R$ {transaction.amount}
                </span>
              </button>
            </If>

            <If
              condition={
                gameStatus != GameStatus.IDLE &&
                transaction?.status == TransactionStatus.PENDING
              }
            >
              <div className="flex flex-col w-full h-full">
                <button
                  className={`btn border-2 text-[22px] hover:text-[24px] bg-red-700 rounded-[20px] hover:bg-red-800 border-[#ffffff40] flex flex-col px-0 text-white h-[100%] w-full`}
                  onClick={cancelFuterTransaction}
                >
                  <If condition={transaction.autoStarted}>
                    <span className="text-sm">
                      Cancelar ({transaction.roundCount})
                    </span>
                  </If>

                  <If condition={!transaction.autoStarted}>
                    <span className="text-xl">Cancelar</span>
                  </If>
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
                className={`btn border-2 text-[22px] hover:text-[24px] bg-[#ff7700] rounded-[20px] hover:bg-[#d26200] border-[#ffffff40] flex flex-col px-0 text-white h-[60%] w-full`}
                onClick={() => cashOut(position)}
              >
                <If condition={transaction.autoStarted}>
                  <span className="text-sm">
                    Retirar ({transaction.roundCount + 1})
                  </span>
                </If>

                <If condition={!transaction.autoStarted}>
                  <span className="text-sm">Retirar</span>
                </If>
                <span className="text-xl font-semibold">
                  R$ {(transaction.amount * multiplier).toFixed(2)}
                </span>
              </button>
            </If>
            <div className='h-[32%] flex w-full gap-3'>
              <div className="col-span-1 h-full">
                <button
                  onClick={divideAmount}
                  type="button"
                  disabled={
                    transaction.status !=
                    TransactionStatus.UNREGISTERED
                  }
                  className="btn btn-ghost min-h-0 flex-1 w-full h-full rounded text-xl font-normal disabled:bg-gray-700 disabled:bg-opacity-30 border-gray-700 border-opacity-40"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
              </div>
              <TextField
                id="valueInput"
                name="amount"
                className="text-lg text-white"
                disabled={
                  transaction.status !=
                  TransactionStatus.UNREGISTERED
                }
                value={transaction.amount}
                setValue={updateAmount}
              />
              <div className="col-span-1">
                <div className="col-span-1 h-full">
                  <button
                    onClick={doubleAmount}
                    type="button"
                    disabled={
                      transaction.status !=
                      TransactionStatus.UNREGISTERED
                    }
                    className="btn btn-ghost min-h-0 grow w-full h-full rounded capitalize text-normal font-normal disabled:bg-gray-700 disabled:bg-opacity-30 border-gray-700 border-opacity-40"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
      </form>
    </div>
  )
}
