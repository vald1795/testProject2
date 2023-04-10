<template>
    <section class="d-flex col justify-content-center">
        <b-button class="back" variant="dark" @click="$router.push('/')">Back</b-button>
        <div class="card">
            <img :src="product.image" class="card-img-top" :alt="product.name">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.price }} грн</p>
                <p class="card-text"> <b>Опис:</b> <br> {{ product.description }}</p>

                <ul class="list-unstyled">
                    <li><b>Категорія:</b> {{ product.category }}</li>
                    <li><b>Довжина:</b> {{ product.length }} см</li>
                    <li><b>Ширина:</b> {{ product.width }} см</li>

                    <!-- Добавьте больше характеристик, если нужно -->
                </ul>
                <button class="btn btn-primary bucket-button">Додати в Кошик</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        product() {
            return (this.$store.getters.getProducts).find(e => e.id == this.$route.params.id);
        }
    }
};
</script>

<style scoped>
.card {
    margin: 20px;
    margin-top: 80px;
    margin-bottom: 0px;
}

.card-img-top {
    object-fit: cover;
}

.bucket-button {
    pointer-events: none;
    background: #f58569;
    border: none;
}

.back {
    position: absolute;
    top: 1.25rem;
    left: 0;
}

@media (min-width: 992px) {
    .card {
        margin-top: 20px;
    }

}
</style>