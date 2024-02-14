import React from "react";
import { CurrencyRupeeIcon, DevicesIcon, MoreVertIcon, PersonIcon, TrendingUpIcon } from "../../../Icons/Icons";


const Content = [
  {
    title: "Sales",
    ammount: "245k",
    icon: <TrendingUpIcon style={{ color: "white" }} />,
    iconBg: "primary",
  },
  {
    title: "Users",
    ammount: "12.5k",
    icon: <PersonIcon style={{ color: "white" }} />,
    iconBg: "success",
  },
  {
    title: "Product",
    ammount: "1.54k",
    icon: <DevicesIcon style={{ color: "white" }} />,
    iconBg: "warning",
  },
  {
    title: "Revenue",
    ammount: "$88k",
    icon: <CurrencyRupeeIcon style={{ color: "white" }} />,
    iconBg: "info",
  },
];

function Transictions() {
  return (
    <div class="col-lg-8 mb-1">
      <div class="card">
        <div class="card-header">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title m-0 me-2">Transactions</h4>
            <div class="dropdown">
              <button
                class="btn p-0"
                type="button"
                id="transactionID"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <MoreVertIcon />
              </button>
              <div
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="transactionID"
              >
                <a
                  class="dropdown-item waves-effect"
                  href="javascript:void(0);"
                >
                  Refresh
                </a>
                <a
                  class="dropdown-item waves-effect"
                  href="javascript:void(0);"
                >
                  Share
                </a>
                <a
                  class="dropdown-item waves-effect"
                  href="javascript:void(0);"
                >
                  Update
                </a>
              </div>
            </div>
          </div>
          <p class="m-4">
            <span class="fw-medium">Total 48.5% growth</span> 😎 this month
          </p>
        </div>
        <div class="card-body">
          <div class="row g-3">
            {Content.map((data) => (
              <div class="col-md-3 col-6">
                <div class="d-flex align-items-center">
                  <div class="avatar">
                    <div class={`bg-${data.iconBg} rounded shadow p-2`}>
                      {data.icon}
                    </div>
                  </div>
                  <div class="ms-3">
                    <div class="small mb-1">{data.title}</div>
                    <h5 class="mb-0">{data.ammount}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transictions;
