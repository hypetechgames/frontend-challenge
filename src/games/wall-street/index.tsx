import './index.css'

import React, { useContext, useEffect } from 'react'
import Form from './components/form'
import TransactionPanel from './components/transaction-panel'
import Display from './components/display'
import Snackbar from '@/core/components/snackbar'
import Results from './components/results'
import { SessionContext } from '@/core/providers/session.provider'
import Navbar from './components/navbar'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'
import { Trending } from './components/transaction-panel/enums/trending.enum'
import Footer from '@/core/components/footer'

export enum ResultColor {
  RED = 'red',
  BLACK = 'black',
  WHITE = 'white',
}

function HomePage() {
  const { setLoading } = useContext<any>(SessionContext)
  const { iframeRef, balance, executeAction } = useContext<any>(
    WallStreetGameContext
  )

  useEffect(() => {
    setLoading(false)
  }, [iframeRef])

  return (
    <div className="flex flex-col min-h-scree wall-street-game">
      <section className="flex flex-col h-full w-full max-w-auto mx-auto">
        <div>
          <div className="" style={{ zIndex: 100 }}>
            <Navbar
              game="wall-street"
              executeAction={executeAction}
              balance={balance}
            />
          </div>
          <div className="w-full h-full flex soft-border-bottom lg:min-h-[70vh]">
            <div className="w-full md:w-[75%] lg:w-[85%] 2xl:w-[90%] relative order-1">
              <div className="flex h-full flex-col">
                <div className="h-full min-h-[300px] order-3 sm:order-1 relative z-0">
                  <iframe
                    ref={iframeRef}
                    src="/wall-street/index.html"
                    className="overflow-hidden w-full h-full pointer-events-none min-h-[200px] sm:min-h-[250px] lg:min-h-[350px]"
                  ></iframe>
                  <Display />
                </div>

                <div className="order-2"></div>

                <div
                  className="p-3 order-1 sm:order-3 md:border-r border-slate-700"
                  style={{ zIndex: 1 }}
                >
                  <div className="my-1">
                    <Footer />
                  </div>
                  <Results />
                </div>
              </div>

              <Snackbar />
            </div>
            <div className="hidden md:block md:w-[25%] lg:w-[15%] 2xl:w-[10%] p-3 order-2">
              <Form position={'center'} />
            </div>
          </div>
          <div className="w-full p-3 md:hidden">
            <Form position={'center'} />
          </div>
        </div>

        <div className="grid h-full grow grid-cols-3">
          <div className="col-span-3 md:col-span-1">
            <TransactionPanel trending={Trending.UP} />
          </div>
          <div className="col-span-3 md:col-span-1">
            <TransactionPanel trending={Trending.IDLE} />
          </div>
          <div className="col-span-3 md:col-span-1">
            <TransactionPanel trending={Trending.DOWN} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
