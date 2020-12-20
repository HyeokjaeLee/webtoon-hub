import React from "react";
import Fade from "react-reveal/Fade";

class Fade_bottom extends React.Component {
  render() {
    return (
      <div>
        <Fade bottom>
          <h1>Hello</h1>
        </Fade>
      </div>
    );
  }
}

export default Fade;
