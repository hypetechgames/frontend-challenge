import React, { useContext, useEffect, useState } from 'react'

import If from '@/core/components/conditions/if'

import EmojiPicker, {
  Theme,
  Categories,
  EmojiClickData,
} from 'emoji-picker-react'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { IGameMessage } from '@/core/providers/interfaces/game-message.interface'
import { dateToHumanReadable } from '@/core/helpers/date'
import { itemIsOdd } from '../../widgets/transaction-bar/lists/bets/list-item'
import dayjs from 'dayjs'
import { IoMdSend } from "react-icons/io";
import { IoIosArrowUp } from 'react-icons/io';

type Props = {
  show: boolean
  close: () => void
}

export const Chat = ({ show, close }: Props) => {
  const { messages, sendMessage, session } =
    useContext(CrashGameContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const chat = document.querySelector('.chat-page');
    if (chat) chat.scrollTop = chat.scrollHeight;
  } , [messages])
  
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    event.stopPropagation()
    setMessage(message + ' ' + emojiData.emoji)
  }

  function handleShowEmojiPicker(e: MouseEvent) {
    e.stopPropagation()

    setShowEmojiPicker(!showEmojiPicker)
  }

  const attemptSendMessage = () => {
    const parsed = message.trim()
    setShowEmojiPicker(false)

    if (parsed.length > 0) {
      sendMessage(message)
      setMessage('')
    }
  }

  const handleMessage = (e) => {
    if (e.key && e.key.toUpperCase() == 'ENTER') attemptSendMessage()
    else setMessage(e.target.value)
  }

  const numberOfDigits = (x: number) => {
    const number = Math.floor(Math.log10(x)) + 1
    return x / Math.pow(10, number + 1);
  }

  return (
    <If condition={show}>
      <div className='pt-2 md:pt-3 lg:pt-0 md:p-0 lg:ps-3 w-full h-80 sm:h-[65%] md:h-[65%] lg:h-[100%] lg:w-[50%]'>
        <div className="w-full md:h-50 py-1 border-l border-gray-700 border-opacity-50 text-sm rounded-lg bg-black backdrop-blur-sm bg-opacity-30 chat-container right-0 z-40 h-[100%] sm:h-[100%] md:h-[100%] lg:h-[100%]">
          <div className="flex flex-col relative gap-3 h-full">
            <div className='flex justify-between p-2'>
              <div>
                <h1 className='text-white font-bold'>CHAT ROOM</h1>
                <span className='text-xs opacity-50'>{session.player.username}</span>
              </div>
              <IoIosArrowUp 
                className='border rounded-full p-1 w-5 h-5'
                onClick={() => close()}
              />
            </div>
            <div className="h-full chat-page mb-12 p-2 flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded" style={{ margin: '0' }}>
              {messages?.map((data: IGameMessage, idx: number) => {
                return (
                  <div className={`w-[100%] items-center text-xs text-white p-1.5 gap-1 bg-primary ${itemIsOdd(idx)}`} key={idx}>
                    <div className={`flex items-center text-xs text-white p-1.5 gap-1 bg-primary ${itemIsOdd(idx)}`}>
                      <img
                        src={`https://api.multiavatar.com/${Math.floor((numberOfDigits(data.userId)) * 21)}.svg`}
                        className="w-10 h-10 invert"
                      />
                      <div className="h-50 w-full">
                        <div className='w-full flex justify-between text-bold'>
                          <span className='ml-1'>{data.userId === session.userId ? session.player.username + ' (You)' : `Usuário: ${data.userId}`}</span>
                          <p className='opacity-50 flex flex-col'>
                            <span className='flex-1'>{dayjs(data.createdAt).format('DD [de] MMMM, YYYY')} </span>
                            <span className='flex-1 text-right'>{dayjs(data.createdAt).format('hh:mm A')}</span>
                          </p>
                        </div>
                        <p className='opacity-50 mt-1 ml-1 pb-1'>{data.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="sticky  bottom-2">
              <If condition={showEmojiPicker}>
                <div className="absolute bottom-10 w-full">
                  <EmojiPicker
                    onEmojiClick={onClick}
                    autoFocusSearch={false}
                    height={'300px'}
                    width={'100%'}
                    previewConfig={{
                      showPreview: false,
                    }}
                    theme={Theme.DARK}
                    searchDisabled
                    // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                    // height={350}
                    // width="50%"
                    // emojiVersion="0.6"
                    // lazyLoadEmojis={true}
                    // previewConfig={{
                    //   defaultCaption: 'Pick one!',
                    //   defaultEmoji: '1f92a', // 🤪
                    // }}
                    // suggestedEmojisMode={SuggestionMode.RECENT}
                    skinTonesDisabled
                    // searchPlaceHolder="Filter"
                    // defaultSkinTone={SkinTones.MEDIUM}
                    // emojiStyle={EmojiStyle.NATIVE}
                    categories={[
                      {
                        name: 'Smiles & Emotions',
                        category: Categories.SMILEYS_PEOPLE,
                      },
                      {
                        name: 'Fun and Games',
                        category: Categories.ACTIVITIES,
                      },

                      {
                        name: 'Flags',
                        category: Categories.FLAGS,
                      },
                    ]}
                  />
                </div>
              </If>
              <div className="form-control border-primary border-t-2 pt-2 border-gray-600 border-opacity-10">
                <div className="input-group">
                  <input
                    className="input input-sm w-full bg-opacity-0"
                    value={message}
                    onChange={handleMessage}
                    onKeyDown={handleMessage}
                    placeholder='Digite sua mensagem...'
                  />
                  <button
                    className="p-2"
                    onClick={(e) => handleShowEmojiPicker(e)}
                  >
                    <FaceSmileIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2"
                    onClick={() => {
                      attemptSendMessage()
                      // close()
                    }}
                  >
                    <IoMdSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </If>
  )
}
