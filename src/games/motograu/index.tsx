import './index.css'

import React, { useContext, useEffect, useState } from 'react'
import Display from './components/display'
import Snackbar from '@/core/components/snackbar'
import Results from './widgets/results/'
import TransactionBar from './widgets/transaction-bar'
import Controls from '@/core/components/controls/crash-control'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { SessionContext } from '@/core/providers/session.provider'
import { GameStatus } from '@/core/providers/enums/game-status'
import Navbar from './widgets/navbar/'
import { Chat } from './widgets/chat';

function HomePage() {
  const { setLoading } = useContext<any>(SessionContext)
  const { 
    iframeRef, 
    gameStatus, 
    executeAction, 
    balance, 
    showChat, 
    setShowChat 
  } = useContext<any>(CrashGameContext)

  useEffect(() => {
    iframeRef.current?.contentWindow.addEventListener(
      'instance-created',
      () => {
        setLoading(false)
        if (gameStatus == GameStatus.RUNNING)
          setTimeout(() => executeAction('start'), 1000)
      }
    )
  }, [iframeRef])

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-r motograu-game">
      <div className="flex w-full sm:gap-3 min-h-screen relative">
        <section className="flex flex-col h-full grow p-0">
          <div className="" style={{ zIndex: 100 }}>
            <Navbar
              game="motograu"
              executeAction={executeAction}
              balance={balance}
            />
          </div>
          <div className="grid p-3 gap-3 grow rounded w-full grid-cols-12">
            <div className="col-span-12 sm:col-span-4 grow xl:col-span-3 order-2 sm:order-1 bg-primary bg-opacity-20">
              <TransactionBar variant='' />
            </div>

            <div className="col-span-12 sm:col-span-8 xl:col-span-9 relative order-1 sm:order-1 lg:order-2">
              <div className="flex gap-3 h-full flex-col">
                <div className="w-[115%] md:w-[115%] lg:w-[77%] -mb-12">
                  <Results variant='' />
                </div>
                <div className="grow relative z-0 flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                <div className="relative flex items-center justify-center w-full h-full">
                  <iframe
                    ref={iframeRef}
                    className="rounded-md overflow-hidden w-full h-full pointer-events-none min-h-[250px] sm:min-h-[300px]"
                    src="/motograu/index.html"
                    sandbox="allow-same-origin allow-scripts"
                  ></iframe>
                </div>
                <div className='-mt-10 absolute t-0' style={{
                  margin: '0 auto',
                }}>
                  <Display color={'pink'} />  
                </div>
                <Chat show={showChat} close={() => setShowChat(false)} />
              </div>

                {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:-translate-y-[-700px] md:-translate-y-[-700px] lg:-translate-y-[-750px] -translate-x-[-40px] sm:-translate-x-[-125px] md:-translate-x-[-125px] lg:-translate-x-[-350px] xl:-translate-x-[-600px]">
                      <Display color={'pink'} />
                </div> */}


                <Controls color="lime" position={'center'} />
              </div>

              <Snackbar />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
