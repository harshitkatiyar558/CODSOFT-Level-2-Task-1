document.addEventListener("DOMContentLoaded", () => {
    let questionCount = 1;

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

    // Add new question functionality
    document.getElementById("add-question-button").addEventListener("click", () => {
        questionCount++;
        const questionContainer = document.getElementById("questions-container");
        questionContainer.innerHTML += `
            <div class="question-item">
                <label for="question-${questionCount}">Question ${questionCount}:</label>
                <input type="text" id="question-${questionCount}" name="questions[${questionCount - 1}][question]" required>
                <div>
                    <label for="option-${questionCount}-1">Option 1:</label>
                    <input type="text" id="option-${questionCount}-1" name="questions[${questionCount - 1}][options][0]" required>
                    <label for="option-${questionCount}-2">Option 2:</label>
                    <input type="text" id="option-${questionCount}-2" name="questions[${questionCount - 1}][options][1]" required>
                    <label for="option-${questionCount}-3">Option 3:</label>
                    <input type="text" id="option-${questionCount}-3" name="questions[${questionCount - 1}][options][2]" required>
                    <label for="option-${questionCount}-4">Option 4:</label>
                    <input type="text" id="option-${questionCount}-4" name="questions[${questionCount - 1}][options][3]" required>
                </div>
                <label for="answer-${questionCount}">Correct Answer:</label>
                <input type="text" id="answer-${questionCount}" name="questions[${questionCount - 1}][answer]" required>
            </div>
        `;
    });

    // Handle quiz form submission
    document.getElementById("create-quiz-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            const keys = key.match(/([^[\]]+)/g);
            if (!data[keys[0]]) data[keys[0]] = {};
            if (keys.length > 1) {
                if (!data[keys[0]][keys[1]]) data[keys[0]][keys[1]] = [];
                data[keys[0]][keys[1]][keys[2]] = value;
            } else {
                data[keys[0]] = value;
            }
        });

        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push(data);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        alert("Quiz created successfully!");
        window.location.href = "quizzes.html";
    });
});
