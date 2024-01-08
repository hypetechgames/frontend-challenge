import React from 'react'
import ListItem from './list-item'

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  CANCELED = 'canceled',
}

export type Transaction = {
  player: {
    username: string
  }
  amount: number
  cashed_out_at?: number
  status: TransactionStatus
  outcome: string
  payout: number
  profit: number
}

type Props = {
  items: Transaction[]
}

export default function BetList({ items }: Props) {
  return (
    <div className="relative">
      {items.map((item, idx) => (
        <ListItem key={idx} data={item} />
      ))}
    </div>
  )
}
