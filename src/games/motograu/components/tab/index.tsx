import React, { useState } from 'react'

import If from '@/core/components/conditions/if'
import Tabs, { Tab } from '@/core/components/tabs'
import BetsTab from '@/core/components/transaction-bar/tabs/bets'
import Footer from '@/core/components/transaction-bar/footer'
import HistoryTab from '@/core/components/transaction-bar/tabs/history'
import BestTab from '@/core/components/transaction-bar/tabs/best'

type Props = {
  variant: string
}

export default function TransactionBar({ variant }: Props) {
  const [activeTab, setActiveTab] = useState('bets')

  const tabs: Tab[] = [
    { key: 'bets', title: 'Apostas' },
    { key: 'history', title: 'Histórico' },
    { key: 'best', title: 'Melhores' },
  ]

  return (
    <div className="flex flex-col bg-slate-800 h-full rounded-t relative ">
      <section className="w-full flex justify-center px-3 py-3">
        <div className="w-[80%]">
          <Tabs
            tabs={tabs}
            size="w-1/3"
            active={activeTab}
            toggle={setActiveTab}
            variant={variant}
          />
        </div>
      </section>

      <If condition={activeTab == 'bets'}>
        <BetsTab />
      </If>

      <If condition={activeTab == 'history'}>
        <HistoryTab />
      </If>

      <If condition={activeTab == 'best'}>
        <BestTab />
      </If>

      <Footer />
    </div>
  )
}
