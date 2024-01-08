import { useContext, useEffect, useState } from 'react'
import Motograu from './motograu'
import WallStreet from './wall-street'
import { SessionContext } from '@/core/providers/session.provider'
import CrashGameProvider from '@/core/providers/games/crash-game.provider'
import WallStreetGameProvider from '../core/providers/games/wall-street-game.provider'

export default function Panel() {
  const {
    session,
    connection,
    gameStatus,
    setGameStatus,
    gameInstance,
  } = useContext(SessionContext)
  const [component, setComponent] = useState(null)

  useEffect(() => {
    switch (session?.game) {
      case 'aviador':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Aviador />
          </CrashGameProvider>
        )
        break
      case 'aviator-wars':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <AviatorWars />
          </CrashGameProvider>
        )
        break
      case 'speed-cash':
        setComponent(
          <SpeedCashProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <SpeedCash />
          </SpeedCashProvider>
        )
        break
      case 'foguetinho':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Foguetinho />
          </CrashGameProvider>
        )
        break
      case 'caze-tv':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <CazeTv />
          </CrashGameProvider>
        )
        break
      case 'mascara':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Mascara />
          </CrashGameProvider>
        )
        break
      case 'supino-cash':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <SupinoCash />
          </CrashGameProvider>
        )
        break
      case 'motograu':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Motograu />
          </CrashGameProvider>
        )
        break
      case 'motograu-v2':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <MotograuV2 />
          </CrashGameProvider>
        )
        break
      case 'pipa-brazil':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <PipaBrazil />
          </CrashGameProvider>
        )
        break
      case 'free-style':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <FreeStyle />
          </CrashGameProvider>
        )
        break
      case 'freestyle-v2':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <FreeStyleV2 />
          </CrashGameProvider>
        )
        break
      case 'double':
        setComponent(
          <DoubleGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Double />
          </DoubleGameProvider>
        )
        break
      case 'moedinha':
        setComponent(<MoedinhaGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <CaraCoroa />
          </MoedinhaGameProvider>
        )
        break
      case 'wall-street':
        setComponent(
          <WallStreetGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <WallStreet />
          </WallStreetGameProvider>
        )
        break
      case 'crash':
        setComponent(
          <CrashGameProvider
            connection={connection}
            session={session}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            gameInstance={gameInstance}
          >
            <Crash />
          </CrashGameProvider>
        )
        break
    }
  }, [session])

  return component
}
