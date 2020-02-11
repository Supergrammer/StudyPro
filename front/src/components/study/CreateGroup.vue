<template>
  <div id="createGroup" class="mx-5">
    <v-card class="pa-5 pb-2" elevation="0">
      <p class="ml-5 cus-title">그룹 생성</p>
      <hr />
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th colspan="8" class="text-end">
                <span class="red--text">*</span>는 필수항목입니다.
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>카테고리</td>
              <td colspan="1">대분류</td>
              <td colspan="3">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="majorItems"
                    v-model="major"
                    segmented
                    dense
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
              <td colspan="1">소분류</td>
              <td colspan="3">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="minorItems"
                    v-model="minor"
                    segmented
                    dense
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>그룹명</td>
              <td colspan="7">
                <v-text-field
                  v-model="groupName"
                  label="그룹명"
                  :rules="groupRules"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td><span class="red--text">*</span>모임목표(간이)</td>
              <td colspan="7">
                <v-text-field
                  v-model="groupTarget"
                  label="모임목표"
                  :rules="targetRules"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>
                <span class="red--text">*</span>
                모임소개(상세)
              </td>
              <td colspan="7">
                <v-textarea
                  class="pt-6"
                  label="그룹에 대한 소개를 150자 이하로 입력해주세요"
                  outlined
                  v-model="regText"
                  :rules="textRules"
                ></v-textarea>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>인원제한</td>
              <td colspan="7">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="dropItems"
                    v-model="userLimit"
                    segmented
                    dense
                    label="제한없음"
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>기간</td>
              <td colspan="7">
                <v-daterange
                  v-model="range"
                  display-format="yyyy-MM-dd"
                  no-title
                  :action-labels="{ apply: 'Apply' }"
                ></v-daterange>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>요일</td>
              <td colspan="7">
                <v-btn-toggle v-model="dayofweek" multiple dense group>
                  <v-btn v-for="item in weekformat" :key="item" :value="item">
                    {{ item }}
                  </v-btn>
                </v-btn-toggle>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>시간대</td>
              <td colspan="7">
                <v-row>
                  <v-col cols="4" sm="3" class="pb-0 pr-0">
                    <timeselector v-model="starttime" class="grey lighten-4" />
                  </v-col>
                  <v-col cols="1" class="pb-0 px-0 text-center">
                    <span>~</span>
                  </v-col>
                  <v-col cols="4" sm="3" class="pb-0 pl-0">
                    <timeselector v-model="endtime" class="grey lighten-4" />
                  </v-col>
                  <v-spacer />
                </v-row>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>현재상태</td>
              <td colspan="7">
                <div>
                  <v-overflow-btn
                    class="mt-4"
                    :items="statusItems"
                    v-model="status"
                    segmented
                    dense
                    label="준비중"
                    style="width: 200px"
                  ></v-overflow-btn>
                </div>
              </td>
            </tr>
            <!-- <tr class="no-hover-color">
              <td>태그</td>
              <td colspan="7"></td>
            </tr> -->
            <tr class="no-hover-color">
              <td>공개 비공개</td>
              <td colspan="7">
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio label="공개" value="공개"></v-radio>
                  <v-radio label="비공개" value="비공개"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr class="no-hover-color">
              <td>스터디 이미지</td>
              <td colspan="7">
                <v-row justify="center">
                  <image-input
                    v-model="image"
                    class="wrap-content pt-4 pb-3"
                    v-on:clear="imgClear"
                  >
                    <div slot="activator" class="wrap-content">
                      <img
                        src="@/assets/images/no_image.png"
                        style="width:400px; height:200px"
                        v-if="!image"
                      />
                      <img
                        :src="image.imageURL"
                        v-else
                        alt="Study Image"
                        style="width:400px;height:200px;"
                      />
                    </div>
                  </image-input>
                </v-row>
              </td>
            </tr>
            <td colspan="8">
              <v-container class="pt-8 text-end">
                <span class="red--text pr-5">
                  {{ message }}
                </span>
                <v-btn
                  class="primary font-weight-light"
                  @click="createGroup"
                  :disabled="!isComplete"
                  >모임생성</v-btn
                >
              </v-container>
            </td>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import VDaterange from "@/components/base/VDaterange";
import Timeselector from "vue-timeselector";
import { format } from "date-fns";

export default {
  name: "createGroup",
  data: () => ({
    groupName: "",
    regText: "",
    groupTarget: "",
    groupRules: [
      v => !!v || "그룹명을 입력해주세요",
      v =>
        (v && v.length <= 15 && v.length >= 3) ||
        "그룹명은 3자이상 15자이내 입니다"
    ],
    textRules: [v => !!v || (v && v.length <= 150) || "150자 초과"],
    targetRules: [
      v => !!v || "목표를 작성해주세요",
      v => (v && v.length <= 15) || "15자 이내로 작성해주세요"
    ],
    dropItems: [],
    userLimit: 0,
    majorItems: [],
    major: -1,
    minorItems: [],
    minor: -1,
    range: {},
    weekformat: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayofweek: [],
    starttime: "",
    endtime: "",
    radios: "공개",
    isComplete: false,
    message: "",
    image: null,
    status: "진행준비",
    statusItems: [
      {
        text: "진행준비",
        value: "진행준비",
        callback: () => {}
      },
      {
        text: "진행중",
        value: "진행중",
        callback: () => {}
      },
      {
        text: "종료",
        value: "종료",
        callback: () => {}
      }
    ]
  }),
  props:['success'],
  components: {
    VDaterange,
    Timeselector,
    imageInput: () => import("@/components/base/ImageInput")
  },
  computed: {
    userID: function() {
      return this.$store.getters.userID;
    },
    accessToken: function() {
      return this.$store.getters.getToken;
    }
  },
  watch: {
    groupName() {
      this.validation();
    },
    groupTarget() {
      this.validation();
    },
    minor() {
      this.validation();
    },
    userLimit() {
      this.validation();
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
    validation() {
      if (this.major == -1) {
        this.message = "대분류를 선택해주세요.";
        this.isComplete = false;
        return;
      } else if (this.minor == -1) {
        this.message = "소분류를 선택해주세요.";
        this.isComplete = false;
        return;
      } else if (this.groupName.length < 3) {
        this.message = "그룹명은 3자이상입니다.";
        this.isComplete = false;
        return;
      } else if (!this.groupTarget) {
        this.message = "그룹의 목표를 입력해주세요.";
        this.isComplete = false;
        return;
      }
      this.message = "";
      this.isComplete = true;
    },
    async createGroup() {
      var formData = new FormData();
      formData.append("name", this.groupName);
      formData.append("goal", this.groupTarget);
      formData.append("description", this.regText);
      formData.append("minor_class_id", this.minor);
      formData.append("user_limit", this.userLimit);
      formData.append(
        "start_time",
        this.starttime
          ? this.starttime.getHours() * 100 + this.starttime.getMinutes()
          : "0000"
      );
      formData.append(
        "end_time",
        this.endtime
          ? this.endtime.getHours() * 100 + this.endtime.getMinutes()
          : "0000"
      );
      formData.append("status", this.status);
      formData.append("img", this.image.imageFile);
      formData.append(
        "start_day",
        this.range.start ? this.range.start : format(new Date(), "yyyy-MM-dd")
      );
      formData.append(
        "end_day",
        this.range.end ? this.range.end : format(new Date(), "yyyy-MM-dd")
      );
      formData.append("progress_days", this.dayofweek);
      formData.append("isOpen", this.radios == "공개" ? true : false);

      const res = await this.$store.dispatch("study/createStudy", formData);
      if (res.state == "success") {
        this.$emit('success', res.gid)
        this.message = "";
        
      } else {
        this.message = "이미 존재하는 모임명입니다";
      }
    },

    imgClear() {
      this.image = null;
    }
  },
  async mounted() {
    this.dropItems = [{ value: 0, text: "제한없음", callback: () => {} }];
    for (var i = 1; i <= 99; i++) {
      this.dropItems.push({
        value: i,
        text: i,
        callback: () => {}
      });
    }

    this.majorItems = [];
    const getMajorRes = await this.$store.dispatch("study/getMajorClass"); //await api.getMajorClasses();
    for (let i = 0; i < getMajorRes.length; i++) {
      this.majorItems.push({
        value: getMajorRes[i].id,
        text: getMajorRes[i].name,
        callback: () => {}
      });
    }
  }
};
</script>

<style>
.cus-title {
  font-size: 30px;
}

.v-text-field__details {
  display: inline-block !important;
}

.v-radio {
  display: flex;
  float: left;
}

.v-input--radio-group__input {
  display: inline-block;
}

.v-messages {
  display: none;
}

.no-hover-color:hover {
  background-color: white !important;
}
</style>
