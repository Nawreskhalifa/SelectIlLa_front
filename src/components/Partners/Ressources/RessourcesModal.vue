<template>
    <transition name="modal-animation">
      <div v-show="show" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="show" class="modal-inner">
            <i class="fas fa-times close-icon" @click="closeModal"></i>

            <div class="card product-details-box">
               <nav id="navbar-example2" class="navbar navbar-light bg-light">
                <a class="navbar-brand">Ressources</a>
                <ul class="nav nav-pills">
                   <li class="nav-item"  :class="{ active: villas }">
                    <a class="nav-link" @click="showVillas">Villas</a>
                  </li>
                  <li class="nav-item"  :class="{ active: vehicles }">
                    <a class="nav-link" @click="showVehicles">Vehicles</a>
                  </li>
                  <li class="nav-item"  :class="{ active: events }" >
                    <a class="nav-link" @click="showEvents">Events</a>
                  </li>
                </ul>
              </nav>

              <div class="row row-cols-1 row-cols-md-3" v-if="villas && ressources && ressources.villas">
                <div class="col mb-4" v-for="villa in ressources.villas" :key="villa.id">
                  <div class="card h-100" v-if="villa.photos">
                    <img :src="urlPic(villa)" class="card-img-top img" alt="">
                    <div class="card-body">
                      <h5 class="card-title">{{ villa.name }}</h5>
                      <p class="card-text">{{truncatedDescription(villa.description)}}</p>
                    </div>
                  </div>
                </div>
              </div>
               <div class="row row-cols-1 row-cols-md-3" v-if="vehicles  && ressources && ressources.vehicles">
                <div class="col mb-4" v-for="vehicle in ressources.vehicles" :key="vehicle.id">
                    <div class="card h-100" v-if="vehicle.photos">
                      <img :src="urlPic(vehicle)" class="card-img-top img " alt=""
                       >
                      <div class="card-body">
                        <h5 class="card-title" v-if="vehicle.make && vehicle.make ">{{ vehicle.make.name }}</h5>
                            <p class="card-text">{{ truncatedDescription(vehicle.description) }}</p>

                      </div>
                    </div>
                  </div>
               </div>

               <div class="row row-cols-1 row-cols-md-3" v-if="events  && ressources && ressources.events">
                <div class="col mb-4" v-for="event in ressources.events" :key="event.id">
                    <div class="card h-100" v-if="event.photos">
                      <img :src="urlPic(event)" class="card-img-top img" alt="">
                      <div class="card-body">
                        <h5 class="card-title">{{ event.name }}</h5>
                        <p class="card-text">{{truncatedDescription(event.description)}}</p>
                      </div>
                    </div>
                  </div>
                 </div>
                 </div>
          </div>
        </transition>
      </div>
    </transition>
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
        urlPic(villa) {
  if (villa && villa.photos && villa.photos.length > 0 && villa.photos[0].url) {
     return `${process.env.VUE_APP_STORAGE_URL}${villa.photos[0].url.trim()}`;
  } else {
    return '';
  }
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
      console.log('Photos:', this.ressources.villas[0]?.photos[0].url);
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

   /* Increase specificity for active nav item */
   .nav-item.active > .nav-link {
     background-color: #6560f0;
     color: white;
   }
 }
 .card-img-top {
    max-height: 200px;
    transition: transform 0.3s ease; /* Add transition for smoother animation */
  }

  .card-img-top:hover {
    transform: scale(1.05); /* Increase size on hover */
  }
 </style>
