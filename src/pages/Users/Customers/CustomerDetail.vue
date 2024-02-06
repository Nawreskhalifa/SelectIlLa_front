<template>
  <div class="row">
    <div class="col-lg-5 col-xl-4">
      <CustomersInformation :customerId="idCustomer" />
    </div>
    <div class="col-lg-7 col-xl-8">
      <div class="leads-details-tabs">
        <ul class="nav nav-tabs border-0 mb-25" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="deals-tab" data-bs-toggle="tab" data-bs-target="#creditCards-tab-pane" type="button" role="tab"
              aria-controls="creditCards-tab-pane" aria-selected="false">
              Credit Cards
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="emails-tab" data-bs-toggle="tab" data-bs-target="#reservations-tab-pane" type="button" role="tab"
              aria-controls="reservations-tab-pane" aria-selected="false">
              Reservations
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="attachments-tab" data-bs-toggle="tab" data-bs-target="#attachments-tab-pane" type="button" role="tab"
              aria-controls="attachments-tab-pane" aria-selected="false">
              Attachments
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade" id="creditCards-tab-pane" role="tabpanel" tabindex="0">
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
              <div
                class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <h5 class="card-title fw-bold mb-0">Credit Cards</h5>
                <div class="d-flex align-items-center mt-10 mt-md-0"></div>
              </div>
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <div class="table-responsive">
                  <table class="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                          HOLDER NAME
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          NUMBER
                        </th>

                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          cvv
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          eXPIRY DATE
                        </th>
                        <th scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(card, index) in customer?.creditCards" :key="index">
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          {{ card.holderName }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          {{ card.number }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          {{ card.cvv }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          {{ card.expiryDate }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-md-flex mt-15 mt-md-25 mb-0 justify-content-between align-items-center">
                  <!-- <a
                  href="#"
                  class="card-link-btn text-decoration-none text-primary fw-medium position-relative d-inline-block"
                  data-bs-toggle="modal"
                  data-bs-target="#createNewDealModal"
                  >Add A New Deal</a
                > -->
                  <div class="pagination-area d-md-flex align-items-center mt-10 mt-md-0">
                    <p class="mb-0 text-paragraph">
                      Showing
                      <span class="fw-bold">{{
                        Math.min(11, customer?.creditCards?.length)
                      }}</span>
                      out of
                      <span class="fw-bold">{{
                        customer?.creditCards?.length
                      }}</span>
                      results
                    </p>
                    <nav class="mt-12 mt-md-0 ms-md-20">
                      <ul class="pagination mb-0">
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Previous">
                            <i class="flaticon-chevron-1"></i>
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link active" href="#">1</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Next">
                            <i class="flaticon-chevron"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="reservations-tab-pane" role="tabpanel" tabindex="0">
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
              <div
                class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <h5 class="card-title fw-bold mb-0">Reservations</h5>
                <div class="d-flex align-items-center mt-10 mt-md-0">
                  <form class="search-box position-relative me-15">
                    <input type="text" class="form-control shadow-none text-black rounded-0 border-0"
                      placeholder="Search email" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                      <i class="flaticon-search-interface-symbol"></i>
                    </button>
                  </form>
                  <button
                    class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block mt-10 mt-sm-0"
                    type="button">
                    <i class="flaticon-dots"></i>
                  </button>
                </div>
              </div>
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <div class="table-responsive">
                  <table class="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                          Product
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          Start
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          End
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          Pickup location
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          Drop off location
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          seats
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          bottles
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          Total Amount
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          Status
                        </th>
                        <th scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th class="shadow-none lh-1 fw-medium text-black-emphasis title fs-md-15 fs-lg-16 ps-0">
                          Design a Facebook Ad
                          <span class="d-block fs-13 mt-10 text-muted fw-normal">ronanjohnny@gmail.com</span>
                        </th>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          J. Ronan
                        </td>
                        <td class="shadow-none lh-1 fw-medium">
                          <span class="badge text-outline-warning">Bounce</span>
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                          13 Apr, 2023
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                            <button class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                              type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="flaticon-dots"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"><i
                                    class="flaticon-view lh-1 me-8 position-relative top-1"></i>
                                  View</a>
                              </li>
                              <li>
                                <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"><i
                                    class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                                  Edit</a>
                              </li>
                              <li>
                                <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"><i
                                    class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                                  Delete</a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="attachments-tab-pane" role="tabpanel" tabindex="0">
            <div class="card mb-25 border-0 rounded-0 bg-white attachments-box">
              <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
                <div class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between">
                  <h5 class="card-title fw-bold mb-0">Attachments</h5>
                </div>
                <ul class="list ps-0 mb-0 list-unstyled">
                  <li>
                    <span class="fw-medium d-block fs-md-15 fs-lg-16">
                      <i class="flaticon-image lh-1 position-relative text-primary top-2 me-5"></i>
                      Adlash_1.png
                    </span>
                    <div class="d-flex align-items-center text-muted mt-5">
                      <span class="d-block">555kb</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">J. Ronan</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">13 Apr, 2023</span>
                    </div>
                    <img src="../../../assets/images/admin.jpg" alt="admin" width="100" class="mt-10" />
                  </li>
                  <li>
                    <span class="fw-medium d-block fs-md-15 fs-lg-16">
                      <i class="flaticon-image lh-1 position-relative text-primary top-2 me-5"></i>
                      Adlash_2.png
                    </span>
                    <div class="d-flex align-items-center text-muted mt-5">
                      <span class="d-block">1MB</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">J. Pinkman</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">12 Apr, 2023</span>
                    </div>
                  </li>
                  <li>
                    <span class="fw-medium d-block fs-md-15 fs-lg-16">
                      <i class="flaticon-image lh-1 position-relative text-primary top-2 me-5"></i>
                      Adlash_3.png
                    </span>
                    <div class="d-flex align-items-center text-muted mt-5">
                      <span class="d-block">472kb</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">A. Carter</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">11 Apr, 2023</span>
                    </div>
                  </li>
                  <li>
                    <span class="fw-medium d-block fs-md-15 fs-lg-16">
                      <i class="flaticon-document lh-1 position-relative text-primary top-2 me-5"></i>
                      Adlash_4.txt
                    </span>
                    <div class="d-flex align-items-center text-muted mt-5">
                      <span class="d-block">433kb</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">V. Loper</span>
                      <span class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"></span>
                      <span class="d-block">10 Apr, 2023</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomersInformation from "./CustomerInformation.vue";
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomerDetail",
  components: { CustomersInformation },
  props: {
    // Define the 'customer id' prop
    customerId: {
      required: true,
    },
  },
  data() {
    return {
      idCustomer: this.customerId,
      customer: {},
    };
  },
  methods: {
    ...mapActions(["fetchAllCustomers"]),
  },
  computed: {
    ...mapGetters(["getCustomers"]),
  },
  async mounted() {
    if (!this.getCustomers || !this.getCustomers.length) {
      await this.fetchAllCustomers();
    }
    if (this.getCustomers && this.getCustomers.length) {
      this.customer =
        this.getCustomers.filter((item) => item.id == this.customerId) &&
          this.getCustomers.filter((item) => item.id == this.customerId).length
          ? this.getCustomers.filter((item) => item.id == this.customerId)[0]
          : this.getCustomers.filter((item) => item.id == this.customerId);
    }
  },
});
</script>
