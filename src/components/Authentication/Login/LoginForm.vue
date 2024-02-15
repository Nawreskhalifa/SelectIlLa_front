<template>
  <div class="container">
    <div class="center-container">
      <div class="card mb-25 border-0 rounded-0 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            Sign In To Your Account!
          </h4>
          <form @submit="handleSubmit">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email Address
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
                required
                v-model="email"
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Password
              </label>
              <input
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
                required
                v-model="password"
              />
            </div>
            <div
              class="d-flex align-items-center justify-content-between mb-15 mb-md-20"
            >
              <div
                class="form-check form-check-primary mb-0 fs-md-15 fs-lg-16 text-muted lh-1"
              >
                <input
                  class="form-check-input shadow-none"
                  type="checkbox"
                  id="remember-me"
                />
                <label class="form-check-label" for="remember-me">
                  Remember Me
                </label>
              </div>
              <router-link
                to="/forgot-password"
                class="forgot-password-btn fs-md-15 fs-lg-16 text-decoration-none position-relative text-primary"
              >
                Forgot Password?
              </router-link>
            </div>
            <button
              id="1"
               name="signin"
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-primary d-block w-100"
              type="submit"
              :disabled="loading"
            >
              <span v-if="!loading">Sign In Now</span>
              <div v-if="loading" class="spinner-border" role="status"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpCodes } from "@/utils/httpCodes";
import { logIn } from "../../../services/apiService";
import swal from "sweetalert";
import stateStore from "../../../utils/store";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: `An error occurred, please try again`,
      loading: null,
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      const response = await logIn(this.email, this.password);
      if (response.status == httpCodes.HTTP_OK) {
        // update isAuthenticated in the store
        stateStore.isAuthenticated = true;
        // Redirect to the user's dashboard
        this.$router.push("/dashboard");
      } else if (response.status == httpCodes.HTTP_NOT_FOUND) {
        swal({
          text: response.message,
          icon: "error",
          closeOnClickOutside: false,
        });
      } else {
        swal({
          text: this.errorMsg,
          icon: "error",
          closeOnClickOutside: false,
        });
      }
      this.loading = false;
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>
<style scoped>
.center-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
