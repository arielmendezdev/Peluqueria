import { useEffect } from "react"
import { useAppContext } from "../contexts/Principal"

export default function PageNotFound() {

  const { setBackground } = useAppContext()

  useEffect(() => {
    setBackground(true)
  }, [])

  return (
    <div className="flex justify-center mt-96 h-full text-5xl">Page Not Found</div>
  )
}