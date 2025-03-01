import styles from "./FullWidthHeader.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function FullWidthHeader({className, title}) {
    return (
        <div className={cx(["color-title", className])}>
            <h1>{title}</h1>
        </div>
    );
}