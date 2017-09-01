$(function() {
  //first, create a set of questions, answers and results
  var personalityQuiz = {
    questions: [
      {
        title: "Do you Love Making Games:",
        answers: [
          {
            answer: "Yes I do",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "No Not Very Much",
            result: "Java"
          }
        ]
      },
      {
        title: "Do You Love Web Developement:",
        answers: [
          {
            answer: "Yes I do",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "No Not Very Much",
            result: "Java"
          }
        ]
      },
      {
        title: "Do You Love Developing Android Games:",
        answers: [
          {
            answer: "No Not Very Much",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "Yes I do",
            result: "Java"
          }
        ]
      },
      {
        title: "Would You Like To Deal With Networking:",
        answers: [
          {
            answer: "Yes I do",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "No Not Very Much",
            result: "Java"
          }
        ]
      },
      {
        title: "Do You Love DataBases Management Systems:",
        answers: [
          {
            answer: "Yes I do",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "No Not Very Much",
            result: "Java"
          }
        ]
      },
      {
        title: "Do You Love The Future Of Mobile Developement:",
        answers: [
          {
            answer: "No Not Very Much",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "Yes I do",
            result: "Java"
          }
        ]
      },
      {
        title: "Do You Want To Learn Coding for fun:",
        answers: [
          {
            answer: "Yes I do",
            result: "Python"
          },
          {
            answer: "Neither No Or Yes",
            result: "Any Path"
          },
          {
            answer: "No Not Very Much",
            result: "Java"
          }
        ]
      },
      {
        title: "Between Web Application and Mobile App Which One Would You Recommend:",
        answers: [
          {
            answer: "Web Application",
            result: "Python"
          },
          {
            answer: "Neither Web Or Mobile App",
            result: "Any Path"
          },
          {
            answer: "Mobile App",
            result: "harry"
          }
        ]
      }
    ],
    results: ["Java", "Python", "Any Path"],
    descriptions: [
      "You Can Take Java. You Are Interested In Android Apps, You Are Aware That Mobile is Future And You Like Mobile Apps",
      "You Can Take Python. You Love Making Games, Web Developement, Networking DataBases, And You Want to code for Fun",
      "You Can Consult Your TM To Find More .Note Every Path Is Best. You can Start With Python, It has Wider Community and Later Mobile",
      "Well, you cannot decide, can you? Take Python Its Easier To Learn And Has A Wide Community."
    ]
  };

  //function allowing to mix the questions and answers so the quiz is more interesting
  function randomize(elements) {
    for (var i = 0; i < elements.length; i++) {
      var j = Math.floor(Math.random() * elements.length);
      var temp = elements[i];
      elements[i] = elements[j];
      elements[j] = temp;
    }
    return elements;
  }
  //variables you will need for the quiz:
  var index = 0; // this is the first question index;
  var quiz = personalityQuiz;
  var questions = quiz.questions;
  var questionSet = questions.length;
  var collectedAnswers = []; //this is the array where the answers are stored, then counted and depending on the occurence of each, result is established
  var startingBtn = $("#start");
  // first initiate the quiz
  startingBtn.on("click", function(event) {
    $(this).remove();
    $(this).parent().remove();
    var testBoard = $("<div>");
    testBoard.addClass("board");
    testBoard.appendTo($("body"));
    testBoard.attr("id", "testBoard");

    var button = $("<button>start test</button>");
    button.appendTo(testBoard);
    button.attr("class", "startTest");
  });

  //the functions you need for the quiz once it has started
  function createQuestion() {
    if (index < questionSet) {
      var answers = questions[index].answers;
      randomize(answers);

      var title = $("<h5>", {
        class: "title"
      });
      title.appendTo(testBoard);
      var quizDiv = $("<div>", {
        class: "quizDiv"
      });
      quizDiv.insertAfter(title);
      title.text(questions[index].title);
      for (var i = 0; i < answers.length; i++) {
        var label = $("<label>");
        label.appendTo(quizDiv);
      }

      var labels = quizDiv.find("label");
      for (var i = 0; i < labels.length; i++) {
        $(labels[i]).text(answers[i].answer); //the label text matches the answer
        $(labels[i]).attr("data", answers[i].result);
      }

      labels.each(function(index2, value) {
        var input = $("<input>");
        input.attr("type", "radio");
        input.attr("name", "one");
        input.prependTo($(this));
      });

      var inputs = quizDiv.find("input");
      inputs.on("change", function(event) {
        $(this).parent().addClass("checked");
        $(this).parent().siblings("label").removeClass(); //this is how you color only the checked answer and know which it was
      });

      var button = $("<button>", {
        class: "quizButton"
      });
      button.appendTo(quizDiv);
      button.text("next");
    } else {
      showResults();
    }
  }

  function showResults() {
    var resultsBoard = $("<div>", {
      class: "resultsBoard"
    });
    resultsBoard.appendTo($("body"));
    $("body").children().not(resultsBoard).hide();
    var resultsParagraph = $("<p>", {
      class: "resultsParagraph"
    });
    resultsParagraph.appendTo(resultsBoard);
    var result0 = collectedAnswers.filter(function(item) {
      return item === quiz.results[0];
    }).length;
    var result1 = collectedAnswers.filter(function(item) {
      return item === quiz.results[1];
    }).length;
    var result2 = collectedAnswers.filter(function(item) {
      return item === quiz.results[2];
    }).length;

    if (result0 > result1 && result0 > result2) {
      resultsParagraph.text(quiz.descriptions[0]);
    } else if (result1 > result0 && result1 > result2) {
      resultsParagraph.text(quiz.descriptions[1]);
    } else if (result2 > result0 && result2 > result1) {
      resultsParagraph.text(quiz.descriptions[2]);
    } else {
      resultsParagraph.text(quiz.descriptions[3]);
    }
  }
//if you do not choose an answer- alert is shown and the quiz is halted
  function createAlertBox(element) {
    var alertBox = $("<div>", {
      class: "alertBox"
    });
    var alertP = $("<p>");
    alertBox.prependTo(element);
    alertP.appendTo(alertBox);
    alertP.text("Before moving forward choose an answer!");

    var hideAlertBtn = $("<button>", {
      class: "hideAlertBtn"
    });
    hideAlertBtn.appendTo(alertBox);
    hideAlertBtn.text("OK");
  }

  //test starts
  $("body").on("click", ".startTest", function() {
    $(this).remove();
    randomize(questions);
    createQuestion();
  });

  $("body").on("click", ".quizButton", function() {
    var labels = $(this).siblings("label");
    //console.log(labels);
    var checked = labels.find("input:checked");
    //console.log(checked);
    var labelText = checked.parent().text();
    //console.log(labelText);
    var dataText = checked.parent().attr("data");
    if (index < questionSet) {
      //you cannot move on if no answer is given
      if (dataText === undefined) {
        createAlertBox($("#testBoard"));
      } else {
        index++;
        collectedAnswers.push(dataText);
        console.log(collectedAnswers, collectedAnswers.length);
        createQuestion();
        $(this).parent().hide();
        $(this).parent().prev().hide();
      }
      //once the questions are all answered, the results are generated
    } else {
      showResults();
    }
  });

  $("body").on("click", ".hideAlertBtn", function() {
    $(this).parent().remove();
  });
});
