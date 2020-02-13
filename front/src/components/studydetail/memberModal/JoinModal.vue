<template>
  <div id="joinmodal">
    <v-dialog v-model="open" persistent max-width="40%">
      <v-card class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          멤버 가입 요청을 승인하시겠습니까?
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
      <v-card v-if="this.isSuccess == true" class="px-0 pt-0">
        <v-card-text style="font-size:15px" align="center" class="pa-5">
          멤버 승인이 완료되었습니다
        </v-card-text>

        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>

          <v-btn
            color="error--text lighten-1 transparent"
            elevation="0"
            @click="sendSuccess"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
// import AlarmService from "@/services/alarm.service";

export default {
  name: "joinmodal",
  data: () => ({
    open: false,
    subalert: false,
    isSuccess: true
  }),
  props: ["joinModal"],
  watch: {
    joinModal() {
      this.open = this.joinModal;
    },
    subopen() {
      if (!this.subopen) {
        this.$emit("sendNo");
      }
    }
  },
  methods: {
    clickNo() {
      this.$emit("sendNo");
    },
    sendSuccess() {
      this.subalert = false;
      // this.checkModal=false;

      this.$emit("sendYes");
    },
    sendFail() {
      this.subalert = false;
      this.$emit("sendNo");
      // this.checkModal=false;
    },

    async clickYes() {
    //   this.subalert = true;
    //   this.subopen = false;
    //   //통신 시도
      

    //   // 통신 성공 실패 여부
    //   this.isSuccess = true;

    //   //통신 성공
    //   if (this.isSuccess) {
    //     this.subopen = false;
    //     this.$emit("sendYes");
    //   }

    //   //통신 실패
    //   else if (!this.isSuccess) {
    //     this.$emit("sendNo");
    //   }

    //   // this.$emit("sendYes")
    }
  }
};
</script>
