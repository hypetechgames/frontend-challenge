import React, {
  ReactElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Socket } from 'socket.io-client'
import { ISession } from '../session.provider'
import { GameStatus } from '../enums/game-status'
import {
  TransactionMode,
  TransactionStatus,
} from '../enums/transaction'
import { IWallStreetTransaction } from '../interfaces/transaction'
import store from '@/store'
import { NotificationType } from '@/store/snackbar'
import { Trending } from '../../../games/wall-street/components/transaction-panel/enums/trending.enum'
import { IGameMessage } from '../interfaces/game-message.interface'
import '@/core/components/scrollbar/styles.css'

export const WallStreetGameContext = createContext({})

type Props = {
  connection: Socket
  session: ISession
  children: ReactElement
}

export interface IWallStreetResult {
  trending: number
  grow: number
}

export default function WallStreetGameProvider({
  connection,
  session,
  children,
}: Props) {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    session.status
  )

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [startTimeout, setStartTimeout] = useState<number>(10.0)

  const [registeredBets, setRegisteredBets] = useState<any[]>([])
  const [result, setResult] = useState<number>()
  const [results, setResults] = useState<any[]>([])
  const [balance, setBalance] = useState<string>('0')
  const [startGame, setStartGame] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [playerName, setplayerName] = useState<string>('')

  const soundClick = () => {
    let audioClick = new Audio('../../../../public/sounds/click.mp3')
    if (soundEnabled) audioClick.play()
    console.log();
    
  }

  const [transactions, setTransactions] = useState<
    Record<string, IWallStreetTransaction>
  >({
    center: {
      autoStarted: false,
      mode: TransactionMode.COMMON,
      amount: 1.0,
      status: TransactionStatus.UNREGISTERED,
      roundCount: 0,
      trending: Trending.UP,
    },
  })

  const [roundInfo, setRoundInfo] = useState<any>({})
  const [messages, setMessages] = useState<IGameMessage[]>(
    session.messages
  )

  useEffect(() => {
    if (connection) {
      connection.on('start-timeout', onStartTimeout)
      connection.on('start-game', onStartGame)
      connection.on('restart-game', onRestartGame)
      connection.on('game-over', onGameOver)
      connection.on('update-results', onUpdateResults)
      connection.on('registered-transactions', onUpdateBets)
      connection.on('cash-message', onCashMessage)
      connection.on('remove-transaction', onRemoveTransaction)
      connection.on('update-status', (status) => {
        setGameStatus(status)
        
      })
      connection.on('update-balance', (balance: number) => {
        setBalance(balance.toLocaleString())
      })

      connection.on('round-info', (roundInfo) => {
        setRoundInfo(roundInfo)
      })

      setBalance(session.player.balance.toString())
      setplayerName(session.player.username)
      
    }
    connection.on('chat-message', (message: IGameMessage) => {
      messages.push(message)
      setMessages(messages)
    })

    setMessages([...session.messages])
  }, [connection])

  useEffect(() => {
    if (gameStatus == GameStatus.IDLE)
      for (const index in transactions) {
        checkPendingTransactions(index)
      }
  }, [gameStatus])

  const getRoundInfo = (roundId) => {
    connection.emit('get-round-info', { roundId })
  }

  const executeAction = (event: string, detail?: any) => {
    try {
      iframeRef?.current?.contentWindow?.dispatchEvent(
        new CustomEvent(event, { detail })
      )
    } catch {}
  }

  const getRegisteredBets = () => {
    connection.emit('get-registered-transactions')
    connection.on(
      'registered-transactions',
      (registeredTransactions) => {
        setRegisteredBets(registeredTransactions)
      }
    )
  }

  const onStartTimeout = (timeout) => {
    if (timeout == 0) executeAction('roll')
    setStartTimeout(timeout)
  }

  const onStartGame = (result: IWallStreetResult) => {
    setGameStatus(GameStatus.RUNNING)

    setTimeout(() => {
      executeAction('newValue', { height: result.grow })
      setGameStatus(GameStatus.RESULT)
      setResult(result.trending)
    }, 7000)
  }

  const onRestartGame = () => {
    setGameStatus(GameStatus.IDLE)
    setStartTimeout(10.0)

    for (const index in transactions) {
      checkPendingTransactions(index)
    }
  }

  const onGameOver = () => {
    executeAction('crash')
    setGameStatus(GameStatus.GAME_OVER)

    for (const index in transactions) {
      const transaction = transactions[index]

      if (
        transaction.roundCount === 0 &&
        transaction.autoStarted == true
      )
        transaction.autoStarted = false

      if (inAutoMode(index) && transaction.autoStarted == true) {
        transaction.status = TransactionStatus.PENDING
      } else if (transaction.status == TransactionStatus.REGISTERED) {
        transaction.status = TransactionStatus.UNREGISTERED
      }

      setTransactions({ ...transactions, [index]: transaction })
    }
  }

  const onUpdateResults = (results) => {
    setResults(results)
  }

  const onUpdateBets = (bets) => {
    setRegisteredBets(bets)
  }

  const onCashMessage = (data) => {
    const { multiplier, amount, index } = data
    console.log("cash");
    
    //Som de sucesso ao ganhar
    let successSound = new Audio('../../../../sounds/successSound.mp3')
    successSound.play()

    // executeAction('soundsPlayOneTime', {
    //   detail: {
    //     som: 'ohYeah',
    //   },
    // })



    const transaction = transactions[index]

    if (
      transaction.mode == TransactionMode.AUTO &&
      transaction.roundCount > 0
    ) {
      transaction.status = TransactionStatus.PENDING
    } else if (transaction.status != TransactionStatus.PENDING) {
      transaction.status = TransactionStatus.UNREGISTERED
    }

    setTransactions({ ...transactions, [index]: transaction })

    store.dispatch({
      type: 'snackbar/push',
      payload: {
        cashed_out_at: multiplier,
        amount: amount,
        type: NotificationType.CASH_OUT,
        timeout: 3000,
      },
    })
  }

  const getResults = () => {
    connection.emit('get-results-history')
    connection.on('results-history', (results) => {
      setResults(results)

      let resultados = results.map(
        (result) => JSON.parse(result).grow
      )

      if (startGame == false) {
        setTimeout(() => {
          resultados = resultados.reverse()
          for (let i = 0; i < resultados.length; i++) {
            executeAction('resultsBefore', {
              value: resultados[i],
              length: resultados.length,
            })

            if (i == resultados.length - 1) {
              setStartGame(true)
            }
          }
        }, 2500)
      }
    })
  }

  const onRemoveTransaction = (index) => {
        
    const transaction = transactions[index]
    transaction.status = TransactionStatus.UNREGISTERED
    transaction.autoStarted = false
    console.log("transaction")
    setTransactions({ ...transactions, [index]: transaction })
    
    // Reproduza um som de erro
    let errorSound = new Audio('../../../../sounds/errorSound.mp3')
    errorSound.play()

    store.dispatch({
      type: 'snackbar/push',
      payload: {
        type: NotificationType.TRANSACTION_NOT_ACCEPTED,
        timeout: 3000,
      },
    })
  }

  const checkPendingTransactions = (index) => {
    if (inAutoMode(index) && transactions[index].autoStarted === true)
      registerTransaction(index)
    else if (transactions[index].status == TransactionStatus.PENDING)
      registerTransaction(index)
  }

  const inAutoMode = (index) => {
    return (
      transactions[index].mode == TransactionMode.AUTO &&
      transactions[index].roundCount > 0
    )
  }

  const registerTransaction = (index) => {
    const { userId, game, token, socketId } = session

    const transaction = transactions[index]

    if (gameStatus == GameStatus.IDLE) {
      // check if auto-mode is valid and enable it
      if (inAutoMode(index) && transaction.autoStarted === false)
        transaction.autoStarted = true

      executeAction('soundsPlayOneTime', {
        detail: {
          som: 'inicioDaPartida',
        },
      })

      // send a request to register on the server
      connection.emit(
        'register-transaction',
        {
          userId,
          game,
          index,
          socketId,
          sessionToken: token,
          trending: transaction.trending,
          amount: transaction.amount,
        },
        ({ success }) => {
          if (!success) {
            transaction.status = TransactionStatus.UNREGISTERED
            transaction.autoStarted = false
            setTransactions({ ...transactions, [index]: transaction })
          }
        }
      )

      transaction.status = TransactionStatus.REGISTERED

      if (inAutoMode(index) && transaction.autoStarted === true)
        transaction.roundCount--

      if (transaction.roundCount == 0) transaction.autoStarted = false
    } else {
      transaction.status = TransactionStatus.PENDING
    }

    // updates the transaction
    setTransactions({ ...transactions, [index]: transaction })
  }

  const sendMessage = (message) => {
    const { userId } = session
    connection.emit('chat-message', { message, userId })
  }

  return (
    <WallStreetGameContext.Provider
      value={{
        gameStatus,
        startTimeout,
        result,
        balance,
        results,
        roundInfo,
        getRoundInfo,
        session,
        getRegisteredBets,
        getResults,
        messages,
        setMessages,
        sendMessage,
        registeredBets,
        iframeRef,
        executeAction,
        transactions,
        setTransactions,
        registerTransaction,
        soundEnabled,
        setSoundEnabled,
        soundClick,
        playerName
      }}
    >
      {children}
    </WallStreetGameContext.Provider>
  )
}
