<template>
  <div id="wrapperxy">
    <v-toolbar dense dark color="#000" absolute width="100%">
      <v-toolbar-title>XcelQuiz</v-toolbar-title>
    </v-toolbar>
    <br /><br />
    <v-card color="transparent" elevation="0">
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="footerx">
      <v-row class="fill-height ma-0" align="center" justify="center">
        <div class="contact-wrapper" id="contact">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://xceldeveloper.netlify.app"
                ><v-btn large icon><v-icon>mdi-link</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper.netlify.app</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="mailto:xceldeveloper@gmail.com"
                ><v-btn large icon><v-icon>mdi-gmail</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper@gmail.com</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://twitter.com/xceldeveloper"
                ><v-btn large icon><v-icon>mdi-twitter</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://instagram.com/xceldeveloper"
                ><v-btn large icon><v-icon>mdi-instagram</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper</span>
          </v-tooltip>
        </div>

        <span class="full-year"
          ><v-icon left>mdi-copyright</v-icon>   xceldeveloper {{ new Date().getFullYear() }}</span
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import device_mixin from "~/mixins/device_mixin.js";
import navigation_mixin from "~/mixins/navigation_mixin.js";
export default {
  mixins: [device_mixin, navigation_mixin],
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

.footerx {
  width: 100%;
  height: auto;
  padding: 50px 0px;
  background-color: #ededed;
}

.full-year {
  display: block;
  width: 100%;
  text-align: center;
  margin: 20px auto;
}

a {
  text-decoration: none;
}
</style>