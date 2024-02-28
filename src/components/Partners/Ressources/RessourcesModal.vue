   <template>
   <div  style="width: 100%;">
    <nav id="navbar-example2" class="navbar navbar-light bg-light">
      <a class="navbar-brand">Resources</a>
      <ul class="nav nav-pills">
        <li class="nav-item" v-if="ressources && ressources.villas && ressources.villas.data && ressources.villas.data.length > 0">
          <a class="nav-link" :class="{ active: villas }" @click="showVillas">Villas</a>
        </li>
        <li class="nav-item" v-if="ressources && ressources.vehicles && ressources.vehicles.data && ressources.vehicles.data.length > 0">
          <a class="nav-link" :class="{ active: vehicles }" @click="showVehicles">Vehicles</a>
        </li>
        <li class="nav-item" v-if="ressources && ressources.events && ressources.events.data && ressources.events.data.length > 0">
          <a class="nav-link" :class="{ active: events }" @click="showEvents">Events</a>
        </li>
      </ul>
    </nav>
              <div class="row row-cols-1 row-cols-md-3 pt-15" v-if="villas && ressources && ressources?.villas && ressources?.villas.data">
                <div class="col mb-4" v-for="villa in ressources?.villas?.data" :key="villa.id">
                  <div class="card h-100" v-if="villa?.attributes?.photos">
                    <img :src="urlPic(villa?.attributes?.photos?.data[0]?.attributes.url)" class="card-img-top img" alt="">
                    <div class="card-body">
                      <h5 class="card-title">{{ villa?.attributes?.name }}</h5>
                      <p class="card-text">{{truncatedDescription(villa?.attributes?.description)}}</p>
                    </div>
                  </div>
                </div>
              </div>
               <div class="row row-cols-1 row-cols-md-3" v-if="vehicles  && ressources && ressources?.vehicles && ressources?.vehicles?.data">
                <div class="col mb-4" v-for="vehicle in ressources?.vehicles?.data" :key="vehicle.id">
                    <div class="card h-100" v-if="vehicle?.attributes?.photos">
                      <img :src="urlPic(vehicle?.attributes?.photos?.data[0]?.attributes.url)" class="card-img-top img " alt=""
                       >
                      <div class="card-body">
                        <h5 class="card-title" v-if="vehicle?.attributes?.make && vehicle.attributes?.make ">{{ vehicle?.attributes?.make?.data?.attributes?.name }}</h5>
                            <p class="card-text">{{ truncatedDescription(vehicle?.attributes?.description) }}</p>

                      </div>
                    </div>
                  </div>
               </div>

               <div class="row row-cols-1 row-cols-md-3" v-if="events  && ressources && ressources?.events && ressources?.events?.data">
                <div class="col mb-4" v-for="event in ressources?.events?.data" :key="event.id">
                    <div class="card h-100" v-if="event?.attributes?.photos?.data">
                      <img :src="urlPic(event?.attributes?.photos?.data[0]?.attributes?.url)" class="card-img-top img" alt="">
                      <div class="card-body">
                        <h5 class="card-title">{{ event?.attributes?.name }}</h5>
                        <p class="card-text">{{truncatedDescription(event?.attributes?.description)}}</p>
                      </div>
                    </div>
                  </div>
                 </div>
                 </div>
                </template>
<script>
  export default {
    props: {
      show: Boolean,
      ressources: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        name: "",
        villas: true,
        vehicles: false,
        events: false,
      };
    },
    methods: {
        urlPic(url) {
  // if (villa && villa.photos && villa.photos.length > 0 && villa.photos[0].url) {
     return `${process.env.VUE_APP_STORAGE_URL}${url}`;

}
,truncatedDescription(description) {
       const phrases = description.split(/[.,!?]/);

       return phrases.slice(0, 4).join('. ') + '.';
    },
      closeModal() {
        this.$emit("close");
      },
      showVillas() {
        this.villas = true;
        this.vehicles = false;
        this.events = false;
      },
      showVehicles() {
        this.villas = false;
        this.vehicles = true;
        this.events = false;
      },
      showEvents() {
        this.villas = false;
        this.vehicles = false;
        this.events = true;
      }
    },
    mounted() {
      console.log(this.ressources, "ressource form")
      console.log('Photos:', this.ressources?.attributes?.villas[0]?.photos[0].url);
    }
  };
</script>
 <style lang="scss" scoped>
 .modal-animation-enter-active,
 .modal-animation-leave-active {
   transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
 }

 .modal-animation-enter-from,
 .modal-animation-leave-to {
   opacity: 0;
 }

 .modal-animation-inner-enter-active {
   transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
 }

 .modal-animation-inner-leave-active {
   transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
 }

 .modal-animation-inner-enter-from {
   opacity: 0;
   transform: scale(0.8);
 }

 .modal-animation-inner-leave-to {
   transform: scale(0.8);
 }

 .modal {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   width: 100vw;
   position: fixed;
   top: 0;
   left: 0;
   background-color: rgba(110, 110, 110, 0.7);
 }

 .modal-inner {
   position: relative;
   max-width: 1200px;
   width: 80%;
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
     0 2px 4px -1px rgba(0, 0, 0, 0.06);
   background-color: #fff;
   padding: 32px;
   text-align: center;

   .confirmation-text {
     font-size: 18px;
     margin-bottom: 24px;
   }

   .buttons {
     display: flex;
     justify-content: center;

     button {
       padding: 10px 20px;
       margin: 0 8px;
       border: none;
       border-radius: 5px;
       cursor: pointer;
       font-size: 16px;
       transition: background-color 0.3s ease;

       &.confirm-button {
         background-color: #6560f0;
         color: #fff;
       }

       &.cancel-button {
         background-color: #fff;
         color: #6560f0;
       }

       &:hover {
         background-color: #34495e;
       }
     }
   }

   .close-icon {
     position: absolute;
     top: 10px;
     right: 10px;
     font-size: 24px;
     color: #333;
     cursor: pointer;
   }


    .nav-item.active > .nav-link {
     background-color: #6560f0;
     color: white;
   }
 }

 .nav-item.active > .nav-link {
  background-color: #6560f0;
  color: white;
}
 .card-img-top {
    max-height: 200px;
    transition: transform 0.3s ease;
  }

  .card-img-top:hover {
    transform: scale(1.05);
  }
 </style>
