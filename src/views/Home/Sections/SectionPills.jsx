import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import DeviceHub from "@material-ui/icons/DeviceHub";
import Panorama from "@material-ui/icons/Panorama";
import BurstMode from "@material-ui/icons/BurstMode";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Dash from "../pages/Dashboard/Dashboard";
import Groups from "../pages/Groups/Groups";
import Playlists from "../pages/Playlists/Playlists";
import Lib from "../pages/Library/Library";

// react components for routing our app without refresh
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

class SectionPills extends React.Component {
  // state = {
  //   title: "Dashboard"
  // };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      title: "Dashboard"
    };
    this.clickk;
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log("clicked logout");
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }
  clickk = e => val => {
    console.log("clicked", e);
    console.log("before title state", this.state.title);
    this.setState({
      title: e
    });
    console.log("title state", this.state.title);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login-page"} />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>{this.state.title}</h3>
              <div className={classes.user}>
                <CustomDropdown
                  buttonText="User"
                  buttonProps={{
                    className: classes.navLink,
                    color: "transparent"
                  }}
                  dropdownList={[
                    <Button
                      color="transparent"
                      target="_blank"
                      className={classes.navLink}
                      onClick={this.logout}
                    >
                      <ExitToApp className={classes.icons} />
                      Logout
                    </Button>
                  ]}
                />
              </div>
            </div>
            <div className={classes.title}>
              <h3>
                <small> </small>
              </h3>
            </div>
            <GridContainer>
              {/* <GridItem xs={12} sm={12} md={8} lg={6}>
                <NavPills
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Dashboard",
                      tabIcon: Dashboard,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Schedule",
                      tabIcon: Schedule,
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Tasks",
                      tabIcon: List,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem> */}
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="primary"
                  horizontal={{
                    tabsGrid: { lg: 2, xs: 12, sm: 4, md: 4 },
                    contentGrid: { lg: 10, xs: 12, sm: 8, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Dashboard",
                      tabIcon: Dashboard,
                      click: this.clickk("DashBoard"),
                      tabContent: (
                        <span>
                          <Dash />
                        </span>
                      )
                    },
                    {
                      tabButton: "Groups",
                      tabIcon: DeviceHub,
                      click: this.clickk("Groups"),
                      tabContent: (
                        <span>
                          <Groups />
                        </span>
                      )
                    },
                    {
                      tabButton: "Library",
                      tabIcon: Panorama,
                      click: this.clickk("Library"),
                      tabContent: (
                        <span>
                          <Lib />
                        </span>
                      )
                    },
                    {
                      tabButton: "Playlists",
                      tabIcon: BurstMode,
                      click: this.clickk("Playlists"),
                      tabContent: (
                        <span>
                          <Playlists />
                        </span>
                      )
                    },
                    {
                      tabButton: "Schedule",
                      tabIcon: Schedule,
                      click: this.clickk("Schedule"),
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(SectionPills);
