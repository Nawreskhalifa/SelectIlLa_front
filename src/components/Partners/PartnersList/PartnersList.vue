<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-flex align-items-center">
        <form @submit.prevent="handleSearch">
          <div class="input-group">
            <input
              type="text"
              class="form-control shadow-none fw-medium ps-1 pt-10 pe-0 letter-spacing"
              placeholder="Search"
              v-model="searchText"
              @input="handleSearch"
            />
            <button
              class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1"
              type="button"
              :disabled="getUsersLoading"
            >
              <i class="flaticon-search-interface-symbol position-relative"></i>
            </button>
          </div>
        </form>
      </div>
      <select
        v-model="genderFilter"
        @change="handleFilterChange"
        class="project-select frm shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
      >
        <option value="All">All Genders</option>
        <option value="Female">
          <i class="flaticon-gender">&#9792;</i> Female
        </option>
        <option value="Male">
          <i class="flaticon-gender">&#9794;</i> Male
        </option>
      </select>
      <select
        v-model="resourceFilter"
        @change="handleFilterChange"
        class="project-select frm shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
      >
        <option value="All" selected>All Resources</option>
        <option value="Vehicles">Vehicles</option>
        <option value="Events">Events</option>
        <option value="Villas">Villas</option>
      </select>
      <div
        class="rounded-1 d-flex me-1 mt-1 mt-lg-0"
        style="display: flex; align-items: center; gap: 1px"
      >
        <flat-pickr
          v-model="startDate"
          :config="{ maxDate: getCurrentDate() }"
          class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          placeholder="Start Event"
          name="startDate"
          @change="handleFilterChange"
        />

        <flat-pickr
          v-model="endDate"
          :config="{ minDate: startDate, maxDate: getCurrentDate() }"
          class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          placeholder="End Event"
          name="endDate"
          :disabled="!startDate"
          @change="handleFilterChange"
        />
      </div>
      <div class="d-sm-flex align-items-center mt-lg-10">
        <button
          v-if="isFilterActive"
          class="default-outline-btn position-relative transition border-0 fw-medium text-black pt-1 pb-1 ps-2 pe-2 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 bg-transparent fs-md-1 fs-lg-1 d-inline-block mb-1 mb-lg-1"
          type="button"
          @click="resetFilters"
        >
          <i class="flaticon-refresh position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
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
              @click="selectAllPartners"
            >
              <i class="fas fa-check lh-1 me-8 position-relative top-1"></i>
              {{ "Select All" }}
            </a>
          </li>
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="deSelectAllPartners"
            >
              <i class="fas fa-close lh-1 me-8 position-relative top-1"></i>
              {{ "Deselect All" }}
            </a>
          </li>
          <li>
            <a
              :class="{ disabled: selectedCount === 0 }"
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="deleteSelectedPartners"
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
      <h6 v-if="nbResults > 0">
        {{ nbResults }}
        {{ nbResults === 1 ? "item" : "items" }} found
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
            <tr
              v-for="(partner, index) in getPartners"
              :key="index"
              @click="navigateToPartnerDetailPage(partner.id, $event)"
              style="cursor: pointer"
            >
              <th
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
              >
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      :checked="isPartnerSelected(partner.id)"
                      @change="toggleSelection(partner)"
                    />
                  </div>
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        storageUrl &&
                        partner.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      :src="
                        storageUrl +
                        partner.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    {{ formattedName(partner.attributes) }}
                  </div>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ partner.attributes.user.data?.attributes.email }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ partner.attributes.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ truncateLocation(partner.attributes?.address) }}
              </td>

              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ partner.attributes.user.data?.attributes.gender }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                {{ partner.attributes.user.data?.attributes.date_of_birth }}
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
                        @click="navigateToEditPartnerPage(partner.id)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="deleteThePartner(partner.id)"
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
          <span class="fw-bold">{{ Math.min(11, getPartners?.length) }}</span>
          out of
          <span class="fw-bold">{{ getTotalItemsPartners }}</span> results
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
              v-for="page in getTotalPagesPartners"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click="onPageChange(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === getTotalPagesPartners }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="
                  currentPage !== getTotalPagesPartners &&
                    onPageChange(currentPage + 1)
                "
              >
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { storageUrl } from "@/utils/constants";
import swal from "sweetalert";
import flatPickr from "vue-flatpickr-component";

export default defineComponent({
  name: "partnersList",
  components: {
    Loading,
    flatPickr,
  },
  data() {
    return {
      storageUrl: "",
      currentPage: 1,
      searchText: "",
      selectAllChecked: false,
      resourceFilter: "All",
      genderFilter: "All",
      startDate: "",
      endDate: "",
      sortDirection: "asc",
      sortDirectionLoc: "asc",
      selectedCount: 0,
      isLoading: false,
      perPage: 4,
      nbResults: 0,
      selectedPartners: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchAllPartners",
      "deletePartner",
      "fetchAllPartnersWithoutPagination",
    ]),

    truncateLocation(location) {
      const maxLength = 40;
      if (location && location?.length <= maxLength) {
        return location;
      } else if (location) {
        return location?.slice(0, maxLength) + "...";
      } else return location;
    },
    async resetFilters() {
      // Réinitialiser les valeurs des filtres à leurs valeurs par défaut
      this.searchText = "";
      this.genderFilter = "All";
      this.startDate = "";
      this.endDate = "";
      this.resourceFilter = "All";
      // Appeler la méthode handleFilterChange pour mettre à jour la liste des clients
      await this.handleFilterChange();
      this.nbResults = 0;
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
      this.isLoading = true;

      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllPartners({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
        hasResource: this.resourceFilter.trim(),
      });
      this.nbResults = this.getPartners.length;
      this.isLoading = false;
    },
    async toggleSortDirection() {
      // Basculer entre ascendant et descendant
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;
      this.isLoading = true;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllPartners({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
        sortDirectionUserName: this.sortDirection,
      });
      this.isLoading = false;
    },
    async toggleSortDirectionLoc() {
      // Basculer entre ascendant et descendant
      this.sortDirectionLoc = this.sortDirectionLoc === "asc" ? "desc" : "asc";
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;
      this.isLoading = true;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllPartners({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
        sortDirectionLocation: this.sortDirectionLoc,
      });
      this.isLoading = false;
    },
    deleteSelectedPartners() {
      if (this.selectedPartners.length === 0) {
        swal("Please select at least one partner to delete.");
        return;
      }
      const selectedEventsIds = this.selectedPartners.map(
        (partner) => partner.id
      );

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these partners!",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deletePartner action or API endpoint to delete the selected partners
          await Promise.all(
            selectedEventsIds.map((id) => this.deletePartner(id))
          );
          this.isLoading = true;
          this.currentPage = 1;
          // After deletion, fetch partners again to update the list
          await this.fetchAllPartners({
            page: this.currentPage,
            perPage: this.perPage,
          });
          this.isLoading = false;

          swal("Selected partners have been deleted!", {});
        }
      });
    },
    async deSelectAllPartners() {
      this.selectedPartners = [];
      this.selectedCount = 0;
    },
    async selectAllPartners() {
      this.isLoading = true;
      await this.fetchAllPartnersWithoutPagination();
      // Sélectionne tous les events de la page actuelle s'ils ne sont pas déjà sélectionnés
      this.getAllPartners.forEach((partner) => {
        this.selectedPartners.push(partner);
      });
      this.isLoading = false;
      // Met à jour le compteur
      this.selectedCount = this.selectedPartners.length;
    },
    // selectAllPartners() {
    //   this.selectAllChecked = !this.selectAllChecked;
    //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    //   this.selectedCount = 0;
    //   checkboxes.forEach((checkbox) => {
    //     checkbox.checked = this.selectAllChecked;
    //     if (checkbox.checked) {
    //       this.selectedCount++;
    //     } else {
    //       this.selectedCount--;
    //     }
    //   });
    // },
    async handleSearch() {
      this.isLoading = true;

      await this.fetchAllPartners({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        gender: this.genderFilter,
        startDate: this.startDate,
        endDate: this.endDate,
      });
      this.isLoading = false;
    },

    async onPageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.isLoading = true;

      await this.fetchAllPartners({
        page: pageNumber,
        perPage: this.perPage,
      });
      this.isLoading = false;
    },
    navigateToPartnerDetailPage(partnerId, event) {
      if (
        event.target.tagName.toLowerCase() === "input" ||
        event.target.classList.contains("dropdown-toggle")
      ) {
        // Si l'utilisateur a cliqué sur une case à cocher ou un dropdown, arrêtez ici
        return;
      }

      // Vérifiez si l'utilisateur a cliqué sur un lien ou un élément qui n'est pas un dropdown
      const isLinkOrNonDropdownClicked =
        event.target.tagName.toLowerCase() === "a" ||
        !event.target.closest(".dropdown");
      // Ajoutez des conditions supplémentaires pour traiter les actions Delete, View et Edit
      const dropdownItemClicked = event.target.closest(".dropdown-item");
      if (dropdownItemClicked) {
        const action = dropdownItemClicked.getAttribute("data-action");
        if (action === "delete") {
          // Traitement de l'action de suppression
          this.deleteThePartner(partnerId);
          return;
        } else if (action === "edit") {
          // Traitement de l'action d'édition
          this.navigateToEditPartnerPage(partnerId);
          return;
        }
      }
      if (isLinkOrNonDropdownClicked && !dropdownItemClicked) {
        // Si l'utilisateur a cliqué sur un lien ou un élément non dropdown, effectuez la redirection
        this.$router.push({
          name: "partnerdetails",
          params: { id: partnerId },
        });
      }
    },

    navigateToEditPartnerPage(partnerId) {
      // Utilisez le routeur de Vue pour naviguer vers la page edit du client
      this.$router.push({
        name: "updatepartner",
        params: { id: partnerId },
      });
    },
    formattedName(partner) {
      // Ensure that partner.name and partner.surname are defined
      const name = partner.name
        ? partner.name.charAt(0).toUpperCase() + "."
        : "";
      const surname = partner.surname || "";
      return name + " " + surname;
    },
    async deleteThePartner(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this partner!",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deletepartner action or API endpoint to delete the partner
          await this.deletePartner(id);
        }
      });
    },
    isPartnerSelected(partnerId) {
      return this.selectedPartners.some((partner) => partner.id === partnerId);
    },
    toggleSelection(partner) {
      // Vérifie si le partner est déjà sélectionné
      const index = this.selectedPartners.findIndex((c) => c.id === partner.id);

      if (index !== -1) {
        // Si le client est déjà sélectionné, le retire de la liste des clients sélectionnés
        this.selectedPartners.splice(index, 1);
      } else {
        // Sinon, l'ajoute à la liste des clients sélectionnés
        this.selectedPartners.push(partner);
      }

      // Met à jour le compteur de clients sélectionnés
      this.selectedCount = this.selectedPartners.length;
    },
  },
  computed: {
    ...mapGetters([
      "getUsersLoading",
      "getUsersError",
      "getPartners",
      "getTotalPagesPartners",
      "getTotalItemsPartners",
      "getAllPartners",
    ]),
    isFilterActive() {
      return (
        this.searchText !== "" ||
        this.genderFilter !== "All" ||
        this.resourceFilter !== "All" ||
        this.startDate !== "" ||
        this.endDate !== ""
      );
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchAllPartners({ page: 1, perPage: this.perPage });
    console.log(this.getPartners);
    this.isLoading = false;
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
.frm {
  padding-top: 15px;
  padding-bottom: 15px;
  background-size: 20px 12px;
  background-position: right 18px center;
  color: var(--splash-black-color);
  border-color: #dedee4;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
</style>
