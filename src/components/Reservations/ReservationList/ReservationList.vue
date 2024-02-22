<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <!-- <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <div class="reviews-select rounded-1 d-flex me-10 mt-10 mt-lg-0">
          <span
            class="text-muted fs-12 position-relative fw-medium text-uppercase"
          >
            Status
          </span>
          <select
            class="form-select shadow-none bg-transparent border-0 fw-semibold rounded-0"
            v-model="selectedStatus"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div class="d-sm-flex align-items-center">
          <div
            class="rounded-1 d-flex me-10 mt-10 mt-lg-0"
            style="display: flex; align-items: center; gap: 2px"
          >
            <label class="text-muted fs-md-15" for="start-date"
              >Start Date :</label
            >
            <input
              id="start-date"
              type="date"
              class="form-control datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
              placeholder="Start Date"
              v-model="startDate"
            />

            <label class="text-muted fs-md-15" for="end-date"
              >End Date :
            </label>
            <input
              id="end-date"
              type="date"
              class="form-control datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
              placeholder="End Date"
              v-model="endDate"
            />
          </div>
        </div>
      </div>
    </div> -->
    <div
      class="card mb-25 border-0 rounded-0 bg-white letter-spacing"
      style="transition: background-color 0.3s"
    >
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
      >
        <h6 v-if="selectedCount > 0">
          {{ selectedCount }}
          {{ selectedCount === 1 ? "item" : "items" }} selected
        </h6>
        <div class="d-flex align-items-center mt-lg-10">
          <form @submit.prevent="handleFilterChange">
            <div class="input-group">
              <input
                type="text"
                class="form-control shadow-none fw-medium ps-1 pt-10 pe-0 letter-spacing"
                placeholder="Search"
                v-model="searchText"
                @input="handleFilterChange"
              />
              <button
                class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1"
                type="button"
                :disabled="getReservationLoading"
              >
                <i
                  class="flaticon-search-interface-symbol position-relative"
                ></i>
              </button>
            </div>
          </form>
        </div>

        <div class="d-sm-flex align-items-center mt-15 mt-lg-10">
          <select
            class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            v-model="selectedCustomer"
            @change="handleFilterChange"
          >
            <option value="0" selected>All Customers</option>
            <option
              v-for="customer in getCustomers"
              :key="customer.id"
              :value="customer.id"
            >
              {{ customer.name + " " + customer.surname }}
            </option>
          </select>
          <select
            class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            v-model="selectedPartner"
            @change="handleFilterChange"
          >
            <option value="0" selected>All Partners</option>
            <option
              v-for="partner in getPartners"
              :key="partner.id"
              :value="partner.id"
            >
              {{ partner.name + " " + partner.surname }}
            </option>
          </select>
          <select
            v-model="statusFilter"
            @change="handleFilterChange"
            class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          >
            <option value="All" selected>All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Canceled</option>
          </select>
          <flat-pickr
            v-model="startDate"
            :config="config"
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            placeholder="Start"
            name="startDate"
            @change="handleFilterChange"
          />

          <flat-pickr
            v-model="endDate"
            :config="{ minDate: startDate }"
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            placeholder="End"
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

        <div class="dropdown mt-15 mt-sm-0 ms-sm-10 mt-lg-10 d-inline-flex">
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
                @click="selectAllEvents"
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
                @click.prevent="deleteSelectedCustomers"
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
              >
                Product
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Customer
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Partner
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Start
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                End
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Total Amount
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Status
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(reservation, index) in getAllReservations"
              :key="index"
              @click="navigateToReservationDetailPage(reservation, $event)"
              style="cursor: pointer"
            >
              <td
                class="shadow-none lh-1 fw-medium text-black-emphasis title fs-md-15 fs-lg-16 ps-0"
              >
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      @change="updateSelectionCounter($event, index)"
                    />
                  </div>
                  <span
                    class="d-block fs-13 mt-10 text-muted fw-normal"
                    v-if="reservation.attributes.vehicle.data"
                    >{{
                      reservation.attributes.vehicle.data.attributes.make.data
                        ?.attributes.name
                    }}</span
                  >
                  <span
                    class="d-block fs-13 mt-10 text-muted fw-normal"
                    v-if="reservation.attributes.event.data"
                    >{{
                      reservation.attributes.event.data.attributes.name
                    }}</span
                  >
                  <span
                    class="d-block fs-13 mt-10 text-muted fw-normal"
                    v-if="reservation.attributes.villa.data"
                    >{{
                      reservation.attributes.villa.data.attributes.name
                    }}</span
                  >
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        url &&
                        reservation?.attributes.customer.data?.attributes.user
                          .data?.attributes.photo.data?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.customer.data?.attributes.user
                          .data?.attributes.photo.data?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    {{
                      formattedName(
                        reservation?.attributes.customer.data?.attributes.name,
                        reservation?.attributes.customer.data?.attributes
                          .surname
                      )
                    }}
                  </div>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <div
                  class="d-flex align-items-center"
                  v-if="
                    url &&
                    reservation?.attributes.villa.data?.attributes.partner.data
                  "
                >
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        url &&
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.photo.data?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    {{
                      formattedName(
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.name,
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.surname
                      )
                    }}
                  </div>
                </div>
                <div
                  class="d-flex align-items-center"
                  v-if="
                    url &&
                    reservation?.attributes.vehicle.data?.attributes.partner
                      .data
                  "
                >
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        url &&
                        reservation?.attributes.vehicle.data?.attributes.partner
                          .data?.attributes.photo.data?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.vehicle.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    <!-- <img
                      v-if="
                        url &&
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.villa.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    /> -->
                    <!-- <img
                      v-if="
                        url &&
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.user.data?.attributes.photo.data
                          ?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    /> -->
                    {{
                      formattedName(
                        reservation?.attributes.vehicle.data?.attributes.partner
                          .data?.attributes.name,
                        reservation?.attributes.vehicle.data?.attributes.partner
                          .data?.attributes.surname
                      )
                    }}
                  </div>
                </div>
                <div
                  class="d-flex align-items-center"
                  v-if="
                    url &&
                    reservation?.attributes.event.data?.attributes.partner
                  "
                >
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        url &&
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.photo.data?.attributes.url
                      "
                      :src="
                        url +
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.photo.data?.attributes.url
                      "
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    {{
                      formattedName(
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.name,
                        reservation?.attributes.event.data?.attributes.partner
                          .data?.attributes.surname
                      )
                    }}
                  </div>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ reservation.attributes.pickup_date }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ reservation.attributes.drop_off_date }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ reservation.attributes.total_amount }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span
                  class="badge text-outline-warning"
                  v-if="reservation.attributes.status == 'Pending'"
                  >{{ reservation.attributes.status }}</span
                >
                <span
                  class="badge text-outline-success"
                  v-if="reservation.attributes.status == 'Confirmed'"
                  >{{ reservation.attributes.status }}</span
                >
                <span
                  class="badge text-outline-danger"
                  v-if="reservation.attributes.status == 'Canceled'"
                  >{{ reservation.attributes.status }}</span
                >
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              >
                <div
                  class="dropdown"
                  v-if="reservation.attributes.status === 'Pending'"
                >
                  <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="flaticon-dots"></i>
                  </button>
                  <ul
                    class="dropdown-menu"
                    v-if="reservation.attributes.status === 'Pending'"
                  >
                    <li v-if="reservation.attributes.status !== 'Confirmed'">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click="acceptReservation(reservation)"
                      >
                        <i class="flaticon-pen lh-1 me-8"></i>
                        Accept
                      </a>
                    </li>
                    <li v-if="reservation.attributes.status !== 'Confirmed'">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click="refuseReservation(reservation)"
                      >
                        <i class="flaticon-delete lh-1 me-8"></i>
                        Refuse
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
          <span class="fw-bold">{{
            Math.min(11, getAllReservations?.length)
          }}</span>
          out of
          <span class="fw-bold">{{ getTotalItemsOfReservation }}</span>
          results
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
              v-for="page in getTotalPagesOfReservation"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click="onPageChange(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{
                disabled: currentPage === getTotalPagesOfReservation,
              }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="
                  currentPage !== getTotalPagesOfReservation &&
                    onPageChange(currentPage + 1)
                "
              >
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      ></div>
    </div>
    <div v-if="reserveData">
      <AcceptRef
        :show="ModalVisible"
        :dataProp="reserveData"
        @close="closeModal"
        @updated="updated"
      />
    </div>
  </div>
  <RefuseModal
    :show="isOpenRefuse"
    :reservation="reserveData"
    @close="closeRefus"
    @changedReservation="changeStatus"
  ></RefuseModal>
  <loading
    v-model:active="getReservationLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
  />
</template>

<script>
import {
  fetchReservations,
  deleteReservation,
  fetchAcceptedReservations,
  updateReservation,
  searchInS,
} from "@/services/apiService";
import AcceptRef from "../ReservationModal/ReservationModal.vue";
import RefuseModal from "../ReservationModal/RefuseModal.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { mapActions, mapGetters } from "vuex";
import { storageUrl } from "../../../utils/constants";
import flatPickr from "vue-flatpickr-component";

export default {
  name: "ReservationList",
  components: {
    AcceptRef,
    RefuseModal,
    Loading,
    flatPickr,
  },
  data() {
    return {
      url: storageUrl,
      reservations: [],
      searchInput: "",
      reserveData: "",
      selectedStatus: "",
      isOpenRefuse: false,
      ModalVisible: false,
      isLoading: false,
      perPage: 4,
      currentPage: 1,
      selectedCount: 0,
      startDate: "",
      endDate: "",
      selectedCustomer: 0,
      selectedPartner: 0,
      searchText: "",
      statusFilter: "All",
    };
  },
  computed: {
    ...mapGetters([
      "getAllReservations",
      "getReservationLoading",
      "getTotalPagesOfReservation",
      "getTotalItemsOfReservation",
      "getCustomers",
      "getPartners",
    ]),
    isFilterActive() {
      return (
        this.searchText !== "" ||
        this.statusFilter !== "All" ||
        this.selectedPartner != "0" ||
        this.selectedCustomer != "0" ||
        this.startDate !== "" ||
        this.endDate !== ""
      );
    },
  },
  methods: {
    ...mapActions([
      "fetchAllReservations",
      "fetchAllCustomers",
      "fetchAllPartners",
    ]),
    resetFilters() {
      // Réinitialiser les valeurs des filtres à leurs valeurs par défaut
      this.searchText = "";
      this.statusFilter = "All";
      this.selectedCustomer = 0;
      this.selectedPartner = 0;
      this.startDate = "";
      this.endDate = "";
      // Appeler la méthode handleFilterChange pour mettre à jour la liste des clients
      this.handleFilterChange();
    },
    async handleFilterChange() {
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllReservations({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        partnerId: this.selectedPartner,
        customerId: this.selectedCustomer,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.statusFilter,
      });
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
    navigateToReservationDetailPage(reservation, event) {
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
        if (action === "Accept") {
          // Traitement de l'action de suppression
          this.acceptReservation(reservation.id);
          return;
        } else if (action === "Refuse") {
          // Traitement de l'action d'édition
          this.refuseReservation(reservation);
          return;
        }
      }
      if (isLinkOrNonDropdownClicked && !dropdownItemClicked) {
        // Si l'utilisateur a cliqué sur un lien ou un élément non dropdown, effectuez la redirection
        // Utilisez le routeur de Vue pour naviguer vers la page détaillée du reservation
        this.$router.push({
          name: "ReservationDetailsPage",
          params: { reservationId: reservation.id },
        });
      }
    },
    // navigateToReservationDetailPage(reservationId, event) {
    //   // Vérifier si l'élément cliqué est la case à cocher
    //   if (event.target.tagName.toLowerCase() === "input") {
    //     return; // Ne rien faire si c'est la case à cocher qui a été cliquée
    //   }
    //   // Utilisez le routeur de Vue pour naviguer vers la page détaillée du reservation
    //   this.$router.push({
    //     name: "ReservationDetailsPage",
    //     params: { reservationId: reservationId },
    //   });
    // },
    async onPageChange(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchAllReservations({
        page: this.currentPage,
        perPage: this.perPage,
      });
    },
    formattedName(nameCustomer, surnameCustomer) {
      // Ensure that customer.name and customer.surname are defined
      const name = nameCustomer
        ? nameCustomer.charAt(0).toUpperCase() + "."
        : "";
      const surname = surnameCustomer || "";
      return name + " " + surname;
    },
    async change() {
      try {
        if (this.searchInput.trim() !== "") {
          const data = await searchInS(
            "reservations",
            "customer",
            "name",
            "$contains",
            this.searchInput
          );
          console.log(data);
          this.reservations = data.data;
        } else {
          await this.fetchReservationsData({ page: 1, perPage: this.perPage });
        }
      } catch (error) {
        console.log(error);
      }
    },
    customerHasPhoto(reservation) {
      return (
        reservation &&
        reservation.attributes &&
        reservation.attributes.customer &&
        reservation.attributes.customer.data &&
        reservation.attributes.customer.data.attributes &&
        reservation.attributes.customer.data.attributes.user &&
        reservation.attributes.customer.data.attributes.user.data &&
        reservation.attributes.customer.data.attributes.user.data.attributes &&
        reservation.attributes.customer.data.attributes.user.data.attributes
          .photo &&
        reservation.attributes.customer.data.attributes.user.data.attributes
          .photo.data &&
        reservation.attributes.customer.data.attributes.user.data.attributes
          .photo.data.attributes &&
        reservation.attributes.customer.data.attributes.user.data.attributes
          .photo.data.attributes.url
      );
    },
    getCustomerPhotoUrl(reservation) {
      const stockage = process.env.VUE_APP_STORAGE_URL;
      return (
        stockage +
        reservation.attributes.customer.data.attributes.user.data.attributes
          .photo.data.attributes.url
      );
    },
    getCustomerName(reservation) {
      return (
        reservation &&
        reservation.attributes &&
        reservation.attributes.customer &&
        reservation.attributes.customer.data &&
        reservation.attributes.customer.data.attributes &&
        reservation.attributes.customer.data.attributes.name
      );
    },
    getStatusClass(status) {
      switch (status) {
        case "Pending":
          return "badge text-outline-warning";
        case "Confirmed":
          return "badge text-outline-success";
        case "Canceled":
          return "badge text-outline-danger";
        default:
          return "badge";
      }
    },
    async fetchReservationsData() {
      try {
        const data = await fetchReservations();
        this.reservations = data.data;
        console.log(this.reservations, "reservation List ");
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
    async deleteReservation(id) {
      try {
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== id
        );
        await deleteReservation(id);
      } catch (error) {
        console.error(`Error deleting reservation with ID ${id}:`, error);
      }
    },

    closeModal() {
      this.ModalVisible = false;
    },
    showDetail(reservation) {
      // this.ModalVisible = true;
      const reservationId = reservation.id;
      this.$router.push({
        name: "ReservationDetailsPage",
        params: { reservationId },
      });

      this.reserveData = reservation;
      console.log(reservation);
    },
    acceptReservation(reservation) {
      const updatedData = {
        data: {
          status: "Confirmed",
        },
      };
      updateReservation(reservation.id, updatedData)
        .then((res) => {
          const index = this.reservations.findIndex(
            (item) => item.id === reservation.id
          );
          if (index !== -1) {
            this.reservations[index].attributes.status =
              res.data.data.attributes.status;
          }
        })
        .catch((error) => {
          console.error("Error updating reservation:", error);
        });
    },

    async refuseReservation(reservation) {
      this.reserveData = reservation;
      this.isOpenRefuse = !this.isOpenRefuse;
      console.log("ok");
    },
    changeStatus(event) {
      const index = this.reservations.findIndex(
        (item) => item.id === event.data.id
      );
      if (index !== -1) {
        this.reservations[index].attributes.status =
          event.data.attributes.status;
      }
      this.isOpenRefuse = false;
    },

    closeRefus() {
      this.isOpenRefuse = false;
    },
    async fetchAccepted() {
      const res = await fetchAcceptedReservations();
      console.log(res);
    },
  },
  async mounted() {
    await this.fetchAllReservations({
      page: this.currentPage,
      perPage: this.perPage,
    });
    await this.fetchAllCustomers({
      page: null,
    });
    await this.fetchAllPartners({
      page: null,
    });
    console.log(this.getPartners);
  },
};
</script>

<style>
th,
td {
  padding: 8px;
  text-align: left;
}

/* Apply styles to table cells when hovered */
table tbody tr:hover td {
  background-color: #f5f5f5;
}

.filter-btn {
  display: flex;
  align-items: center;
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 3px;
}

.btn-action {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-action.detail {
  background-color: #3498db;
  color: #fff;
}

.btn-action.accept {
  background-color: #2ecc71;
  color: #fff;
}

.btn-action.refuse {
  background-color: #e74c3c;
  color: #fff;
}

.btn-action:hover {
  filter: brightness(90%);
}
</style>
