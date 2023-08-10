import React from "react";

const TableHead = ({ headerGroups }: any) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: any) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => {
            return (
              // Add the sorting props to control sorting.
              <th>{column.render("Header")}</th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
