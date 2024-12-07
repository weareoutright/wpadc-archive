import styles from "./FullPageNav.module.scss";
import className from "classnames/bind";
import { useHeaderMenu } from "../../constants/customQueryHooks";
import { FullPageNavHeader } from "../FullPageNavHeader";
import { FullPageNavFooter } from "../FullPageNavFooter";
import { useState } from "react";
import ARROW_LEFT from "../../assets/full-page-nav/arrow-left.svg";
import Image from "next/image";
import LOADING_ICON from "../../assets/full-page-nav/loading-icon.svg";

let cx = className.bind(styles);

export default function FullPageNav({
  children,
  className,
  setIsNavShown,
  isNavShown,
}) {
  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const [display, setDisplay] = useState("block");

  return (
    <div className={cx(["component", className])} style={{ display: display }}>
      <FullPageNavHeader
        display={display}
        setDisplay={setDisplay}
        setIsNavShown={setIsNavShown}
        isNavShown={isNavShown}
      />
      <div className={cx("menu-container")}>
        {menus?.map((menu) => {
          if (menu.label === "Get Involved")
            return (
              <a className={cx("menu-item")} key={menu.id} href={menu.path}>
                <span>
                  {menu.label} <Image src={ARROW_LEFT} alt="" />
                </span>
              </a>
            );
          else
            return (
              <a className={cx("menu-item")} key={menu.id} href={menu.path}>
                {menu.label ? menu.label : <LOADING_ICON />}
              </a>
            );
        })}
      </div>
      <FullPageNavFooter />
    </div>
  );
}
