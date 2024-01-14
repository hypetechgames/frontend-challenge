import React, { useEffect, useState } from 'react';
import GameWinAnimation from '../GameWinAnimation/GameWinAnimation';

export default function Transaction({
  amount,
  cashed_out_at,
  index,
}) {
  return (
    <div
      className="absolute border-green-600 rounded-lg top-4 z-50"
      style={{ top: `${index == 0 ? 20 : 30 + 80 * index}px` }}
    >
      <section
        className={
          'bg-green-800 bg-opacity-50 rounded-lg text-gray-200'
        }
        role="alert"
      >
        <div className="flex items-center px-3 py-1">
          <div className="d-flex flex-column text-center items-center mr-5">
            <div className="text-xs">
              <strong>Você saiu com</strong>
            </div>
            <strong className="text-xs">
              {parseFloat(cashed_out_at).toFixed(2)}x
            </strong>
          </div>

          <div
            className={
              'd-flex flex-column items-center text-center px-3 py-1 bg-green-500 rounded-lg'
            }
          >
            <div className="font-bold text-xs">Você ganhou</div>
            <strong className="text-white text-sm">
              R$ {parseFloat(amount * cashed_out_at).toFixed(2)}
            </strong>
          </div>
        </div>
      </section>
      <GameWinAnimation />
    </div>
  )
}
