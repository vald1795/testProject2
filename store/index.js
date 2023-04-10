
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

const expires = new Date(Date.now() + 60000);
Vue.use(Vuex)

const createStore = () => {
    return new Vuex.Store({
        state: {
            products: [
                {
                    id: 1,
                    name: 'Продукт 1',
                    description: 'Дуже гарні меблі',
                    image: '/images/image1.png',
                    category: 'Комоди',
                    price: 400,
                    length: 100,
                    width: 40,
                },
                {
                    id: 2,
                    name: 'Продукт 2',
                    description: 'Дуже гарні меблі',
                    image: '/images/image2.png',
                    category: 'Комоди',
                    price: 150,
                    length: 120,
                    width: 35,
                },
                {
                    id: 3,
                    name: 'Продукт 3',
                    description: 'Дуже гарні меблі',
                    image: '/images/image3.png',
                    category: 'Стільці',
                    price: 300,
                    length: 50,
                    width: 50,
                },
                {
                    id: 4,
                    name: 'Продукт 4',
                    description: 'Дуже гарні меблі',
                    image: '/images/image4.png',
                    category: 'Стільці',
                    price: 250,
                    length: 40,
                    width: 55,
                },
                {
                    id: 5,
                    name: 'Продукт 5',
                    description: 'Дуже гарні меблі',
                    image: '/images/image5.png',
                    category: 'Дивани',
                    price: 500,
                    length: 230,
                    width: 110,
                },
                {
                    id: 6,
                    name: 'Продукт 6',
                    description: 'Дуже гарні меблі',
                    image: '/images/image6.png',
                    category: 'Дивани',
                    price: 700,
                    length: 200,
                    width: 100,
                },
                {
                    id: 7,
                    name: 'Продукт 7',
                    description: 'Дуже гарні меблі',
                    image: '/images/image7.png',
                    category: 'Столи',
                    price: 800,
                    length: 150,
                    width: 90,
                },
                {
                    id: 8,
                    name: 'Продукт 8',
                    description: 'Дуже гарні меблі',
                    image: '/images/image8.png',
                    category: 'Столи',
                    price: 640,
                    length: 140,
                    width: 115,
                },
            ],
            priceFilter: null,
            widthFilter: null,
            lengthFilter: null,
            categoryFilter: [],
            selectedCategories: [],
            categoryAll: "Всі"
        },
        mutations: {
            updateWidthFilter(state, value) {
                state.widthFilter = value
            },
            updateLengthFilter(state, value) {
                state.lengthFilter = value
            },
            updatePriceFilter(state, value) {
                state.priceFilter = value
            },
            updateCategoryFilter(state) {
                const allCategories = state.products.map((product) => product.category);
                const uniqueCategories = allCategories.filter((category, index) => allCategories.indexOf(category) === index);
                state.categoryFilter = uniqueCategories;
            },
            updateSelectedCategory(state, value) {
                state.selectedCategories = value.split(',');
            },
            setPriceFilter(state, value) {
                state.priceFilter = value;
                Cookies.set('priceFilter', value, { expires });
            },
            setWidthFilter(state, value) {
                state.widthFilter = value;
                Cookies.set('widthFilter', value, { expires });
            },
            setLengthFilter(state, value) {
                state.lengthFilter = value;
                Cookies.set('lengthFilter', value, { expires });
            },
            setSelectedCategories(state, value) {
                state.selectedCategories = value;
                Cookies.set('selectedCategories', value, { expires });

            },
        },
        actions: {
            setPriceFilter({ commit }, value) {
                commit('setPriceFilter', value);
            },
            setWidthFilter({ commit }, value) {
                commit('setWidthFilter', value);
            },
            setLengthFilter({ commit }, value) {
                commit('setLengthFilter', value);
            },
            setSelectedCategories({ commit }, value) {
                commit('setSelectedCategories', value);
            },
            updateFilters({ commit, state }, req) {
                const maxLengthProduct = state.products.reduce((max, product) => {
                    return (product.length > max.length) ? product : max;
                });
                const maxWidthProduct = state.products.reduce((max, product) => {
                    return (product.width > max.width) ? product : max;
                });
                const maxPriceProduct = state.products.reduce((max, product) => {
                    return (product.price > max.price) ? product : max;
                });
                let widthCookie = Cookies.get('widthFilter') || maxWidthProduct.width;
                let priceCookie = Cookies.get('priceFilter') || maxPriceProduct.price;
                let lengthCookie = Cookies.get('lengthFilter') || maxLengthProduct.length;
                let categoryCookie = Cookies.get('selectedCategories') || state.categoryAll;
                if (req) {
                    if (req.headers.cookie) {
                        if (req.headers.cookie.split(';').find(c => c.trim().startsWith('width'))) {
                            widthCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('width')).split('=')[1];
                        }
                        if (req.headers.cookie.split(';').find(c => c.trim().startsWith('price'))) {
                            priceCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('price')).split('=')[1];
                        }
                        if (req.headers.cookie.split(';').find(c => c.trim().startsWith('length'))) {
                            lengthCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('length')).split('=')[1];
                        }
                        if (req.headers.cookie.split(';').find(c => c.trim().startsWith('selected'))) {
                            categoryCookie = decodeURIComponent(req.headers.cookie.split(';').find(c => c.trim().startsWith('selected')).split('=')[1]);
                        }
                    }
                };
                commit('updateWidthFilter', widthCookie);
                commit('updateLengthFilter', lengthCookie);
                commit('updatePriceFilter', priceCookie);
                commit('updateSelectedCategory', categoryCookie);
                commit('updateCategoryFilter');

            },
        },
        getters: {
            getProducts(state) {
                return state.products
            },
            getWidthFilter(state) {
                return state.widthFilter
            },
            getLengthFilter(state) {
                return state.lengthFilter
            },
            getPriceFilter(state) {
                return state.priceFilter
            },
            getCategories(state) {
                return state.categoryFilter
            },
            getSelectedCategories(state) {
                return state.selectedCategories
            },
            getcategoryAll(state) {
                return state.categoryAll
            },
        }
    })
}

export default createStore