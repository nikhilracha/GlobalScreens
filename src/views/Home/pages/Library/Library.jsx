import React, { Component } from "react";
// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

import Button from "components/CustomButtons/Button.jsx";
import { PostData } from "../../../../services/PostData";
import { Postimg } from "../../../../services/Postimg";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

const photos = [
  {
    id: 0,
    src: "http://localhost/Api/api/imgs/1.jpg",
    width: 4,
    height: 3
  }
];

class Lib extends Component {
  constructor(props) {
    super(props);
    var user = sessionStorage.getItem("userData");
    var obj = JSON.parse(user);
    var obid = obj.userData.user_id;

    this.state = {
      // Set initial files
      files: ["index.html"],
      photos: photos,
      selectAll: false,
      userid: obid,
      selected: []
    };

    this.selectPhoto = this.selectPhoto.bind(this);

    this.upload = this.upload.bind(this);
    this.refresh = this.refresh.bind(this);
    this.Create = this.Create.bind(this);
    this.Delete = this.Delete.bind(this);
    //this.fetchData = this.fetchData.bind(this);
    //this.fetchData();
    this.refresh();
  }

  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
    console.log("selected", photos[obj.index].selected);
  }

  upload() {
    console.log("files", this.state.files);
    console.log("user id", this.state.userid);
    Postimg(this.state.files, this.state.userid).then(result => {
      let responseJson = result;
      console.log("result in library", result);
    });
    setTimeout(
      function() {
        this.refresh();
      }.bind(this),
      1000
    );
  }

  refresh() {
    PostData("getimg", this.state).then(result => {
      let responseJson = result;
      console.log("gallery data", result);
      this.setState({
        photos: result
      });
    });
  }

  Create() {
    setTimeout(
      function() {
        alert("hello");
      }.bind(this),
      5000
    );
  }

  Delete() {
    var updated = [];
    for (let i = 0; i < this.state.photos.length; i++) {
      if (this.state.photos[i].selected) {
        console.log(
          "files submitted are",
          JSON.stringify(this.state.photos[i].img_id)
        );
        updated.push(this.state.photos[i].img_id);
        //updated = this.state.selected.concat(this.state.photos[i]);
        // this.setState({ selected: updated }, function() {
        //   console.log("updated", this.state.selected);
        // });
      }
    }
    PostData("delimg", updated).then(result => {
      let responseJson = result;
      console.log("delete response", result);
    });

    setTimeout(
      function() {
        this.refresh();
      }.bind(this),
      1000
    );
  }

  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}

        <FilePond
          allowMultiple={true}
          maxFiles={3}
          id="fup"
          //server="http://localhost/filepond-master/public/api/index.php"
          onupdatefiles={fileItems => {
            // Set current file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        >
          {/* Update current files  */}
          {this.state.files.map(file => (
            <File key={file} src={file} origin="local" />
          ))}
        </FilePond>

        <Button onClick={this.upload}>Upload</Button>
        <Button onClick={this.Create}>Create</Button>
        <Button onClick={this.Delete}>Delete</Button>
        <Gallery
          photos={this.state.photos}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage}
          direction={"column"}
        />
      </div>
    );
  }
}

export default Lib;
