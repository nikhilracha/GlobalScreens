import { container, title, user } from "assets/jss/material-kit-react.jsx";

const pillsStyle = {
  section: {
    padding: "70px 0"
  },
  container,
  user: {
    float: "right",
    marginTop: "-45px"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  }
};

export default pillsStyle;
