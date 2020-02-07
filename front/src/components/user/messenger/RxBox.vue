<template>
  <v-list>
    <v-list-item>
      <v-row style="border-bottom: 5px solid #1C6EA4;">
        <v-col align="center" cols="2">
          <span>보낸 사람</span>
        </v-col>

        <v-col align="center" cols="8">
          <span>제 목</span>
        </v-col>

        <v-col align="center" cols="2">
          <span>받은 시간</span>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-for="item in rsvMsg" :key="item.title">
      <v-card elevation="0" width="1500" @click="viewDetail(item)">
        <v-row style="border-bottom: 1px solid #E5C1D4;">
          <v-col cols="2" align="center">
            <v-avatar size="40px" class="ma-0">
              <img :src="item.from.profile_url" />
            </v-avatar>
            <p style="font-size:14px" class="ma-0 pt-2">{{ item.from.nickname }}</p>
          </v-col>

          <v-col align-self="center" cols="8">
            <v-row>
              <span style="font-size:15px" class="ma-0">
                <v-icon v-if="item.check" style="color:grey">mdi-email</v-icon>
                <v-icon v-else style="color:black">mdi-email</v-icon>
                {{ item.title }}
              </span>
            </v-row>
          </v-col>

          <v-col align-self="center" cols="2">
            <span style="font-size:15px" class="ma-0">
              {{item.created_date.substr(0, 10)}}
              {{item.created_date.substr(11, 5)}}
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-list-item>
    <template>
      <group-modal
        :group-modal="groupModal"
        :item="item"
        :tab="rxmsg"
        v-on:close="modalClose"
        v-on:clickRes="modalReload"
      />
    </template>
  </v-list>
</template>

<script>
import AlarmService from "@/services/alarm.service"
export default {
  data: () => ({
    groupModal: false,
    item: {},
    rxmsg: "rx",
    rxBox: []
  }),
  props: ["tab"],
  computed: {
    isAuth: function() {
      return this.$store.getters.isAuth;
    },
    rsvMsg : function() {
      return this.rxBox
    }
  },
  components: {
    GroupModal: () => import("@/components/user/messenger/MsgReceiveModal")
  },
  methods: {
    viewDetail(item) {
      this.groupModal = true;
      this.item = item;
    },
    async modalClose() {
      const rsvMsg = await AlarmService.getReceivedAlarm();
      this.rxBox = rsvMsg.data;
      this.groupModal = false;
    },
    modalReload() {
      this.groupModal = false;
      this.groupModal = true;
    }
  },
  async created() {
    const rsvMsg = await AlarmService.getReceivedAlarm();
    this.rxBox = rsvMsg.data;
  },
  watch: {
      async tab(t){
        if (t === 0) {
          const rsvMsg = await AlarmService.getReceivedAlarm();
          this.rxBox = rsvMsg.data;
        }
      }
  }
};
</script>
