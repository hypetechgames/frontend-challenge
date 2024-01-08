import React, {
  ReactElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Socket, io } from 'socket.io-client'
import { SERVER_URL } from '../constants'
import { useParams } from 'react-router-dom'
import Loader from '@/core/components/loader'
import If from '@/core/components/conditions/if'
import { GameStatus } from './enums/game-status'
import { IGameMessage } from './interfaces/game-message.interface'

export const SessionContext = createContext({})
export interface ISession {
  game: string
  gameType: string
  balance: number
  token: string
  messages: IGameMessage[]
  player: {
    balance: number
  }
  results: any[]
  socketId: string
  status: GameStatus
  transactions: any[]
  userId: number
}

type Props = {
  children: ReactElement
}

export default function SessionProvider({ children }: Props) {
  const { token } = useParams()
  const [session, setSession] = useState<ISession>()
  const [gameName, setGameName] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const [connection, setConnection] = useState<Socket>()

  useEffect(() => {
    if (!connection) {
      setConnection(
        io(SERVER_URL, {
          reconnectionDelayMax: 10000,
          withCredentials: false,
          auth: { token },
          transports: ['websocket'],
        })
      )
    } else {
      connection.on('connection', onConnection)
      connection.on('disconnect', () => setLoading(true))
    }
  }, [connection])

  const onConnection = (session) => {
    setGameName(session.game)
    setSession(session)
  }

  return (
    <SessionContext.Provider
      value={{
        connection,
        session,
        setLoading,
      }}
    >
      <If condition={loading}>
        <Loader gameName={gameName} />
      </If>

      {children}
    </SessionContext.Provider>
  )
}
