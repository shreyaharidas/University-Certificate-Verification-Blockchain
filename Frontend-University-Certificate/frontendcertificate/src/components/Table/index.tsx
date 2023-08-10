import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import { useTable } from "react-table";
import TableHead from "./TableHead";

const Table = (props: any) => {
  const { columns, data } = props;

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <BootstrapTable responsive hover className="mb-0" {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any, i: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>
    </>
  );
};

export default Table;
