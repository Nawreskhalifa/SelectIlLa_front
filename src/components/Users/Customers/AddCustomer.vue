<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                First Name
              </label>
              <input
                v-model="name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Adam"
                required
              />
              <p class="text-danger">{{ errors.name }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Last Name
              </label>
              <input
                v-model="surname"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Smith"
                required
              />
              <p class="text-danger">{{ errors.surname }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Gender
              </label>
              <select
                class="form-select shadow-none fw-semibold rounded-0"
                v-model="gender"
              >
                <option value="">Select Gender</option>

                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <p class="text-danger">{{ errors.gender }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date of Birth
              </label>
              <input
                v-model="datofbirth"
                type="date"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. EnvyTheme Software"
                required
              />
              <p class="text-danger">{{ errors.datofbirth }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Address
              </label>
              <input
                v-model="address"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="add your address here"
                required
              />
              <p class="text-danger">{{ errors.address }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Phone No
              </label>
              <input
                v-model="phone"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. +001 321 4567"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Driver License
              </label>
              <input
                v-model="driver_license"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 1236547898"
                required
              />
              <p class="text-danger">{{ errors.driver_license }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Insurance
              </label>
              <input
                v-model="Insurance"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Health"
                required
              />
              <p class="text-danger">{{ errors.Insurance }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                v-model="email"
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
                required
              />
              <p class="text-danger">{{ errors.email }}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Password
              </label>
              <input
                v-model="password"
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AaSmith123"
                required
              />
              <p class="text-danger">{{ errors.password }}</p>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Status</label>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  class="form-check-input shadow-none"
                  type="radio"
                  name="communicationRadio"
                  id="activeRadio"
                  v-model="status"
                  checked
                />
                <label class="form-check-label" for="activeRadio">
                  Active
                </label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  class="form-check-input shadow-none"
                  type="radio"
                  name="communicationRadio"
                  id="deactivatedRadio"
                  v-model="status"
                />
                <label class="form-check-label" for="deactivatedRadio">
                  Deactivated
                </label>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Upload Images
                </label>
                <div class="file-upload text-center position-relative">
                  <input
                    type="file"
                    multiple
                    v-on:change="handleFileUpload"
                    accept="image/*"
                    class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                  />
                  <i class="flaticon-image"></i>
                  <span class="d-block text-muted">
                    Drop Images Here Or
                    <span class="text-black fw-medium position-relative">
                      Click To Upload
                    </span>
                  </span>
                </div>
                <div v-if="selectedPhoto.length > 0" class="image-preview">
                  <div
                    v-for="(photo, index) in selectedPhoto"
                    :key="index"
                    class="image-item"
                  >
                    <img :src="photo.url" alt="Selected Image" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="d-flex align-items-center justify-content-between">
                <button
                  class="default-btn position-relative transition border-0 fw-medium text-white pt-8 pb-8 ps-15 pe-15 pt-md-12 pb-md-12 ps-md-20 pe-md-20"
                  type="submit"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { makeApiRequest } from "../../../services/apiService";
import { methodsHttpNames } from "../../../utils/methods";
import { endPoints } from "../../../utils/endPoints";

import swal from "sweetalert";

import {
  getRole,
  uploadFiles,
  RegistreUser,
  postCustomer,
} from "@/services/apiService";
import { httpCodes } from "@/utils/httpCodes";

export default defineComponent({
  name: "AddUser",
  components: {
    Loading,
  },
  data() {
    return {
      selectedPhoto: [],
      photo: null,
      isLoading: false,
      fullPage: true,
      address: "",
      name: "",
      surname: "",
      datofbirth: "",
      phone: "",
      status: "",
      gender: "",
      blocked: false,
      password: "",
      email: "",
      Role: "",
      SelectedPicture: "",
      selectedDocuments: [],
      Insurance: "",
      driver_license: "",
      errors: {
        name: "",
        surname: "",
        gender: "",
        datofbirth: "",
        address: "",
        phone: "",
        driver_license: "",
        Insurance: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      // Vérifie si un fichier a été sélectionné
      if (event.target.files.length > 0) {
        this.photo = event.target.files[0];

        this.selectedPhoto = [];
        this.selectedPhoto.push({
          id: event.target.files[0].name,
          url: URL.createObjectURL(event.target.files[0]),
        });
      }
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    validateEmail(email) {
      // Fonction de validation de l'email
      // Vous pouvez utiliser une expression régulière ou une autre méthode de validation ici
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    async submit() {
      // Réinitialiser les erreurs
      this.resetErrors();

      // Valider les champs
      const isValid = this.validateFields();

      if (!isValid) {
        return; // Arrêter la soumission si des erreurs sont trouvées
      }

      this.isLoading = true;

      try {
        // Soumettre le formulaire
        await this.submitForm();
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    resetErrors() {
      // Réinitialiser les erreurs
      Object.keys(this.errors).forEach((key) => (this.errors[key] = ""));
    },

    validateFields() {
      // Valider les champs
      let isValid = true;

      if (!this.name) {
        this.errors.name = "First name is required";
        isValid = false;
      }

      if (!this.surname) {
        this.errors.surname = "Last name is required";
        isValid = false;
      }

      if (!this.gender) {
        this.errors.gender = "Gender is required";
        isValid = false;
      }

      if (!this.datofbirth) {
        this.errors.datofbirth = "Date of birth is required";
        isValid = false;
      }

      if (!this.address) {
        this.errors.address = "Address is required";
        isValid = false;
      }

      if (!this.phone) {
        this.errors.phone = "Phone number is required";
        isValid = false;
      }

      if (!this.driver_license) {
        this.errors.driver_license = "Driver license is required";
        isValid = false;
      }

      if (!this.Insurance) {
        this.errors.Insurance = "Insurance type is required";
        isValid = false;
      }

      if (!this.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!this.validateEmail(this.email)) {
        this.errors.email = "Invalid email format";
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = "Password is required";
        isValid = false;
      }

      return isValid;
    },

    async submitForm() {
      const response = await makeApiRequest(
        methodsHttpNames.GET,
        endPoints.users,
        undefined,
        { filters: { email: { $eq: this.email } } }
      );
      console.log("fetch:", response);
      if (response.data && response.data.length>0) {
        swal({
          text: "Email already exists!",
          icon: "error",
          closeOnClickOutside: false,
        });
      } else {
        // Soumettre le formulaire
        const userData = {
          address: this.address,
          email: this.email,
          username: this.email,
          password: this.password,
          blocked: this.blocked,
          confirmed: true,
          role: this.Role !== "" ? this.Role : null,
          gender: this.gender,
          date_of_birth: this.datofbirth,
        };
        const registredUser = await RegistreUser(userData);
        if (registredUser.data && registredUser.data.user) {
          if (this.photo) {
            this.photo;
            await this.uploadProfilePicture(registredUser.data.user.id);
          }

          const customerDetails = {
            data: {
              name: this.name,
              surname: this.surname,
              phone: this.phone,
              address: this.address,
              driver_license: this.driver_license,
              Insurance: this.Insurance,
              user: registredUser?.data.user.id,
            },
          };
          const result = await postCustomer(customerDetails);
          if (result.success) {
            this.isLoading = false;
            this.$router.push("/customersList");
          }
        }
      }
    },

    async uploadProfilePicture(userId) {
      // Télécharger la photo de profil
      await uploadFiles(
        [this.photo],
        "plugin::users-permissions.user",
        "photo",
        userId
      );
    },

    cancel() {
      this.address = "";
      this.name = "";
      this.surname = "";
      this.datofbirth = "";
      this.phone = "";
      this.status = "";
      this.address = "";
      this.gender = "";
      this.password = "";
      this.email = "";
    },
    async selectedFile(file) {
      this.SelectedPicture = file;
    },
    async getRoles() {
      const roles = await getRole("customer");
      this.Role = roles?.roles?.roles[0]?.id;
    },
  },
  async mounted() {
    await this.getRoles();
  },
});
</script>
