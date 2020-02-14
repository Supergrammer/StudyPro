<template>
  <v-container>
    <v-list v-if="thisUser===thisCaptain">
      <v-toolbar elevation="0" style="border-bottom: 5px solid #736C70;">
        <v-toolbar-title>가입 요청 목록</v-toolbar-title>
      </v-toolbar>

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
              {{ newbie.user.gender == "M" ? "남성" : "여성" }}
            </p>
          </v-col>

          <v-col align="center" cols="5">
            <p style="font-size:14px" class="ma-0 pt-2">
              {{ newbie.user.email }}
            </p>
          </v-col>

          <v-col align="center" cols="1">
            <v-icon @click="viewGreeting(newbie)" color="black"
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
          <v-col align-self="center" align="center" cols="1">
            <v-avatar size="40px" class="ma-0">
              <img :src="member.profile_url" />
            </v-avatar>
          </v-col>

          <v-col align-self="center" align="center" cols="2">
            <p style="font-size:14px" class="ma-0">
              {{ member.nickname }}
            </p>
          </v-col>

          <v-col align-self="center" align="center" cols="1">
            <p style="font-size:14px" class="ma-0">
              {{ member.gender == "M" ? "남성" : "여성" }}
            </p>
          </v-col>

          <v-col align-self="center" align="center" cols="5">
            <p style="font-size:14px" class="ma-0">
              {{ member.email }}
            </p>
          </v-col>

          <v-col align="center" cols="3">
            <!-- <v-icon @click="viewGreeting(member)" color="black"
              >more_horiz</v-icon
            > -->
            <v-row>
              <v-col cols="6">
                <v-img
                  v-if="member.level == 'captain'"
                  src="@/assets/images/crown.png"
                  height="30px"
                  width="30px"
                />

                <v-btn
                  v-else-if="member.level == 'gold'"
                  @click="changeLevel(member)"
                  fab
                  dark
                  color="orange"
                  height="30px"
                  width="30px"
                >
                  <v-icon style="font-size:20px" class="mb-2" dark>G</v-icon>
                </v-btn>

                <v-btn
                  v-else-if="member.level == 'silver'"
                  @click="changeLevel(member)"
                  fab
                  dark
                  color="grey"
                  height="30px"
                  width="30px"
                >
                  <v-icon style="font-size:20px" class="mb-2" dark>S</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-icon
                  v-if="member.level != 'captain'"
                  @click="confirmDelete(member)"
                  color="red"
                  >close</v-icon
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item>

      <template>
        <delete-modal
          :delete-modal="deleteModal"
          :member="member"
          :study_id="study_id"
          v-on:close="modalClose"
        />
      </template>
    </v-list>
  </v-container>
</template>

<script>
import StudyService from "@/services/study.service";

export default {
  props: ["study_id"],

  data: () => ({
    thisUser:"",
    thisCaptain:"",


    flag: false,
    acceptModal: false,
    declineModal: false,
    greetingModal: false,
    deleteModal: false,
    newbie: {},
    member: {},
    newbieList: [],
    memberList: []
  }),

  created() {
    
    this.getCaptain();
    this.something();
      console.log(this.thisCaptain);
      console.log(this.thisUser);

this.getApplyList();
    this.getjoinedUser();

  },

  components: {
    acceptModal: () =>
      import("@/components/studydetail/memberModal/AcceptModal"),
    declineModal: () =>
      import("@/components/studydetail/memberModal/DeclineModal"),
    greetingModal: () =>
      import("@/components/studydetail/memberModal/GreetingModal"),
    deleteModal: () =>
      import("@/components/studydetail/memberModal/DeleteModal")
  },
  methods: {



     getUser() {
      return this.$store.getters["auth/getUser"];
    },

    something() {
      this.thisUser = this.getUser().uid;

    },

    changeLevel(member) {

      // this.something();
      // console.log(this.cur);


      // console.log(this.memberList);
      // console.log(this.newbieList);
      // this.getCaptain();
      console.log(this.thisCaptain);
console.log(this.thisUser);

      





      console.log(member.level);
      // console.log(member.id);
      // console.log("clicked..!");

      this.getjoinedUser();
    },

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
    confirmDelete(member) {
      this.deleteModal = true;
      this.member = member;
    },
    modalClose() {
      this.acceptModal = false;
      this.declineModal = false;
      this.greetingModal = false;
      this.deleteModal = false;
      this.getApplyList();
      this.getjoinedUser();
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
    },

    getCaptain(){
      StudyService.getStudyInfo({ study_id: this.study_id }).then(
        thisCaptain => {
          this.thisCaptain = thisCaptain.data.captain;
        }
      );
    },






  }
};
</script>
