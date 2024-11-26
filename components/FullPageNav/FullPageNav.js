import styles from "./FullPageNav.module.scss";
import className from "classnames/bind";
import { useHeaderMenu } from "../../constants/customQueryHooks";
import { FullPageNavHeader } from "../FullPageNavHeader";
import { FullPageNavFooter } from "../FullPageNavFooter";
import { useState } from "react";

let cx = className.bind(styles);

export default function FullPageNav({ children, className }) {
  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const [display, setDisplay] = useState("block");

  return (
    <div className={cx(["component", className])} style={{ display: display }}>
      <FullPageNavHeader display={display} setDisplay={setDisplay} />
      <div className={cx("menu-container")}>
        {menus.map((menu) => (
          <a className={cx("menu-item")} key={menu.id} href={menu.path}>
            {menu.label}
          </a>
        ))}
      </div>
      <FullPageNavFooter />
    </div>
  );
}
