import GamePanel from './games/panel'
import SessionProvider from '@/core/providers/session.provider'

export default function Game() {
  return (
    <SessionProvider>
      <GamePanel />
    </SessionProvider>
  )
}
