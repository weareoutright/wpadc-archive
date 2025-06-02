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
}) => {
  const filterDropdownRef = useRef(null);
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState({}); // Track sub-dropdowns per parent

  // Toggle Parent Dropdown
  const toggleDropdown = () => setMainDropdownOpen((prev) => !prev);

  // Toggle Child Dropdowns (each parent has its own state)
  // const toggleSubDropdown = (parentTitle) => {
  //   setSubDropdownOpen((prev) => ({
  //     ...prev,
  //     [parentTitle]: !prev[parentTitle],
  //   }));
  // };

  // Handle Parent Checkbox Selection
  const handleParentChange = (event) => {
    const { value, checked } = event.target;

    setSelectedItems((prev) => {
      const updatedSelection = { ...prev };

      if (checked) {
        updatedSelection[value] = []; // Add parent with an empty child array
      } else {
        delete updatedSelection[value]; // Remove parent if unchecked
      }

      return updatedSelection;
    });
  };

  // Handle Child Checkbox Selection
  const handleChildChange = (event, parentTitle) => {
    const { value, checked } = event.target;

    setSelectedItems((prev) => {
      const updatedSelection = { ...prev };

      if (checked) {
        updatedSelection[parentTitle] = [
          ...(updatedSelection[parentTitle] || []),
          value,
        ]; // Add child item under its parent
      } else {
        updatedSelection[parentTitle] = updatedSelection[parentTitle].filter(
          (item) => item !== value
        ); // Remove child item if unchecked
      }

      return updatedSelection;
    });
  };

  const filterCounts = dropdownItems.reduce((acc, item) => {
    const key = item;

    if (key == null) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    if (!selectedItems) return;

    if (Object.keys(selectedItems).length <= 0 && activeItems?.length <= 0) {
      setMainDropdownOpen(false);
    }
  }, [selectedItems, activeItems]);

  useEffect(() => {
    console.log(dropdownItems);
  }, [dropdownItems]);

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
            <span className={cx("filter-text")}>{filterText}</span>

            {!mainDropdownOpen ? (
              <Image
                src={DOWN_CHEVRON}
                alt=""
                width={15}
                height={15}
                className={cx("chevron-down")}
              />
            ) : (
              <Image
                src={DOWN_CHEVRON}
                alt=""
                width={15}
                height={15}
                className={cx("chevron-down")}
                style={{ transform: "rotate(-180deg)" }}
              />
            )}
          </div>

          {/* Parent Dropdown Options (Checkboxes) */}
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
                .map((parent, index) => {
                  return (
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
                          {parent} ({filterCounts[parent]})
                        </span>
                        {parent?.childrenItems?.length > 0 ? (
                          <Image
                            src={PLUS_ICON}
                            alt=""
                            height={15}
                            width={15}
                            className={cx("plus-icon")}
                          />
                        ) : null}
                      </label>

                      {/* Sub Dropdown (Child Options) */}
                      {selectedItems.hasOwnProperty(parent) && (
                        <>
                          {/* <button
                        className={cx("toggle-child-btn")}
                        onClick={() => toggleSubDropdown(parent.title)}
                      /> */}

                          {subDropdownOpen[parent.title] &&
                            parent.childrenItems && (
                              <div
                                className={cx(["child", "dropdown-options"])}
                              >
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
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
