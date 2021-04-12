**TrailService Api**
----
  <_ REST Api call for all opeerations to users _>

* **URL**

  * Get all trails
    * <_ http://localhost:8080/trails/get_all _>  `GET` 

    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all _> `GET` 
  
  * Get a trail with id 
    * <_ http://localhost:8080/trails/get_specific/:trailID _> `GET` 
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_specific/:trailID _> `GET` 
  
  * Add a new trail
    * <_ http://localhost:8080/trails/add_trail _>  `POST` 
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/add_trail _>  `POST` 
    
  * Update a new trail with id 
    * <_ http://localhost:8080/trails/update_trail/:trailID _>  `POST` 
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/update_trail/:trailID _>  `POST`  
  
  * Upload photo for trail with trail id 
    * <_ http://localhost:8080/trails/upload_photo/:trailID _>  `POST` 
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/upload_photo/:trailID _>  `POST` 
 
  * Get filename of photo with trail 
    * <_ http://localhost:8080/trails/get_trail_photos/:trailID _>  `GET`
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_trail_photos/:trailID _>  `GET`     
 
  * Get photo for with filename 
    * <_ http://localhost:8080/trails/get_photo/:fileName _>  `GET` 
  
    * <_ http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_photo/:fileName _>  `GET` 
***************************************************************************************************************************

* ** /trails/get_all URL Params**
     
   **Required:**
   `NA`

   **Optional:**
    `NA`
    
* **Data Params**
    `NA`

* **Success Response:**

  * **Response:** `{ trails }`
 
* **Error Response:**

  * **Resonpse:** `{ trail undefined }`

* **Sample Call:**

   ```javascript
  componentDidMount() {
    //alllow cors to fetch ==> install cors extension for chrome
    fetch(
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }
  ```
  ****************************************************************************************************************************
 
 * ** /trails/get_specific/:trailID URL Params**
     
   **Required:**
   `traiID=1`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
    `NA`
* **Success Response:**

  * **Success:** `true`
    **Resonpse:** `{ trails }`
 
* **Error Response:**

  * **Resonpse:** 
    `trail undefined`  
    
 ***************************************************************************************************************************
 
 * ** /trails/add_trail URL Params**
     
   **Required:**
   `NA`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
  
    `trailName = string`
    `trailDifficulty = int`
    `trailDescription = string`
    `trailWaypoints = string`
    
* **Success Response:**

  * **Success:** `true`
    **Resonpse:** `trail.id`
 
* **Error Response:**

  * **Resonpse:** 
    * `Missing trail name`  
    * `Trail name cannot be empty` 
    * `Missing trail difficulty`  
    * `Invalid difficulty` 
    * `trail undefined`
    
 ***************************************************************************************************************************
 
 * ** /trails/update_trail with id Params**
     
   **Required:**
   `trailID = int`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
  
    `trailName = string`
    `trailDifficulty = int`
    `trailDescription = string`
    `isVerified = int`
    `isShown = int`
    `waypoints = string`
    
* **Success Response:**

  * **Success:** `true`
    **Resonpse:** `OK`
 
* **Error Response:**

  * **Resonpse:** 
    * `Nothing to update`  
    * `Invalid difficulty` 
  
***************************************************************************************************************************
 
 * ** /trails/upload_photos/:trailID Params**
     
   **Required:**
   `trailID = int`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
  
    `userID = int`
    `photos = .png/,jpg/.jpeg`

    
* **Success Response:**

  * **Success:** `true`
    **Message:** `OK; please see details`
    **Resonpse:** `{name: photo.name,newName: newName,mimetype: photo.mimetype, size: photo.size, accepted: true,}`
 
* **Error Response:**

  * **Resonpse:** 
    * `No files were uploaded`  
    * `Invalid userID` 
    * `Invalid trailID` 

***************************************************************************************************************************
 
 * ** /trails/get_trail_photos/:trailID Params**
     
   **Required:**
   `trailID = int`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
    `NA`

* **Success Response:**
<_ photoFileNames is a array contains all the filenames of the photo _>
  * **Success:** `true`
    **Resonpse:** `{photoFileNames: fileNameArray}`
 
* **Error Response:**

  * **Resonpse:** 
    * `Invalid trailID` 

***************************************************************************************************************************
 
 * ** /trails/get_photo/:fileName Params**
     
   **Required:**
   `fileName = string`

   **Optional:**
    `NA`
    
* **Body Form-Data Params**
    `NA`

* **Success Response:**
<_ photoFileNames is a array contains all the filenames of the photo _>
  * **Success:** `true`
    **Resonpse:** `{photo file}`
 
* **Error Response:**
  * **Code:** 
    * `404` 
  * **Resonpse:** 
    * `Failed to send photo (${fullFileName}): ` + err` 
