<template>
  <v-card outlined>
    <v-row no-gutters>
      <v-col cols="9">
        <v-card outlined>
          <study-mini-board />
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-row no-gutters>
          <v-col>
        <v-card outlined>
          <study-profile />
        </v-card>
          </v-col>
          <v-col>
            <v-card outlined>
              <study-todo-list/>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    StudyMiniBoard: () =>
      import("@/components/studyView/module/StudyMiniBoard"),
    StudyTodoList: () =>
      import("@/components/studyView/module/StudyTodoList"),
    StudyProfile: () =>
      import("@/components/studyView/module/StudyProfile")
  }
};
</script>

