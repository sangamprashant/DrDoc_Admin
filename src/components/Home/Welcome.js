import React from "react";

function Welcome() {
  return (
    <div className="col-md-12 col-lg-4 mb-1">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-1">Congratulations Prashant! 🎉</h4>
          <p class="pb-0">Best seller of the month</p>
          <h4 class="text-primary mb-1">$42.8k</h4>
          <p class="mb-3 pb-1">78% of target 🚀</p>
          <a
            href="javascript:;"
            class="btn btn-sm btn-primary waves-effect waves-light"
          >
            View Sales
          </a>
        </div>
        <img
          src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/illustrations/trophy.png"
          class="scaleX-n1-rtl position-absolute bottom-0 end-0 me-4 mb-4 pb-2"
          width=""
          height="100"
          alt="view sales"
        />
      </div>
    </div>
  );
}

export default Welcome;
