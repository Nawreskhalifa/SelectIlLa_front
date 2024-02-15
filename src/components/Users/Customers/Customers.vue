<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <form
          class="search-box position-relative"
          @submit.prevent="handleSearch"
        >
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search customer"
            v-model="searchText"
          />
          <button
            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
            type="submit"
            :disabled="getUsersLoading"
          >
            <i
              v-if="!getUsersLoading"
              class="flaticon-search-interface-symbol"
            ></i>
            <div
              v-if="getUsersLoading"
              class="spinner-border"
              role="status"
            ></div>
          </button>
        </form>
        <select
          v-model="genderFilter"
          @change="handleFilterChange"
          class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
        >
          <option value="All">All</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <!-- Ajoutez cette section pour le filtre d'intervalle d'années -->
        <div class="d-flex align-items-center">
          <select
            v-model="startYear"
            @change="handleFilterChange"
            class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          >
            <option value="" selected>From</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <span class="mx-2">-</span>
          <select
            v-model="endYear"
            @change="handleFilterChange"
            class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          >
            <option value="" selected>To</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="dropdown mt-10 mt-sm-0 ms-sm-10">
          <button
            class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
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
                @click="selectAllCustomers"
              >
                <i class="fas fa-check lh-1 me-8 position-relative top-1"></i>
                {{ selectAllChecked ? "Deselect All" : "Select All" }}
              </a>
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="javascript:void(0);"
                @click="deleteSelectedCustomers"
              >
                <i
                  class="flaticon-delete lh-1 me-8 position-relative top-1"
                ></i>
                Delete Selected
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                @click="toggleSortDirection"
              >
                USER NAME
                <span v-if="sortDirection === 'asc'" class="arrow-up"></span>
                <span v-if="sortDirection === 'desc'" class="arrow-down"></span>
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                EMAIL
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                PHONE
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                @click="toggleSortDirectionLoc"
              >
                LOCATIONS
                <span v-if="sortDirectionLoc === 'asc'" class="arrow-up"></span>
                <span
                  v-if="sortDirectionLoc === 'desc'"
                  class="arrow-down"
                ></span>
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                GENDER
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                DATE OF BIRTH
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in getCustomers" :key="index">
              <th
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
              >
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                    />
                  </div>
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="storageUrl && customer.user.photo"
                      :src="storageUrl + customer.user.photo.url"
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    {{ formattedName(customer) }}
                  </div>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ customer.user.email }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ customer.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ customer.address }}
              </td>

              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ customer.user.gender }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ customer.user.dateOfBirth }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
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
                        @click="navigateToCustomerDetailPage(customer.id)"
                      >
                        <i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        View
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="deleteTheCustomer(customer.id)"
                      >
                        <i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                        ></i>
                        Delete
                      </a>
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
          Showing
          <span class="fw-bold">{{ Math.min(11, getCustomers.length) }}</span>
          out of <span class="fw-bold">{{ getCustomers.length }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click="currentPage !== 1 && onPageChange(currentPage - 1)"
              >
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in getTotalPages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click="onPageChange(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === getTotalPages }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="
                  currentPage !== getTotalPages && onPageChange(currentPage + 1)
                "
              >
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <loading
      v-model:active="getEventLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { storageUrl } from "@/utils/constants";
import swal from "sweetalert";
export default defineComponent({
  name: "CustomersList",
  components: {
    Loading,
  },
  data() {
    return {
      storageUrl: "",
      currentPage: 1,
      searchText: "",
      selectAllChecked: false,
      genderFilter: "All",
      startYear: "",
      endYear: "",
      sortDirection: "asc",
      sortDirectionLoc: "asc",
    };
  },
  methods: {
    ...mapActions(["fetchAllCustomers", "deleteCustomer"]),
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async handleFilterChange() {
      console.log(this.startYear, this.endYear);
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllCustomers({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        gender: this.genderFilter,
        startYear: this.startYear,
        endYear: this.endYear,
        sortDirectionUserName: this.sortDirection,
        sortDirectionLocation: this.sortDirectionLoc,
      });
    },
    toggleSortDirection() {
      // Basculer entre ascendant et descendant
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      // Appeler handleFilterChange pour appliquer le nouveau tri
      this.handleFilterChange();
    },
    toggleSortDirectionLoc() {
      // Basculer entre ascendant et descendant
      this.sortDirectionLoc = this.sortDirectionLoc === "asc" ? "desc" : "asc";
      // Appeler handleFilterChange pour appliquer le nouveau tri
      this.handleFilterChange();
    },
    deleteSelectedCustomers() {
      const selectedCustomers = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedCustomers.push(this.getCustomers[index].id);
        }
      });

      if (selectedCustomers.length === 0) {
        swal("Please select at least one customer to delete.");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these customers!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteCustomer action or API endpoint to delete the selected customers
          await Promise.all(
            selectedCustomers.map((id) => this.deleteCustomer(id))
          );
          // After deletion, fetch customers again to update the list
          await this.fetchAllCustomers({ page: this.currentPage, perPage: 4 });
          swal("Selected customers have been deleted!", {
            icon: "success",
          });
        } else {
          swal("Selected customers are safe!");
        }
      });
    },
    selectAllCustomers() {
      this.selectAllChecked = !this.selectAllChecked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.selectAllChecked;
      });
    },
    async handleSearch() {
      console.log(this.searchText);
      await this.fetchAllCustomers({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
      });
    },
    async onPageChange(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchAllCustomers({
        page: pageNumber,
        perPage: 4,
        name: null,
      });
    },
    navigateToCustomerDetailPage(customerId) {
      // Utilisez le routeur de Vue pour naviguer vers la page détaillée du client
      this.$router.push({
        name: "CustomerDetailPage",
        params: { customerId: customerId },
      });
    },
    formattedName(customer) {
      // Ensure that customer.name and customer.surname are defined
      const name = customer.name
        ? customer.name.charAt(0).toUpperCase() + "."
        : "";
      const surname = customer.surname || "";
      return name + " " + surname;
    },
    async deleteTheCustomer(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this customer!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteCustomer action or API endpoint to delete the customer
          await this.deleteCustomer(id);
        } else {
          swal("Customer is safe!");
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      "getUsersLoading",
      "getUsersError",
      "getCustomers",
      "getTotalPages",
      "getTotalItems",
    ]),
    availableYears() {
      const currentYear = new Date().getFullYear();
      const start = currentYear - 80;
      const end = currentYear - 18; // Moins 18 ans
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  async mounted() {
    await this.fetchAllCustomers({ page: 1, perPage: 4 });
    console.log(this.getCustomers);
    this.storageUrl = storageUrl;
  },
});
</script>
<style scoped>
.arrow-up::before {
  content: "\25B2"; /* Code Unicode pour la flèche vers le haut */
}

.arrow-down::before {
  content: "\25BC"; /* Code Unicode pour la flèche vers le bas */
}
</style>
