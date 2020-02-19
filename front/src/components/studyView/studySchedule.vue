<template>
  <div id="mycal">
    <div v-if="isAuth">
      <v-row class="ml-4" align="center" justify="center">
        <v-col cols="11" sm="12" offset="1" offset-sm="0">
          <v-expansion-panels style="z-Index:0;">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="ex-title">Calendar</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="py-0" flat>
                  <!-- 달력 -->
                  <v-row class="fill-height pt-0">
                    <v-col class="pt-0">
                      <v-sheet height="64">
                        <v-toolbar flat color="white">
                          <v-btn
                            outlined
                            class="mr-4"
                            color="grey darken-2"
                            @click="setToday"
                            >오늘날짜로</v-btn
                          >
                          <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="prev"
                          >
                            <v-icon small>mdi-chevron-left</v-icon>
                          </v-btn>
                          <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="next"
                          >
                            <v-icon small>mdi-chevron-right</v-icon>
                          </v-btn>
                          <v-toolbar-title>{{ title }}</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-menu bottom right>
                            <template v-slot:activator="{ on }">
                              <v-btn outlined color="grey darken-2" v-on="on">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item @click="type = 'day'">
                                <v-list-item-title>일</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = 'week'">
                                <v-list-item-title>주</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = 'month'">
                                <v-list-item-title>월</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = '4day'">
                                <v-list-item-title>4일</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-toolbar>
                      </v-sheet>

                      <!-- 달력 메인 -->
                      <v-sheet height="600">
                        <v-calendar
                          ref="calendar"
                          v-model="focus"
                          color="primary"
                          :events="events"
                          :event-color="getEventColor"
                          :now="today"
                          :type="type"
                          @click:event="showEvent"
                          @click:more="viewDay"
                          @click:date="viewDay"
                          @change="updateRange"
                        ></v-calendar>
                        <v-menu
                          v-model="selectedOpen"
                          :close-on-content-click="false"
                          :activator="selectedElement"
                          offset-y
                          :nudge-right="30"
                          max-width="500px"
                          min-width="350px"
                        >
                          <v-card color="grey lighten-4" flat>
                            <v-toolbar :color="selectedEvent.color" dark>
                              <v-toolbar-title
                                v-html="selectedEvent.name"
                              ></v-toolbar-title>
                              <v-spacer></v-spacer>
                              <div>
                                <v-btn
                                  icon
                                  class="dropPanel"
                                  @click="detail = !detail"
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                                <div
                                  :class="{ menu: detail }"
                                  class="detaildrop"
                                  style="position:absolute"
                                >
                                  <ul class="pl-0">
                                    <li
                                      v-for="item in detailMenus"
                                      :key="item.title"
                                    >
                                      <v-btn
                                        text
                                        @click="
                                          clickDetailMenu(
                                            item.value,
                                            selectedEvent
                                          )
                                        "
                                      >
                                        <span style="color:black">
                                          {{ item.title }}
                                        </span>
                                      </v-btn>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <v-dialog
                                v-model="delOpen"
                                max-width="400px"
                                style="overflow:hidden"
                              >
                                <v-card class="py-2 px-3">
                                  <p>정말 삭제하시겠습니까?</p>
                                  <v-row justify="end">
                                    <v-btn
                                      text
                                      color="dark lighten-2"
                                      @click="delOpen = false"
                                      >Cancel</v-btn
                                    >
                                    <v-btn
                                      text
                                      color="error"
                                      @click="eventDelete(selectedEvent)"
                                      >Ok</v-btn
                                    >
                                  </v-row>
                                </v-card>
                              </v-dialog>
                              <v-dialog
                                v-model="userOpen"
                                max-width="400px"
                                style="overflow:hidden"
                              >
                                <v-card class="py-2 px-3">
                                  <p>내 일정에 추가했습니다.</p>
                                  <v-row justify="end">
                                    <v-btn
                                      text
                                      color="dark lighten-2"
                                      @click="putUserSchedule()"
                                      >확인</v-btn
                                    >
                                  </v-row>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                            <v-card-text>
                              <p
                                v-text="
                                  selectedEvent.start +
                                    ' ~ ' +
                                    selectedEvent.end
                                "
                                class="text-center"
                              ></p>
                              <span v-html="selectedEvent.content"></span>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="secondary"
                                @click="selectedOpen = false"
                                >Cancel</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- 이슈 -->
          <v-row class="mt-8">
            <v-col cols="4" v-for="issue in issues" :key="issue.title">
              <p class="issue-container-title text-center">
                {{ issue.title }}
              </p>
              <!-- 이슈 박스 -->
              <div class="issue-container py-2 px-2">
                <!-- 할일 기능 -->
                <div v-if="issue.title == '할 일'">
                  <!-- 등록 버튼 -->
                  <v-btn
                    class="issue-reg-btn primary white--text mb-4"
                    width="100%"
                    @click="(modal = true), (isUpdate = false)"
                    >일정 등록</v-btn
                  >
                  <!-- 등록버튼 끝 -->
                  <!-- 기본 카드 -->
                  <draggable
                    class="list-default-group"
                    :list="default_items"
                    :group="{ name: 'issue', pull: 'clone', put: false }"
                    v-bind="dragOptions"
                  >
                    <transition-group
                      type="transition"
                      :name="!drag ? 'flip-list' : null"
                    >
                      <div
                        class="list-group-item"
                        v-for="item in default_items"
                        :key="item.id"
                      >
                        <v-card
                          class="issue-card default-card"
                          :color="item.color"
                          @click="isUpdate=true, propEvent=item, modal=true"
                        >
                          <v-container>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.user_nickname }}
                            </p>
                            <p class="issue-card-title" aria-disabled>
                              {{ item.name }}
                            </p>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.dates | filterDate }}
                            </p>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.start_time }} ~ {{ item.end_time }}
                            </p>
                          </v-container>
                        </v-card>
                      </div>
                    </transition-group>
                  </draggable>
                  <!-- 기본 카드 끝 -->
                </div>
                <!-- 할일 기능 끝 -->
                <!-- 등록된 카드 -->
                <div class="issue-list-container">
                  <draggable
                    class="list-group"
                    :list="issue.items"
                    v-bind="dragOptions"
                    @start="drag = true"
                    @end="drag = false"
                  >
                    <transition-group
                      type="transition"
                      :name="!drag ? 'flip-list' : null"
                    >
                      <div v-for="item in issue.items" :key="item.id">
                        <v-card
                          class="issue-card list-group-item"
                          :color="item.color"
                          @click="isUpdate=true, propEvent=item, modal=true"
                        >
                          <v-container>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.user_nickname }}
                            </p>
                            <p class="issue-card-title" aria-disabled>
                              {{ item.name }}
                            </p>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.dates | filterDate }}
                            </p>
                            <p class="issue-card-text" aria-disabled>
                              {{ item.start_time }} ~ {{ item.end_time }}
                            </p>
                          </v-container>
                        </v-card>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
                <!-- 등록된 카드 끝 -->
              </div>
              <!-- 이슈 박스 끝 -->
            </v-col>
            <!-- 이슈 끝 -->
          </v-row>
        </v-col>
      </v-row>
      <study-cal-modal
        :add-modal="modal"
        :is-update="isUpdate"
        :prop-event="propEvent"
        :study_id="study_id"
        v-on:close="(modal = false), (isUpdate = false)"
        v-on:reload="reload"
      />
    </div>
    <request-signin v-else />
  </div>
</template>

<script>
import { format } from "date-fns";
import WorkService from "@/services/work.service";

export default {
  props: ["study_id"],
  name: "mycal",
  data: () => ({
    today: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
    focus: "",
    type: "month",
    typeToLabel: {
      month: "월",
      week: "주",
      day: "일",
      "4day": "4일"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    userOpen: false,
    selectedOpen: false,
    events: [],
    propEvent: {},
    isUpdate: false,
    modal: false,
    detail: false,
    detailMenus: [
      { title: "내 일정에 추가", value: "movemycal" },
      { title: "일정 수정", value: "update" },
      { title: "삭제", value: "delete" }
    ],
    delOpen: false,
    picked: false,
    default_items: [],
    issues: [
      {
        title: "할 일",
        items: []
      },
      {
        title: "진행 중",
        items: []
      },
      {
        title: "완료",
        items: []
      }
    ],
    drag: false
  }),
  components: {
    studyCalModal: () => import("@/components/studyView/studyCalModal"),
    requestSignin: () => import("@/components/base/RequestSignin"),
    draggable: () => import("vuedraggable")
  },
  watch: {
    issues() {
      console.log(this.issues);
    }
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year + "년";
      const endYear = end.year + "년";
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + "일";
      const endDay = end.day + "일";

      switch (this.type) {
        case "month":
          return `${startYear} ${startMonth}`;
        case "week":
        case "4day":
          return `${startYear} ${startMonth} ${startDay} ~ ${suffixYear} ${suffixMonth} ${endDay}`;
        case "day":
          return `${startYear} ${startMonth} ${startDay}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    getBgColor(hover) {
      if (hover) {
        return "grey";
      } else {
        return "white";
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "issue",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  mounted() {
    // 마운트시 내 일정 엑시오스 요청
    this.reload();
    // this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      let color;
      if (event.status === "그룹할일") {
        color = "light green";
      } else {
        color = "purple";
      }
      return color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(
          () => ((this.selectedOpen = true), (this.detail = false)),
          10
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      //   const events = [];

      //   const my_events = []; // 내일정 엑시오스 요청

      //   for (var i = 0; i < my_events.length; i++) {
      //     events.push({
      //       name:
      //         my_events.group == "empty"
      //           ? my_events.name
      //           : "[" + my_events.group + "]" + my_events.name,
      //       content: my_events.content,
      //       start:
      //         event.startTime != ""
      //           ? event.startDay + " " + event.startTime
      //           : event.startDay,
      //       end:
      //         event.endTime != ""
      //           ? event.endDay + " " + event.endTime
      //           : event.endDay,
      //       group: event.group,
      //       color: event.color,
      //       event_id: event.event_id
      //     });
      //   }

      this.start = start;
      this.end = end;

      //   console.log(my_events);
      //   console.log(events);
      //   this.events = events;
    },

    async reload() {
      // 일정목록 리로드
      // this.$refs.calendar.checkChange();
      // WorkService.getWorks({ type: "study", study_id: this.study_id }).then(
      //   async works => {
      //     await works.data.map(work => {
      //       work.name = "[" + work.status + "]" + work.name;
      //       work.color = work.color
      //         ? work.color
      //         : "primary"; /* 빨리 여기를 수정해야 한다. */
      //       work.start = work.start_date;
      //       work.end = work.end_date;
      //     });
      //     this.events = works.data;
      //     this.$refs.calendar.checkChange();
      //   }
      // );
      let payload = {
        type: "study",
        study_id: this.study_id
      };
      let res = await WorkService.getWorks(payload);
      this.default_items = [];
      this.issues[0].items = [];
      this.issues[1].items = [];
      this.issues[2].items = [];
      for (let item of res) {
        switch (item.status) {
          case "기본":
            this.default_items.push(item);
            break;
          case "할 일":
            this.issues[0].items.push(item);
            break;
          case "진행 중":
            this.issues[1].items.push(item);
            break;
          case "완료":
            this.issues[2].items.push(item);
            break;
          default:
            console.log(
              "reload method in studyScehdule.vue error",
              item.status
            );
        }
      }
    },

    clickDetailMenu(value, event) {
      switch (value) {
        case "movemycal":
          this.moveMyCal(event);
          break;
        case "update":
          this.loadAddModal(event);
          break;
        case "delete":
          this.delOpen = true;
          break;
        default:
      }
    },

    eventDelete(event) {
      WorkService.deleteWork({ type: "study", work_id: event.id });
      const eventsIdx = this.events.indexOf(event);
      this.events.splice(eventsIdx, 1);

      this.delOpen = false;
      this.selectedOpen = false;
      this.$refs.calendar.checkChange();
    },

    moveMyCal(event) {
      const name_arr = event.name.split("]");
      const name = name_arr.length == 2 ? name_arr[1] : name_arr[0];

      WorkService.createWork({
        type: "personal",
        study_id: event.study_id,
        group: "study " + event.status,
        name: name,
        content: event.content,
        start: event.start_date,
        end: event.end_date,
        color: event.color
      });
      this.userOpen = true;
    },
    putUserSchedule() {
      this.selectedOpen = false;
      this.userOpen = false;
    }
  },
  filters: {
    filterDate(values) {
      if (values == "") return;
      let result = "";
      values = values.split("/");
      for (let value of values) {
        let arr = value.split("-");
        result += " " + arr[1] + "/" + arr[2];
      }

      return result;
    }
  }
};
</script>
