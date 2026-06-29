import "./Workspace.css";

import OverviewCards from "./OverviewCards";
import Checklist from "./Checklist";
import Comments from "./Comments";

export default function Workspace() {
  return (
    <div className="workspace">

      <OverviewCards />

      <div className="workspace-grid">

        <Checklist />

        <Comments />

      </div>

    </div>
  );
}