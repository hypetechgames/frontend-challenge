import React, { useContext } from "react"
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { IGameMessage } from "../../../../core/providers/interfaces/game-message.interface"
import If from "../../../../core/components/conditions/if"


export const ChatVisible = () => {
    const { session } =
    useContext(CrashGameContext)
    
    const message = session?.messages
    const lastFiveMessages = message?.slice(-5)
  
    return(
        <div>
            {lastFiveMessages.map((data: IGameMessage, idx: number) => {
              return (
                <div>
                  <If condition={data.userId == session.userId}>
                    <div
                      className="chat chat-start flex justify-end items-center"
                      key={idx}
                    >
                      <div className="chat-image avatar">
                        <div className="flex items-center w-8 h-5 rounded-full"></div>
                      </div>

                      <div className="chat-bubble min-h-0 bg-blue-900 bg-opacity-50 flex gap-1">
                        <span className="text-blue-600">
                          {session?.player.username}
                        </span>
                        <span className="text-gray-200">
                          {data.message}
                        </span>
                      </div>
                    </div>
                  </If>

                  <If condition={data.userId != session.userId}>
                    <div
                      className="flex flex-row-reverse chat chat-start"
                      key={idx}
                    >
                      <div className="chat-bubble min-h-0 flex gap-1 justify-center bg-blue-900 bg-opacity-50">
                        {/* No lugar do userId podia ser o nome do usuário que mandou a mensagem, como não tinha essa opção coloquei  o userId para ver como ficaria */}
                        <span className="text-blue-600"> {data.userId} </span>
                        <span className="text-gray-200"> {data.message} </span>
                      </div>
                    </div>
                  </If>
                </div>
              )
            })}
        </div>
    )
}