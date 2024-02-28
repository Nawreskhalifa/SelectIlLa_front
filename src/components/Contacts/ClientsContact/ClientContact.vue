<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <form class="search-box position-relative">
        <input
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search order"
        />
        <button
          type="submit"
          class="bg-transparent text-primary transition p-0 border-0"
        >
          <i class="flaticon-search-interface-symbol"></i>
        </button>
      </form>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Contact Name
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Contact Last Name
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Contact Message
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Contact Email
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date
              </th>

              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact">
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ contact.attributes.name }}
              </td>

              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ contact.attributes.last_name }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span class="badge text-outline-success">
                  {{ contact.attributes.email }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span class="badge text-outline-success"
                  ><i class="fas fa-message"></i
                ></span>
              </td>

              <td class="shadow-none lh-1 fw-medium">
                <span
                  class="badge text-outline-success"
                  v-date="contact.attributes.createdAt"
                ></span>
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-paragraph text-end pe-0"
              >
                <div class="dropdown">
                  <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="flaticon-dots"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        ><i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        View</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        ><i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                        ></i>
                        Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">10</span> out of
          <span class="fw-bold">134</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
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
</template>

<script>
import { deleteContact, fetchContacts } from "@/services/apiService.ts";
export default {
  name: "ClientContacts",
  data() {
    return {
      contacts: [],
    };
  },
  methods: {
    async fetchCon() {
      const res = await fetchContacts();
      console.log(res);
      this.contacts = res.data;
    },
  },
  directives: {
    date: {
      mounted(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
      updated(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
    },
  },
  mounted() {
    this.fetchCon();
  },
};
</script>
