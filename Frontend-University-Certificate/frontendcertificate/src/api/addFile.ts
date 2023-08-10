import http from "./apibase";

const addFile = async (pdf: string) => {
  return http.post(`/addfile`, { pdf }).then((data) => {
    console.log(data.data);
    return data.data;
  });
};

export default addFile;
