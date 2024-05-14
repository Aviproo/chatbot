import React from "react";
import TextsmsIcon from "@mui/icons-material/Textsms";
import GroupIcon from "@mui/icons-material/Group";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={Classes.main_div}>
      <div className={Classes.div_left}></div>
      <div className={Classes.div_right}>
        <ul className={Classes.ul}>
          <li>
            <TextsmsIcon className={Classes.fontIcons} />
            <Link to="/Chats" className={Classes.link}>
              Chats
            </Link>
          </li>
          <li>
            <GroupIcon className={Classes.fontIcons} />
            <Link to="/Characters" className={Classes.link}>
              My Characters
            </Link>
          </li>
          <li>
            <LocalSeeIcon className={Classes.fontIcons} />
            Generate Images
          </li>
          <li>
            <FavoriteIcon className={Classes.fontIcons} />
            Create Characters
          </li>
          <li>
            <PersonIcon className={Classes.fontIcons} />
            My profile
            <ArrowDropDownIcon className={Classes.fontIcons} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
