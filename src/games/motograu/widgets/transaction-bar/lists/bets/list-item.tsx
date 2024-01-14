import React, { useState, useEffect } from 'react'
import { Transaction, TransactionStatus } from './history.index'
import If from '@/core/components/conditions/if'

type Props = {
  data: Transaction
  id: number
}

export const itemIsOdd = (id: number) => id % 2 === 0 ? 'bg-opacity-0' : 'bg-opacity-10';

export const number = (value: number) => {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 10) {
      return `0${value.toFixed(2)}`;
    } else {
      return value.toFixed(2);
    }
  } else {
    return '00.00';
  }
};
  

export default function ListItem({ data, id }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'
  const [randomNumber, setRandomNumber] = useState(null)


  // Gere o número aleatório uma única vez quando o componente for montado
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 21)
    setRandomNumber(randomNum)
  }, []) // O array vazio [] garante que o efeito seja executado apenas uma vez

  const renderValue = isGreen ? number(data.payout) : number(data.extras.exit_value);

  return (
    <div
      className={`flex items-center text-xs text-white p-1.5 gap-1 bg-primary ${itemIsOdd(id)}`}
    >
      <h1 className="w-1/4 flex gap-3 overflow-hidden items-center">
        <img
          src={`https://api.multiavatar.com/${randomNumber}.svg`}
          className="w-6 h-6 invert"
        />
        <span className="whitespace-nowrap player-name text-center">
          {data.player.username}
        </span>
      </h1>
      <h1 className={`w-1/4 text-center items-center gap-2 ${isRed ? 'text-error' : 'text-white'}`}>
        <span className="w-10 text-right">
          R$ {data.amount.toFixed(2)}
        </span>
      </h1>
      <div className={`w-1/4 text-success text-center`}>
        <If condition={isGreen}>
          {data.profit !== undefined && typeof data.profit === 'number'
            ? `R$ ${data.profit.toFixed(2)}`
            : '0,00'}
        </If>
      </div>
      <h1 className="w-1/4 flex items-center text-center">
          <span
            className={`text-xs h-5 flex items-center justify-center w-12`}>
            {renderValue ? (
              <>
                <span className={`bg-[#894aff] bg-opacity-40 rounded text-xs mx-1 h-4 flex items-center justify-center w-5 p-2`}>
                  x
                </span>
                {renderValue}x
              </>
            ) : '-'}
          </span>
      </h1>
    </div>
  )
}
