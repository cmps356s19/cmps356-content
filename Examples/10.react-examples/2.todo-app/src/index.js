import React from "react";
import {render} from "react-dom";
import TaskList from "./components/TaskList";

import "./index.css";

const rootElement = document.getElementById("root");
render(<TaskList />, rootElement);
