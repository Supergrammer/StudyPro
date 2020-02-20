<template>
  <v-dialog id="addmodal" v-model="open" max-width="540px">
    <v-card style="overflow:hidden">
      <v-card-title class="customTheme darken-1 white--text pb-3">
        <span
          v-text="isUpdate ? '일정 수정' : '일정 추가'"
          class="headline"
        ></span>
      </v-card-title>
      <!-- 내용입력란 -->
      <v-row justify="center">
        <v-col cols="11" class="pb-0">
          <!-- 날짜 선택 -->
          <v-row>
            <v-col cols="12" sm="8" class="pb-0">
              <v-menu
                ref="dates"
                v-model="active.dates"
                :close-on-content-click="false"
                :nudge-right="30"
                :return-value.sync="input.dates"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.dates"
                    class="mt-3"
                    label="날짜"
                    prepend-icon="event"
                    dense
                    readonly
                    outlined
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="input.dates" no-title multiple>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="dark lighten-2"
                    @click="active.dates = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="dark lighten-2"
                    @click="$refs.dates.save(input.dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- 날짜선택 끝 -->
          <!-- 시간선택 -->
          <!-- 시작 시간 -->
          <v-row align="center">
            <v-col cols="6" sm="4" class="py-0">
              <v-menu
                ref="startTime"
                v-model="active.startTime"
                :close-on-content-click="false"
                :nudge-right="30"
                :return-value.sync="input.startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.startTime"
                    label="시작시간"
                    prepend-icon="access_time"
                    readonly
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="input.startTime"
                  full-width
                  header-color="customTheme"
                  ampm-in-title
                  @click:minute="$refs.startTime.save(input.startTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!-- 시작 시간 끝 -->
            <!-- 종료 시간 -->
            <v-col cols="6" sm="4" class="py-0">
              <v-menu
                ref="endTime"
                v-model="active.endTime"
                :close-on-content-click="false"
                :nudge-right="30"
                :return-value.sync="input.endTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.endTime"
                    label="종료시간"
                    prepend-icon="access_time"
                    readonly
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="input.endTime"
                  full-width
                  header-color="customTheme"
                  ampm-in-title
                  @click:minute="$refs.endTime.save(input.endTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- 시간선택 끝 -->

          <!-- 이름/내용 입력 -->
          <!-- 이름입력 -->
          <v-row justify="center">
            <v-col cols="12" class="py-0">
              <v-text-field v-model="input.name" label="일정명"> </v-text-field>
            </v-col>
          </v-row>
          <!-- 이름입력 끝 -->
          <!-- 내용입력 -->
          <v-row justify="center">
            <v-col cols="12" class="pt-0">
              <v-textarea
                label="내용"
                outlined
                height="150px"
                v-model="input.content"
                single-line
                hide-details
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- 내용입력 끝 -->
          <!-- 이름/내용 입력 끝 -->
          <!-- 기본일정 체크박스 -->
          <v-row v-show="!isUpdate">
            <v-col class="py-0 justify-end">
              <v-checkbox v-model="input.isDefault" label="기본일정으로 등록" />
            </v-col>
          </v-row>
          <!-- 기본일정 체크박스 끝 -->
        </v-col>
      </v-row>
      <!-- 내용입력란 끝 -->

      <!-- 버튼 -->
      <v-row justify="end" class="mb-2">
        <v-col cols="12" class="text-end py-0">
          <span class="error--text">{{ message }}</span>
          <v-btn
            text
            color="error lighten-2"
            @click="deleteCard"
            v-if="isUpdate"
            :disabled="isLoading || isDefault"
          >
            삭제
          </v-btn>
          <v-btn
            text
            color="primary lighten-2"
            @click="create"
            v-if="!isUpdate"
            :disabled="isLoading"
          >
            만들기
          </v-btn>
          <v-btn
            text
            color="primary lighten-2"
            @click="update"
            v-else
            :disabled="isLoading || isDefault"
          >
            수정
          </v-btn>
          <v-btn text color="lighten-2" @click="close" :disabled="isLoading">
            취소
          </v-btn>
        </v-col>
      </v-row>
      <!-- 버튼 끝 -->
    </v-card>
  </v-dialog>
</template>

<script>
// import { format } from "date-fns";
import WorkService from "@/services/work.service";

export default {
  name: "addmodal",
  data: () => ({
    open: false,
    isLoading: false,
    isDefault: false,

    active: {
      dates: false,
      startTime: false,
      endTime: false
    },

    input: {
      dates: [],
      startTime: "",
      endTime: "",
      name: "",
      content: "",
      isDefault: false
    },
    event_id: "",
    message: ""
  }),
  props: ["addModal", "isUpdate", "propEvent", "study_id"],
  watch: {
    addModal() {
      this.open = this.addModal;
    },
    open() {
      if (!this.open) {
        this.close();
      }
    },
    isUpdate() {
      if (this.isUpdate) {
        this.input = {
          dates: this.propEvent.dates,
          startTime: this.propEvent.start_time,
          endTime: this.propEvent.end_time,
          name: this.propEvent.name,
          content: this.propEvent.content,
          isDefault: false
        };
        if (this.propEvent.status == "초기") {
          this.isDefault = true;
        }
      }
    }
  },
  methods: {
    close() {
      this.message = "";
      this.isDefault = false;
      this.input = {
        dates: [],
        startTime: "",
        endTime: "",
        name: "",
        content: "",
        isDefault: false
      };
      this.$emit("close");
    },

    async create() {
      this.isLoading = true;
      this.message = "";
      if (this.input.name == "") {
        this.message = "일정명을 입력해주세요";
        this.isLoading = false;
        return;
      }

      if (this.input.dates.length == 0) {
        this.message = "날짜를 입력해주세요";
        this.isLoading = false;
        return;
      }

      if (this.input.startTime == "") {
        this.input.startTime = "00:00";
      }
      if (this.input.endTime == "") {
        this.input.endTime = "23:59";
      }
      let s_arr = this.input.startTime.split(":");
      let e_arr = this.input.endTime.split(":");
      let startT = { hour: s_arr[0], minute: s_arr[1] };
      let endT = { hour: e_arr[0], minute: e_arr[1] };
      if (
        startT.hour > endT.hour ||
        (startT.hour == endT.hour && startT.minute > endT.minute)
      ) {
        this.message = "종료시간을 확인해주세요";
        this.isLoading = false;
        return;
      }

      // 추가할 데이터
      var newEvent = {
        study_id: this.study_id,
        type: "study",
        name: this.input.name,
        content: this.input.content,
        dates: this.input.dates,
        start_time: this.input.startTime,
        end_time: this.input.endTime,
        color: this.input.isDefault ? "redC" : "greenC",
        status: this.input.isDefault ? "기본" : "할 일"
      };
      //데이터추가 엑시오스
      let res = await WorkService.createWork(newEvent);
      if (res.id) {
        this.$emit("reload");
        this.close();
      } else {
        this.message = "생성하지 못했습니다.";
      }
      this.isLoading = false;
    },

    async update() {
      this.isLoading = true;
      //수정 데이터
      var updateEvent = {
        work_id: this.propEvent.id,
        type: "study",
        name: this.input.name,
        content: this.input.content,
        dates: this.input.dates,
        start_time: this.input.startTime,
        end_time: this.input.endTime,
        color: this.propEvent.color,
        status: this.propEvent.status
      };

      //수정 엑시오스 요청
      let res = await WorkService.updateWork(updateEvent);
      if (res.state == "success") {
        this.$emit("reload");
        this.close();
      } else {
        this.message = "수정되지 않았습니다";
      }
      this.isLoading = false;
    },

    async deleteCard() {
      this.isLoading = true;
      let payload = {
        type: "study",
        work_id: this.propEvent.id
      };
      let res = await WorkService.deleteWork(payload);
      console.log(res);
      if (res.state == "sucess") {
        this.$emit("reload");
        this.close();
      } else {
        this.message = "삭제되지 않았습니다";
      }
      this.isLoading = false;
    }
  },

  mounted() {
    if (this.$store.getters["auth/isAuth"]) {
      this.$emit("close");
      return;
    }
  }
};
</script>

<style scoped>
.controls {
  position: relative;
}
</style>
