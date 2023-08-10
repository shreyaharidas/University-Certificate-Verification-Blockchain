import { useEffect, useState } from "react";
import Table from "../Table/index";
import getStudentData from "../../api/getStudentData";
import { Columns } from "../../constants/tableColumns";
import { Eye, PlusCircle } from "react-feather";
import { Pagination } from "react-bootstrap";
import SearchFilter from "../SearchFilter";
import { filterType } from "../../api/getStudentData";
import CreateModal from "../CreateModal";

export type StudentDataType = {
  EnrollmentNumber: number | undefined;
  FullName: string | undefined;
  GPA: number | undefined;
  CertificateStatus: string | undefined;
};

const InfoPage = () => {
  const [studentData, setStudentData] = useState<StudentDataType[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<filterType>({
    CS: undefined,
    GPA: [],
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<StudentDataType>({
    EnrollmentNumber: undefined,
    FullName: undefined,
    GPA: undefined,
    CertificateStatus: undefined,
  });

  useEffect(() => {
    const getData = async (
      limit: number,
      offset: number,
      filter: filterType,
      searchTerm: string
    ) => {
      let data = await getStudentData(limit, offset, filter, searchTerm);
      setStudentData(data.resultArray);
      setTotal(data.total);
    };
    getData(limit, offset, filter, searchTerm);
  }, [offset, limit, filter, searchTerm]);

  const incOffset = () => {
    if (offset >= total - limit) return;
    setOffset((prev) => prev + 10);
  };
  const decOffset = () => {
    if (offset === 0) return;
    setOffset((prev) => prev - 10);
  };
  const getTableData = () => {
    if (studentData) {
      return studentData.map((student: any) => {
        return {
          EnrollmentNumber: student["Enrollment number"],
          FullName: student["Name"],
          GPA: student.GPA,
          CertificateStatus: student["Certificate Status"]
            ? "Issued"
            : "Not Issued",
        };
      });
    } else
      return [
        {
          EnrollmentNumber: "",
          FullName: "",
          GPA: "",
          CertificateStatus: "",
        },
      ];
  };

  const handleCreateModal = (data: any) => {
    setCreateModalOpen(true);
    setModalData(data);
  };

  return (
    <>
      <SearchFilter setFilter={setFilter} setSearchTerm={setSearchTerm} />
      {studentData && (
        <>
          <Table
            data={getTableData()}
            columns={[
              ...Columns,
              {
                Header: "Actions",
                accessor: "actions",
                Cell: (data: any) => (
                  <div className="d-flex">
                    <>
                      {data?.row?.original?.CertificateStatus === "Issued" ? (
                        <Eye
                          onClick={() => {
                            console.log("view");
                          }}
                        />
                      ) : (
                        <PlusCircle
                          onClick={() => {
                            handleCreateModal(data?.row?.original);
                          }}
                        />
                      )}
                    </>
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
      <Pagination>
        <Pagination.Item
          onClick={() => {
            decOffset();
          }}
          disabled={offset === 0 ? true : false}
        >
          {" "}
          Prev{" "}
        </Pagination.Item>
        <Pagination.Item
          onClick={() => {
            incOffset();
          }}
          disabled={offset >= total - limit ? true : false}
        >
          {" "}
          Next{" "}
        </Pagination.Item>
      </Pagination>

      {createModalOpen && (
        <CreateModal
          setCreateModalOpen={setCreateModalOpen}
          createModalOpen={createModalOpen}
          modalData={modalData}
        />
      )}
    </>
  );
};

export default InfoPage;
