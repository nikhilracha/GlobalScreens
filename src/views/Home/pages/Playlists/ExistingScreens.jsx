import React, { Component } from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import DesktopMac from "@material-ui/icons/DesktopMac";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { testPost } from "../../../../services/testPost";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

class ExistingScreens extends Component {
  constructor(props) {
    super(props);
    var userscreens = sessionStorage.getItem("feedData");
    console.log("feed data in playlist", JSON.parse(userscreens));
    let data = JSON.parse(userscreens);
    this.state = {
      screen: data
    };

    // we use this to make the card to appear after the page has been rendered
  }

  check() {
    console.log("from playlists", this.props.screendata);
  }
  submit(plyid) {
    console.log("clicked", plyid);
    console.log("from playlists", this.props.screendata);
    testPost(plyid, this.props.screendata).then(result => {
      let responseJson = result;
      console.log("playlist data of existing screens", result.success_status);
      let status = result.success_status;
      if (status) {
        this.props.onSendback(status);
      }
      // this.setState({
      //   playlists: result
      // });
    });
  }

  //state = {};
  render() {
    const { classes } = this.props;
    var userscreen = sessionStorage.getItem("feedData");
    let dat = JSON.parse(userscreen);
    console.log("feed data in playlist render", dat);
    //console.log("from playlists", this.props.screendata);
    if (!dat) {
      return <p>No Screens</p>;
    } else {
      return (
        <div>
          <GridContainer>
            {dat.map(function(item, index) {
              return (
                <div key={index}>
                  <GridItem>
                    <Card
                      className={classes.textCenter}
                      style={{ width: "15rem", backgroundColor: "#D3D3D3" }}
                    >
                      <CardBody>
                        <DesktopMac
                          style={{ fontSize: 60 }}
                          className={classes.icon}
                        />
                        <h4 className={classes.cardTitle}>{item.s_name}</h4>
                        <p>{item.s_uid}</p>
                        <p>{item.s_location}</p>
                        <Button
                          color="primary"
                          onClick={() => this.submit(item.s_uid)}
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
      );
    }
  }
}

export default withStyles(style)(ExistingScreens);
