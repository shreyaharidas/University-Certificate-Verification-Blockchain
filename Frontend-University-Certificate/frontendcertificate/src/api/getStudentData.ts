import http from "./apibase";

export type filterType = {
  CS: boolean | undefined;
  GPA: string[];
};

const getStudentData = (
  limit: number,
  offset: number,
  filter: filterType,
  searchTerm: string
) => {
  const { CS, GPA } = filter;

  return http
    .get(
      `/getStudents?limit=${limit}&offset=${offset}${
        CS?.toString() ? `&CS=${CS?.toString()}` : ""
      }${GPA.length ? `&GPA=[${GPA}]` : ""}${
        searchTerm ? `&searchTerm=${searchTerm}` : ""
      }`
    )
    .then((data) => data.data);
};

export default getStudentData;
