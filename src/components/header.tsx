import * as React from "react";
import coronaLogo from "./coronaLogo.png";
import githubLogo from "./githubLogo.png";
import leafletLogo from "./leafletLogo.png";
import diseaseshLogo from "./diseaseshLogo.png";
import "./header.css";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="header">
      <img src={coronaLogo} alt="" className="logo" />
      <div className="name">corona tracker</div>
      <div className="links">
        <img src={githubLogo} alt="" className="githubLogo" />
        <a href="https://leafletjs.com/">
          <img src={leafletLogo} alt="" className="leafletLogo" />
        </a>

        <a href="https://disease.sh/">
          <img src={diseaseshLogo} alt="" className="diseaseshLogo" />
        </a>
      </div>
    </div>
  );
}
