<template>
  <div class="multiselect-container col-md-6">
    <label class="d-block text-black fw-semibold mb-2">{{ label }}</label>

    <div class="selected-tags form-group mb-2" @click="toggleDropdown">
      <div v-if="selectedTags.length === 0" class="placeholder">{{ placeholder }}</div>
      <div v-else>
        <div v-if="multiSelect">
          <div v-for="(tag, index) in selectedTags" :key="index" class="tag">
            {{ tag.attributes ? tag.attributes.Name : tag.Name }}
            <span class="close-icon" @click.stop="removeTag(index)">x</span>
          </div>
        </div>
        <div v-else class="tag">
          <span>{{ selectedTags[0].attributes ? selectedTags[0].attributes.Name : selectedTags[0].Name }}</span>
          <span class="close-icon" @click="removeTag(0)" @click.stop="toggleDropdown">x</span>
        </div>
      </div>
    </div>

    <ul v-show="dropdownVisible" class="dropdown form-control" style="z-index:9999">
      <li v-for="(option, index) in filteredOptions" :key="index" @click="toggleSelection(option)">
        <span>{{ option.attributes ? option.attributes.Name : option.Name }}</span>
        <span v-if="multiSelect && isSelected(option)" class="checkmark">✔</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select tags...',
    },
    selectedTagsProp: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String
    },
    multiSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedTags: this.selectedTagsProp,
      dropdownVisible: false,
    };
  },
 computed: {
  filteredOptions() {
    return this.options.filter(option => {
      return !this.selectedTags.some(tag => tag.id === option.id);
    });
  },
},

  watch: {
    selectedTagsProp(newVal) {
      this.selectedTags = newVal;
    },
    selectedTags(newVal) {
      this.$emit('update:selected', newVal);
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    toggleSelection(option) {
      if (this.multiSelect) {
        if (!this.isSelected(option)) {
          this.selectedTags.push(option);
        } else {
          this.removeTag(this.selectedTags.findIndex(tag => tag.id === option.id));
        }
      } else {
        this.selectedTags = [option];
        this.dropdownVisible = false;
      }
    },
    removeTag(index) {
      this.selectedTags.splice(index, 1);
    },
    isSelected(option) {
      return this.selectedTags.some(tag => tag === option);
    },
  },
};
</script>

<style scoped>
/* Add this CSS */
.selected {
  background-color: #f0f0f0;
  font-weight: bold;
}

.multiselect-container {
  position: relative;
  width: 100%;
  display: inline-block;
}

.selected-tags {
  padding:12px 15px ;
  border: 1px solid #ccc;
  border-radius: 0px;
  cursor: pointer;
}

.placeholder {
  color: black !important ;
  background-color: white;
}

.tag {
  display: inline-flex;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
}

.close-icon {
  cursor: pointer;
  margin-left: 4px;
}

.dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 4px;
  width: 100%;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}

.checkmark {
  float: right;
}
</style>
