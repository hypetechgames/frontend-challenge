import React from 'react'
import Header from './header'
import ListItem from './list-item'

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
  return (
    <div className="relative">
      <Header />

      {items.map((item) => (
        <ListItem data={item} />
      ))}
    </div>
  )
}
