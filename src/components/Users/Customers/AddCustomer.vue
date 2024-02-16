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
              <p v-if="!name" class="text-danger">First name is required</p>
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
              <p v-if="!surname" class="text-danger">Last name is required</p>
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
              <p v-if="!gender" class="text-danger">Gender is required</p>
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
                :max="getCurrentDate()"
              />
              <p v-if="!dateOfBirth" class="text-danger">
                Date of birth is required
              </p>
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
              <p v-if="!address" class="text-danger">Address is required</p>
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
                required
              />
            </div>
            <p v-if="!phone" class="text-danger">Phone number is required</p>
            <p v-if="phone && isNaN(phone)" class="text-danger">
              Please enter a valid number for the phone number.
            </p>
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
              <p v-if="!driver_license" class="text-danger">
                Driver license is required
              </p>
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
              <p v-if="Insurance" class="text-danger">
                Insurance type is required
              </p>
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
              <p v-if="!email" class="text-danger">Email is required</p>
              <p v-if="email && !validateEmail(email)" class="text-danger">
                Invalid email format
              </p>
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
              <p v-if="!password" class="text-danger">Password is required</p>
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
              <p class="text-danger">{{ errors.photo }}</p>
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
      :is-full-page="true"
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
        photo: "",
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      // Vérifie si un fichier a été sélectionné
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const maxSize = 20 * 1024 * 1024; // Taille maximale en octets (ici, 20 Mo)

        // Vérifier si la taille du fichier est inférieure ou égale à la taille maximale
        if (file.size > maxSize) {
          // Afficher un message d'erreur à l'utilisateur
          this.errors.photo =
            "The size of the image exceeds the limit of 20 MB.";
          return; // Arrêter le traitement
        }

        // Continuer le traitement si la taille est conforme à la limite
        this.errors.photo = ""; // Effacer les erreurs précédentes
        this.photo = file;

        this.selectedPhoto = [];
        this.selectedPhoto.push({
          id: file.name,
          url: URL.createObjectURL(file),
        });
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
    validateEmail(email) {
      // Fonction de validation de l'email
      // Vous pouvez utiliser une expression régulière ou une autre méthode de validation ici
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    async submit() {
      // Réinitialiser les erreurs
      this.resetErrors();

      // Valider les champs
      // Valider les champs
      let isValid = true;

      if (this.name == "") {
        this.errors.name = "First name is required";
        isValid = false;
      }

      if (!this.surname == "") {
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

      if (!isValid) {
        console.log(this.errors);
        // Scroll to the first error
        const errorElements = document.querySelectorAll(".text-danger");
        if (errorElements.length > 0) {
          const firstErrorElement = errorElements[0];
          firstErrorElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
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

      if (this.name == "") {
        this.errors.name = "First name is required";
        isValid = false;
      }

      if (!this.surname == "") {
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
      if (response.data && response.data.length > 0) {
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
