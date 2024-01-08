import React, { useContext, useEffect, useState } from 'react'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Badge from '@/core/components/results/badge'
import If from '@/core/components/conditions/if'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import RoundInfoModal from '../shared/modals/crash/round-info'

type Props = {
  variant: string
}

type ICrashResult = {
  round_id?: number
  point: number
}

export default function MultiplierResults({ variant }: Props) {
  const [expand, setExpand] = useState(false)
  const { results, getResults } = useContext<any>(CrashGameContext)
  const { roundInfo, getRoundInfo } =
    useContext<any>(CrashGameContext)

  const [showInfo, setShowInfo] = useState<boolean>(false)

  const showRoundInfo = (roundId) => {
    getRoundInfo(roundId)
    setShowInfo(true)
  }

  useEffect(() => {
    getResults()
  }, [])

  return (
    <div className="w-full h-6 relative z-10">
      <If condition={!expand}>
        <div className="flex mr-10 items-center overflow-x-hidden gap-2">
          {results?.map((result, idx) => {
            return (
              <Badge
                key={idx}
                showRoundInfo={showRoundInfo}
                textColor={
                  result.point < 2
                    ? 'text-[#34b4ff]'
                    : result.point < 10
                    ? 'text-[#913ef8]'
                    : 'text-[#c017b4]'
                }
                roundId={result.round_id}
                multipler={result.point}
              />
            )
          })}
        </div>
      </If>

      <If condition={expand}>
        <div className="h-6"></div>
        <div className="h-auto  absolute -top-1 w-full rounded-md bg-black bg-opacity-80">
          <div className="rounded-md results-bar">
            <div className="border border-b-0 border-gray-700 border-opacity-40 flex items-center justify-between relative rounded-t px-2 h-8">
              <h3 className="text-sm uppercase">
                Histórico de Partidas
              </h3>
            </div>

            <div className="flex flex-wrap border border-gray-700 border-opacity-40 shadow max-h-40 rounded-b p-2 gap-2 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
              {results?.map((result, idx) => {
                return (
                  <Badge
                    key={idx}
                    showRoundInfo={showRoundInfo}
                    textColor={
                      result.point < 2
                        ? 'text-[#34b4ff]'
                        : result.point < 10
                        ? 'text-[#913ef8]'
                        : 'text-[#c017b4]'
                    }
                    roundId={result.round_id}
                    multipler={result.point}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </If>

      <div className=" results-btn h-auto flex absolute top-0 right-1 mt-0 z-10 rounded-xl">
        <button
          className={`btn bg-black hover:bg-black border border-gray-700 hover:border-gray-600 rounded-xl p-0 min-h-0 max-h-8 w-12 py-1 h-auto text-xs shadow`}
          onClick={(e) => setExpand(!expand)}
        >
          <If condition={!expand}>
            <ClockIcon className="h-4 w-4 " />
          </If>

          <If condition={expand}>
            <XMarkIcon className="h-4 w-4 " />
          </If>
        </button>
      </div>

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
      />
    </div>
  )
}
