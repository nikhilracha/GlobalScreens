import React, { Component } from "react";
import SectionJavascript from "./SectionJavascript.jsx";
import ExistingScreens from "./ExistingScreens.jsx";

import { PostData } from "../../../../services/PostData";

class Dash extends Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    var user = sessionStorage.getItem("userData");
    var obj = JSON.parse(user);
    console.log("in dashboard", obj);
    var obid = obj.userData.user_id;
    this.state = {
      id: obid,
      existingscreen: null
    };
    this.check = this.check.bind(this);
    this.check();
  }

  check() {
    PostData("checkscreens", this.state).then(result => {
      let responseJson = result;
      console.log("result", result);
      if (responseJson.feedData) {
        sessionStorage.setItem(
          "feedData",
          JSON.stringify(responseJson.feedData)
        );
        this.setState({ existingscreen: true });
        console.log("data", responseJson.feedData);
      } else {
        console.log("check your credentails again");
        this.setState({ existingscreen: false });
      }
    });
  }

  // componentDidMount() {
  //   this.getUser();
  // }

  render() {
    let dat = sessionStorage.getItem("feedData");
    if (this.state.existingscreen) {
      return (
        <div>
          <ExistingScreens data={dat} />
        </div>
      );
    }
    if (this.state.existingscreen == null) {
      return null;
    } else {
      return (
        <div>
          <SectionJavascript />
        </div>
      );
    }
  }
}

export default Dash;
