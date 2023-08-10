import React from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StudentDataType } from "../InfoPage/InfoPage";

export type CreateModalPropType = {
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createModalOpen: boolean;
  modalData: StudentDataType;
};

export type studentData = {
  Name: string;
  EnrollmentNumber: number;
  GPA: number;
};

const CreateModal = ({
  setCreateModalOpen,
  createModalOpen,
  modalData,
}: CreateModalPropType) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let Name = formData.getAll("Name").toString();
    let EnrollmentNumber = parseInt(formData.getAll("E_Number").toString());
    let GPA = parseInt(formData.getAll("GPA").toString());

    localStorage.setItem(
      "studentData",
      JSON.stringify({ Name, EnrollmentNumber, GPA })
    );

    setCreateModalOpen(false);
    navigate("/pdfPage");
  };

  return (
    <Modal
      show={createModalOpen}
      onHide={() => {
        setCreateModalOpen(false);
      }}
    >
      <ModalHeader>Create Certificate</ModalHeader>
      <Form onSubmit={onSubmit}>
        <ModalBody style={{ display: "grid" }}>
          <label>
            <b>Full Name</b>
          </label>
          <input
            placeholder={modalData.FullName}
            defaultValue={modalData.FullName}
            name={"Name"}
          />
          <label>
            <b>Enrollment Number</b>
          </label>
          <input
            placeholder={modalData?.EnrollmentNumber?.toString()}
            defaultValue={modalData?.EnrollmentNumber}
            name={"E_Number"}
          />

          <label>
            <b>GPA</b>
          </label>
          <input
            placeholder={modalData?.GPA?.toString()}
            defaultValue={modalData?.GPA}
            name={"GPA"}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" variant={"success"}>
            {" "}
            Create
          </Button>
          <Button onClick={closeModal} variant={"danger"}>
            Close
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateModal;
