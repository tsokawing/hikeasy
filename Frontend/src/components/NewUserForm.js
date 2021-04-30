/**
 * New User Form
 * A form asking details from a newly registered user.
 */

import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import http from "../services/http-common";

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: [],
      lastName: [],
      age: [],
      submitted: false,
    };
  }

  submitInfo = () => {
    // get JWT for backend verification
    let tThis = this;
    let tState = this.state;
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        // send token to backend via HTTP

        let formData = new FormData();
        formData.append("userFirstname", tState.firstName.value);
        formData.append("userLastname", tState.lastName.value);
        formData.append("userAge", tState.age.value);

        http
          .post(
            "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/users/login_or_register",
            formData,
            {
              headers: {
                Authorization: "Bearer " + idToken,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log(response);
            tThis.setState({ submitted: true });
          });
      })
      .catch(function (error) {});
  };

  render() {
    return (
      <>
        <Dialog open={true} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Congratulations!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have become a member of Hikeasy. Tell us your info and get
              started!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              inputRef={(c) => {
                this.state.firstName = c;
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              inputRef={(c) => {
                this.state.lastName = c;
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="number"
              label="Age"
              fullWidth
              inputRef={(c) => {
                this.state.age = c;
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submitInfo} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.submitted ? <Redirect to="/" /> : null}
      </>
    );
  }
}

export default NewUserForm;
