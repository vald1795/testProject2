<template>
    <div class="row">
        <div v-for="(product, index) in products" :key="index" class="col-md-4 mb-4">
            <div @click="routeToItemPage(product.id)" class="card shadow-sm ">
                <img :src="product.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title fs-lg-4">{{ product.name }}</h6>
                    <p class="card-text">{{ product.price }} грн</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    name: 'Item',
    methods: {
        routeToItemPage(id) {
            this.$router.push('/' + id)
        },
    }
}
</script>


