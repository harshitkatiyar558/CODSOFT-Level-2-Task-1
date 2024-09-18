document.addEventListener("DOMContentLoaded", () => {
    const quizzesList = document.getElementById("quizzes-list");

    // Predefined quizzes
    const predefinedQuizzes = [
        {
            title: "Science Quiz",
            questions: [
                {
                    question: "What is the chemical symbol for water?",
                    options: ["H2O", "O2", "CO2", "H2"],
                    answer: "H2O"
                },
                {
                    question: "What planet is known as the Red Planet?",
                    options: ["Mars", "Earth", "Jupiter", "Saturn"],
                    answer: "Mars"
                },
                {
                    question: "Who developed the theory of relativity?",
                    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
                    answer: "Albert Einstein"
                }
            ]
        },
        {
            title: "General Knowledge Quiz",
            questions: [
                {
                    question: "What is the capital of France?",
                    options: ["Paris", "London", "Rome", "Berlin"],
                    answer: "Paris"
                },
                {
                    question: "Which ocean is the largest?",
                    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                    answer: "Pacific"
                },
                {
                    question: "Who wrote 'To Kill a Mockingbird'?",
                    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
                    answer: "Harper Lee"
                }
            ]
        },
        {
            title: "History Quiz",
            questions: [
                {
                    question: "Who was the first President of the United States?",
                    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
                    answer: "George Washington"
                },
                {
                    question: "In which year did the Titanic sink?",
                    options: ["1912", "1905", "1918", "1920"],
                    answer: "1912"
                },
                {
                    question: "Who was the leader of the Soviet Union during World War II?",
                    options: ["Joseph Stalin", "Leon Trotsky", "Vladimir Lenin", "Nikita Khrushchev"],
                    answer: "Joseph Stalin"
                }
            ]
        }
    ];

    // Initialize quizzes in local storage if none exist
    if (!localStorage.getItem("quizzes")) {
        localStorage.setItem("quizzes", JSON.stringify(predefinedQuizzes));
    }

    // Load quizzes from local storage
    const quizzes = JSON.parse(localStorage.getItem("quizzes"));

    if (quizzes.length === 0) {
        quizzesList.innerHTML = "<p>No quizzes available.</p>";
    } else {
        quizzesList.innerHTML = quizzes.map((quiz, index) => `
            <div class="quiz-item">
                <h2>${quiz.title}</h2>
                <button onclick="startQuiz(${index})">Start Quiz</button>
            </div>
        `).join('');
    }
});

function startQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes"));
    const quiz = quizzes[index];
    const quizContainer = document.createElement("div");
    quizContainer.classList.add("container");

    let questionIndex = 0;
    let score = 0;

    function showQuestion() {
        const question = quiz.questions[questionIndex];
        quizContainer.innerHTML = `
            <h1>${question.question}</h1>
            ${question.options.map((option, idx) => `
                <div>
                    <input type="radio" name="option" value="${option}" id="option-${idx}">
                    <label for="option-${idx}">${option}</label>
                </div>
            `).join('')}
            <button id="next-button">Next</button>
        `;
    }

    function handleNext() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === quiz.questions[questionIndex].answer) {
                score++;
            }
        }

        questionIndex++;
        if (questionIndex < quiz.questions.length) {
            showQuestion();
        } else {
            quizContainer.innerHTML = `
                <h1>Quiz Completed!</h1>
                <p>Your score: ${score} out of ${quiz.questions.length}</p>
                <a href="quizzes.html" class="start-button">Back to Quizzes</a>
            `;
        }
    }

    quizContainer.addEventListener("click", (event) => {
        if (event.target.id === "next-button") {
            handleNext();
        }
    });

    showQuestion();
    document.body.innerHTML = '';
    document.body.appendChild(quizContainer);
}
