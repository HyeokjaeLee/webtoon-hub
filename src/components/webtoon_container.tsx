import React from "react";
import type { A_webtoon_info } from "../modules/base_modules";

class View_a_webtoon extends React.Component<A_webtoon_info> {
  render() {
    let service_and_state: string;
    if (this.props.state != "") {
      service_and_state = this.props.service + " / " + this.props.state;
    } else {
      service_and_state = this.props.service;
    }
    return (
      <a href={this.props.url}>
        <li className="webtoon_container">
          <div className="webtoon_info">
            <ul className="webtoon_info_container">
              <li
                style={{
                  fontSize: "10px",
                  listStyle: "none",
                  textAlign: "right",
                }}
              >
                {service_and_state}
              </li>
              <li style={{ fontSize: "10px", listStyle: "none" }}>{this.props.title}</li>
              <li style={{ fontSize: "8px", listStyle: "none" }}>{this.props.artist}</li>
            </ul>
          </div>
          <div className="thumnail">
            <img src={this.props.img} className="thumnail_img" />
          </div>
        </li>
      </a>
    );
  }
}

export default View_a_webtoon;
