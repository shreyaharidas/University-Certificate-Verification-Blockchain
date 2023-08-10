import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionCollapse,
  Form,
} from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { Filter } from "react-feather";
import { filterType } from "../../api/getStudentData";

type propType = { setFilter: React.Dispatch<React.SetStateAction<filterType>> };

const FilterComp = ({ setFilter }: propType) => {
  const [issuedBool, setIssuedBool] = useState<boolean | undefined>(undefined);
  const [notIssuedBool, setNotIssuedBool] = useState<boolean | undefined>(
    undefined
  );

  const [GPA, setGPA] = useState<string[] | []>([]);

  const GPAOptions = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "clear",
  ];

  const setIssued = (e: any) => {
    if (e.target.name === "Issued" && e.target.checked) setIssuedBool(true);
    else setIssuedBool(undefined);
  };

  const setNotIssued = (e: any) => {
    if (e.target.name === "NotIssued" && e.target.checked)
      setNotIssuedBool(false);
    else setNotIssuedBool(undefined);
  };

  const setSelectedOptions = (e: any) => {
    if (e.target.value === "clear") setGPA([]);
    else setGPA(e.target.value);
  };

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        CS:
          issuedBool !== undefined && notIssuedBool !== undefined
            ? undefined
            : issuedBool || notIssuedBool,
        GPA,
      };
    });
  }, [issuedBool, notIssuedBool, GPA]);

  // useEffect(() => {
  //   setFilter((prev) => {
  //     return Object.assign({
  //       ...prev,
  //       GPA,
  //     });
  //   });
  // }, [GPA]);

  return (
    <Accordion>
      <AccordionItem eventKey="0">
        <AccordionButton>
          <Filter />
        </AccordionButton>
        <AccordionCollapse eventKey="0">
          <Form>
            Filter By Certificate Status
            <Form.Check
              type="checkbox"
              label={"Issued"}
              onChange={setIssued}
              name={"Issued"}
            />
            <Form.Check
              type="checkbox"
              label={"Not Issued"}
              onChange={setNotIssued}
              name={"NotIssued"}
            />
            Filter by GPA
            <Form.Select
              size="sm"
              aria-label="GPA"
              onChange={setSelectedOptions}
            >
              {GPAOptions.map((GPA) => (
                <option value={GPA}>{GPA}</option>
              ))}
            </Form.Select>
          </Form>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterComp;
