import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx";

// @material-ui/icons
import LibraryBooks from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import AspectRatio from "@material-ui/icons/AspectRatio";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import { PostData } from "../../../../services/PostData";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SectionJavascript extends React.Component {
  anchorElLeft = null;
  anchorElTop = null;
  anchorElBottom = null;
  anchorElRight = null;

  constructor(props) {
    super(props);
    var user = sessionStorage.getItem("userData");
    var obj = JSON.parse(user);
    var obid = obj.userData.user_id;
    this.state = {
      classicModal: false,
      openLeft: false,
      openTop: false,
      openBottom: false,
      openRight: false,
      id: obid,
      code: "",
      sname: "",
      location: "",
      notes: "",
      //checked: [24, 22],
      checked: true,
      checkederror: true,
      isError: true,
      error: false,
      resperror: ""
    };
    this.submit = this.submit.bind(this);
  }

  codeChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toUpperCase()
    });
    console.log("len", e.target.value.length);
    //this.val();
    //const er = this.validate();
    if (e.target.value.length <= 5) {
      this.setState({
        //isError: true,
        error: true
      });
    } else {
      this.setState({
        //isError: false,
        error: false
      });
    }
    if (this.state.checked && e.target.value.length == 6) {
      this.setState({ isError: false });
    } else this.setState({ isError: true });
    // const er = this.validate(e.target.value.length);
    // console.log(er);
    // if (er) {
    //   this.setState({
    //     isError: true
    //   });
    // } else {
    //   this.setState({
    //     isError: false
    //   });
    // }
  };

  handleChange = e => {
    console.log("before", this.state.checked);

    this.setState({
      checked: !this.state.checked
    });
    console.log("code", this.state.code.length);
    if (this.state.checked && this.state.code.length == 6) {
      this.setState({ isError: false });
    } else this.setState({ isError: true });
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // const er = this.validate();
    // if (er)
    //   this.setState({
    //     isError: true
    //   });
    // else {
    //   this.setState({
    //     isError: false
    //   });
    // }
  };

  validate = len => {
    let isErr = false;
    //console.log("validate", this.state.checked);
    if (len <= 5 && this.state.checked) {
      isErr = true;
    } else {
      isErr = false;
    }

    // if (this.state.checked === false) {
    //   isErr = true;
    // }
    // if (this.state.sname.length === 0) {
    //   isErr = true;
    // }
    return isErr;
  };

  submit() {
    if (this.state.code) {
      //this.getUser();
      console.log(
        "result",
        this.state.code,
        this.state.sname,
        this.state.location,
        this.state.notes,
        this.state.checked
      );
      PostData("savescreen", this.state).then(result => {
        let responseJson = result;
        console.log("result", result);
        console.log("responseJson", responseJson);
        if (responseJson.userData) {
          // sessionStorage.setItem("userData", JSON.stringify(responseJson));
          //this.setState({ redirect: true });
          console.log("response", responseJson.userData);
          this.handleClose("classicModal");
          window.location.reload();
        } else {
          console.log("error occured", responseJson.error);
          this.setState({ resperror: responseJson.error });
        }
      });
    }
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }
  render() {
    const { classes } = this.props;

    let styles = {
      padding: "0px"
    };

    return (
      <div style={styles} className={classes.section}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h2>You haven't added any screens yet.</h2>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.title}>
                <h3>Screens</h3>
              </div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={4}>
                  <Button
                    color="primary"
                    block
                    onClick={() => this.handleClickOpen("classicModal")}
                  >
                    <LibraryBooks className={classes.icon} />
                    Add Screen
                  </Button>
                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={this.state.classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    disableBackdropClick={true}
                    onClose={() => this.handleClose("classicModal")}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
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
                        onClick={() => this.handleClose("classicModal")}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}>
                        Link a Screen with your account
                      </h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <p>Please enter the code displayed on your screen.</p>
                      <CustomInput
                        //id="disabled"
                        name="code"
                        error={this.state.error}
                        value={this.state.code}
                        onChange={e => this.codeChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AspectRatio
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                          placeholder: "XXXXXX",
                          inputProps: { maxLength: "6" }
                        }}
                      />
                      <p>{this.state.code.length}</p>
                      <CustomInput
                        labelText="Screen Name"
                        name="sname"
                        //id="email"
                        value={this.state.sname}
                        onChange={e => this.change(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        // inputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Email className={classes.inputIconsColor} />
                        //     </InputAdornment>
                        //   )
                        // }}
                      />
                      <CustomInput
                        labelText="Location (optional)"
                        name="location"
                        //id="email"
                        //type="email"
                        value={this.state.location}
                        onChange={e => this.change(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        // inputProps={{

                        // }}
                      />
                      <CustomInput
                        labelText="Notes (optional)"
                        name="notes"
                        //id="email"
                        //type="email"
                        value={this.state.notes}
                        onChange={e => this.change(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        // inputProps={{

                        // }}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={this.state.checked}
                            onChange={e => this.handleChange(e)}
                            //value="checkedA"
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{ checked: classes.checked }}
                          />
                        }
                        classes={{ label: classes.modalBody }}
                        label="Please enter the code displayed on your screen."
                      />
                      <h4>{this.state.resperror}</h4>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button
                        disabled={this.state.isError}
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.submit}
                      >
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(SectionJavascript);
