import classNames from "classnames/bind";
import { gql } from "@apollo/client";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import stylesFromWP from "./NavigationMenuClassesFromWP.module.scss";
import { flatListToHierarchical } from "@faustwp/core";
import Image from "next/image";
import MENU_TOGGLE_BTN from "../../assets/header/block-menu.svg";
import CLOSE_MENU from "../../assets/full-page-nav/close-full-page-nav.svg";

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

export default function NavigationMenu({
  menuItems,
  className,
  isNavShown,
  setIsNavShown,
}) {
  if (!menuItems) {
    return null;
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function renderMenu(items) {
    return (
      <ul className={cx("menu")}>
        <Image
          src={MENU_TOGGLE_BTN}
          alt="Open Menu"
          onClick={(e) => {
            e.preventDefault();
            setIsNavShown(!isNavShown);
          }}
        />
      </ul>
    );
  }

  return (
    <nav
      className={cx(["component", className])}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name} menu`}
    >
      {renderMenu(hierarchicalMenuItems)}
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
