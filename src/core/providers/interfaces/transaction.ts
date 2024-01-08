import { Trending } from '../../../games/wall-street/components/transaction-panel/enums/trending.enum'
import {
  TransactionMode,
  TransactionStatus,
} from '../enums/transaction'

export interface ICrashTransaction {
  autoStarted: boolean
  mode: TransactionMode
  status: TransactionStatus
  amount: number
  exitValue: number
  roundCount: number
}

export interface IDoubleTransaction {
  autoStarted: boolean
  mode: TransactionMode
  status: TransactionStatus
  amount: number
  color: string
  roundCount: number
}

export interface IMoedinhaTransaction {
  autoStarted: boolean
  mode: TransactionMode
  status: TransactionStatus
  amount: number
  face: string
  roundCount: number
}

export interface IWallStreetTransaction {
  autoStarted: boolean
  mode: TransactionMode
  status: TransactionStatus
  amount: number
  autoExit: boolean
  exitValue: number
  trending: Trending
  roundCount: number
}
