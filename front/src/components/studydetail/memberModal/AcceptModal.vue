<template>
  <div id="acceptmodal">
    <v-dialog v-model="open" persistent max-width="40%">
      <v-card v-if="newbie.user" class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          {{ newbie.user.nickname }}님의 가입 요청을 승인하시겠습니까?
        </v-card-text>

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-btn
            color="primary--text lighten-1 transparent"
            elevation="0"
            @click="clickYes"
            >예</v-btn
          >
          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="clickNo"
            >아니요</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subalert" max-width="40%">
      <v-card class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          멤버 승인이 완료되었습니다
        </v-card-text>

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>

          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="clickClose"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  name: "acceptmodal",
  data: () => ({
    open: false,
    subalert: false
  }),
  props: ["acceptModal", "newbie", "study_id"],
  watch: {
    acceptModal() {
      this.open = this.acceptModal;
    }
  },
  methods: {
    clickNo() {
      this.$emit("close");
    },
    clickClose() {
      this.subalert = false;
      this.$emit("close");
    },

    async clickYes() {
      this.subalert = true;
      this.$emit("close");
      await StudyService.joinStudy({ apply_id: this.newbie.id, accept: true });
    }
  }
};
</script>
