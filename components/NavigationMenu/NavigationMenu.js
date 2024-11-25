import classNames from "classnames/bind";
import { gql } from "@apollo/client";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import stylesFromWP from "./NavigationMenuClassesFromWP.module.scss";
import { flatListToHierarchical } from "@faustwp/core";
import Image from "next/image";
import MENU_TOGGLE_BTN from "../../assets/header/block-menu.svg";

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

export default function NavigationMenu({ menuItems, className }) {
  if (!menuItems) {
    return null;
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  const openFullMenu = (e) => {
    e.preventDefault();
    console.log("open full page nav");
  };

  function renderMenu(items) {
    return (
      <ul className={cx("menu")}>
        <a href="#" alt="Open Menu" onClick={(e) => openFullMenu(e)}>
          <Image src={MENU_TOGGLE_BTN} alt="Open Menu" />
        </a>
        {/* {items.map((item) => {
          const { id, path, label, children, cssClasses } = item;

          // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
          if (!item.hasOwnProperty("__typename")) {
            return null;
          }

          return (
            <li key={id} className={cxFromWp(cssClasses)}>
              <Link href={path ?? ""}>{label ?? ""}</Link>
              {children.length ? renderMenu(children) : null}
            </li>
          );
        })} */}
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
