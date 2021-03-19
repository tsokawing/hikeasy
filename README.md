# csci3100hiking
CSCI3100 Project: Hiking Website

## What is this?
We are:

- Tso Ka Wing 1155125488
- Wong Wing Yan 1155125194
- Tsang Tsz Kin Brian 1155126813
- Tsoi Chak Yu 1155126232
- Anshul Ghanshala 1155111816

This is a repo for the course project of a software engineering course (CSCI3100). We attempt to build HikEasy, a hiking-themed website with various features.

Relevant documents are available in the `/ReadMe` directory.

In `FrontEnd`, we use react.js to build the interface of the webpage,

In initial code stage, we have built the:

1. Homepage
2. Trail list page
3. Log in page

In `Backend`, we use node.js, express.js, typeorm to host the local host mysql database, connect to the server and get the database information 

In initial code stage, we have built the prototype api for users, trails, events and reviews

1. http://localhost:8080/users/
  - get_all
  - add_user
  - update_user/:userID
  
2. http://localhost:8080/trails/
  - get_all
  - get_specific/:trailID
  - add_trail
  - update_trail/:trailID
  - delete_trail/:trailID
  
3. http://localhost:8080/events/
  - get_all
  - get_specific/:eventID
  - add_event
  - update_event/:eventID
  
4. http://localhost:8080/reviews/
  - get_all
  - get_all_by_trail/:trailID
  - get_all_by_user/:userID
  - publish_review/:trailID
  - delete_review/:trailID
  
