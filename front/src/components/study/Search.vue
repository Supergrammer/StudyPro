<template>
  <v-content id="contents" class="py-5">
    <v-row class="justify-center">
      <v-col class="pa-2 col-10 col-md-9">
        <!-- 검색 창 -->
        <v-autocomplete
          :items="recommendItems"
          :loading="isLoading"
          :search-input.sync="searchInput"
          clearable
          hide-details
          item-text="name"
          item-value="symbol"
          label="이름으로 검색"
          solo
          @keyup.enter="searchEnter()"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                찾으실
                <strong>모임이름</strong>
                을 입력해주세요.
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:item="{ item }" @click="selectAuto(item.name)">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
              >{{ item.name.charAt(0) }}</v-list-item-avatar
            >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>people</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
        <!-- 검색 창 끝 -->
      </v-col>
    </v-row>

    <!-- 상세 검색 -->
    <v-row class="justify-center">
      <v-col cols="10" class="pa-0">
        <v-expansion-panels>
          <v-expansion-panel hover>
            <v-expansion-panel-header>상세검색</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <span>카테고리</span>
                </v-col>
                <v-col cols="9" md="4" class="pa-0">
                  <span class="mr-3">대분류</span>
                  <v-overflow-btn
                    :items="majorItems"
                    v-model="major"
                    segmented
                    dense
                    style="width: 150px; display:inline-block"
                  ></v-overflow-btn>
                </v-col>
                <v-col cols="3" class="d-md-none"/>
                <v-col cols="9" md="4" class="pa-0">
                  <span class="mr-3">소분류</span>
                  <v-overflow-btn
                    :items="majorItems"
                    v-model="major"
                    segmented
                    dense
                    style="width: 150px; display:inline-block"
                  ></v-overflow-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <span>시작날짜</span>
                </v-col>
                <v-col cols="9" class="py-0">
                  <v-menu
                    ref="calendar"
                    v-model="calendar"
                    :close-on-content-click="false"
                    :return-value.sync="searchForm.startdate"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="searchForm.startdate"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        class="pt-0"
                        hide-details
                        style="max-width:150px"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchForm.startdate"
                      no-title
                      scrollable
                      @click:date="$refs.calendar.save(searchForm.startdate)"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <span>시간</span>
                </v-col>
                <v-col cols="5" class="pb-0 pr-0">
                  <timeselector
                    v-model="searchForm.starttime"
                    class="grey lighten-4"
                  />
                </v-col>
                <v-col cols="1" class="text-center">
                  <span>~</span>
                </v-col>
                <v-col cols="4" sm="3" class="pb-0 pl-0 text-end">
                  <timeselector
                    v-model="searchForm.endtime"
                    class="grey lighten-4"
                  />
                </v-col>
                <v-spacer />
              </v-row>

              <v-row>
                <v-col sm="3" class="pl-6 pb-0 pt-4">
                  <span>요일</span>
                </v-col>
                <v-col sm="9" class="pb-0 pt-1 pl-0">
                  <v-btn-toggle
                    v-model="searchForm.dayofweek"
                    multiple
                    dense
                    group
                  >
                    <v-btn>Mon</v-btn>
                    <v-btn>Tue</v-btn>
                    <v-btn>Wed</v-btn>
                    <v-btn>Thu</v-btn>
                    <v-btn>Fri</v-btn>
                    <v-btn>Sat</v-btn>
                    <v-btn>Sun</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <!-- 카테고리 -->
              <v-row> </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- 결과 테이블 -->
    <v-card class="col-10 offset-1">
      <v-toolbar color="customTheme" dark>
        <v-toolbar-title>Search Results</v-toolbar-title>
      </v-toolbar>
      <v-content v-if="noResult" class="text-center pt-10">
        <span>검색 대상을 찾지 못했습니다.</span>
      </v-content>
      <v-list
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
        v-if="displayItems.length > 0"
      >
        <v-list-group
          v-for="item in displayItems"
          :key="item.id"
          v-model="item.active"
          :prepend-icon="item.action"
          :disabled="isLoading"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-row>
                <v-col cols="12" md="5" class="pl-3 text-center">
                  <v-list-item-title v-text="item.name" class="text-overflow">
                  </v-list-item-title>
                </v-col>
                <v-col cols="6" sm="4" md="2" class="text-center">
                  <span>Mon, Fri</span>
                </v-col>
                <v-col cols="6" sm="4" md="2" class="text-center">
                  <span>{{
                    (item.start_time + "/" + item.end_time) | times
                  }}</span>
                </v-col>
                <v-col cols="6" sm="2" md="2" class="text-center">
                  <span>{{ (0 + "/" + item.user_limit) | limit }}</span>
                </v-col>
                <v-col
                  cols="6"
                  sm="2"
                  md="1"
                  class="text-center pr-3"
                  v-if="item.isopen"
                >
                  <v-icon class="mdi mdi-lock"></v-icon>
                </v-col>
              </v-row>
            </v-list-item-content>
          </template>
          <!-- 펼쳤을 때 화면 -->
          <template>
            <v-layout class="ma-2" row>
              <v-list-item :key="item.id">
                <v-list-item-content class="pt-0 pb-1 d-block">
                  <v-row class="px-2">
                    <!-- 내용 -->
                    <v-col cols="12" md="9">
                      <!-- 카테고리 -->
                      <v-row>
                        <v-col cols="4">
                          <span class="font-weight-bold">카테고리</span>
                        </v-col>
                        <v-col cols="8">{{ item.minor_class.name }}</v-col>
                      </v-row>
                      <!-- 현재상태 -->
                      <v-row>
                        <v-col cols="4">
                          <span class="font-weight-bold">상태</span>
                        </v-col>
                        <v-col cols="8">{{ item.status }}</v-col>
                      </v-row>
                      <!-- 스터디 소개글 -->
                      <v-row>
                        <v-col cols="4">
                          <span class="font-weight-bold">스터디 목표</span>
                        </v-col>
                        <v-col cols="8">{{ item.goal }}</v-col>
                      </v-row>
                      <!-- 시작시간 -->
                      <v-row>
                        <v-col cols="4">
                          <span class="pt-0 font-weight-bold">시작날짜</span>
                        </v-col>
                        <v-col cols="8">{{ item.start_date }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span class="pt-0 font-weight-bold">종료날짜</span>
                        </v-col>
                        <v-col cols="8">{{ item.end_date }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      class="justify-center align-center pa-0"
                    >
                      <v-btn
                        class="white lighten-3"
                        elevation="0"
                        @click="groupModal = true"
                      >
                        <span
                          class="dark--text"
                          style="text-decoration:underline;"
                          >view detail</span
                        >
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <group-modal
                :group-modal="groupModal"
                :study-info="item"
                v-on:close="modalClose"
              />
            </v-layout>
          </template>
        </v-list-group>
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
import Timeselector from "vue-timeselector";
//import api from "@/services";

export default {
  data: () => ({
    isLoading: false,
    searchInput: null,
    tab: null,
    busy: false,
    groupModal: false,
    calendar: false,
    durationOp: "",
    itemsDuration: ["Day", "Week", "Month", "Year"],
    searchForm: {
      name: "",
      startdate: "",
      starttime: "",
      endtime: "",
      dayofweek: [],
      duration: "",
      tags: "",
      minorClass: "",
      goal: ""
    },
    items: [],
    copyItems: [],
    recommendItems: [],
    displayItems: [],
    searchedItems: [],
    disLoading: false,
    noResult: false,
    major: -1,
    minor: -1,
    majorItems: [],
    minorItems: [],
  }),
  props:['id'],
  components: {
    GroupModal: () => import("@/components/study/GroupModal"),
    Timeselector
  },
  watch: {
    searchInput() {
      this.recommendItems = [];

      if (this.searchInput == "") {
        return;
      } else {
        for (var item of this.items) {
          if (item.name.includes(this.searchInput)) {
            this.recommendItems.push(item);
          }
        }
      }
    },
    async major() {
      this.minorItems = [];

      const minor_classes = await this.$store.dispatch(
        "study/getMinorClass",
        this.major
      );
      for (let i = 0; i < minor_classes.length; i++) {
        this.minorItems.push({
          value: minor_classes[i].id,
          text: minor_classes[i].name,
          callback: () => {}
        });
      }
      this.validation();
    }
  },
  methods: {
    async loadDeaultList() {
      this.items = await this.$store.dispatch("study/getAllStudy");
      this.copyItems = this.items.slice(0);

      this.displayItems = [];
      let len = this.copyItems.length < 20 ? this.copyItems.length : 20;
      for (var i = 0; i < len; i++) {
        this.displayItems.push(this.copyItems.shift());
      }
    },

    loadMore() {
      this.busy = true;
      setTimeout(() => {
        let len = 20;
        if (this.copyItems.length < 10) len = this.copyItems.length;
        for (var i = 0; i < len; i++) {
          this.displayItems.push(this.copyItems.shift());
        }
      }, 1000);
      this.busy = false;
    },

    async searchEnter() {
      this.busy = true;
      this.displayItems = [];
      this.noResult = false;
      this.copyItems = [];
      if (!this.searchInput) {
        await this.loadDeaultList();
        this.busy = false;
        return;
      } else {
        for (var item of this.items) {
          if (item.name.includes(this.searchInput)) {
            this.copyItems.push(item);
          }
        }
        let len = this.copyItems.length < 20 ? this.copyItems.length : 20;
        for (var i = 0; i < len; i++) {
          this.displayItems.push(this.copyItems.shift());
        }
      }
      this.searchInput = "";
      if (this.displayItems.length == 0) {
        this.noResult = true;
      }
      this.busy = false;
    },

    selectAuto(name) {
      this.searchInput = name;
    },

    modalClose() {
      this.groupModal = false;
    }
  },
  filters: {
    times(value) {
      let arr = value.split("/");
      let start = [Math.floor(arr[0] / 100), arr[0] % 100];
      let end = [Math.floor(arr[1] / 100), arr[1] % 100];
      return start[0] + ":" + start[1] + " ~ " + end[0] + ":" + end[1];
    },
    limit(value) {
      let arr = value.split("/");
      if (arr[0] == arr[1]) {
        return "무제한";
      }
      return value;
    }
  },
  async mounted(){
    this.majorItems = [];
    const getMajorRes = await this.$store.dispatch("study/getMajorClass"); //await api.getMajorClasses();
    for (let i = 0; i < getMajorRes.length; i++) {
      this.majorItems.push({
        value: getMajorRes[i].id,
        text: getMajorRes[i].name,
        callback: () => {}
      });
    }

    this.loadDeaultList();
  }
};
</script>

<style>
.v-text-field__details {
  display: none;
}
.v-list-item__icon {
  min-width: 24px !important;
}
</style>
