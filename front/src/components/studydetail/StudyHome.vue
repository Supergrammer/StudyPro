<template>
  <v-content id="study">
    <v-navigation-drawer absolute permanent expand-on-hover>
      <v-list>
        <v-list-item class>
          <v-list-item-avatar>
            <v-img :src="currentUser.profile_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ currentUser.nickname }}</v-list-item-title>
        </v-list-item>
        <v-divider class="ma-3 mb-0" />
        <v-list-item v-for="(menu, index) in menus" :key="index" @click="routeTo(menu.route)">
          <v-list-item-icon>
            <v-icon medium>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider class="mx-3" />
      <v-list>
        <v-list-item @click="routeTo()">
          <v-list-item-icon>
            <v-icon medium>check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>출석체크</v-list-item-title>
        </v-list-item>
        <v-list-item @click="routeTo()">
          <v-list-item-icon>
            <v-icon medium>settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title>관리자 메뉴</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card flat>
        <span >안녕하세요</span>
      <v-img src="@/assets/images/cherryblossom.jpg" aspect-ratio="7"></v-img>
      <v-row no-gutters justify="center">
        <v-col offset="1" cols="11" class="mr-7 mt-5">
          <v-card outlined>
              <v-row no-gutters>
                  <v-col cols="9">
                      <v-card outlined>
                          <study-mini-board/>
                      </v-card>
                  </v-col>
                  <v-col cols="3">
                      <v-card outlined>
                          <study-profile/>
                      </v-card>
                  </v-col>
              </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-content>
</template>

<script>
export default {
  components: {
    StudyMiniBoard: () =>
      import("@/components/studydetail/groupHome/StudyMiniBoard"),
    // StudyTodoList: () =>
    //   import("@/components/studydetail/groupHome/StudyTodoList"),
    StudyProfile: () =>
      import("@/components/studydetail/groupHome/StudyProfile"),
  },

  data() {
    return {
      menus: [
        { icon: "home", title: "홈으로" },
        { icon: "date_range", title: "일정 관리" },
        { icon: "library_books", title: "게시판" },
        { icon: "group", title: "스터디 멤버" },
        { icon: "developer_board", title: "WorkSpace" }
      ]
    };
  },

  computed: {
    currentUser() {
      return this.$store.getters["auth/getUser"];
    }
  },

  methods: {
    routeTo(route) {
      this.$router.push({ name: "board", params: { board: route } });
    }
  }
};
</script>