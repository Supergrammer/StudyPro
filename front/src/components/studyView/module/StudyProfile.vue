<template>
  <div>
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
        <v-btn class="green" dark @click="regGroup">가입하기</v-btn>
        <v-btn class="error" dark>스터디 탈퇴</v-btn>
      </v-card-actions>
    </v-card>
    <modal :open-modal="modal" v-on:close="modalClose">
      <template v-slot:text>
        <p>{{reg_message}}</p>
      </template>
    </modal>
  </div>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  props: ["study_id"],
  data() {
    return {
      study_info: [],
      modal: false,
      reg_message: '',
    };
  },
  components:{
    modal: () => import('@/components/base/Modal')
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
    },

    async regGroup() {
      var payload = {
        study_id: this.study_id,
        comment: ""
      };
      var res = await StudyService.applyStudy(payload);
      if (res.data.state == "success") {
        this.reg_message = "가입신청을 완료했습니다";
        this.modal = true;
      } else {
        this.reg_message = res.data.detail;
        console.log(res.data.detail)
        this.modal = true;
      }
      console.log(res);
    },

    modalClose(){
      this.modal = false;
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
