<template>
  <div id="header">
    <v-app-bar prominent flat height="56px">
      <v-row id="header-container">
        <!-- 로고 -->
        <v-col class="header-logo-container">
          <router-link to="/home">
            <v-img
              class="logo"
              src="@/assets/images/LogoText7.png"
              contain
            ></v-img>
          </router-link>
        </v-col>
        <!-- 로고 끝 -->
        <v-spacer></v-spacer>
        <!-- 메뉴 -->
        <v-col class="header-menu-container">
          <template>
            <v-tabs
              class="header-menu d-none d-sm-flex justify-center"
              show-arrows
            >
              <v-tab :to="menu.route" v-for="menu in menus" :key="menu.title">
                <v-icon left>{{ menu.icon }}</v-icon>
                <span class="d-none d-lg-flex">{{ menu.title }}</span>
              </v-tab>
            </v-tabs>
          </template>
        </v-col>
        <!-- 메뉴 끝 -->
        <v-spacer></v-spacer>
        <!-- 유저메뉴 / 햄버거 -->
        <v-col class="header-usermenu-container pl-0">
          <v-btn
            class="header-user-btn d-none d-sm-inline-block px-0"
            @click="toSignup"
            v-if="!isAuth"
            text
          >
            회원가입
          </v-btn>
          <v-btn
            class="header-user-btn d-none d-sm-inline-block px-0"
            @click="signinModal = true"
            v-if="!isAuth"
            text
          >
            로그인
          </v-btn>
          <v-app-bar-nav-icon
            @click="drawer = true"
            class="header-hamburger d-flex d-sm-none"
          ></v-app-bar-nav-icon>
          <!-- 유저 이미지 -->
          <!-- <v-container class="align-right"> -->
          <!--  -->
          <template v-if="isAuth">
            <v-btn to="/msgbox" id="mail-btn" elevation="0" color="white">
              <v-badge
                :content="numAlarm"
                :value="numAlarm"
                color="red"
                overlap
              >
                <v-icon style="color:black">mdi-email</v-icon>
              </v-badge>
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text x-large class="header-user pa-0" v-on="on">
                  <v-avatar size="30" class="mx-3">
                    <v-img :src="currentUser.profile_url"></v-img>
                  </v-avatar>
                  {{ currentUser.nickname }}
                  <v-icon class="mx-2">keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(menu, index) in usermenuitems"
                  :key="index"
                  @click="clickUserMenu(menu.name)"
                >
                  <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <!-- </v-container> -->
          <!-- 유저 이미지 끝 -->
        </v-col>
      </v-row>
    </v-app-bar>
    <!-- Signin Modal Boxs -->
    <signin-modal :signinModal="signinModal" v-on:close="signinClose" />
    <!-- Navigation Bar -->
    <v-navigation-drawer
      app
      right
      v-model="drawer"
      color="black"
      disable-resize-watcher
      id="navDrawer"
    >
      <div>
        <v-layout column transparent>
          <v-flex class="mt-2">
            <v-container>
              <v-icon large class="white--text" @click="drawer = false"
                >keyboard_arrow_right</v-icon
              >
              <router-link class="ml-10" to="/home" text-decoration="none">
                <span class="logo white--text font-weight-light">Study</span>
                <span class="logo white--text">PRO</span>
              </router-link>
            </v-container>
          </v-flex>
        </v-layout>
      </div>
      <v-divider class="black ma-1" />
      <!-- Navigations -->
      <v-list>
        <v-list-item
          v-for="item in navigations"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- User Pages -->
      <v-container class="my-0 pa-0" v-if="isAuth">
        <v-divider class="white ma-5 mt-0" />
        <v-layout column align-center>
          <v-flex>
            <router-link to="/user/mypage">
              <v-avatar size="100" class="mb-3">
                <img :src="currentUser.profile_url" alt />
              </v-avatar>
            </router-link>
            <p align="center" class="white--text subheading">
              {{ currentUser.nickname }}
            </p>
          </v-flex>
        </v-layout>
        <v-list>
          <v-list-item
            v-for="item in userpages"
            :key="item.title"
            :to="item.route"
          >
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <v-container v-else></v-container>
      <template v-slot:append>
        <v-card-actions class="justify-center" v-if="!isAuth">
          <v-btn text class="pink--text" @click="signinModal = true"
            >로그인</v-btn
          >
          <v-btn text class="pink--text transparent" elevation="0" to="/signup"
            >회원가입</v-btn
          >
        </v-card-actions>
        <v-card-actions class="justify-center" v-else>
          <v-btn text class="pink--text" @click="signout">로그아웃</v-btn>
        </v-card-actions>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import AlarmService from "@/services/alarm.service";
export default {
  name: "appHeader",
  data() {
    return {
      drawer: false,
      signinModal: false,
      checkbox: false,
      usermenu: false,
      menus: [
        { icon: "home", title: "홈", route: "/home" },
        { icon: "group", title: "스터디", route: "/study/search" },
        { icon: "library_books", title: "게시판", route: "/board/share" },
        { icon: "date_range", title: "일정", route: "/calendar/mycal" },
        { icon: "accessibility_new", title: "내 정보", route: "/user/mypage" }
      ],
      navigations: [
        { title: "스터디 홈", route: "/home" },
        { title: "스터디", route: "/study/search" },
        { title: "게시판", route: "/board/share" }
      ],
      userpages: [
        { title: "정보 수정", route: "/user/mypage" },
        { title: "일정 관리", route: "/calendar/mycal" }
      ],
      usermenuitems: [
        { title: "정보수정", name: "info" },
        { title: "가입목록", name: "groups" },
        { title: "일정관리", name: "calendar" },
        { title: "로그아웃", name: "signout" }
      ],
      userInfo: {},
      isLoading: false,
      numAlarm: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/getUser"];
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    }
  },
  components: {
    signinModal: () => import("@/components/user/SigninModal")
  },
  methods: {
    signinClose() {
      this.signinModal = false;
    },
    signout() {
      this.isLoading = true;
      this.$store.dispatch("auth/logout");
      this.isLoading = false;
      this.$router.push({ name: "home" });
    },
    clickUserMenu(name) {
      if (name == "info") {
        this.$router.push({ path: "/user/mypage" });
      } else if (name == "groups") {
        this.$router.push({ path: "/study/mygroups" });
      } else if (name == "calendar") {
        this.$router.push({ path: "/calendar/mycal" });
      } else if (name == "signout") {
        this.signout();
      }
    },

    // 회원가입 클릭 메소드
    toSignup() {
      var path = this.$route.path.split("/");
      if (path[1] == "user" && path[2] == "signup") {
        return;
      } else {
        this.$router.push({ name: "signup" });
      }
    }
  },
  created() {
    AlarmService.getAlarmNumber().then(numAlarm => {
      this.numAlarm = numAlarm.data.num_alarm;
    });
  }
};
</script>
