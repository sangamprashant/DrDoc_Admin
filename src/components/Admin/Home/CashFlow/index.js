import React from "react";
import { CashData } from "./data";


function CashFlow() {
  return (
    <div class="col-xl-12">
      <div class="card h-100">
        <div class="card-body row g-2">
          <div class="col-12 col-md-6 card-separator pe-0 pe-md-3">
            <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
              <h5 class="m-0 me-2">Deposit</h5>
              <a class="fw-medium btn btn-primary" href="javascript:void(0);">
                View all
              </a>
            </div>
            <div class="pt-2">
              <ul class="p-0 m-0">
                {CashData.map((data) => (
                  <li class="d-flex mb-4 align-items-center pb-2">
                    <div class="flex-shrink-0 me-3">
                      <img
                        src={data.image}
                        class="img-fluid"
                        alt="stripes"
                        height="30"
                        width="30"
                      />
                    </div>
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        <h6 class="mb-0">{data.title}</h6>
                        <small>{data.subTitle}</small>
                      </div>
                      <h6 class="text-success mb-0">+{data.ammount}</h6>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-12 col-md-6 ps-0 ps-md-3 mt-3 mt-md-2">
            <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
              <h5 class="m-0 me-2">Withdraw</h5>
              <a class="fw-medium btn btn-primary" href="javascript:void(0);">
                View all
              </a>
            </div>
            <div class="pt-2">
              <ul class="p-0 m-0">
                {CashData.map((data) => (
                  <li class="d-flex mb-4 align-items-center pb-2">
                    <div class="flex-shrink-0 me-3">
                      <img
                        src={data.image}
                        class="img-fluid"
                        alt="stripes"
                        height="30"
                        width="30"
                      />
                    </div>
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div class="me-2">
                        <h6 class="mb-0">{data.title}</h6>
                        <small>{data.subTitle}</small>
                      </div>
                      <h6 class="text-danger mb-0">-{data.ammount}</h6>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashFlow;
