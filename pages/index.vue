<template>
  <div id="wrapperxy">
    <v-toolbar dense color="#002857" absolute width="100%">
      <v-toolbar-title>XcelQuiz</v-toolbar-title>
    </v-toolbar>
<br><br>
    <v-card  color="transparent">
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col :cols="12">
            <v-card align="center" justify="center" to="/general">
              <v-card-text>
                <v-icon size="100px">mdi-web</v-icon>
                <span class="quiz-title">General Knowledge</span>
              </v-card-text>
            </v-card>
          </v-col>
<!-- 
          <v-col :cols="isMobile ? 12 : 6">
            <v-card align="center" justify="center">
              <v-card-text>
                <v-icon size="100px">mdi-music</v-icon>
                <span class="quiz-title">Music</span>
                <span class="quiz-category">Entertainment</span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col :cols="isMobile ? 12 : 6">
            <v-card align="center" justify="center">
              <v-card-text>
                <v-icon size="100px">mdi-desktop-mac</v-icon>
                <span class="quiz-title">Computers</span>
                <span class="quiz-category">Science</span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col :cols="isMobile ? 12 : 6">
            <v-card align="center" justify="center">
              <v-card-text>
                <v-icon size="100px">mdi-gamepad</v-icon>
                <span class="quiz-title">Video Games</span>
                <span class="quiz-category">Entertainment</span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col :cols="isMobile ? 12 : 6">
            <v-card align="center" justify="center">
              <v-card-text>
                <v-icon size="100px">mdi-film</v-icon>
                <span class="quiz-title">Film</span>
                <span class="quiz-category">Science</span>
              </v-card-text>
            </v-card>
          </v-col> -->
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import device_mixin from "~/mixins/device_mixin.js";
import navigation_mixin from "~/mixins/navigation_mixin.js";
export default {
  mixins: [device_mixin,navigation_mixin],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#wrapperxy {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.quiz-title {
  display: block;
  width: 100%;
  font-size: 20px;
  padding-top: 20px;
}

.quiz-category {
  display: block;
  width: 100%;
  font-size: 12px;
  padding: 15px;
}
</style>