const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "from calibration_store import load_stereo_coefficients",
  "def depth_map(left_rectified, right_rectified):",
  "stereo = cv2.StereoSGBM_create()",
  "_, leftFrame = cap_left.retrieve()",
  "for i in os.listdir(directory):",
  "x,y,w,h = cv2.boundingRect(c)",
  "X_train, y_train, X_test, y_test = load_CIFAR10()",
  "print('Test data shape: ', X_test.shape)",
  "for i, idx in enumerate(idxs):",
  "import matplotlib.pyplot as plt",
  "plt.scatter(x_scatter, y_scatter, marker_size)",
  "from sklearn.model_selection import train_test_split",
  "linear_svm = LinearSVC().fit(X, y)",
  "fig, axes = plt.subplots(3, 3, figsize=(15, 10))",
  "from sklearn.datasets import load_breast_cancer",
  "X_train_scaled = (X_train - mean_train) / std_train",
  "def __init__(self):",
  "def __repr__(self):",
  "list(map(lambda block: block.to_json(), self.chain))",
  "for i in range(1, len(chain)):",
  "if __name__ == '__main__':",
  "return Block(**GENESIS_DATA)",
  "time.sleep(2)",
  "stringified_args = sorted(map(json.dumps, args))",
  "list(map(int,input().split()))",
  "input = sys.stdin.readline",
  "X.sort(reverse=True)",
  "print(a if a > 3 else b)",
  "from bs4 import BeautifulSoup",
  "driver.find_element_by_css_selector('body > button')",
  "(lambda x, y: x * y)(2, 4)",
  "import numpy as np",
  "input_shape=(IM_WIDTH, IM_HEIGHT, 3))",
  "model = keras.models.Sequential()",
  "model.add(keras.layers.Dense(1024, activation='relu'))",
  "data = pd.read_csv('./test.csv')",
  "x_train = iris.data[:-30]",
  "rfc = RandomForestClassifier(n_estimators = 10)",
  "[ord(s) for s in symbols if ord(s) > 127]",
  "[(color, size) for color in colors for size in sizes]",
  "self.previous_hash = previous_hash",
];

// Init word
let randWord;

// Init Score
let score = 0;

// Init time
let time = 21;

// set difficulty to value in local storage or default
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "Normal coder";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "Normal coder";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out | 시간 초과</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Start again | 재시작</button>
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";

    if (difficulty === "Fast coder") {
      time += 9;
    } else if (difficulty === "Crazy nerd") {
      time += 5;
    } else {
      time += 14;
    }
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
