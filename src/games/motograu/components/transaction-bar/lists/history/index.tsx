import React, { useContext, useState } from 'react'

import ListItem from './list-item'
import RoundInfoModal from '@/core/components/shared/modals/crash/round-info'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  CANCELED = 'canceled',
}

export type Transaction = {
  username: string
  amount: number
  cashed_out_at: number | null
  status: TransactionStatus
}

type Props = {
  items: Transaction[]
}

export default function BetList({ items }: Props) {
  const { roundInfo, getRoundInfo } =
    useContext<any>(CrashGameContext)

  const [showInfo, setShowInfo] = useState<boolean>(false)

  const showRoundInfo = (roundId) => {
    getRoundInfo(roundId)
    setShowInfo(true)
  }

  return (
    <>
      <div className="relative">
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            showRoundInfo={showRoundInfo}
            data={item}
          />
        ))}
      </div>

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
      />
    </>
  )
}
