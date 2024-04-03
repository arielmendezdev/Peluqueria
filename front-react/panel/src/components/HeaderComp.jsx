import { Image } from '@nextui-org/react'
import { useContext } from "react"
import { appContext } from "../contexts/appContext"
import '../assets/css/Header.css'
import img from '../assets/images/Ariel.png'

export default function HeaderComp() {

  const { company } = useContext(appContext)

  return (
    <>
    <div className="header pb-10">
        { company && 
        <>
            <div className='w-28 h-28 rounded-full mt-10'>
              <Image src={img} />
            </div>
            <h1 className="text-white w-48 bg-black bg-opacity-35 text-center text-xl">Hola, {company.owner}</h1>
        </>
        }
    </div>
    </>
  )
}