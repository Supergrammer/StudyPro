<template>
  <div id="greetingmodal">
    <v-dialog v-model="open" persistent max-width="40%">
      <v-card v-if="newbie" class="px-0 pt-0">
        <v-card-text style="font-size:15px; border-bottom: 1px solid #E5C1D4" class="pa-5">
          가입인사
        </v-card-text>

        <v-card-text style="font-size:15px" class="pa-5">
          <p v-html="newbie.comment"></p>
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
export default {
  name: "greetingmodal",
  data: () => ({
    open: false,
  }),
  props: ["greetingModal", "newbie"],
  watch: {
    greetingModal() {
      this.open = this.greetingModal;
    },
    newbie(){
      this.newbie.comment = this.newbie.comment.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  },
  methods: {
    clickClose() {
      this.$emit("close");
    }
  }
};
</script>
