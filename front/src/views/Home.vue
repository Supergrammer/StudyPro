<template>
  <v-content app id="home" class="pa-0">
    <v-carousel
      interval="3000"
      cycle
      height="400"
      width="100%"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="n in 5" :key="n">
        <router-link to=user/signup text-decoration="none">

            <v-img v-if="n==1" src="@/assets/images/pororo.jpg"></v-img>
            <v-img v-if="n==2" src="@/assets/images/pingoo.jpg"></v-img>
             <v-img v-if="n==3" src="@/assets/images/bono.jpg"></v-img>
            <v-img v-if="n==4" src="@/assets/images/back7.jpg"></v-img>
            <v-img v-if="n==5" src="@/assets/images/back11.jpg"></v-img>
            </router-link>


        <!-- <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet> -->
      </v-carousel-item>
    </v-carousel>

    <!-- <v-img src="@/assets/images/back11.jpg" aspect-ratio="9"/> -->
    <!-- <v-container class="mx-10"> -->

    <v-row justify="center">
      <v-col cols="12" lg="9" md="12" sm="12">
        <!-- <v-card class="pa-1" outlined tile> -->
        <top-left />
        <!-- </v-card> -->
      </v-col>
      <v-col lg="3" class="d-none d-lg-block">
        <v-card class="pa-1" outlined tile>
          <top-right />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-1 transparent" outlined tile>
          <middle />
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </v-content>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      items:[
        {avatar:"@/assets/images/pengsoo.jpg"},
        {avatar:"https://lh3.googleusercontent.com/proxy/BrygeoVAlP2KobI6jyhQ6rLAITSeAncXc0e-Sm9W5vzUz-OJsKT7u2e0OEBkeDOvJtQ6aqazQUlpbUb5QlfDcyQd-8pC8vlW9Su2ux8Y4Ki_idbRfVXT"},
        { avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
      ],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },

  components: {
    TopLeft: () => import("@/components/home/TopLeft"),
    TopRight: () => import("@/components/home/TopRight"),
    Middle: () => import("@/components/home/Middle")
  }
};
</script>
