import { useRouter } from "next/router";
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
  const router = useRouter();
  const isFrontPage = router.pathname === "/";

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isNavShown]);

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
          <LoadingIcons.Grid />
        </div>
      )}
      <FullPageNavFooter />
    </div>
  );
}
