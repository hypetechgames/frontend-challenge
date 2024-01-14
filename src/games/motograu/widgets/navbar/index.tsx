import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

type Props = {
  game: string
  balance: string
  name: string
  executeAction: Function
  openChatHandler?: Function
}

import If from '@/core/components/conditions/if'

import {
  QuestionMarkCircleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '@/core/components/provably-fair/game-limits'

import { MdMusicNote, MdMusicOff, MdSupportAgent } from 'react-icons/md'
import { FaMoneyBill1Wave } from 'react-icons/fa6'
import { IoChatboxEllipsesSharp } from 'react-icons/io5'
import { HiSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'
import { BsFillInfoSquareFill } from 'react-icons/bs'
import { RiChatOffLine } from 'react-icons/ri'

export default function Navbar({
  game,
  balance,
  executeAction,
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true) //////////////////////////////////////

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {soundEnabled,
        setSoundEnabled,
        soundClick,
        playerName,
        showChat, 
        setShowChat,
        } = useContext(CrashGameContext)

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
    executeAction('musicOn');
    executeAction('soundsOn');
  } , [])

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return (
    <div className="">
      <div className="navbar mx-auto  my-auto sm:px-3 h-12 flex items-center w-full justify-end">
        <h1 className="self-center flex align-center">{getGameLogo(game)}</h1>

        <div className="items-center ml-auto gap-2 sm:display-none hidden md:flex">
          <label className="cursor-pointer text-white text-xs opacity-75 flex items-center gap-2">
            <button
              onClick={() => {
                setShowModal(!showModal)
                soundClick()
              }}
              className="py-1 px-2 flex items-center text-white btn-info bg-opacity-20 gap-1 rounded-md capitalize text-sm font-normal"
            >
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </button>
            {/* Como Jogar? */}
          </label>
          <div
            className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
            onClick={() => {
              setShowGameLimitsModal(!showGameLimitsModal)
              soundClick()
            }}
          >
            <label className="cursor-pointer text-white text-xs opacity-75 flex items-center gap-2">
              <BsFillInfoSquareFill className='w-5 h-5' />
              {/* Limites de Jogo */}
            </label>
          </div>

          <a
            className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
            href=""
          >
            <label className="cursor-pointer text-white text-xs opacity-75 flex items-center gap-2">
              <MdSupportAgent className='w-6 h-6' />
              {/* Suporte */}
            </label>
          </a>

          <label className="cursor-pointer text-white text-xs opacity-75 flex items-center gap-2">
            {
              soundEnabled 
              ? <HiSpeakerWave className=' w-8 h-6' onClick={() => {
                setSoundEnabled(false);
                executeAction('soundsOff');
              }} /> 
              : <HiMiniSpeakerXMark className=' w-8 h-6' onClick={() => {
                    setSoundEnabled(true);
                    executeAction('soundsOn');
                  }} />
                }
            {/* Sons */}
          </label>
          
          <label className="cursor-pointer text-white text-xs opacity-75 flex items-center gap-2">
            {
              musicEnabled 
              ? <MdMusicNote className=' w-8 h-6' onClick={() => {
                setMusicEnabled(false);
                executeAction('musicOff');
              }} /> 
              : <MdMusicOff className=' w-8 h-6' onClick={() => {
                setMusicEnabled(true);
                executeAction('musicOn');
              }} /> 
            }
            {/* Música */}
          </label>

          <button
            className="btn btn-sm px-1 btn-ghost"
            onClick={() => {
              setShowChat(!showChat)
              soundClick()
            }}
          >
              { showChat ? 
                <IoChatboxEllipsesSharp className="w-6 h-6 bg-opacity-50" />
                : <RiChatOffLine className="w-6 h-6 bg-opacity-50" />
              }
          </button>
          {/* Chat */}

          <div className="border-l h-6 border-gray-400 border-opacity-50"></div>

          <div className="flex gap-4 p-4 flex items-center ">
            <div className="mt-1">
              <p className="font-bold text-sm text-white flex">
                {/* Nome do Jogador */}
                <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2" />
                {playerName}
              </p>
              <p className="text-xs flex flex-col mt-1">
                <div className="text-sm text-center font-bold mr-1 flex items-center gap-2">
                  <FaMoneyBill1Wave className='w-6 h-6 text-green-500' />
                  <span className="balance">R$ {balance}</span>
                </div>
              </p>
            </div>
            <img
              src="https://api.multiavatar.com/NOME.svg"
              className="h-10 invert rounded-lg"
            />
          </div>
        </div>

        <div className="items-center ml-auto gap-2 flex md:hidden">
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="btn btn-sm px-1 btn-ghost"
            >
              <Bars3Icon className="w-6 h-6 bg-opacity-50" />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 bg-black border-primary menu menu-compact rounded py-2 w-[280px] max-w-[300px] absolute top-[30px] right-[30px] z-10">
                <div className="flex gap-4 p-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
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
        </div>
      </div>

      <HowToPlay show={showModal} toggle={setShowModal} />

      <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      />

      {/* <Chat show={showChat} /> */}

    </div>
  )
}
