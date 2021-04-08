import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    let id = 2;
    formData.append("userID", id);
    formData.append("photos", file);

    console.log("upload");

    return http.post("/trails/upload_photo/5", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  //   getFiles() {
  //     return http.get("/files");
  //   }
}

export default new UploadFilesService();
