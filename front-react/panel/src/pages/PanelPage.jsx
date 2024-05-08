import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useAppContext } from "../contexts/Principal";

export default function PanelPage() {
  const { company, emailCompany, fetchCompanyEmail } = useAppContext();

  const columns = [
    {
      key: "name",
      label: "Nombre"
    },
    {
      key: "phone",
      label: "Teléfono"
    },
    {
      key: "address",
      label: "Dirección"
    },
    {
      key: "employees",
      label: "Empleados"
    },
    
  ]

    useEffect(() => {
      fetchCompanyEmail(emailCompany);
    }, []);

  return (
    <>
      {company && (
        <div>
          <Table aria-label="Tabla de Locales">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {company.locals.map((local) => (
                <TableRow key={local.id}>
                  <TableCell>{local.name}</TableCell>
                  <TableCell>
                    {local.address?.streetName} {local.address?.number}
                  </TableCell>
                  <TableCell>{local.phone}</TableCell>
                  <TableCell>
                    {local.employees.map((employee) => (
                      <li key={employee.id}>
                        {employee.name} {employee.lastname}
                      </li>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
