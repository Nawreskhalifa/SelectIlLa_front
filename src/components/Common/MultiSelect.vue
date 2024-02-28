<template>
  <div class="multiselect-container col-md-6">
    <label class="d-block text-black fw-semibold mb-2">{{ label }}</label>

    <div class="selected-tags form-group mb-2" @click="toggleDropdown">
      <div v-if="selectedTags.length === 0" class="placeholder">{{ placeholder }}</div>
      <div v-else>
        <div v-if="multiSelect">
          <div v-for="(tag, index) in selectedTags" :key="index" class="tag" :data-selected="tag.id">
            {{ tag?.attributes?.name }}
            <span class="close-icon" @click.stop="removeTag(tag.id)">x</span>
          </div>
        </div>
        <div v-else class="tag" :data-selected="selectedTags[0].id">
          {{ selectedTags[0]?.attributes?.name }}
          <span class="close-icon" @click="removeTag(selectedTags[0].id)">x</span>
        </div>
      </div>
    </div>

    <ul v-show="dropdownVisible" class="dropdown form-control" style="z-index:9999">
      <li v-for="(option, index) in options" :key="index" @click="toggleSelection(option)" :class="{ 'selected': isSelected(option) }">
        {{ option?.attributes?.name }}
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
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
    },
    multiSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedTags: this.value,
      dropdownVisible: false,
    };
  },
  watch: {
    value(newVal) {
      this.selectedTags = newVal;
    },
    selectedTags(newVal) {
      this.$emit('input', newVal);
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    toggleSelection(tag) {
      if (this.multiSelect) {
        const index = this.selectedTags.findIndex(t => t.id === tag.id);
        if (index !== -1) {
          this.removeTag(tag.id);
        } else {
          this.selectedTags.push(tag);
          this.$emit('update:selected', this.selectedTags);
        }
      } else {
        this.selectedTags = [tag];
        this.$emit('update:selectedOne', this.selectedTags);
        this.toggleDropdown();
      }
    },
    removeTag(tagId) {
      this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagId);
      this.$emit('update:selected', this.selectedTags);
    },
    isSelected(option) {
      return this.selectedTags.some(tag => tag.id === option.id);
    },
  },
};
</script>

<style scoped>
.multiselect-container {
  position: relative;
  width: 100%;
  display: inline-block;
}

.selected-tags {
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 0px;
  cursor: pointer;
}

.placeholder {
  color: black !important;
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
  margin-bottom:4px
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

.selected {
  background-color: #f0f0f0;
  font-weight: bold;
  display: none;
}
</style>
