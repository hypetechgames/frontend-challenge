import React, { useContext, useEffect, useState } from 'react'
import { ChartBarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Badge from './badge'
import If from '@/core/components/conditions/if'
import { IWallStreetResult } from './interfaces/wall-street-result.interface'
import { WallStreetGameContext } from '@/core/providers/games/wall-street-game.provider'
import RoundInfoModal from '@/core/components/shared/modals/wall-street/round-info'

export default function Results() {
  const [expand, setExpand] = useState(false)
  const { results, getResults, soundClick } = useContext<any>(
    WallStreetGameContext
  )

  const { roundInfo, getRoundInfo } = useContext<any>(
    WallStreetGameContext
  )
  const [showInfo, setShowInfo] = useState<boolean>(false)

  useEffect(() => {
    getResults()
  }, [])

  const showRoundInfo = (roundId) => {
    getRoundInfo(roundId)
    setShowInfo(true)
  }

  const handleClick = (e) => {
    soundClick()
    setExpand(!expand)
  }

  return (
    <div className="w-full h-8 relative z-10">
      <If condition={!expand}>
        <div className="flex items-center overflow-x-hidden gap-2 mr-10">
          {results.map((result, idx) => {
            const parsed: IWallStreetResult = JSON.parse(result)

            return (
              <Badge
                key={idx}
                {...parsed}
                multipler={result.point}
                showRoundInfo={showRoundInfo}
              />
            )
          })}
        </div>
      </If>

      <If condition={expand}>
        <div className="h-6"></div>
        <div className="rounded last-odds-component w-full absolute -top-1">
          <div className="flex items-center justify-between relative rounded-t px-2 h-10">
            <h3 className="text-xs font-bold uppercase">
              Histórico de Tendências
            </h3>
          </div>

          <div className="flex flex-wrap shadow max-h-36 rounded-b p-2 gap-2 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
            {results.map((result, idx) => {
              const parsed: IWallStreetResult = JSON.parse(result)

              return (
                <Badge
                  key={idx}
                  {...parsed}
                  multipler={result.point}
                  showRoundInfo={showRoundInfo}
                  // onClick={() => {soundClick()}}
                />
              )
            })}
          </div>
        </div>
      </If>

      <button
        className={`btn bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-600 border rounded p-0 min-w-0 min-h-0 px-3 py-2 w-auto h-auto text-xs shadow-lg absolute top-0 right-1 mt-0 z-10`}
        onClick={(e) => handleClick(!expand)}
      >
        <If condition={!expand}>
          <ChartBarIcon className="h-4 w-4 " />
        </If>

        <If condition={expand}>
          <XMarkIcon className="h-4 w-4 " />
        </If>
      </button>

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
        onClick={() => soundClick()}
      />
    </div>
  )
}
