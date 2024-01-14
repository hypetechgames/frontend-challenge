import React, { useState } from 'react'

import If from '@/core/components/conditions/if'
import Tabs, { Tab } from '../tabs'
import BetsTab from './lists/bets/bets'
import HistoryTab from './lists/bets/history'
import Footer from '@/core/components/footer'

type Props = {
  variant: string
}

export default function TransactionBar({ variant }: Props) {
  const [activeTab, setActiveTab] = useState('bets')

  const tabs: Tab[] = [
    { key: 'bets', title: 'Apostas' },
    { key: 'history', title: 'Histórico' },
    // { key: 'best', title: 'Estatísticas' },
  ]

  return (
    <div className="h-[96%] py-12 pt-0">
        <section className="w-full flex justify-center bg-transparent p-2">
          <div className="w-full sm:w-[90%]">
            <Tabs
              tabs={tabs}
              size="w-1/2"
              active={activeTab}
              toggle={setActiveTab}
              variant={variant}
            />
          </div>
        </section>
      <div className="flex flex-col transaction-bar min-h-[400px] flex-1 grow h-full w-full p-3 rounded-md bg-black bg-opacity-20 border border-gray-600 border-opacity-20 relative ">

        <If condition={activeTab == 'bets'}>
          <BetsTab />
        </If>

        <If condition={activeTab == 'history'}>
          <HistoryTab />
        </If>
      </div>
      <Footer />
    </div>
  )
}
