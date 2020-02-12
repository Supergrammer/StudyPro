<template>
  <!-- <v-container fluid ma-0 pa-0 fill-height> -->
  <v-card id="workspace_card" class="ma-0 px-1 pt-0 pb-0 customTheme lighten-2">
    <v-row class="my-0 py-0">
      <v-col :cols="talk ? 9 : 12" id="col" class="py-1 pr-1">
        <v-tabs height="95" grow icons-and-text centered dark color="cyan">
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tab href="#Board">
            WhiteBoard
            <v-icon>color_lens</v-icon>
          </v-tab>
          <v-tab href="#ViewShare">
            Share View
            <v-icon>computer</v-icon>
          </v-tab>
          <v-tab href="#NotePad">
            NotePad
            <v-icon>event_note</v-icon>
          </v-tab>

          <v-card>
            <v-btn class="px-9" height="95" @click="help">
              <v-icon large>help_outline</v-icon>
            </v-btn>
            <v-btn class="px-9" height="95" @click="exit">
              <v-icon large>power_settings_new</v-icon>
            </v-btn>
          </v-card>

          <v-tab-item id="Board">
            <v-row>
              <v-card outlined>
                <Board :socket="socket" :study_id="study_id" />
              </v-card>
            </v-row>

            <v-row>
              <v-card>
                <!-- <v-img src="@assets/images/back7.jpg"></v-img> -->
              </v-card>

            </v-row>
          </v-tab-item>
          <v-tab-item id="NotePad">
            <v-card outlined>
              <NotePad :socket="socket" :study_id="study_id" />
            </v-card>
          </v-tab-item>
          <v-tab-item id="ViewShare">
            <v-card outlined>
              <ViewShare
                :socket="socket"
                :user="user"
                :study_id="study_id"
                :connected_users="connected_users"
                @changeView="changeView"
              />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col align="center" justify="center" v-show="talk" cols="3" class="py-1 pl-0 pr-9">
        <v-card outlined tile>
          <v-row no-gutters hidden class="pa-0">
            <FaceTalk
              :socket="socket"
              :user="user"
              :study_id="study_id"
              @connected="connected"
              :sharing_id="sharing_id"
              :debuging="debuging"
            />
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-card outlined>
                <Chatting class="pa-0 ma-0" :socket="socket" :study_id="study_id" :user="user" />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <!-- </v-container> -->
</template>

<script>
import io from "socket.io-client";
import Board from "@/components/workspace/Board";
import NotePad from "@/components/workspace/NotePad";
import ViewShare from "@/components/workspace/ViewShare";
import FaceTalk from "@/components/workspace/FaceTalk";
import Chatting from "@/components/workspace/Chatting";

export default {
  data() {
    return {
      imgs: "back7.jpg",
      img: "../../assets/images/back7.jpg",
      tabs: null,
      socket: "",
      connected_users: [],
      sharing_id: "no one",
      debuging: true,
      talk: true
    };
  },

  components: {
    Board: Board,
    ViewShare: ViewShare,
    NotePad: NotePad,
    FaceTalk: FaceTalk,
    Chatting: Chatting
  },
  beforeCreate() {
    // if (!window.opener) {this.$router.push({name : 'home'})}

  },
  created() {
    // if (!window.opener) return
    this.user = this.debuging ? { 
      user_id: `${Math.ceil(Math.random() * 100000)}`,
      user_nickname: `${Math.ceil(Math.random() * 100000)}`,
      user_profile_url: 'http://15.164.245.201:8000/images/profile_default.png',

    } : {
      user_id: this.$store.getters['auth/getUser'].uid,
      user_nickname: this.$store.getters['auth/getUser'].nickname,
      user_profile_url: this.$store.getters['auth/getUser'].profile_url,
    }
    console.log(this.$store.getters['auth/getUser'])
    this.study_id = window.location.href.split('workspace/')[1]
    this.socket = io.connect(`http://70.12.247.73:8210/?study_id=${this.study_id}&user_id=${this.user.user_id}&user_nickname=${this.user.user_nickname}`, {
      // this.socket = io.connect(`https://15.164.245.201:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
        // this.socket = io.connect(`https://i02a106.p.ssafy.io:8210/?study_id=${this.study_id}&user_id=${this.user_id}`, {
          transports: ["websocket"],
      secure: true,
    });
  },
  mounted() {
    // if (!window.opener) return
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight + 100);

    window.onbeforeunload = () => {
      this.socket.emit("leave", {
        study_id: this.study_id,
        user_id: this.user.user_id,
        user_nickname: this.user.user_nickname
      });
    };

    this.socket.on("alreadyexist", () => {
      alert("못들어온단다 아가야");
      window.opener.closechild();
    });
  },
  methods: {
    changeView(change_id) {
      this.sharing_id = change_id;
    },

    help() {
      this.talk = !this.talk;
    },

    exit() {
      window.opener ? window.opener.closechild() : window.close();
    },

    connected(connected_users) {
      this.connected_users = connected_users.filter(user => user && user != -1);
    }
  }
};
</script>

<style scoped>
.siz {
  width: 100vh !important;
  height: 100vh !important;
}

/* @media only screen and (min-width: 960px) */
#workspace_card {
  max-width: 1530px;
  min-width: 1530px;
  padding-top: 0px !important;
}
</style>