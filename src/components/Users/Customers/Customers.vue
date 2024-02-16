<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-flex align-items-center">
        <form
          class="search-box position-relative"
          @submit.prevent="handleSearch"
        >
          <input
            type="text"
            class="form-control shadow-none rounded-0 border-0 pr-40"
            placeholder="Search here"
            style="width: calc(100% - 40px)"
            v-model="searchText"
            @input="handleSearch"
          />
          <button
            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 fs-md-15 fs-lg-16 bg-primary"
            type="submit"
            style="
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            "
            :disabled="getUsersLoading"
          >
            Search

            <i
              v-if="!getUsersLoading"
              class="flaticon-search-interface-symbol position-relative ms-5 top-1"
            ></i>
            <div
              v-if="getUsersLoading"
              class="spinner-border"
              role="status"
            ></div>
          </button>
        </form>
      </div>
      <select
        v-model="genderFilter"
        @change="handleFilterChange"
        class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
      >
        <option value="All">All</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <div
        class="rounded-1 d-flex me-1 mt-1 mt-lg-0"
        style="display: flex; align-items: center; gap: 1px"
      >
        <label class="text-muted fs-md-1" for="start-date">From</label>
        <input
          id="start-date"
          type="date"
          class="form-control datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-1 mt-sm-0 ms-sm-1"
          placeholder="Start Date"
          v-model="startDate"
          :max="getCurrentDate()"
          @change="handleFilterChange"
        />

        <label class="text-muted fs-md-6" for="end-date">To </label>
        <input
          id="end-date"
          type="date"
          class="form-control datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-1 mt-sm-0 ms-sm-1"
          placeholder="End Date"
          v-model="endDate"
          :max="getCurrentDate()"
          @change="handleFilterChange"
        />
      </div>
      <button
        v-if="isFilterActive"
        class="default-outline-btn transition border fw-medium text-black pt-2 pb-4 ps-1 pe-4 pt-md-6 pb-md-3 ps-md-1 pe-md-1 rounded-1 fs-md-5 fs-lg-5 bg-transparent"
        type="button"
        @click="resetFilters"
      >
        Reset
        <i
          class="flaticon-refresh position-relative ms-5 top-2 fs-15"
          style="margin-left: 3px"
        ></i>
      </button>
      <div class="d-sm-flex align-items-center">
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-1 pb-1 ps-2 pe-2 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 bg-transparent fs-md-1 fs-lg-1 d-inline-block mb-1 mb-lg-1"
          type="button"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
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
              :class="{ disabled: selectedCount === 0 }"
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="selectedCount !== 0 && deleteSelectedCustomers()"
            >
              <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
              Delete Selected
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <h6 v-if="selectedCount > 0">
        {{ selectedCount }}
        {{ selectedCount === 1 ? "item" : "items" }} selected
      </h6>
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
                      @change="updateSelectionCounter($event, index)"
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
      v-model:active="getUsersLoading"
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
      startDate: "",
      endDate: "",
      sortDirection: "asc",
      sortDirectionLoc: "asc",
      selectedCount: 0,
    };
  },
  methods: {
    ...mapActions(["fetchAllCustomers", "deleteCustomer"]),

    resetFilters() {
      // Réinitialiser les valeurs des filtres à leurs valeurs par défaut
      this.searchText = "";
      this.genderFilter = "All";
      this.startDate = "";
      this.endDate = "";
      // Appeler la méthode handleFilterChange pour mettre à jour la liste des clients
      this.handleFilterChange();
    },
    updateSelectionCounter(event, index) {
      if (event.target.checked) {
        // Si la case à cocher est cochée, incrémenter le compteur de sélection
        this.selectedCount++;
      } else {
        // Sinon, décrémenter le compteur de sélection
        this.selectedCount--;
      }
    },
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      if (month < 10) {
        month = "0" + month; // Ajoute un zéro devant si le mois est inférieur à 10
      }
      let day = currentDate.getDate();
      if (day < 10) {
        day = "0" + day; // Ajoute un zéro devant si le jour est inférieur à 10
      }
      return `${year}-${month}-${day}`;
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async handleFilterChange() {
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllCustomers({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
    async toggleSortDirection() {
      // Basculer entre ascendant et descendant
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllCustomers({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
        sortDirectionUserName: this.sortDirection,
      });
    },
    async toggleSortDirectionLoc() {
      // Basculer entre ascendant et descendant
      this.sortDirectionLoc = this.sortDirectionLoc === "asc" ? "desc" : "asc";
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllCustomers({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
        sortDirectionLocation: this.sortDirectionLoc,
      });
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
      this.selectedCount = 0;
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.selectAllChecked;
        if (checkbox.checked) {
          this.selectedCount++;
        } else {
          this.selectedCount--;
        }
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
    isFilterActive() {
      return (
        this.searchText !== "" ||
        this.genderFilter !== "All" ||
        this.startDate !== "" ||
        this.endDate !== ""
      );
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
