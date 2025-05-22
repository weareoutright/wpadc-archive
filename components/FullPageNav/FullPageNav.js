import { useRouter } from "next/router";
import styles from "./FullPageNav.module.scss";
import className from "classnames/bind";
import { useHeaderMenu } from "../../constants/customQueryHooks";
import { FullPageNavHeader } from "../FullPageNavHeader";
import { FullPageNavFooter } from "../FullPageNavFooter";
import { useState, useEffect } from "react";
import ARROW_LEFT from "../../assets/full-page-nav/arrow-left.svg";
import Image from "next/image";

let cx = className.bind(styles);

const DEFAULT_MENU_ITEMS = [
  {
    id: "home-default",
    label: "HOME",
    path: "/",
  },
  {
    id: "about-default",
    label: "ABOUT",
    path: "/about",
  },
  {
    id: "people-default",
    label: "PEOPLE",
    path: "/people",
  },
  {
    id: "getinvolved-default",
    label: "GET INVOLVED",
    path: "/",
  },
];

export default function FullPageNav({
  children,
  className,
  setIsNavShown,
  isNavShown,
}) {
  const router = useRouter();
  const isFrontPage = router.pathname === "/";

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const [isLeaving, setIsLeaving] = useState(false);

  // Handle closing with animation
  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsNavShown(false);
    }, 500); // Match this to the CSS transition duration
  };

  useEffect(() => {}, isFrontPage);

  return (
    <div
      className={cx(
        "component",
        className,
        isFrontPage ? "front-page" : "not-front-page",
        {
          leaving: isLeaving,
        }
      )}
    >
      <FullPageNavHeader
        setIsNavShown={handleClose}
        isNavShown={isNavShown}
        isFrontPage={isFrontPage}
      />
      {menus ? (
        <div className={cx("menu-container")}>
          {menus?.map((menu) => (
            <a className={cx("menu-item")} key={menu.id} href={menu.path}>
              {menu.label}
              {menu.label === "Get Involved" && (
                <Image src={ARROW_LEFT} alt="" />
              )}
            </a>
          ))}
        </div>
      ) : (
        <div className={cx("menu-container")}>
          {DEFAULT_MENU_ITEMS.map((menu) => (
            <a className={cx("menu-item")} key={menu.id} href={menu.path}>
              {menu.label}
              {menu.label === "Get Involved" && (
                <Image src={ARROW_LEFT} alt="" />
              )}
            </a>
          ))}
        </div>
      )}
      <FullPageNavFooter />
    </div>
  );
}
