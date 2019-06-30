import React, { Component } from "react";
import GData from "./GData";
import ExistingScreens from "./ExistingScreens";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
//import Button from "components/CustomButtons/Button.jsx";

import Button from "../../../../components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

import { PostData } from "../../../../services/PostData";

import modalStyle from "./modalStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Playlists extends Component {
  constructor(props) {
    super(props);
    var user = sessionStorage.getItem("userData");
    var obj = JSON.parse(user);
    console.log("in playlists", obj);
    var obid = obj.userData.user_id;
    this.state = {
      id: obid,
      modal: false,
      dmodal: false,
      selected: [],
      playname: "",
      playlists: [],
      pselected: ""
      //error: true
    };
    this.getData = this.getData.bind(this);
    this.showData = this.showData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deployopen = this.deployopen.bind(this);
    this.deployClose = this.deployClose.bind(this);
    this.refresh();
    //this.clickMe = this.clickMe.bind(this);
  }

  deployopen(dmodal, plyid) {
    console.log("clicked", plyid);
    var x = [];
    x[dmodal] = true;
    this.setState(x);
    this.setState({
      pselected: plyid
    });
  }
  deployClose(dmodal) {
    var x = [];
    x[dmodal] = false;
    this.setState(x);
    //console.log(this.state);
  }

  refresh() {
    PostData("getplaylist", this.state).then(result => {
      let responseJson = result;
      console.log("playlist data", result);
      this.setState({
        playlists: result
      });
    });
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlerecv = status => {
    //this.setState({language: langValue});
    console.log("data recieved back is ", status);
    if (status) {
      this.deployClose("dmodal");
      setTimeout(
        function() {
          alert("successfully deployed");
        }.bind(this),
        200
      );
    }
  };

  getData(val) {
    // do not forget to bind getData in constructor
    console.log("in playlist", val);
    this.setState({
      selected: val
    });
  }
  showData() {
    console.log("data", this.state.selected);
    PostData("createplaylist", this.state).then(result => {
      let responseJson = result;
      console.log("create response", result);
    });
    this.handleClose("modal");
    setTimeout(
      function() {
        this.refresh();
      }.bind(this),
      200
    );
  }
  handleClickOpen(modal) {
    this.refs.child.refresh();
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    const ModStyle = {
      color: "blue",
      width: "300px"
    };
    const ss = {
      paddingTop: "10px"
    };
    // console.log("data in playlists", this.state.playlists.imageData);
    if (!this.state.playlists) {
      return (
        <div>
          <Button
            color="primary"
            round
            onClick={() => this.handleClickOpen("modal")}
          >
            New
          </Button>
          <h3>No playlists created</h3>
        </div>
      );
    } else {
      return (
        <div>
          {/* <h3>Playlists</h3> */}
          <div>
            <Button
              color="primary"
              round
              onClick={() => this.handleClickOpen("modal")}
            >
              New
            </Button>
            <div style={{ height: "500px", overflow: "auto" }}>
              <GridContainer>
                {this.state.playlists.map(function(item, index) {
                  return (
                    <div key={index}>
                      <GridItem>
                        <Card style={{ width: "20rem" }}>
                          <CardBody>
                            <h4 className={classes.cardTitle}>{item.pname}</h4>
                            <Button color="primary" round>
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                this.deployopen("dmodal", item.pid)
                              }
                              //value={item.pid}
                              color="primary"
                              round
                            >
                              Deploy
                            </Button>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </div>
                  );
                }, this)}
              </GridContainer>
            </div>
            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={this.state.dmodal}
              TransitionComponent={Transition}
              keepMounted
              disableBackdropClick={true}
              onClose={() => this.deployClose("dmodal")}
              aria-labelledby="modal-slide-title"
              aria-describedby="modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.deployClose("dmodal")}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                <h3 className={classes.modalTitle}>Screens</h3>
                <GridContainer>
                  <GridItem>
                    {/* <CustomInput
                    name="playname"
                    //id="email"
                    value={this.state.playname}
                    onChange={e => this.change(e)}
                    formControlProps={{
                      fullWidth: false
                    }}
                    inputProps={{
                      placeholder: "Enter playlist name"
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <Email className={classes.inputIconsColor} />
                      //   </InputAdornment>
                      // )
                    }}
                  /> */}
                  </GridItem>
                </GridContainer>
              </DialogTitle>
              <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
              >
                <ExistingScreens
                  screendata={this.state.pselected}
                  onSendback={this.handlerecv}
                />
              </DialogContent>
              <DialogActions
              //  className={classes.modalFooter + " " + classes.modalFooterCenter}
              >
                <Button onClick={() => this.deployClose("dmodal")}>
                  Cancel
                </Button>
                {/* <Button disabled={!this.state.playname} onClick={this.showData}>
                Create
              </Button> */}
              </DialogActions>
            </Dialog>

            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={this.state.modal}
              TransitionComponent={Transition}
              keepMounted
              disableBackdropClick={true}
              onClose={() => this.handleClose("modal")}
              aria-labelledby="modal-slide-title"
              aria-describedby="modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.handleClose("modal")}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>Create Playlist</h4>
                <GridContainer>
                  <GridItem>
                    <CustomInput
                      name="playname"
                      //id="email"
                      value={this.state.playname}
                      onChange={e => this.change(e)}
                      formControlProps={{
                        fullWidth: false
                      }}
                      inputProps={{
                        placeholder: "Enter playlist name"
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Email className={classes.inputIconsColor} />
                        //   </InputAdornment>
                        // )
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </DialogTitle>
              <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
              >
                <GData ref="child" sendData={this.getData} />
              </DialogContent>
              <DialogActions
              //  className={classes.modalFooter + " " + classes.modalFooterCenter}
              >
                <Button onClick={() => this.handleClose("modal")}>
                  Cancel
                </Button>
                <Button disabled={!this.state.playname} onClick={this.showData}>
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(modalStyle)(Playlists);
