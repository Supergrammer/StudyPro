<template>
  <div id="topleft">
      <p class="main-title pl-6 pt-5 bounce">새로운 모임</p>
    <!-- <sequential-entrance> -->
        <v-col cols="6" sm="4" md="3" v-for="item in studyList" :key="item.id">
          <v-card elevation="0" max-width="300px">
            <v-img src="@/assets/images/back2.jpg" class="studyCardImg"></v-img>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-text>
              <span
                ><small>by Admin </small> / <small> Web Design </small> /
                <small> <i class="icon-comment"></i> 14</small></span
              >
              <p>
                Design must be functional and functionality must be translated
                into visual aesthetics
              </p>
              <a href="#" class="lead"
                >View details <i class="icon-arrow-right3"></i
              ></a>
            </v-card-text>
          </v-card>
        </v-col>
    <!-- </sequential-entrance> -->
  </div>
</template>

<script>
import StudyService from "@/services/study.service";
export default {
  data: () => ({
    studyList: [],

    groupModal: false,
  }),
  async created() {
    this.studyList = await StudyService.getAllStudy();
  },
  components: {
    // GroupModal: () => import("@/components/study/GroupModal")
  },
  methods: {
    viewDetail(studyInfo) {
      //console.log("viewde", studyInfo);
      this.groupModal = true;
      this.studySingle = studyInfo;
    },
    modalClose() {
      this.groupModal = false;
    }
  }
};
</script>

<style lang="sass">
@import '../../assets/scss/custom/bounceIn.scss'
</style>
<style>
#topleft {
  background-color: rgba(200,200,200,.2);
  height: 100%;
}

.studyCardImg {
  height: 140px;
  width: auto;
}
</style>
