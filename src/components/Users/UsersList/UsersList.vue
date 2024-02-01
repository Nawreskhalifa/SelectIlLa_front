<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#createNewUserModal"
        >
          Add New User
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </a>
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15">
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search user"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button>
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
              >
                USER NAME
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
              >
                LOCATIONS
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                JOINING DATE
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                PROJECTS
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in getUsers" :key="index">
              <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input class="form-check-input shadow-none" type="checkbox" />
                  </div>
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <!-- <img
                      :src="user.photo.url"
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    /> -->
                    {{ user.name }}
                  </div>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ user.email }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ user.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">{{ user.location }}</td>
              <td class="shadow-none lh-1 fw-medium text-muted">{{ user.joiningDate }}</td>
              <td class="shadow-none lh-1 fw-medium text-muted">{{ user.projects }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">11</span> out of
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
  <CreateNewUserModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateNewUserModal from "./CreateNewUserModal.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "UsersList",
  components: {
    CreateNewUserModal,
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["fetchAllUsers"]),

  },
  computed: {
    ...mapGetters(["getUsersLoading", "getUsersError", "getUsers"]),
  },
  async mounted() {
    await this.fetchAllUsers();
  },
});
</script>
