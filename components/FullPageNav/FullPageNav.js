import styles from "./FullPageNav.module.scss";
import className from "classnames/bind";
import { useHeaderMenu } from "../../constants/customQueryHooks";
import { FullPageNavHeader } from "../FullPageNavHeader";
import { FullPageNavFooter } from "../FullPageNavFooter";
import { useState, useEffect } from "react";
import ARROW_LEFT from "../../assets/full-page-nav/arrow-left.svg";
import Image from "next/image";
import LOADING_ICON from "../../assets/full-page-nav/loading-icon.svg";
import LoadingIcons from "react-loading-icons";

let cx = className.bind(styles);

export default function FullPageNav({
  children,
  className,
  setIsNavShown,
  isNavShown,
}) {
  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const [display, setDisplay] = useState("block");

  // Function to prevent scrolling
  const disableScroll = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh"; // Ensure full viewport lock
    document.body.style.position = "fixed"; // Prevent content from shifting
    window.addEventListener("touchmove", preventDefault, { passive: false }); // Block touch gestures
  };

  // Function to enable scrolling
  const enableScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
    document.body.style.position = "";
    window.removeEventListener("touchmove", preventDefault);
  };

  // Prevent default scroll behavior
  const preventDefault = (e) => e.preventDefault();

  useEffect(() => {
    if (isNavShown) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => enableScroll(); // Cleanup on unmount
  }, [isNavShown]);

  return (
    <div className={cx(["component", className])} style={{ display: display }}>
      <FullPageNavHeader
        display={display}
        setDisplay={setDisplay}
        setIsNavShown={setIsNavShown}
        isNavShown={isNavShown}
      />
      {menus ? (
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
      ) : (
        <div className={cx("menu-container")}>
          <LoadingIcons.Grid />
        </div>
      )}
      <FullPageNavFooter />
    </div>
  );
}
