import React from 'react'
import HypetchLoader from '@/assets/screen/hypetech-loader.svg'
import ClipLoader from 'react-spinners/ClipLoader'

type Props = {
  gameName: string
}

export default function Loader(props: Props) {
  switch (props.gameName) {
    case 'wall-street':
      return (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black"
          style={{ zIndex: 999 }}
        >
          <img
            className="loader"
            src="/images/loaders/wallstreetbull-loading.jpg"
            alt="Loading"
          />

          <div className="absolute z-50">
            <ClipLoader color="#fff" size={150} />
          </div>
        </div>
      )
    default:
      return (
        <div
          className="fixed top-0 w-full h-full flex items-center justify-center bg-black"
          style={{ zIndex: 999 }}
        >
          <img className="loader" src={HypetchLoader} alt="Loading" />
        </div>
      )
  }
}
