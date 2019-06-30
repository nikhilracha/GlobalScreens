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

import AddScreen from "./AddScreen.jsx";

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
    let data = JSON.parse(this.props.data);
    this.state = {
      screen: data
    };
    // we use this to make the card to appear after the page has been rendered
  }

  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h3>Screens</h3>
        <div>
          <AddScreen />
        </div>

        <div
          style={{
            height: "400px",
            overflow: "auto",
            overflowX: "hidden",
            position: "absolute"
          }}
        >
          <GridContainer>
            {this.state.screen.map(function(item, index) {
              return (
                <div key={index}>
                  <GridItem>
                    <Card
                      className={classes.textCenter}
                      style={{ width: "25rem", backgroundColor: "#D3D3D3" }}
                    >
                      <CardBody>
                        <DesktopMac
                          style={{ fontSize: 60 }}
                          className={classes.icon}
                        />
                        <h4 className={classes.cardTitle}>{item.s_name}</h4>
                        <p>{item.s_uid}</p>
                        <p>{item.s_location}</p>
                        <Button color="primary">Manage</Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </div>
              );
            })}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(ExistingScreens);
