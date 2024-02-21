<template>
  <div class="main">
    <div class="container">
      <div class="image-container" ref="imageContainer">
        <div class="card" v-for="(image, key) in imagesData" :key="key">
          <div class="card-image" v-if="image && image.attributes &&  image.attributes.formats && image.attributes.formats.large.url && image.attributes.formats.large.width &&  image.attributes.formats.large.height  ">
 <input
                  type="radio"
                  :id="'radio_' + key"
                  v-model="coverImageIndex"
                  :value="key"
                  class="set_cover_button"
                  title="Set as a cover image"
                  style="cursor: pointer"
                />
            <div :id="galleryID">
              <a
                :href="getFullPhotoUrl(image.attributes.formats.large.url)"
                :data-pswp-width="image.attributes.formats.large.width"
                :data-pswp-height="image.attributes.formats.large.height"
                target="_blank"
                rel="noreferrer"
              >
                <img :src="getFullPhotoUrl(image.attributes.url)" alt="" />
              </a>

              <button class="delete-button" @click.prevent="deleteImage(image.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  name: 'SimpleGallery',
  props: {
    galleryID: String,
    images: Array,
  },
  data(){
    return{
      coverIndex: 0,
      coverImageIndex:0
    }
  },
  setup(props) {
    return {
      imagesData: props.images,
    };
  },
  watch :{
      coverImageIndex(newIndex) {
         this.$emit('coverImageIndex', newIndex);
    },
 images: {
      deep: true,
      handler :function(newValue){
   this.imagesData =  newValue
      }
    }
  } ,
  mounted() {
    if (!this.lightbox ) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.$props.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    }

  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
     handleIndexClick(index) {
      console.log('Index clicked:', index);
      this.coverIndex = index;

    },
    deleteImage(id) {
      this.$emit('deletePhoto' , id)
    },
    getFullPhotoUrl(relativeUrl) {
      const stockage = process.env.VUE_APP_STORAGE_URL;

      return `${stockage}${relativeUrl}`;
    },
  },
};
</script>

<style scoped>
 .container {
  max-width: 90rem;
  width: 95%;
   margin: 0 auto;
}

.image-container {
  overflow-x: auto;
  white-space: nowrap;
}

.card {
  color: #252a32;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin-right: 1rem;
}
.set_cover_button {
  position: absolute;
  left: 0;
    top:5px ;
  background-color: transparent;
  color: #0056b3;
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 999;
}
.card-image {
  position: relative;
  display: block;
  width: 200px;
  height: 120px;
}

.card-image img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 10px;
  border: none;
  background-color:white;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
}
</style>
