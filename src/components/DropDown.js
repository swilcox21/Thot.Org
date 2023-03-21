import * as React from "react";
import { store } from "..";

export default function DropDown(props) {
  const dispatch = store.dispatch;
  const { direction, dropIcon, dropList, dropStyle } = props;

  return (
    <div>
      <div className={`dropdown ${direction && direction}`}>
        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {dropIcon}
        </div>
        <div
          className="dropdown-menu"
          style={dropStyle ? dropStyle : { minWidth: "50px", padding: 0 }}
          aria-labelledby="dropdownMenuButton"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            href="#"
          >
            {dropList.map((item, index) => (
              <div
                className="dropdown-item"
                onClick={item.action}
                href="#"
                style={
                  index + 1 === dropList.length
                    ? { padding: 10 }
                    : {
                        padding: 10,
                        borderBottom: "1px dotted gray",
                      }
                }
              >
                {item.icon ? item.icon : item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
