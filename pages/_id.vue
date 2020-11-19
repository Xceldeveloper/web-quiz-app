<template>
  <div id="wrapper">
    <v-toolbar dark color="#000" dense>
      <v-btn @click="navBack" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-toolbar-title
        >{{ quizGroup }} ({{ questionDifficulty }})</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <span v-if="raw_questions.length > 0">
        {{ current_question_index + 1 + "/" + raw_questions.length }}</span
      >

      <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
    </v-toolbar>

    <div id="cover">
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-carousel
          hide-delimiters
          :show-arrows="false"
          :touchless="true"
          v-model="current_question_index"
        >
          <v-carousel-item
            v-for="question in questions"
            :key="question.question"
          >
            <v-card color="transparent" width="100%" height="auto">
              <v-card>
                <v-card-text v-html="question.question"></v-card-text>
              </v-card>
              <br />
              <br />
              <v-card>
                <v-card-text>
                  <v-radio-group v-model="inputed_answer">
                    <v-radio
                      v-for="(option, index) in question.options"
                      :key="index"
                      :label="option"
                      :value="option"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <span v-if="inputed_answer != ''">
                <br />
                <br />
                <v-btn block @click="checkAnswer">Check</v-btn>
              </span>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </div>

    <v-bottom-sheet
      width="95%"
      max-width="500px"
      inset
      v-model="answerDialog"
      persistent
    >
      <v-card>
        <v-card-title
          ><span v-if="isCorrect"
            >Right
            <v-icon right color="green" v-if="isCorrect"
              >mdi-check</v-icon
            ></span
          >
          <span v-else>Wrong <v-icon right color="red">mdi-close</v-icon></span>
        </v-card-title>

        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-expansion-panels class="mb-6">
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="mdi-menu-down"
                >Question
              </v-expansion-panel-header>
              <v-expansion-panel-content v-html="current_question">
              </v-expansion-panel-content>
            </v-expansion-panel> </v-expansion-panels
          >Answer : <v-spacer></v-spacer>
          <span class="answer_text" v-html="correct_answer"></span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#000"
            dark
            block
            @click="showNext"
            v-if="current_question_index < questions.length - 1"
          >
            Next <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>

          <v-btn
            text
            block
            v-if="current_question_index == questions.length - 1"
            @click="calculate"
            >Finish</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <v-dialog
      v-model="finishDialog"
      persistent
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card align="center" justify="center">
        <v-card-title>Score</v-card-title>
        <v-card-text>
          <v-progress-circular
            color="#000"
            track-color="primary"
            size="80"
            :value="(answer.correct / questions.length) * 100"
          >
            {{ answer.correct }} / {{ questions.length }}
          </v-progress-circular>
          <br />
          <br />
          <v-btn block color="#000" dark @click="initQuiz">Retake</v-btn>
          <v-btn block text to="/">Home</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="startDialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Quiz Settings </v-card-title>

        <v-card-text>
          <v-card elevation="0">
            <v-card-text>
              <v-radio-group v-model="questionDifficulty">
                <v-radio label="Easy" color="#000" value="easy"></v-radio>
                <v-radio label="Medium" color="#000" value="medium"></v-radio>
                <v-radio label="Hard" color="#000" value="hard"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
          <br />
          <v-card elevation="0">
            <v-slider
              v-model="questionCount"
              :min="10"
              :value="questionCount"
              :max="50"
              color="#000"
              track-color="#000"
              thumb-color="#000"
              thumb-label="always"
            ></v-slider>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn block dark color="#000" @click="fetchQuestions">Begin</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="errorLoading"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> Error Loading... </v-card-title>
        <v-card-text>
          Unable to Fetch questions
          <v-card-actions>
            <v-btn block small dark color="#000" @click="fetchQuestions"
              >Retry</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import device_mixin from "~/mixins/device_mixin.js";
import navigation_mixin from "~/mixins/navigation_mixin.js";
export default {
  mixins: [device_mixin, navigation_mixin],
  data() {
    return {
      quizId: 0,
      answerDialog: false,
      inputed_answer: "",
      current_question_index: 0,
      errorLoading: false,
      current_question: "",
      correct_answer: "",
      isCorrect: false,
      finishDialog: false,
      isLoading: false,
      raw_questions: [
        // {
        //   question: 'Who is the CEO of Astrux ?',
        //   correct_answer: 'Emiator Overcomer',
        //   incorrect_answers: ['Steve Jobs', 'Elon Musk', 'Bill Gates'],
        // },
        // {
        //   question: 'What is the full meaning of IBM ?',
        //   correct_answer: 'International Business Machines',
        //   incorrect_answers: [
        //     'Integrated Basic Management',
        //     'International Business Microservices',
        //     'Interconnected BIOS Microsystems',
        //   ],
        // },
      ],
      questions: [],
      answer: {
        correct: 0,
        wrong: 0,
      },
      questionCount: 10,
      questionDifficulty: "easy",
      startDialog: true,
    };
  },
  mounted() {
    // console.log("mounted general...");

    this.quizId = this.$route.params.id;
    this.initQuiz();
  },
  destroyed() {
    // console.log('destroyed');
    this.questions = [];
    this.raw_questions = [];
    this.current_question_index = 0;
    this.answerDialog = false;
    this.correct_answer = "";
    this.isCorrect = false;
    this.answer.correct = 0;
    this.answer.wrong = 0;
    this.current_question = "";

    this.questionCount = 10;
    this.questionDifficulty = "easy";
  },
  methods: {
    fetchQuestions() {
      this.startDialog = false;
      this.isLoading = true;
      this.errorLoading = false;
      this.$axios
        .$get(
          "https://opentdb.com/api.php?amount=" +
            this.questionCount +
            "&category=" +
            this.quizId +
            "&difficulty=" +
            this.questionDifficulty +
            "&type=multiple"
        )
        .then((res) => {
          this.raw_questions = res.results;
          //  console.log(JSON.stringify(this.raw_questions, null, 2));

          this.isLoading = false;
          this.current_question_index = 0; //under review
          this.formatedQuestions();
        })
        .catch((err) => {
          this.errorLoading = true;
          this.isLoading = false;
        });
    },
    formatedQuestions() {
      for (var i = 0; i < this.raw_questions.length; i++) {
        var obj = this.raw_questions[i];
        var optionsArray = obj.incorrect_answers;
        optionsArray.push(obj.correct_answer);

        var newQuestion = {
          question: obj.question,
          options: this.shuffleArray(optionsArray),
          answer: obj.correct_answer,
        };

        this.questions.push(newQuestion);
      }
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    checkAnswer() {
      this.current_question = this.questions[
        this.current_question_index
      ].question;
      if (
        this.inputed_answer ==
        this.questions[this.current_question_index].answer
      ) {
        this.isCorrect = true;
        this.answer.correct += 1;
      } else {
        this.isCorrect = false;
        this.answer.wrong += 1;
      }

      //  console.log(this.questions[this.current_question_index].answer);
      this.correct_answer = this.questions[this.current_question_index].answer;
      this.answerDialog = true;
    },

    showNext() {
      this.current_question_index++;
      this.inputed_answer = "";
      this.answerDialog = false;
    },

    calculate() {
      this.finishDialog = true;
    },

    initQuiz() {
      this.finishDialog = false;
      this.questions = [];
      this.raw_questions = [];
      this.current_question_index = 0;
      this.answerDialog = false;
      this.correct_answer = "";
      this.isCorrect = false;
      this.answer.correct = 0;
      this.answer.wrong = 0;
      this.current_question = "";

      this.questionCount = 10;
      this.questionDifficulty = "easy";

      this.startDialog = true;
    },
  },
  computed: {
    quizGroup() {
      if (this.quizId == 0) {
        return "";
      } else if (this.quizId == 9) {
        return "General";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

#cover {
  margin: auto;
  display: block;
  width: auto;
  max-width: 800px;
  height: 100%;
  padding: 10px;
}

.answer_text {
  font-weight: bold;
}
</style>