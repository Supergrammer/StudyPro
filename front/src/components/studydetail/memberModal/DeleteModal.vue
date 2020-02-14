<template>
  <div id="deletemodal">
    <v-dialog v-model="open" persistent max-width="40%">
      <v-card v-if="member" class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          {{ member.nickname }}님을 탈퇴시키겠습니까?{{member.id}}
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
          {{ member.nickname }}님이 탈퇴되었습니다.
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
  name: "deletemodal",
  data: () => ({
    open: false,
    subalert: false
  }),
  props: ["deleteModal", "member", "study_id"],
  watch: {
    deleteModal() {
      this.open = this.deleteModal;
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
      this.$emit("deleted");
      await StudyService.deleteUser({ study_id: this.study_id, user_id:this.member.id });
    }
  }
};
</script>
