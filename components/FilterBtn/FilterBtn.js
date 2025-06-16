import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FilterBtn.module.scss";
import DOWN_CHEVRON from "../../assets/icons/down-chevron.svg";
import PLUS_ICON from "../../assets/icons/plus-icon.svg";
import Image from "next/image";

const cx = classNames.bind(styles);

const FilterBtn = ({
  filterText,
  dropdownItems,
  selectedItems = {},
  setSelectedItems,
  activeItems,
  setActiveItems,
  filterCountArr,
}) => {
  const filterDropdownRef = useRef(null);
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState({});

  const toggleDropdown = () => setMainDropdownOpen((prev) => !prev);

  const handleParentChange = (event) => {
    const { value, checked } = event.target;
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[value] = [];
      } else {
        delete updated[value];
      }
      return updated;
    });
  };

  const handleChildChange = (event, parentTitle) => {
    const { value, checked } = event.target;
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[parentTitle] = [...(updated[parentTitle] || []), value];
      } else {
        updated[parentTitle] = updated[parentTitle].filter(
          (item) => item !== value
        );
      }
      return updated;
    });
  };

  useEffect(() => {
    if (!selectedItems) return;
    if (Object.keys(selectedItems).length <= 0 && activeItems?.length <= 0) {
      setMainDropdownOpen(false);
    }
  }, [selectedItems, activeItems]);

  return (
    <div className={cx("FilterBtn")}>
      <div className={cx(["main-filter", "filter"])}>
        <div className={cx("custom-select-dropdown")} ref={filterDropdownRef}>
          {/* Fake Select Box */}
          <div
            className={cx(
              "select-box",
              dropdownItems.length <= 0 && "disabled"
            )}
            onClick={toggleDropdown}
          >
            <span className={cx("filter-text")}>
              {filterText}{" "}
              {!dropdownItems.length <= 0 && (
                <small>({dropdownItems.length})</small>
              )}
            </span>

            <Image
              src={DOWN_CHEVRON}
              alt=""
              width={15}
              height={15}
              className={cx("chevron-down")}
              style={{
                transform: mainDropdownOpen
                  ? "rotate(-180deg)"
                  : "rotate(0deg)",
              }}
            />
          </div>

          {/* Parent Dropdown Options */}
          {mainDropdownOpen && !dropdownItems.length <= 0 && (
            <div className={cx(["parent", "dropdown-options"])}>
              {[...new Set(dropdownItems)]
                .filter((item) => item != null)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString(), undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                })
                .map((parent, index) => (
                  <div key={`${String(parent).split().join("-")}-${index}`}>
                    <label className={cx("parent-label")}>
                      <span className={cx("parent-label-text")}>
                        <input
                          type="checkbox"
                          value={parent}
                          onChange={handleParentChange}
                          checked={selectedItems.hasOwnProperty(parent)}
                          className={cx("checkbox-input")}
                        />{" "}
                        {parent} ({filterCountArr[parent] || "-"})
                      </span>
                      {parent?.childrenItems?.length > 0 && (
                        <Image
                          src={PLUS_ICON}
                          alt=""
                          height={15}
                          width={15}
                          className={cx("plus-icon")}
                        />
                      )}
                    </label>

                    {/* Sub Dropdown (Child Options) */}
                    {selectedItems.hasOwnProperty(parent) && (
                      <>
                        {subDropdownOpen[parent.title] &&
                          parent.childrenItems && (
                            <div className={cx(["child", "dropdown-options"])}>
                              {parent.childrenItems.map((child, idx) => (
                                <label
                                  key={`${child.title}-${idx}`}
                                  className={cx("child-label")}
                                >
                                  <input
                                    type="checkbox"
                                    value={child.title}
                                    onChange={(e) =>
                                      handleChildChange(e, parent.title)
                                    }
                                    checked={selectedItems[
                                      parent.title
                                    ]?.includes(child.title)}
                                  />{" "}
                                  {child.title} ({child.count})
                                </label>
                              ))}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
