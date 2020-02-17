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
      <v-card-subtitle class="gray--text pt-1 pl-7">
        <span>{{ study_info.goal }}</span>
      </v-card-subtitle>
      <v-card-subtitle class="black--text">
        <span class="subline">
          스터디 소개 :
          <br />
        </span>
        <span class="subtxt pl-2">{{ study_info.description }}</span>
      </v-card-subtitle>
      <v-divider class="mx-2" />
      <v-card-actions class="mb-2">
        <v-row justify="center">
          <v-btn class="primary mr-2" dark>출석 체크</v-btn>
          <v-btn class="green" dark @click="modalOpen" v-if="!isJoined">가입하기</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <modal :open-modal="modal" v-on:close="modalClose">
      <template v-slot:toolbar v-if="reg_message == ''">
        <v-toolbar class="pa-0 customTheme white--text">가입신청</v-toolbar>
      </template>
      <template v-slot:text>
        <div v-show="reg_message == ''">
          <p>신청글</p>
          <v-textarea outlined hide-details v-model="comment"></v-textarea>
        </div>
        {{reg_message}}
      </template>
      <template v-slot:btn>
        <div class="text-end pr-3 pb-3">
          <v-btn elevation="0" @click="regGroup" v-show="reg_message == ''">가입신청</v-btn>
          <v-btn elevation="0" @click="modalClose" v-show="reg_message != ''">확인</v-btn>
        </div>
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
      comment: "",
      reg_message: "",
      isJoined: false
    };
  },
  components: {
    modal: () => import("@/components/base/Modal")
  },
  async created() {
    this.getStudyInfo();
    var res = await StudyService.getStudyInfo({ study_id: this.study_id }).then(
      res => {
        return res.data;
      }
    );
    if (res.level) {
      this.isJoined = true;
    } else {
      this.isJoined = false;
    }
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
        comment: this.comment
      };

      var res = await StudyService.applyStudy(payload).then(res => {
        return res.data;
      });
      if (res.state == "success") {
        this.reg_message = "가입신청을 완료했습니다";
      } else {
        this.reg_message = res.data.detail;
      }
    },

    modalOpen() {
      this.comment = "";
      this.modal = true;
    },

    modalClose() {
      this.reg_message = "";
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
.subline {
  font-size: 18px !important;
}
.subtxt {
  font-size: 15px !important;
  color: #808080 !important;
}
</style>
