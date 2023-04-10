<template>
    <div class="d-flex flex-column">
        <h3 class="text-center">Категорії</h3>
        <div v-for="category in categoriesWithВсі" :key="category">
            <input type="checkbox" :value="category" v-model="selectedCategories" @change="handleCheckboxChange(category)">
            <label :for="category">{{ category }}</label>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            categoryAll: 'Всі',
        }
    },
    computed: {
        categoriesWithВсі() {
            return [this.categoryAll, ...this.categories]
        },
        selectedCategories: {
            get() {
                return this.$store.getters.getSelectedCategories;
            },
            set(value) {
                if (value.length > 1 && value.includes('Всі')) {
                    let index = value.indexOf(this.categoryAll)
                    value.splice(index, 1)
                }
                this.$store.dispatch('setSelectedCategories', value);
            }
        }
    },
    created() {
        this.selectedCategories = (this.$store.getters.getSelectedCategories.length > 0) ? this.$store.getters.getSelectedCategories : 'Всі';
        this.$emit('selectedCategoriesChanged', this.selectedCategories)
    },
    methods: {
        handleCheckboxChange(category) {
            if (category === this.categoryAll) {
                this.selectedCategories = [this.categoryAll]
            } else {
                const index = this.selectedCategories.indexOf(this.categoryAll)
                if (index >= 0) {
                    this.selectedCategories.splice(index, 1)
                }
            }
        }
    },
}
</script>