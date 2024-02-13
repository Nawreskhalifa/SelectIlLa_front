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
              />
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
              />
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
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                User Name
              </label>
              <input
                v-model="username"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Smith12"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Password
              </label>
              <input
                v-model="password"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AaSmith123"
              />
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
                Address
              </label>
              <input
                v-model="address"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="add your address here"
              />
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
                />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Upload Partner Profile Picture
                </label>
                <ImageUpload @selectedFile="selectedFile" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Upload Partner Documents
                </label>
                <div class="mb-3">
                  <input
                    class="form-control"
                    type="file"
                    id="formFiles"
                    multiple
                    @change="handleFileUpload"
                  />
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
                <button
                  type="button"
                  class="bg-transparent p-0 border-0 text-danger lh-1 fw-medium"
                >
                  <i
                    class="flaticon-delete lh-1 me-1 position-relative top-2"
                  ></i>
                  <span class="position-relative" @click="cancel">Cancel</span>
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

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// import { getRole, uploadFiles, RegistreUser,postPartner } from "@/services/apiService";
import ImageUpload from "./ImageUpload.vue";

export default defineComponent({
  name: "AddUser",
  components: {
    ImageUpload,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      username: "",
      name: "",
      surname: "",
      datofbirth: "",
      phone: "",
      status: "",
      address: "",
      gender: "",
      blocked: true,
      password: "",
      email: "",
      Role: "",
      SelectedPicture: "",
      selectedDocuments: [] as File[],
    };
  },
  methods: {
    async handleFileUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (!input.files) return;
      this.selectedDocuments = [];
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.selectedDocuments.push(file);
      }
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async submit() {
      this.isLoading = true;
      try {
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          blocked: this.blocked,
          confirmed: true,
          role: this.Role !== "" ? this.Role : null,
          gender: this.gender,
          date_of_birth: this.datofbirth,
        };
        // const registredUser = await RegistreUser(userData);
        //       if (registredUser.data && registredUser.data.user) {
        //          if(this.SelectedPicture){
        //             await uploadFiles([this.SelectedPicture],"plugin::users-permissions.user","photo",registredUser.data.user.id)
        //          }
        //         const partnerDetails = {
        //           data: {
        //             name: this.name,
        //             surname: this.surname,
        //             phone: this.phone,
        //             address: this.address,
        //             user: registredUser?.data.user.id,
        //           },

        //         };
        // const postPartnerSubInfo =  await postPartner(partnerDetails)
        // if(postPartnerSubInfo.data){
        //    if(this.selectedDocuments && this.selectedDocuments.length > 0){
        //      await uploadFiles(this.selectedDocuments,"api::partner.partner","Documents",postPartnerSubInfo.data.id)
        //    }
        // }

        // }
        // console.log(registredUser, "hdy");
        console.log(
          this.username,
          this.name,
          this.surname,
          this.datofbirth,
          this.phone,
          this.status,
          "Status",
          this.address,
          this.gender,
          this.blocked,
          "Blocked",
          this.password,
          this.email
        );
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        this.isLoading = false;
        this.$router.push("/partnersList");
      }
    },
    cancel() {
      this.username = "";
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
    // async getRoles() {
    //   const roles = await getRole("Partner");
    //   this.Role = roles.roles.roles[0].id;
    // },
  },
  async mounted() {
    // await this.getRoles();
  },
  // setup: () => {
  //   const modules = {
  //     module: BlotFormatter,
  //     ImageUploader,
  //     options: {
  //       upload: (file: string | Blob) => {
  //         return new Promise((resolve, reject) => {
  //           const formData = new FormData();
  //           formData.append("image", file);

  //           axios
  //             .post("/upload-image", formData)
  //             .then((res: { data: { url: unknown } }) => {
  //               console.log(res);
  //               resolve(res.data.url);
  //             })
  //             .catch((err: unknown) => {
  //               reject("Upload failed");
  //               console.error("Error:", err);
  //             });
  //         });
  //       },
  //     },
  //   };
  //   return { modules };
  // },
});
</script>
