<template>
  <div id="mypage">
    <v-form v-if="isAuth">
      <v-card flat>
        <v-tabs vertical>
          <v-tab class="justify-start py-3">
            <!-- <v-icon left>mdi-account</v-icon> -->
            정보수정
          </v-tab>
          <v-tab class="py-3">
            <!-- <v-icon left>mdi-lock</v-icon> -->
            비밀번호변경
          </v-tab>

          <v-tab-item>
            <edit-profile />
          </v-tab-item>

          <v-tab-item>
            <manage-study />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-form>
    <request-signin v-else>
      <template v-slot:text>
        <p>로그인이 필요합니다</p>
      </template>
    </request-signin>
  </div>
</template>

<script>
export default {
  components: {
    EditProfile: () => import("@/components/user/mypage/EditProfile"),
    ManageStudy: () => import("@/components/user/mypage/ChangePassword"),
    requestSignin: () => import("@/components/base/RequestSignin")
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    }
  }
};
</script>
