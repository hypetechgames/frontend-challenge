import { GameStatus } from '../enums/game-status'

export interface IMultiplierIncrement {
  lastResponse?: number
  incrementDelay?: number
  multiplier?: number
  gameStatus?: GameStatus
}

export class CrashMultiplier {
  updateMultiplier
  multiplier = 1.0
  lastResponse = 1.0
  incrementDelay = 80
  gameStatus = GameStatus.IDLE

  constructor(updateMultiplier: Function) {
    this.updateMultiplier = updateMultiplier
  }

  update({
    lastResponse,
    incrementDelay,
    multiplier,
    gameStatus,
  }: IMultiplierIncrement) {
    if (lastResponse) this.lastResponse = lastResponse

    if (incrementDelay) this.incrementDelay = incrementDelay

    if (multiplier) {
      this.multiplier = multiplier
      this.updateMultiplier(multiplier)
    }

    if (gameStatus) this.gameStatus = gameStatus
  }

  reset() {
    this.multiplier = 1.0
    this.lastResponse = 1.0
    this.incrementDelay = 80
    this.gameStatus = GameStatus.IDLE
    this.updateMultiplier(1.0)
  }

  async delay(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  async smoothIncrement() {
    this.updateMultiplier(1.0)

    do {
      await this.delay(this.incrementDelay)

      if (this.incrementDelay > 50) {
        this.incrementDelay -= 0.3
      } else if (this.incrementDelay > 25) {
        this.incrementDelay -= 0.2
      } else if (this.incrementDelay > 3) {
        this.incrementDelay -= 0.1
      }

      if (this.multiplier < this.lastResponse) {
        const difference = this.lastResponse - this.multiplier

        if (difference >= 0.5) this.multiplier = this.lastResponse
        else this.multiplier += 0.01

        this.updateMultiplier(+this.multiplier.toFixed(2))
      }
    } while (this.gameStatus == GameStatus.RUNNING)
  }
}
