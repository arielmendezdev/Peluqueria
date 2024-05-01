import '../assets/css/Header.css'
import { useAppContext } from "../contexts/Principal"

export default function HeaderComp() {

  const { company } = useAppContext()

  return (
    <>
      <div className="header">
        {company && (
          <>
            <h3 className="text-white w-48 text-center text-xl">Hola</h3>
            <h1 className="text-white w-48 text-center text-2xl">
              <b>{company.nameComplete}</b>
            </h1>
          </>
        )}
      </div>
    </>
  );
}