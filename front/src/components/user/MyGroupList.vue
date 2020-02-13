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
    <div v-show="selected.length > 0">
      <v-btn text><v-icon>delete</v-icon></v-btn>
    </div>
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
      { text: "가입일", align: "center", value: "regDate" }
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
      this.$router.push({ name: "study_home", params: { study_id: event.id } });
    }
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
td.text-center{
  cursor:pointer;
}
</style>
