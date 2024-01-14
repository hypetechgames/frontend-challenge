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
import { CrashMultiplier } from '../handlers/crash.multiplier'
import {
  TransactionMode,
  TransactionStatus,
} from '../enums/transaction'
import { ICrashTransaction } from '../interfaces/transaction'
import store from '@/store'
import { NotificationType } from '@/store/snackbar'
import { IGameMessage } from '../interfaces/game-message.interface'
import '@/core/components/scrollbar/styles.css'

export const CrashGameContext = createContext({})

type Props = {
  connection: Socket
  session: ISession
  children: ReactElement
}

let firstRun = true

export default function CrashGameProvider({
  connection,
  session,
  children,
}: Props) {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    session.status
  )

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [balance, setBalance] = useState<string>('0')
  const [startTimeout, setStartTimeout] = useState<number>(10.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [roundInfo, setRoundInfo] = useState<any>({})
  const [messages, setMessages] = useState<IGameMessage[]>(
    session.messages
  )
  const [playerName, setplayerName] = useState<string>('')
  const [showChat, setShowChat] = useState(true)

  const updateMultiplier = (value) => {
    setMultiplier(value)
  }

  const [crashMultiplier, setCrashMultiplier] = useState(
    new CrashMultiplier(updateMultiplier)
  )

  const [registeredBets, setRegisteredBets] = useState<any[]>([])
  const [betsHistory, setBetsHistory] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

  const soundClick = () => {
    let audioClick = new Audio()
    audioClick.src = '../../../../public/sounds/click.mp3'
    if (soundEnabled) audioClick.play()
  }

  const [transactions, setTransactions] = useState<
    Record<string, ICrashTransaction>
  >({
    left: {
      autoStarted: false,
      mode: TransactionMode.COMMON,
      amount: 1.0,
      exitValue: 10.0,
      status: TransactionStatus.UNREGISTERED,
      roundCount: 0,
    },
    right: {
      autoStarted: false,
      amount: 1.0,
      mode: TransactionMode.COMMON,
      exitValue: 10.0,
      status: TransactionStatus.UNREGISTERED,
      roundCount: 0,
    },
  })

  useEffect(() => {
    if (connection) {
      connection.on('start-timeout', (timeout) => {
        executeAction('counterTime', { timeOut: timeout })

        if (timeout == 0) {
          executeAction('start', { color: 'rgb(52, 180, 255)' })
        }
        setStartTimeout(timeout)
      })

      connection.on('start-game', () => {
        crashMultiplier.update({
          multiplier: 1.0,
          lastResponse: 1.0,
          incrementDelay: 80,
          gameStatus: GameStatus.RUNNING,
        })

        crashMultiplier.smoothIncrement()

        setGameStatus(GameStatus.RUNNING)
      })

      connection.on(
        'update-multiplier',
        ({ multiplier, interval }) => {
          if (firstRun) {
            executeAction('start', { color: 'rgb(52, 180, 255)' })
            crashMultiplier.update({
              multiplier: +multiplier,
              gameStatus: GameStatus.RUNNING,
            })

            crashMultiplier.smoothIncrement()
            firstRun = false
          }

          executeAction('odds', { multi: multiplier })

          ////INICIO DE MARCACAO - VAI SER TIRADO DAQUI PRA BAIXO NA VERSAO FINAL

          if (multiplier < 2) {
            executeAction('oddColor', { color: 'rgb(52, 180, 255)' })
          } else if (multiplier > 2 && multiplier < 6) {
            executeAction('oddColor', { color: 'rgb(145, 62, 248)' })
            //Change pose on Motograu V2
            executeAction('increaseOdd', { multiplier: 3 })
          } else if (multiplier > 6 && multiplier < 26) {
            executeAction('oddColor', { color: 'rgb(192, 23, 180)' })
            //Change pose on Motograu V2
            executeAction('increaseOdd', { multiplier: 11 })
          } else {
            executeAction('oddColor', { color: 'rgb(12, 200, 10)' })
          }
          //// FIM DA MARCACAO + ACOES SEPARADAS

          crashMultiplier.update({
            lastResponse: +multiplier,
            incrementDelay: interval - 1,
          })
        }
      )

      connection.on('restart-game', () => {
        setGameStatus(GameStatus.IDLE)
        setMultiplier(1.0)
        setStartTimeout(10.0)
      })

      connection.on('game-over', (multiplier) => {
        executeAction('crash', { color: 'rgb(52, 180, 255)' })
        setGameStatus(GameStatus.GAME_OVER)
        crashMultiplier.update({
          multiplier: multiplier,
          lastResponse: multiplier,
          gameStatus: GameStatus.GAME_OVER,
        })
        setMultiplier(multiplier)

        for (const index in transactions) {
          const transaction = transactions[index]

          if (
            transaction.roundCount === 0 &&
            transaction.autoStarted == true
          )
            transaction.autoStarted = false

          if (inAutoMode(index) && transaction.autoStarted == true) {
            transaction.status = TransactionStatus.PENDING
          } else if (
            transaction.status == TransactionStatus.REGISTERED
          ) {
            transaction.status = TransactionStatus.UNREGISTERED
          }

          setTransactions({ ...transactions, [index]: transaction })
        }
      })

      connection.on('update-results', (results) => {
        setResults(results)
      })

      connection.on('update-bets', (bets) => {
        setRegisteredBets(bets)
      })

      connection.on('cash-message', (data) => {
        const { multiplier, amount, index } = data

        let successSound = new Audio('../../../../sounds/successSound.mp3')
        successSound.play()

        const transaction = transactions[index]

        if (
          transaction.mode == TransactionMode.AUTO &&
          transaction.roundCount > 0
        ) {
          transaction.status = TransactionStatus.PENDING
        } else {
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
      })

      connection.on('remove-transaction', (index) => {
        const transaction = transactions[index]
        transaction.status = TransactionStatus.UNREGISTERED
        transaction.autoStarted = false
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
      })

      connection.on('update-balance', (balance: number) => {
        setBalance(balance.toString())
      })

      connection.on('update-status', (status) => {
        setGameStatus(status)
      })

      connection.on('round-info', (roundInfo) => {
        setRoundInfo(roundInfo)
      })

      connection.on(
        'registered-transactions',
        (registeredTransactions) => {
          setRegisteredBets(registeredTransactions)
        }
      )

      connection.on('results-history', (results) => {
        setResults(results)
      })

      connection.on('transaction-history', (betsHistory) => {
        setBetsHistory(betsHistory)
      })
    }

    connection.on('chat-message', (message: IGameMessage) => {
      messages.push(message)
      setMessages(messages)
    })

    setMessages([...session.messages])

    setBalance(session.player.balance.toString())
    setplayerName(session.player.username)
  }, [connection])

  useEffect(() => {
    if (gameStatus == GameStatus.IDLE)
      for (const index in transactions) {
        checkPendingTransactions(index)
      }
  }, [gameStatus])

  const executeAction = (event: string, detail?: any) => {
    try {
      iframeRef.current?.contentWindow?.dispatchEvent(
        new CustomEvent(event, { detail })
      )
    } catch {}
  }

  const getRoundInfo = (roundId) => {
    connection.emit('get-round-info', { roundId })
  }

  const sendMessage = (message) => {
    const { userId } = session
    connection.emit('chat-message', { message, userId })
  }

  const getRegisteredBets = () => {
    connection.emit('get-registered-transactions')
  }

  const getBetsHistory = () => {
    const { userId } = session
    connection.emit('get-transaction-history')
  }

  const getResults = () => {
    connection.emit('get-results-history')
  }

  const checkPendingTransactions = (index) => {
    if (inAutoMode(index) && transactions[index].autoStarted === true)
      registerTransaction(index)
    else if (
      transactions[index].status == TransactionStatus.PENDING
    ) {
      registerTransaction(index)
    }
  }

  const inAutoMode = (index) => {
    return (
      transactions[index].mode == TransactionMode.AUTO &&
      transactions[index].roundCount > 0
    )
  }

  const registerTransaction = (index) => {
    const { userId, token, socketId } = session

    const transaction = transactions[index]

    // check if auto-mode is valid and enable it
    if (inAutoMode(index) && transaction.autoStarted === false)
      transaction.autoStarted = true

    if (gameStatus == GameStatus.IDLE) {
      // send a request to register on the server
      connection.emit('register-transaction', {
        userId,
        index,
        socketId,
        sessionToken: token,
        exitValue: transaction.exitValue,
        amount: transaction.amount,
      })

      transaction.status = TransactionStatus.REGISTERED

      if (inAutoMode(index) && transaction.autoStarted === true)
        transaction.roundCount--
    } else {
      transaction.status = TransactionStatus.PENDING
    }

    // updates the transaction
    setTransactions({ ...transactions, [index]: transaction })
  }

  const cancelTransaction = (index) => {
    const transaction = transactions[index]

    if (gameStatus == GameStatus.IDLE) {
      const { userId } = session

      connection.emit(
        'cancel-transaction',
        {
          userId,
          index,
        },
        ({ success }) => {
          if (!success) {
          }
        }
      )
    }

    transaction.status = TransactionStatus.UNREGISTERED
    setTransactions({ ...transactions, [index]: transaction })
  }

  const cashOut = (index) => {
    const { userId, socketId } = session
    const transaction = transactions[index]

    executeAction('soundsPlayOneTime', {
      detail: {
        som: 'cashout',
      },
    })

    connection.emit('cash-out', {
      userId,
      multiplier,
      socketId,
      index: index,
    })

    if (
      transaction.mode == TransactionMode.AUTO &&
      transaction.roundCount > 0
    ) {
      transaction.status = TransactionStatus.PENDING
    } else {
      transaction.status = TransactionStatus.UNREGISTERED
    }

    setTransactions({ ...transactions, [index]: transaction })
  }

  return (
    <CrashGameContext.Provider
      value={{
        gameStatus,
        startTimeout,
        multiplier,
        session,
        results,
        getResults,
        messages,
        setMessages,
        sendMessage,
        roundInfo,
        getRoundInfo,
        balance,
        registeredBets,
        getRegisteredBets,
        betsHistory,
        getBetsHistory,
        iframeRef,
        executeAction,
        transactions,
        setTransactions,
        registerTransaction,
        cancelTransaction,
        cashOut,
        playerName,
        soundEnabled,
        setSoundEnabled,
        soundClick,
        showChat,
        setShowChat,
      }}
    >
      {children}
    </CrashGameContext.Provider>
  )
}
