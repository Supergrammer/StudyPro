<template>
  <v-card outlined class="mx-auto mb-2" width="600">
    <v-card flat>
      <v-img :src="study_info.image_url" max-height="150px"></v-img>
    </v-card>
    <v-divider class="mx-2" />
    <v-card-title>
      <span class="Hline">{{ study_info.name }}</span>
    </v-card-title>
    <v-card-text class="text--primary">
      <span>스터디 소개 : {{ study_info.goal }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn class="primary" dark>출석 체크</v-btn>
      <v-btn class="green" dark>가입하기</v-btn>
      <v-btn class="error" dark>스터디 탈퇴</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  props: ["study_id"],
  data() {
    return {
      study_info: []
    };
  },

  created() {
    this.getStudyInfo();
  },

  methods: {
    async getStudyInfo() {
      const tmp = await StudyService.getStudyInfo({
        study_id: this.study_id
      });
      this.study_info = tmp.data;
    }
  }
};
</script>

<style scoped>
.Hline {
  font-size: 25px !important;
  font-weight: bold !important;
}
</style>