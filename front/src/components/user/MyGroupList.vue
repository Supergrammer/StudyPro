<template>
  <v-card class="mx-4" tile min-height="450px" elevation="0">
    <v-card-title>
      가입한 그룹목록
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="그룹명으로 검색"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-row>
      <v-col class="text-end">
        <v-btn text v-show="selected.length > 0"><v-icon>delete</v-icon></v-btn>
        <v-btn text @click="loadItems">목록 갱신</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
      show-select
      @click:row="clicked($event)"
    >
      <v-alert slot="no-results" icon="warning" class="ma-0">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  components: {},
  data: () => ({
    expanded: [],
    singleExpanded: true,
    selected: [],
    clickedItems: [],
    search: "",
    headers: [
      { text: "카테고리", align: "center", value: "category" },
      { text: "그룹명", align: "center", value: "name" },
      { text: "시간", align: "center", value: "time" },
      { text: "요일", align: "center", sortable: false, value: "dayofweek" },
      { text: "상태", align: "center", value: "status" },
      { text: "인원", align: "center", value: "member" }
    ],
    items: [
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30",
        id: 0
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30",
        id: 1
      },
      {
        category: "IT/소프트웨어",
        name: "SSAFY 대비반",
        time: "18:00 ~ 20:00",
        dayofweek: "Mon, Wed, Fri",
        regDate: "2020-01-30",
        id: 2
      }
    ]
  }),
  methods: {
    clicked(event) {
      console.log(event);
      this.$router.push({ name: "studydetail", params: { id: event.id } });
    },
    getTime(start, end) {
      var s_hour = Math.floor(start / 100);
      var s_minute = start % 100;
      var e_hour = Math.floor(end / 100);
      var e_minute = end % 100;

      return s_hour + ":" + s_minute + "~" + e_hour + ":" + e_minute;
    },

    async loadItems() {
      var items = await UserService.getMyGroups();

      console.log(items);
      //리스트 정제
      this.items = [];
      for (var item of items) {
        var tmp = {
          id: item.id,
          category: "empty",
          name: item.name,
          time: this.getTime(item.start_time, item.end_time),
          days: "empty",
          status: item.status,
          membership_level: item.membership_level,
          image_url: item.image_url
        };
        this.items.push(tmp);
      }
    }
  },
  async mounted() {
    this.loadItems();
  }
};
</script>

<style>
p {
  font-size: 30px;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background-color: rgba(200, 200, 200, 0.2);
}
td.text-center {
  cursor: pointer;
}
</style>
