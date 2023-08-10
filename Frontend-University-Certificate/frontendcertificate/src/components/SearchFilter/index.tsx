import React, { useCallback, useRef, useState } from "react";
import { Search } from "react-feather";
import { filterType } from "../../api/getStudentData";
import searchDebounce from "../../utils/SearchDebounce";
import FilterComp from "./Filter";
import "./SearchFilter.module.css";

type propType = {
  setFilter: React.Dispatch<React.SetStateAction<filterType>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchFilter = ({ setFilter, setSearchTerm }: propType) => {
  const ref = useRef<HTMLInputElement>(null);

  const [searchDelay, setSearchDelay] = useState(500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchAPICall: any = useCallback(
    searchDebounce(handleSearch, searchDelay),
    [searchDelay]
  );

  return (
    <div className="d-flex justify-content-end mb-4">
      <div className="d-flex">
        <input
          ref={ref}
          type={"search"}
          placeholder="Enter Name"
          onChange={searchAPICall}
          defaultValue={""}
          size={
            ref?.current?.placeholder && ref?.current?.value
              ? ref?.current?.placeholder?.length < ref?.current?.value?.length
                ? ref?.current?.value?.length
                : ref?.current?.placeholder?.length
              : ref?.current?.placeholder?.length
          }
        />

        <Search />
      </div>

      <FilterComp setFilter={setFilter} />
    </div>
  );
};

export default SearchFilter;
