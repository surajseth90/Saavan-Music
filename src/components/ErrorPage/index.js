import { Link } from "react-router-dom";
import "./style.scss";

export default function ErrorPage() {
  return (
    <div className="full-page">
      <div id="error-overlay" class="container">
        <div class="error-popup">
          <div class="animated-icon">
            <div class="animated-eyes">
              <div class="icon eye1"></div>
              <div class="icon eye2"></div>
            </div>
          </div>
          <p class="error-message noselect">Something went wrong</p>
          <Link class="reload-button mt-5" title="retry" to={"/"}/>
        </div>
      </div>
    </div>
  );
}
