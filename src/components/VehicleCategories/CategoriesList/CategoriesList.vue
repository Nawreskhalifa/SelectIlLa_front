<template>
  <UpdateModal :show="ModalVisible" @close="closeModal" @addMake="addAMake" />
  <div v-if="makeToEdit">
    <edit-make
      :show="EditMakeModal"
      :make="makeToEdit"
      @close="closeMake"
      @editedMakeName="editMake"
    />
  </div>
  <div v-if="openedMakeFull">
    <AddBrand
      :show="showAddBrand"
      @close="closeAddBrand"
      :make="openedMakeFull"
      @addBrand="CreateANewBrand"
    />
  </div>
  <div v-if="brandToEdit">
    <EditBrand
      :show="editBrandModal"
      @close="closeEditBrand"
      :brand="brandToEdit"
      @editedBrand="editBrandMethod"
    />
  </div>

  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
      <div
        class="card mb-25 border-0 rounded-0 bg-white letter-spacing chat-sidebar"
      >
        <div class="card-body">
             <input
              type="text"
              class="form-control shadow-none text-black rounded-0 border-0"
              placeholder="Search message"
              v-model="searchInput"
                @input="searchMake"

            />

           <button
            class="btn btn-primary d-block w-100"
            type="button"
            @click="openAdd"
          >
            Add New Make
          </button>

          <div class="chat-users-list">
            <div class="card mb-25 border-0 rounded-0 bg-white to-do-list-box">
              <div class="card-body letter-spacing">
                <ul class="to-do-list style-two ps-0 list-unstyled mb-0">

                  <li
                    v-for="make in makes"
                    :key="make.id"
                    :class="{ selected: make.selected }"
                    class="to-do-list-item d-flex align-items-center justify-content-between hoverli"
                    @click.prevent="openBrandsFormMake(make)"
                  >
                    <div style="width: 95%; cursor: pointer">
                      <div
                        class="'form-check mb-0 fs-md-15 fs-lg-16 text-black fw-medium'"
 v-if="make && make.attributes && make.attributes.name"

                      >
                        <label class="aria-label">
                          <h6
                            style="cursor: pointer"
                            class="card-title fw-bold mb-0"
                          >
                            {{ make.attributes.name }}
                          </h6>
                        </label>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button
                        class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="flaticon-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <!-- <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li> -->
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="openEditMake(make)"
                          >
                            <i class="flaticon-pen lh-1 me-8"></i>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="deleteMakeMeth(make.id)"
                          >
                            <i class="flaticon-delete lh-1 me-8"></i>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="mb-15 mb-md-30 d-sm-flex align-items-center justify-content-between"
          >
            <h6 class="card-title fw-bold mb-0">
              Brand
              <span class="badge bg-primary fs-20" v-if="openedMake">{{
                openedMake
              }}</span>
            </h6>
            <div
              class="card-select mt-10 mt-md-0 mb-10 mb-md-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5"
              v-if="openedMake"
            >
              <span
                class="fw-medium text-muted me-8"
                @click="addNewBrand()"
                style="cursor: pointer"
                >+ brand for {{ openedMake }}
              </span>
            </div>
            <!-- <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control shadow-none fw-medium ps-12 pt-8 pb-8 pe-12 letter-spacing"
                  placeholder="Search"
                  v-model="searchInput"
                  @input="searchBrand"
                />
                <button
                  class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1"
                  type="button"
                >
                  <i
                    class="flaticon-search-interface-symbol position-relative"
                  ></i>
                </button>
              </div>
            </form> -->
          </div>
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    Brand Name
                  </th>
                  <!-- <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >

              </th> -->
                  <!-- <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                CUSTOMER
              </th> -->
                  <!-- <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                TOTAL
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                PROFIT
              </th> -->
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody v-if="!openedMakeFull">
                <tr v-for="br in paginatedBrands" :key="br.id">
                  <td class="shadow-none lh-1 fw-medium">
                    {{ br.attributes.name }}
                  </td>

                  <td class="shadow-none lh-1 fw-medium pe-0">
                    <div class="dropdown">
                      <button
                        class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="flaticon-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <!-- <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li> -->
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="openEditBrand(br)"
                          >
                            <i class="flaticon-pen lh-1 me-8"></i>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="deleteBrandMethode(br.id)"
                          >
                            <i class="flaticon-delete lh-1 me-8"></i>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else >
                <tr v-for="br in brands" :key="br.id">
                  <td class="shadow-none lh-1 fw-medium">
                    {{ br.attributes.name }}
                  </td>

                  <td class="shadow-none lh-1 fw-medium pe-0">
                    <div class="dropdown">
                      <button
                        class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="flaticon-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <!-- <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li> -->
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="openEditBrand(br)"
                          >
                            <i class="flaticon-pen lh-1 me-8"></i>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            @click.prevent="deleteBrandMethode(br.id)"
                          >
                            <i class="flaticon-delete lh-1 me-8"></i>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div
              class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
            >
              <p class="mb-0 text-paragraph">
                Showing <span class="fw-bold"> 15</span> out of
                <span class="fw-bold"> </span> results
              </p>
               <nav class="pagination-area d-md-flex mb-25 justify-content-between align-items-center">
    <p class="mb-0 text-paragraph">
      Showing <span class="fw-bold">{{ paginatedBrands.length }}</span> out of
      <span class="fw-bold">{{ totalItems }}</span> results
    </p>
    <nav class="mt-15 mt-md-0">
      <ul class="pagination mb-0">
        <li class="page-item">
          <a class="page-link" aria-label="Previous" @click.prevent="prevPage">
            <i class="flaticon-chevron-1"></i>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" aria-label="Next" @click.prevent="nextPage">
            <i class="flaticon-chevron"></i>
          </a>
        </li>
      </ul>
    </nav>
 </nav>            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchMakes,
  fetchBrands,
  editMake,
  postMake,
  editBrand,
  deleteMake,
  deleteBrand,
  postBrand,
  fetchBrandMyMake,
  search,
} from "@/services/apiService";
import UpdateModal from "@/components/VehicleCategories/EditCategory/EditCategory.vue";
import EditMake from "@/components/VehicleCategories/EditMake/EditMake.vue";
import AddBrand from "../AddNewBrand/AddNewBrand.vue";
import EditBrand from "../EditBrand/EditBrand.vue";
export default {
  name: "CategoryList",
  components: {
    UpdateModal,
    EditMake,
    EditBrand,
    AddBrand,
  },
  data() {
    return {
      categories: [],
      ModalVisible: false,
      categoryEdit: "",
      EditMakeModal: false,
      makes: [],
      makeToEdit: "",
      brands: [],
      openedMake: "",
      openedMakeFull: "",
      showAddBrand: false,
      editBrandModal: false,
      brandToEdit: "",
            currentPage: 1,
pageSize: 3,
searchInput:""
    };
  },
  computed:{
     totalItems() {
      return this.brands.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    paginatedBrands() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.brands.slice(startIndex, endIndex);
    },
  },
  methods: {
  async searchMake() {
    this.makes= []
      try {
        const { data } = await search('makes', 'name', '$contains', this.searchInput);
        this.makes = data.data;
       } catch (error) {
        console.error('Error searching makes:', error);
       }
    },
      async   searchBrand(){
  const {data} = await search('brands','name','$contains',this.searchInput)
 this.brands =data.data
} ,
       goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    closeAddBrand() {
      this.showAddBrand = false;
    },
     async deleteBrandMethode(id) {
  const res = await deleteBrand(id);
  if (res) {
    this.brands = this.brands.filter(item => item.id !== id);
  }
},

   async    editBrandMethod(event){
    if(event.name , event.id){
const updateBr= await editBrand(event.id , {data : { name : event.name}})
    if(updateBr){
      this.editBrandModal = false
      this.brands.forEach(item => {
           if( item.id ===event.id  && item.attributes && item.attributes.name ){
         item.attributes.name = event.name
           }
      })
    }
    }
    },
    addNewBrand() {
      this.showAddBrand = true;
    },
  openEditBrand(brand) {
  //  console.log(brand);
  this.editBrandModal = true;
  this.brandToEdit = brand;
},

    closeEditBrand(){
      this.editBrandModal = false
    },
    async CreateANewBrand(event) {
      if (event.name && event.make) {
        const res = await postBrand({
          data: { name: event.name, make: event.make },
        });
        console.log(res);
        (this.showAddBrand = false), this.brands.push(res.data);
        this.getMakes();
      }
    },
    closeMake() {
      this.EditMakeModal = false;
    },
    async getMakes() {
      const { data } = await fetchMakes();
      this.makes = data;
      console.log(this.makes);
    },
    async openBrandsFormMake(make) {
      this.makes.forEach((m) => (m.selected = false));
      make.selected = true;

      if (
        make &&
        make.attributes &&
        make.attributes.brands &&
        make.attributes.brands.data
      ) {
        this.brands = make.attributes.brands.data;
        this.openedMake = make.attributes.name;
        this.openedMakeFull = make;
      }
    },

    async getAllMakes() {
      const { data } = await fetchBrands();
      this.brands = data;
    },
    async deleteMakeMeth(makeId) {
      try {
        await deleteMake(makeId);
        await this.getMakes();
      } catch (error) {
        console.error(`Error deleting make with ID ${makeId}:`, error);
      }
    },
    async editMake(event) {
      try {
        if (event.id && event.name) {
          this.EditMakeModal = false;
          const updatedData = await editMake(event.id, {
            data: { name: event.name },
          });
          await this.getMakes();
        }
      } catch (error) {
        console.error("Error editing make:", error);
      }
    },
    async deleteMake(makeId) {
      try {
        await deleteMake(makeId);
        await this.getMakes();
      } catch (error) {
        console.error(`Error deleting make with ID ${makeId}:`, error);
      }
    },
    async addAMake(event) {
      if (event.name) {
        const addM = await postMake({ data: { name: event.name } });
        if (addM) {
          await this.getMakes();
        }
      }
    },

    openEditMake(make) {
      this.EditMakeModal = true;
      console.log(make);
      this.makeToEdit = make;
    },
    openAdd() {
      this.ModalVisible = !this.ModalVisible;
    },

    closeModal() {
      this.ModalVisible = !this.ModalVisible;
    },
    async updated() {
      await this.fetchCategories();
      this.ModalVisible = !this.ModalVisible;
    },
    async change() {
      try {
        console.log("searchinput", this.searchInput);
        const data = await search(
          "category-vehicles",
          "name",
          "$contains",
          this.searchInput
        );
        console.log(data.data.data, "+ change ", this.categories);
        this.categories = data.data.data;
      } catch (error) {
        console.error("Error searching for vehicles:", error);
      }
    },
  },
  mounted() {
    this.getMakes();
    this.getAllMakes();
  },

  // mounted() {
  //   this.fetchCategories();
  // },
};
</script>

<style scoped lang="scss">
.hoverli:hover {
  color: white !important;
  background-color: #6560f0;
  padding-left: 5px;
  & .card-title {
    color: white;
  }
}

.selected {
  background-color: #6560f0;
  color: white !important;
}

.selected .card-title {
  color: white;
  padding: 5px;
}
</style>
