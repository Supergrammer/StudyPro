<template>
  <v-container>
    <v-list v-if="flag === false">
      <v-toolbar elevation="0" style="border-bottom: 5px solid #736C70;">
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

      <v-list-item v-for="newbie in newbieList" :key="newbie.id">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="1" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="newbie.user.profile_url" />
            </v-avatar>
          </v-col>

          <v-col align="center" cols="2">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.nickname }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.gender }}
            </p>
          </v-col>

          <v-col align="center" cols="5">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.email }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="viewGreeting(newbie.user)" color="black"
              >more_horiz</v-icon
            >
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="confirmAccept(newbie)" color="green">check</v-icon>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="confirmDecline(newbie)" color="red">close</v-icon>
          </v-col>
        </v-row>
      </v-list-item>

      <template>
        <accept-modal
          :accept-modal="acceptModal"
          :newbie="newbie"
          :study_id="study_id"
          v-on:close="modalClose"
        />
      </template>

      <template>
        <decline-modal
          :decline-modal="declineModal"
          :newbie="newbie"
          :study_id="study_id"
          v-on:close="modalClose"
        />
      </template>

      <template>
        <greeting-modal
          :greeting-modal="greetingModal"
          :newbie="newbie"
          v-on:close="modalClose"
        />
      </template>
    </v-list>

    <v-list>
      <v-toolbar elevation="0" style="border-bottom: 5px solid #736C70;">
        <v-toolbar-title>스터디 팀원</v-toolbar-title>
      </v-toolbar>

      <v-list-item v-for="member in memberList" :key="member.id">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="1" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="member.profile_url" />
            </v-avatar>
          </v-col>

          <v-col align="center" cols="2">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ member.nickname }}
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
            <v-icon @click="viewGreeting(member)" color="black">more_horiz</v-icon>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  props: ["study_id"],

  data: () => ({
    flag: false,
    acceptModal: false,
    declineModal: false,
    greetingModal: false,
    newbie: {},
    member:{},
    newbieList: [],
    memberList: []
  }),

  created() {
    this.getApplyList();
    this.getjoinedUser();
  },
  components: {
    acceptModal: () =>
      import("@/components/studydetail/memberModal/AcceptModal"),
    declineModal: () =>
      import("@/components/studydetail/memberModal/DeclineModal"),
    greetingModal: () =>
      import("@/components/studydetail/memberModal/GreetingModal")
  },
  methods: {
    something() {},
    confirmAccept(newbie) {
      this.acceptModal = true;
      this.newbie = newbie;
    },
    confirmDecline(newbie) {
      this.declineModal = true;
      this.newbie = newbie;
    },
    viewGreeting(newbie) {
      this.greetingModal = true;
      this.newbie = newbie;
    },
    modalClose() {
      this.acceptModal = false;
      this.declineModal = false;
      this.greetingModal = false;
      this.getApplyList();
    },
    getApplyList() {
      StudyService.getApplyList({ study_id: this.study_id }).then(
        newbieList => {
          this.newbieList = newbieList.data;
        }
      );
   
    },
    getjoinedUser() {
      StudyService.getjoinedUser({ study_id: this.study_id }).then(
        memberList => {
          this.memberList = memberList.data;
       
        }
      );
    }
  }
};
</script>
