import React, { useState, useEffect, useRef, useContext } from 'react'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'

type Props = {
  game: string
  balance: string
  executeAction: Function
  openChatHandler?: Function
  name: string
}

import If from '../conditions/if'

import {
  QuestionMarkCircleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '@/core/components/shared/modals/wall-street/game-limits'
import { Chat } from '../chat'

export default function Navbar({
  game,
  balance,
  executeAction,
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showChat, setShowChat] = useState(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const {soundEnabled, 
        setSoundEnabled, 
        soundClick, 
        playerName
      } = useContext(WallStreetGameContext)

  const handleSoundEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'soundsOn' : 'soundsOff')
    setSoundEnabled(checked)
  }

  const handleMusicEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'musicOn' : 'musicOff')
    setMusicEnabled(checked)
  }

  const handleAnimationEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'animationOff' : 'animationOn')
    setAnimationEnabled(checked)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    soundClick()
  }

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false)
    }
    setAudioContextAllowed(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    setTimeout(() => {
      if (window.AudioContext == false) {
        setAudioContextAllowed(false)
      }
    }, 2000)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return (
    <div className="top-0 z-50 ">
      <div className="h-auto mx-auto px-5 py-2 flex items-center w-full justify-end soft-border-bottom">
        <h1 className="self-starth-auto">{getGameLogo(game)}</h1>

        <div className="flex items-center ml-auto gap-2">
          {/* {audioContextAllowed && !isMobileDevice && (
            <div className="flex justify-center sm:px-9 text-red-500 font-bold text-sm sm:text-xl">
              Clique no jogo para ativar os sons
            </div>
          )} */}
          <button
            onClick={() => {
              setShowModal(!showModal)
              soundClick()
            }}
            className="btn btn-sm py-1 px-2 flex items-center text-gray-500 btn-warning gap-1 rounded-md capitalize text-sm font-normal"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Como Jogar?</span>
          </button>

          <div className="text-sm text-center font-bold mr-1">
            <p className="text-green-500">R$ {balance}</p>
            {/* <p className="text-green-500">Name: {playerName}</p> */}
            <p className="text-green-500 text-[10px] mt-[-7px]">
              SALDO REAL
            </p>
          </div>

          <div className="border-l h-6 border-gray-400 border-opacity-50"></div>

          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="btn btn-sm px-1 btn-ghost"
            >
              <Bars3Icon className="w-6 h-6 bg-opacity-50" />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 menu menu-compact rounded py-2 w-[280px] max-w-[300px] absolute top-[30px] right-[30px] z-10">
                <div className="flex gap-4 p-4">
                  <img
                    src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png"
                    className="h-12 invert rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-bold text-xs text-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex mt-1">
                      <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="opacity-50">Online agora</span>
                    </p>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Sons
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={handleSoundEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Música
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={musicEnabled}
                          onChange={handleMusicEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                {/*{<div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-xs opacity-90">Animação</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={handleAnimationEnabled}
                          checked={animationEnabled}
                          className="sr-only peer"
                        />
                      <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </label>
                </div>
            </div>} }*/}

                <div
                  className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
                  onClick={() => {
                    setShowGameLimitsModal(!showGameLimitsModal)
                    soundClick()
                  }}
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Limites de Jogo
                  </label>
                </div>

                <a
                  className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
                  href=""
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Suporte ao jogador Hypetech
                  </label>
                </a>
              </div>
            )}
          </div>
          { <button
            className="btn btn-sm px-1 btn-ghost"
            onClick={() => {
              setShowChat(!showChat)
              soundClick()
            }}
          >
            <ChatBubbleLeftIcon className="w-6 h-6 bg-opacity-50" />
          </button> }
        </div>
      </div>

      <HowToPlay show={showModal} toggle={setShowModal} />

      <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      />

      { <Chat show={showChat} /> }
     {/*  {audioContextAllowed && isMobileDevice && (

        <div className="flex justify-center sm:px-9 text-red-500 font-bold text-sm sm:text-xl">
          Clique no jogo para ativar os sons
        </div>
      )}  */}
    </div>
  )
}
