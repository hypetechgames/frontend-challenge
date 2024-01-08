import React from 'react'
import { ResultColor, ResultItem } from '../../index'
import { useSelector } from 'react-redux'

type Props = {
  results: ResultItem[]
}

type Odd = {
  color: string
  result: string
}

function Rounds(props: Props) {
  const odds = useSelector((state) => state.odd.odds)

  return (
    <div className="flex flex-col h-10">
      <div className="flex flex-row-reverse pointer-events-auto gap-2 overflow-x-auto scrollbar-h-1 scrollbar-track-slate-500 scrollbar-thumb-slate-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        {[...odds].reverse().map((item, index) => {
          switch (item.color) {
            case ResultColor.RED:
              return (
                <div
                  key={index}
                  className="bg-[#ff1e4c] text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
                >
                  <span className="border-gray-100 rounded-full w-[23px] h-[23px] border-2 flex justify-center items-center font-bold text-[10px]">
                    {item.result}
                  </span>
                </div>
              )

            case ResultColor.BLACK:
              return (
                <div
                  key={index}
                  className="bg-[#002236] text-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
                >
                  <span className="border-gray-300 rounded-full w-[23px] h-[23px] border-2 flex justify-center items-center font-bold text-[10px]">
                    {item.result}
                  </span>
                </div>
              )

            case ResultColor.WHITE:
              return (
                <div
                  key={index}
                  className="bg-gray-100 min-w-[32px] min-h-[32px] rounded-sm flex justify-center items-center"
                >
                  <span className="rounded-full w-[23px] h-[23px] font-bold text-[#ff1e4c] flex justify-center items-center text-md">
                    V
                  </span>
                </div>
              )
          }
        })}
      </div>
    </div>
  )
}

export default Rounds
