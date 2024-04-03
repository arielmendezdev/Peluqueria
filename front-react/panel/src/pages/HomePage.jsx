import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useContext, useEffect, useMemo } from "react";
import { appContext } from "../contexts/appContext";

export default function HomePage() {
  const { company, fetchLocals } = useContext(appContext);

  useEffect(() => {
    fetchLocals();
  }, []);

  return (
    <>
      <h1 className="text-3xl flex justify-center">
        {company && company.name}
      </h1>

      <h1 className="flex justify-center">SUCURSALES</h1>

      <div className="flex gap-4 flex-row flex-wrap justify-center p-4 mb-20">
        {company &&
          company.locals.map((local) => (
            <div key={local.id} className="w-96">
              <Card className="bg-slate-100 shadow-lg shadow-black">
                <CardHeader className="text-xl">{local.name}</CardHeader>
                <p className="ml-4">
                  Dirección: {local.address?.streetName} {local.address?.number}
                </p>
                <p className="ml-4">Teléfono: {local.phone}</p>
                <CardBody>
                  <Image src="https://www.zarla.com/images/zarla-hair-salon-logo-2400x1350-20210201.jpg?crop=21:16,smart&width=420&dpr=2" />
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}
