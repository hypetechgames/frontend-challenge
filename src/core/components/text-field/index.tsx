import React from 'react'

type Props = {
  id: string
  name: string
  label: string
  disabled: boolean
  value: any
  setValue: Function
}

export default function TextField({
  id,
  name,
  label,
  disabled = false,
  value,
  setValue,
}: Props) {
  return (
    <div className="relative w-full h-full">
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        autoComplete="off"
        className={`h-full font-bold bg-gray-600 bg-opacity-30 input input-sm focus:outline-none rounded px-2 pb-1.5 pt-5 w-full border-0 border-gray-300 appearance-none disabled:bg-gray-700 disabled:bg-opacity-30 dark:border-gray-600 focus:ring-0 peer ${
          label === 'Valor'
            ? 'text-[19px] mt-[1px] text-white'
            : 'text-xs text-gray-400'
        }`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-xs whitespace-nowrap capitalize text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 font-bold top-4 z-9 origin-[0] left-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  )
}
