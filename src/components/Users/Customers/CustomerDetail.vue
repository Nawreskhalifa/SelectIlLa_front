<template>
  <BreadCrumb
    :PrevPage="'Customers List'"
    :url="'/customersList'"
    :PageTitle="
      truncateText(
        getCustomer?.attributes.name + ' ' + getCustomer?.attributes.surname
      )
    "
  />

  <div class="row">
    <div class="col-lg-5 col-xl-4">
      <CustomersInformation :customerId="idCustomer" />
    </div>
    <div class="col-lg-7 col-xl-8">
      <div class="leads-details-tabs">
        <ul class="nav nav-tabs border-0 mb-25" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100 active"
              id="emails-tab"
              data-bs-toggle="tab"
              data-bs-target="#reservations-tab-pane"
              type="button"
              role="tab"
              aria-controls="reservations-tab-pane"
              aria-selected="false"
            >
              Reservations
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="creditCards-tab"
              data-bs-toggle="tab"
              data-bs-target="#creditCards-tab-pane"
              type="button"
              role="tab"
              aria-controls="creditCards-tab-pane"
              aria-selected="true"
            >
              Credit Cards
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="attachments-tab"
              data-bs-toggle="tab"
              data-bs-target="#attachments-tab-pane"
              type="button"
              role="tab"
              aria-controls="attachments-tab-pane"
              aria-selected="false"
            >
              Attachments
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade"
            id="creditCards-tab-pane"
            role="tabpanel"
            tabindex="1"
          >
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
              <div
                class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
              >
                <h5 class="card-title fw-bold mb-0">Credit Cards</h5>
                <div class="d-flex align-items-center mt-10 mt-md-0"></div>
              </div>
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
              >
                <div class="table-responsive">
                  <table class="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                        >
                          Reservation Id
                        </th>
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
                          HOLDER NAME
                        </th>
                        <th
                          scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                        >
                          NUMBER
                        </th>

                        <th
                          scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                        >
                          eXPIRY DATE
                        </th>
                        <th
                          scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="card in getDocuments"
                        :key="card.id"
                        @click="navigateToReservationDetail(card.id)"
                        style="cursor: pointer"
                      >
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          #{{ card.id }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          <span v-if="card.attributes.event.data">
                            {{
                              card.attributes.event.data?.attributes.name
                            }}</span
                          >
                          <span v-if="card.attributes.villa.data">
                            {{
                              card.attributes.villa.data?.attributes.name
                            }}</span
                          >
                          <span v-if="card.attributes.vehicle.data">{{
                            card.attributes.vehicle.data?.attributes.style.data
                              ?.name
                          }}</span>
                        </td>

                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          {{ card.attributes.credit_card.holder_name }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          {{ card.attributes.credit_card.number }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          {{ card.attributes.credit_card.expiry_date }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="d-md-flex mt-15 mt-md-25 mb-0 justify-content-between align-items-center"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade show active"
            id="reservations-tab-pane"
            role="tabpanel"
            tabindex="0"
          >
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
              <div
                class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
              >
                <h5 class="card-title fw-bold mb-0">Reservations</h5>
                <select
                  v-model="statusFilter"
                  @change="handleFilterChange"
                  class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                >
                  <option selected value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <div class="d-flex align-items-center mt-10 mt-md-0">
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
                          @click="selectAllReservations"
                        >
                          <i
                            class="fas fa-check lh-1 me-8 position-relative top-1"
                          ></i>
                          {{ selectAllChecked ? "Deselect All" : "Select All" }}
                        </a>
                      </li>
                      <li>
                        <a
                          :class="{
                            disabled:
                              selectedCount === 0 ||
                              (pendingReservations &&
                                pendingReservations.length === 0),
                          }"
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          @click="AcceptSelectedReservations"
                        >
                          <i class="ph ph-check-square-offset"> </i>

                          Accept Selected
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
              >
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(reservation, index) in getDocuments"
                        :key="index"
                        @click="
                          navigateToReservationDetailPage(
                            reservation.id,
                            $event
                          )
                        "
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
                                reservation.attributes.vehicle.data.attributes
                                  .make.data?.attributes.name
                              }}</span
                            >
                            <span
                              class="d-block fs-13 mt-10 text-muted fw-normal"
                              v-if="reservation.attributes.event.data"
                              >{{
                                reservation.attributes.event.data.attributes
                                  .name
                              }}</span
                            >
                            <span
                              class="d-block fs-13 mt-10 text-muted fw-normal"
                              v-if="reservation.attributes.villa.data"
                              >{{
                                reservation.attributes.villa.data.attributes
                                  .name
                              }}</span
                            >
                          </div>
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          {{ reservation.attributes.pickup_date }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
                          {{ reservation.attributes.drop_off_date }}
                        </td>
                        <td
                          class="shadow-none lh-1 fw-medium text-black-emphasis"
                        >
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
                      Math.min(11, getDocuments.length)
                    }}</span>
                    out of
                    <span class="fw-bold">{{ getDocuments.length }}</span>
                    results
                  </p>
                  <nav class="mt-15 mt-md-0">
                    <ul class="pagination mb-0">
                      <li
                        class="page-item"
                        :class="{ disabled: currentPage === 1 }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          aria-label="Previous"
                          @click="
                            currentPage !== 1 && onPageChange(currentPage - 1)
                          "
                        >
                          <i class="flaticon-chevron-1"></i>
                        </a>
                      </li>
                      <li
                        class="page-item"
                        v-for="page in getTotalPagesReservation"
                        :key="page"
                        :class="{ active: page === currentPage }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          @click="onPageChange(page)"
                          >{{ page }}</a
                        >
                      </li>
                      <li
                        class="page-item"
                        :class="{
                          disabled: currentPage === getTotalPagesReservation,
                        }"
                      >
                        <a
                          class="page-link"
                          href="#"
                          aria-label="Next"
                          @click="
                            currentPage !== getTotalPages &&
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
            <loading
              v-model:active="getUsersLoading"
              :can-cancel="true"
              :on-cancel="onCancel"
              :is-full-page="true"
            />
          </div>
          <div
            class="tab-pane fade"
            id="attachments-tab-pane"
            role="tabpanel"
            tabindex="2"
          >
            <div class="card mb-25 border-0 rounded-0 bg-white attachments-box">
              <div
                class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing"
              >
                <div
                  class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between"
                >
                  <h5 class="card-title fw-bold mb-0">Attachments</h5>
                  <div class="d-sm-flex align-items-center">
                    <select
                      class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                      v-model="selectedReservationAttachment"
                      @change="handleFilterAttachmentsChange"
                    >
                      <option value="0" selected>All Reservations</option>
                      <option
                        v-for="reservation in getDocuments"
                        :key="reservation.id"
                        :value="reservation.id"
                      >
                        <span
                          class="text-decoration-none text-black-emphasis"
                          v-if="reservation?.attributes.event.data !== null"
                        >
                          {{
                            reservation?.attributes.event.data?.attributes.name
                          }}</span
                        >
                        <span
                          class="text-decoration-none text-black-emphasis"
                          v-if="reservation?.attributes.villa.data !== null"
                        >
                          {{
                            reservation?.attributes.villa.data?.attributes.name
                          }}</span
                        >
                        <span
                          class="text-decoration-none text-black-emphasis"
                          v-if="reservation?.attributes.vehicle.data !== null"
                        >
                          {{
                            reservation?.attributes.vehicle.data?.attributes
                              .style.data?.name
                          }}</span
                        >
                      </option>
                    </select>
                    <span></span>
                  </div>
                </div>
                <div
                  v-if="
                    getAllDocuments &&
                    getAllDocuments.data &&
                    getAllDocuments.data.length
                  "
                >
                  <div
                    class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between"
                  >
                    <h6 class="card-title fw-bold mb-0">
                      Attachments of reservations
                    </h6>
                    <button
                      v-if="selectedReservationAttachment != 0"
                      @click="openFileDialogReservation"
                      class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
                      type="button"
                      :disabled="loadingFilesReservation"
                    >
                      Upload
                      <i
                        class="ph ph-upload position-relative ms-5 top-2 fs-15"
                      ></i>
                      <div
                        v-if="loadingFiles"
                        class="spinner-border"
                        role="status"
                      ></div>
                    </button>
                  </div>

                  <Media :documents="getAllDocuments" />
                </div>
                <br />
                <div
                  v-if="
                    getDocumentsCustomer &&
                    getDocumentsCustomer.data &&
                    getDocumentsCustomer.data.length
                  "
                >
                  <div
                    class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between"
                  >
                    <h6 class="card-title fw-bold mb-0">
                      Attachments of customer
                    </h6>
                    <button
                      v-if="selectedReservationAttachment != 0"
                      @click="openFileDialog"
                      class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
                      type="button"
                      :disabled="loadingFiles"
                    >
                      Upload
                      <i
                        class="ph ph-upload position-relative ms-5 top-2 fs-15"
                      ></i>
                      <div
                        v-if="loadingFiles"
                        class="spinner-border"
                        role="status"
                      ></div>
                    </button>
                  </div>

                  <Media :documents="getDocumentsCustomer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="true"
  />
</template>

<script>
import CustomersInformation from "./CustomerInformation.vue";
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import Media from "../../Reservations/FileManagar/FileManager.vue";
import { uploadFiles } from "@/services/apiService";
import swal from "sweetalert";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { updateReservation, acceptReservation } from "@/services/apiService";
import BreadCrumb from "../../Common/BreadCrumb.vue";

export default defineComponent({
  name: "CustomerDetail",
  components: { CustomersInformation, Media, Loading, BreadCrumb },
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
      currentPage: 1,
      selectAllChecked: false,
      statusFilter: "",
      isLoading: false,
      fullPage: true,
      documents: [],
      loadingFiles: false,
      loadingFilesReservation: false,
      selectedCount: 0,
      pendingReservations: [],
      perPage: 5,
      selectedReservationAttachment: 0,
      documentsToReservation: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchOneCustomer",
      "fetchAllAttachmentsByCustomer",
      "fetchDocumentsCustomer",
      "fetchAllDocumentsByCustomer",
    ]),
    navigateToReservationDetail(id) {
      this.$router.push({
        name: "ReservationDetailsPage",
        params: { reservationId: id },
      });
    },
    truncateText(text) {
      const maxLength = 35;
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + "...";
      }
    },
    async openFileDialogReservation() {
      try {
        // Créez un élément de type input de fichier
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;

        // Définissez les attributs supplémentaires si nécessaire
        // input.accept = 'image/*'; // Décommentez pour limiter les types de fichiers acceptés

        // Créez une promesse pour attendre que l'utilisateur sélectionne les fichiers
        const files = await new Promise((resolve, reject) => {
          // Ajoutez un écouteur d'événements pour détecter lorsque des fichiers sont sélectionnés
          input.addEventListener("change", (event) => {
            const files = event.target.files;
            resolve(Array.from(files));
          });
          // Cliquez sur l'élément input de fichier pour ouvrir la boîte de dialogue
          input.click();
        });

        // Ajoutez les fichiers sélectionnés à la liste des documents
        this.documentsToReservation.push(...files);

        // Vérifiez s'il y a des fichiers à télécharger
        if (files.length > 0) {
          // Mettez le chargement en cours
          this.loadingFilesReservation = true;

          // Téléchargez les fichiers du client
          const res = await uploadFiles(
            files,
            "api::reservation.reservation",
            "documents",
            this.selectedReservationAttachment
          );

          // Arrêtez le chargement
          this.loadingFilesReservation = false;

          // Vérifiez si le téléchargement a réussi
          if (res.success) {
            await this.handleFilterAttachmentsChange();
            // Affichez un message de succès
            swal({
              text: "Files uploaded Successfully!",
              closeOnClickOutside: false,
            });
          } else {
            // Affichez un message d'erreur
            swal({
              text: "An error occurred, please try again",
              closeOnClickOutside: false,
            });
          }
        }
      } catch (error) {
        // Gérez les erreurs
        swal({
          text: "An error occurred, please try again",
          closeOnClickOutside: false,
        });
      }
    },
    async openFileDialog() {
      try {
        // Créez un élément de type input de fichier
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;

        // Définissez les attributs supplémentaires si nécessaire
        // input.accept = 'image/*'; // Décommentez pour limiter les types de fichiers acceptés

        // Créez une promesse pour attendre que l'utilisateur sélectionne les fichiers
        const files = await new Promise((resolve, reject) => {
          // Ajoutez un écouteur d'événements pour détecter lorsque des fichiers sont sélectionnés
          input.addEventListener("change", (event) => {
            const files = event.target.files;
            resolve(Array.from(files));
          });
          // Cliquez sur l'élément input de fichier pour ouvrir la boîte de dialogue
          input.click();
        });

        // Ajoutez les fichiers sélectionnés à la liste des documents
        this.documents.push(...files);

        // Vérifiez s'il y a des fichiers à télécharger
        if (files.length > 0) {
          // Mettez le chargement en cours
          this.loadingFiles = true;

          // Téléchargez les fichiers du client
          const res = await uploadFiles(
            files,
            "api::customer.customer",
            "documents",
            this.customerId
          );

          // Arrêtez le chargement
          this.loadingFiles = false;

          // Vérifiez si le téléchargement a réussi
          if (res.success) {
            // Affichez un message de succès
            swal({
              text: "Files uploaded Successfully!",
              closeOnClickOutside: false,
            });
          } else {
            // Affichez un message d'erreur
            swal({
              text: "An error occurred, please try again",
              closeOnClickOutside: false,
            });
          }
        }
      } catch (error) {
        // Gérez les erreurs
        swal({
          text: "An error occurred, please try again",
          closeOnClickOutside: false,
        });
      }
    },
    async handleFilterAttachmentsChange() {
      this.isLoading = true;
      await this.fetchAllDocumentsByCustomer({
        idCustomer: this.idCustomer,
        idReservation: this.selectedReservationAttachment,
      });
      this.isLoading = false;
    },
    async handleFilterChange() {
      this.isLoading = true;

      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;
      await this.fetchAllAttachmentsByCustomer({
        page: this.currentPage,
        perPage: this.perPage,
        idCustomer: this.idCustomer,
        status: this.statusFilter,
      });
      this.isLoading = false;
    },
    AcceptSelectedReservations() {
      const selectedReservations = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedReservations.push(this.getDocuments[index]);
        }
      });

      if (selectedReservations.length === 0) {
        swal("Please select at least one reservation to delete.");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Once accepted, you will not be able to cancel these reservations!",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await Promise.all(
            selectedReservations.map(async (reservation) => {
              if (reservation.attributes.status === "Pending") {
                const res = await updateReservation(reservation.id, {
                  data: {
                    status: "Confirmed",
                  },
                });
                if (res) {
                  if (
                    reservation.attributes &&
                    reservation.attributes.customer &&
                    reservation.attributes.customer.data
                  ) {
                    const acceptedRes = {
                      data: {
                        customer: reservation.attributes.customer.data.id,
                        reservation_demand: reservation.id,
                      },
                    };
                    await acceptReservation(acceptedRes);
                  }
                }
              }
            })
          );
          this.isLoading = true;

          await this.fetchAllAttachmentsByCustomer({
            page: this.currentPage,
            perPage: this.perPage,
          });
          this.isLoading = false;

          swal("Selected pending reservations have been accepted!", {});
        }
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
    selectAllReservations() {
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
    navigateToReservationDetailPage(reservationId, event) {
      // Vérifier si l'élément cliqué est la case à cocher
      if (event.target.tagName.toLowerCase() === "input") {
        return; // Ne rien faire si c'est la case à cocher qui a été cliquée
      }
      // Utilisez le routeur de Vue pour naviguer vers la page détaillée du reservation
      this.$router.push({
        name: "ReservationDetailsPage",
        params: { reservationId: reservationId },
      });
    },
    async onPageChange(pageNumber) {
      this.isLoading = true;

      this.currentPage = pageNumber;
      await this.fetchAllAttachmentsByCustomer({
        page: this.currentPage,
        perPage: this.perPage,
        idCustomer: this.idCustomer,
        status: this.statusFilter,
      });
      this.isLoading = false;
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
  computed: {
    ...mapGetters([
      "getCustomer",
      "getDocuments",
      "getTotalPagesReservation",
      "getTotalItemsReservation",
      "getUsersLoading",
      "getDocumentsCustomer",
      "getAllDocuments",
    ]),
  },
  async mounted() {
    try {
      this.isLoading = true;

      await this.fetchAllAttachmentsByCustomer({
        page: this.currentPage,
        perPage: this.perPage,
        idCustomer: this.idCustomer,
      });
      await this.fetchAllDocumentsByCustomer({
        idCustomer: this.idCustomer,
        idReservation: undefined,
      });
      await this.fetchDocumentsCustomer(this.idCustomer);
      if (this.customerId) {
        this.isLoading = false;

        await this.fetchOneCustomer(this.customerId);
        this.isLoading = false;
      }
      this.pendingReservations = this.getDocuments.filter(
        (reservation) => reservation.attributes.status === "Pending"
      );

      this.isLoading = false;
      console.log(this.getDocuments);
    } catch (error) {
      this.isLoading = false;
      swal({
        text: "An error occurred, please try again",
        closeOnClickOutside: false,
      });
    }
  },
});
</script>
