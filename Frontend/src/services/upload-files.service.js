import http from "../http-common";
import firebaseJwtManager from "../firebaseJwtManager";

class UploadFilesService {
  uploadProfilePicForTrail(trailID, file, onUploadProgress) {
    // temp function for now, later refactor
    let formData = new FormData();
    let userID = 1;
    formData.append("userID", userID);
    formData.append("photos", file);

    return http.post("/trails/upload_profile_pic/" + trailID, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  upload(file, onUploadProgress) {
    let formData = new FormData();
    let id = 2;
    formData.append("userID", id);
    // formData.append("trailID", 5);
    formData.append("photos", file);

    return http.post("/trails/upload_photo/2", formData, {
      headers: {
        "Authentication": firebaseJwtManager.getToken(),
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
