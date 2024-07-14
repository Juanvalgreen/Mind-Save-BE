class Exam {
  constructor(
    name = '',
    dateOfBirth = '',
    canRead = false,
    canWrite = false,
    profession = null,
    orientation = {
      yearQuestion: 0,
      hourQuestion: 0,
      monthDayQuestion: 0,
      weekDayQuestion: 0,
      monthQuestion: 0,
      countryQuestion: 0,
      regionQuestion: 0,
      cityQuestion: 0,
      whereWeAreQuestion: 0,
      floorQuestion: 0
    },
    fixation = {
      repeatWordsQuestion: 0
    },
    calcAttention = {
      minusSequenceQuestion: 0,
      spellingQuestion: 0
    },
    memory = {
      rememberWordsQuestion: 0
    },
    lenguage = {
      objectIdentificationQuestion: 0,
      repeatSentence: 0,
      sayInstructionsQuestion: 0,
      readInstructionQuestion: 0,
      writeSenteceQuestion: 0,
      drawQuestion: 0
    },
    applicationDate = '',
    itAutoEvaluation = true
  ) {
    this.userInfo = {
      name,
      dateOfBirth,
      canRead,
      canWrite,
      profession
    };
    this.examInfo = {
      orientation,
      fixation,
      calcAttention,
      memory,
      lenguage,
      applicationDate,
      itAutoEvaluation
    };
  }
}

module.exports = Exam;
