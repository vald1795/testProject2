<template>
  <div>

    <div v-if="loading" class="text-center mt-5">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>

    <section v-else class="main-page d-flex  flex-column pt-4">
      <b-button v-b-toggle.sidebar-1 class="mb-3 toggle-filters d-xl-none dark">Фільтри</b-button>
      <div class="d-flex flex-column flex-xl-row align-items-center align-items-xl-start">
        <div class="col col-3 d-none d-xl-flex flex-column pt-2 filters">
          <categoryFilterComponent :categories="categories" @selectedCategoriesChanged="onUpdateCategories">
          </categoryFilterComponent>
          <filterComponent v-model="priceFilter" :metric="'грн'" :type="'price'">Ціна</filterComponent>
          <filterComponent v-model="widthFilter" :metric="'см'" :type="'width'">Ширина</filterComponent>
          <filterComponent v-model="lengthFilter" :metric="'см'" :type="'length'">Довжина</filterComponent>
        </div>
        <LazyItem class="col-12 col-xl-9" :products="filteredProducts"></LazyItem>
      </div>
    </section>


    <b-sidebar id="sidebar-1" class="custom-sidebar d-xl-none" title="Фільтри" shadow>
      <div class="px-3 py-2 d-flex flex-column justify-content-center">
        <categoryFilterComponent :categories="categories" @selectedCategoriesChanged="onUpdateCategories">
        </categoryFilterComponent>
        <filterComponent v-model="priceFilter" :metric="'грн'" :type="'price'">Ціна</filterComponent>
        <filterComponent v-model="widthFilter" :metric="'см'" :type="'width'">Ширина</filterComponent>
        <filterComponent v-model="lengthFilter" :metric="'см'" :type="'length'">Довжина</filterComponent>
      </div>
    </b-sidebar>
  </div>
</template>


<script>
import filterComponent from '@/components/filter/filterComponent'
import categoryFilterComponent from '@/components/filter/categoryFilterComponent'
import LazyItem from '@/components/lazyItem/LazyItem'

export default {
  components: {
    categoryFilterComponent,
    filterComponent,
    LazyItem,
  },
  layout: 'core',
  middleware(context) {
    context.store.dispatch('updateFilters', context.req)
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.price <= this.priceFilter
        && product.width <= this.widthFilter
        && product.length <= this.lengthFilter
        && this.visibleCategories.includes(product.category));
    },
    priceFilter: {
      get() {
        return this.$store.getters.getPriceFilter;
      },
      set(value) {
        this.$store.dispatch('setPriceFilter', value);
      }

    },
    widthFilter: {
      get() {
        return this.$store.getters.getWidthFilter;
      },
      set(value) {
        this.$store.dispatch('setWidthFilter', value);
      }
    },
    selectedCategories() {
      return this.$store.getters.getSelectedCategories;
    },
    lengthFilter: {
      get() {
        return this.$store.getters.getLengthFilter;
      },
      set(value) {
        this.$store.dispatch('setLengthFilter', value);
      }
    },
    products() {
      return this.$store.getters.getProducts;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    visibleCategories() {
      return this.selectedCategories.includes(this.$store.getters.getcategoryAll) ? this.categories : this.selectedCategories;
    }
  },

  mounted() {
    this.loading = false;
  },

  methods: {
    onUpdateCategories(value) {
      this.$store.dispatch('setSelectedCategories', value);
    },
  },

}
</script>

<style scoped>
.filters {
  background: #e9e2e3;
  border-radius: 10px;
}

.custom-sidebar>>>#sidebar-1 {
  width: 280px;
}

.toggle-filters {
  width: 150px;
  align-self: center;
  background: #343a40;
  border: none;
}
</style>