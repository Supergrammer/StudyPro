<template>
  <v-container>
    <v-list v-if="flag === false">
      <v-toolbar elevation="0" style="border-bottom: 5px solid #1C6EA4;">
        <v-toolbar-title>가입 요청 목록</v-toolbar-title>
      </v-toolbar>
      <!-- <v-list-item>
      <v-row style="border-bottom: 5px solid #1C6EA4;">
        <v-col align="center" cols="1">
          <span>사진</span>
        </v-col>

        <v-col align="center" cols="3">
          <span>닉네임</span>
        </v-col>

        <v-col align="center" cols="2">
          <span>성별</span>
        </v-col>

        <v-col align="center" cols="6">
          <span>이메일 주소</span>
        </v-col>
      </v-row>
    </v-list-item> -->

      <v-list-item v-for="newbie in newbieList" :key="newbie.name">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="1" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="newbie.avatar" />
            </v-avatar>
          </v-col>

          <v-col align="center" cols="2">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.name }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.gender }}
            </p>
          </v-col>

          <v-col align="center" cols="5">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.email }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="something()" color="black">more_horiz</v-icon>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="viewCheck(newbie)" color="green">check</v-icon>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="something()" color="red">close</v-icon>
          </v-col>
        </v-row>
      </v-list-item>

      <template>
      <join-modal
        :join-modal="joinModal"
        :newbie="newbie"
        v-on:close="modalClose"
      />
    </template>






    </v-list>

    <v-list>
      <v-toolbar elevation="0" style="border-bottom: 5px solid #1C6EA4;">
        <v-toolbar-title>스터디 팀원</v-toolbar-title>
      </v-toolbar>

      <v-list-item
        v-for="member in memberList"
        :key="member.name"
      >
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="1" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="member.avatar" />
            </v-avatar>
          </v-col>

          <v-col align="center" cols="2">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ member.name }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ member.gender }}
            </p>
          </v-col>

          <v-col align="center" cols="5">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ member.email }}
            </p>
          </v-col>

           <v-col align="center" cols="3">
          <v-icon @click="something()" color="black">more_horiz</v-icon>
          </v-col>



        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    flag: false,
    joinModal:false,
    newbie:{},
    newbieList: [
      {
        name: "아이유",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        email: "abc@naver.com",
        gender: "여성"
      }
    ],
    memberList: [
      {
        name: "뽀로로",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        email: "abc@naver.com",
        gender: "여성"
      },
      {
        name: "핑구",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        email: "abc@naver.com",
        gender: "여성"
      },
      {
        name: "보노보노",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        email: "abc@naver.com",
        gender: "남성"
      },
      {
        name: "신민아",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        email: "abc@naver.com",
        gender: "남성"
      }
    ]
  }),

  components: {
    JoinModal: () => import("@/components/studydetail/memberModal/JoinModal")
  },
  methods: {
    something() {},


    
    viewCheck(newbie) {
      this.joinModal = true;
      this.newbie = newbie;
    },
    async modalClose() {
    //   const rsvMsg = await AlarmService.getReceivedAlarm();
    //   this.rxBox = rsvMsg.data;
      this.joinModal = false;
    },
 

  }
};
</script>
