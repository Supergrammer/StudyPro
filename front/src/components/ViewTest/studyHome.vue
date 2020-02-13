<template>
  <v-card outlined>
    <v-row no-gutters>
      <v-col cols="9">
        <v-card outlined>
          <study-mini-board />
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card outlined>
          <study-profile />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    StudyMiniBoard: () =>
      import("@/components/studydetail/groupHome/StudyMiniBoard"),
    // StudyTodoList: () =>
    //   import("@/components/studydetail/groupHome/StudyTodoList"),
    StudyProfile: () =>
      import("@/components/studydetail/groupHome/StudyProfile")
  }
};
</script>

