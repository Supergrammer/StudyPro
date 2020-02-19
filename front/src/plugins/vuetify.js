import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: { iconfont: "md" },
    theme: {
        themes: {
            light: {
                customTheme: "#404040",
                customOrange: "#E48E58",
                greenC: "#d5f1d6",
                redC: "#f7c2c2",
                blueC: "#d4d6f3",
                greyC: "#b6b6b6",
            },
        },
    },
})