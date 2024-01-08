import React, { Children, ReactElement } from 'react'

type Props = {
  show: boolean
  children: ReactElement[]
  toggle: Function
}

export default function Modal({
  show = false,
  toggle,
  children,
}: Props) {
  return (
    <>
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => toggle(e.target.checked)}
        id="uniqueDialog"
        className="modal-toggle"
      ></input>

      <div className="modal text-sm w-full px-5">
        <div className="modal-box w-full p-0 mt-20 sm:mt-0 scrollbar-track-rounded scrollbar-thumb-rounded relative custom-scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
          {Children.map(children, (child) => child)}
        </div>
      </div>
    </>
  )
}
