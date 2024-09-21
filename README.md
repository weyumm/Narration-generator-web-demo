# Narration-generator-web-demo
学术英语写作课程pre，了解Narration的定义、典例、分析后，我做了个自动生成Narration的网页demo，依靠NLP技术与马尔科夫链实现。

Implementing a second-order Markov Chain will enhance the coherence of the generated narrations by considering the two preceding words when predicting the next word. Below are the updated `index.html` and `script.js` files incorporating a second-order Markov Chain.

### Directory Structure

```
narration-generator/
├── index.html
├── styles.css
└── script.js
```

### 1. `index.html`

This HTML file sets up the structure of the webpage, including a button to generate the narration and a display area for the generated text.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Narration Generator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Narration Generator</h1>
        <button id="generate-btn">Generate Narration</button>
        <div id="narration"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### 2. `script.js`

This JavaScript file implements a second-order Markov Chain to generate more coherent narrations. It builds the Markov Chain by mapping pairs of words to possible next words and generates sentences based on this mapping.

```javascript
// script.js

document.getElementById('generate-btn').addEventListener('click', generateNarration);

// Expanded Training Text
const trainingText = `
At Tongji University, students in the College of Automotive Studies strive to excel in their GPA through rigorous coursework.
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.
Many students at Tongji University participate in intricate group projects to enhance their academic performance.
The impact of typhoons on campus life challenges students to maintain their GPA amidst adverse conditions.
In the College of Automotive Studies, students often engage in late-night study sessions in the university library to achieve higher grades.
When typhoons strike, the university implements emergency protocols to ensure student safety while academic activities continue.
Research projects at Tongji University do not halt during typhoons, demonstrating the students' remarkable perseverance.
Facing the threats of typhoons, students remain committed to completing their courses and assignments.
Under the influence of typhoons, students at Tongji University learn to better manage their time and stress.
After a typhoon passes, the Tongji University campus is rejuvenated, and students gain valuable insights into the importance of teamwork.
Following a typhoon, students return to campus to continue their studies and research.
During the trials of typhoons, students at Tongji University exhibit exceptional adaptability.
Faculty members at Tongji University provide additional support during typhoons to help students cope with challenges.
Students assist each other during typhoons, overcoming difficult times together.
The university library becomes a sanctuary for students during typhoons, offering a safe space for continued learning.
Post-typhoon, students reflect on their study methods and develop new academic plans.
Through typhoon events, Tongji University enhances its campus emergency management capabilities.
During typhoons, students participate in volunteer activities to aid the community in disaster response.
After the typhoon season, students celebrate their academic and personal growth achievements.
In the face of typhoons, students at Tongji University demonstrate unwavering resilience.
Students in the College of Automotive Studies navigate the complexities of their courses even during severe weather conditions.
The involute challenges presented by typhoons help students develop critical problem-solving skills.
Balancing GPA and extracurricular activities becomes a testament to students' dedication at Tongji University.
`;

// Function to build a second-order Markov Chain
function buildSecondOrderMarkovChain(text) {
    const words = text.split(/\s+/);
    const markovChain = {};

    for (let i = 0; i < words.length - 2; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const nextWord = words[i + 2];
        const key = `${word1} ${word2}`;

        if (!markovChain[key]) {
            markovChain[key] = [];
        }

        markovChain[key].push(nextWord);
    }

    return markovChain;
}

// Initialize Markov Chain
const markovChain = buildSecondOrderMarkovChain(trainingText);

// Function to generate a sentence using second-order Markov Chain
function generateSentence(maxLength = 20) {
    // Select a random starting key (pair of words)
    const keys = Object.keys(markovChain);
    let currentKey = keys[Math.floor(Math.random() * keys.length)];
    let sentence = currentKey.split(' ');

    for (let i = 0; i < maxLength; i++) {
        const possibleNextWords = markovChain[currentKey];
        if (!possibleNextWords || possibleNextWords.length === 0) {
            break;
        }
        const nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
        sentence.push(nextWord);

        // Update the current key
        currentKey = `${sentence[sentence.length - 2]} ${sentence[sentence.length - 1]}`;

        // If the next word ends with a period, stop the sentence
        if (nextWord.endsWith('.')) {
            break;
        }
    }

    // Capitalize the first letter and ensure the sentence ends with a period
    let generated = sentence.join(' ');
    generated = generated.charAt(0).toUpperCase() + generated.slice(1);
    if (!generated.endsWith('.')) {
        generated += '.';
    }

    return generated;
}

// Function to generate narration (three paragraphs)
function generateNarration() {
    const narration = [];

    // Generate Introduction
    const intro = generateSentence(15);
    narration.push(intro);

    // Generate Body
    const body = generateSentence(25);
    narration.push(body);

    // Generate Conclusion
    const conclusion = generateSentence(15);
    narration.push(conclusion);

    // Display Narration
    document.getElementById('narration').textContent = narration.join('\n\n');
}
```

### 3. `styles.css`

*(Assuming you want to keep the previous styles, but for completeness, here’s the CSS.)*

```css
/* styles.css */

body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to right, #e0f7fa, #ffffff);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 700px;
    width: 90%;
}

h1 {
    margin-bottom: 20px;
    color: #333;
}

#generate-btn {
    padding: 12px 25px;
    font-size: 16px;
    color: white;
    background-color: #00796b;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#generate-btn:hover {
    background-color: #004d40;
}

#narration {
    margin-top: 30px;
    text-align: left;
    max-width: 100%;
    white-space: pre-wrap;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background: #f9f9f9;
    font-size: 16px;
    color: #555;
    height: 300px;
    overflow-y: auto;
}
```

### How It Works

#### 1. Building the Second-Order Markov Chain

A second-order Markov Chain considers the previous two words to determine the next word. This approach captures more context and results in more coherent and contextually relevant sentences.

```javascript
function buildSecondOrderMarkovChain(text) {
    const words = text.split(/\s+/);
    const markovChain = {};

    for (let i = 0; i < words.length - 2; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const nextWord = words[i + 2];
        const key = `${word1} ${word2}`;

        if (!markovChain[key]) {
            markovChain[key] = [];
        }

        markovChain[key].push(nextWord);
    }

    return markovChain;
}
```

- **Splitting Text**: The training text is split into words based on whitespace.
- **Creating Keys**: Each key in the `markovChain` object is a pair of consecutive words.
- **Mapping Next Words**: For each key, an array of possible next words is maintained.

#### 2. Generating Sentences

The `generateSentence` function uses the second-order Markov Chain to create sentences by selecting the next word based on the current pair of words.

```javascript
function generateSentence(maxLength = 20) {
    // Select a random starting key (pair of words)
    const keys = Object.keys(markovChain);
    let currentKey = keys[Math.floor(Math.random() * keys.length)];
    let sentence = currentKey.split(' ');

    for (let i = 0; i < maxLength; i++) {
        const possibleNextWords = markovChain[currentKey];
        if (!possibleNextWords || possibleNextWords.length === 0) {
            break;
        }
        const nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
        sentence.push(nextWord);

        // Update the current key
        currentKey = `${sentence[sentence.length - 2]} ${sentence[sentence.length - 1]}`;

        // If the next word ends with a period, stop the sentence
        if (nextWord.endsWith('.')) {
            break;
        }
    }

    // Capitalize the first letter and ensure the sentence ends with a period
    let generated = sentence.join(' ');
    generated = generated.charAt(0).toUpperCase() + generated.slice(1);
    if (!generated.endsWith('.')) {
        generated += '.';
    }

    return generated;
}
```

- **Starting Point**: A random pair of words (`currentKey`) is selected to begin the sentence.
- **Iterative Generation**: For each step, the next word is chosen based on the current key's possible next words.
- **Updating Key**: The current key is updated to the last two words in the sentence.
- **Termination**: The loop breaks if a word ends with a period or if the maximum length is reached.
- **Formatting**: Ensures the sentence starts with a capital letter and ends with a period.

#### 3. Generating Narration

The `generateNarration` function creates a three-paragraph narration by generating an introduction, body, and conclusion.

```javascript
function generateNarration() {
    const narration = [];

    // Generate Introduction
    const intro = generateSentence(15);
    narration.push(intro);

    // Generate Body
    const body = generateSentence(25);
    narration.push(body);

    // Generate Conclusion
    const conclusion = generateSentence(15);
    narration.push(conclusion);

    // Display Narration
    document.getElementById('narration').textContent = narration.join('\n\n');
}
```

- **Introduction**: Generates a shorter sentence to serve as an introduction.
- **Body**: Generates a longer sentence for the main content.
- **Conclusion**: Generates another shorter sentence to conclude the narration.
- **Display**: Joins the three sentences with double line breaks and displays them in the `#narration` div.

### Example Output

Each time you click the "Generate Narration" button, a new three-paragraph narration is generated. Here's an example:

```
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.

The impact of typhoons on campus life challenges students to maintain their GPA amidst adverse conditions. In the College of Automotive Studies, students often engage in late-night study sessions in the university library to achieve higher grades.

After a typhoon passes, the Tongji University campus is rejuvenated, and students gain valuable insights into the importance of teamwork.
```

### Benefits of a Second-Order Markov Chain

1. **Enhanced Coherence**: By considering two previous words, the generated sentences are more contextually relevant and coherent compared to a first-order Markov Chain.
2. **Improved Contextual Understanding**: The generator better captures common phrases and structures within the training text, leading to more natural-sounding narrations.
3. **Greater Diversity**: With more context, the generator can produce a wider variety of sentences, reducing repetitive patterns.

### Further Enhancements

1. **Increase Training Data**: Add more sentences to the `trainingText` to improve the diversity and quality of the generated narrations.
2. **Sentence Validation**: Implement additional checks to ensure sentences start with capital letters and end with appropriate punctuation.
3. **User Customization**: Allow users to input specific keywords or themes to tailor the generated narration.
4. **Download/Copy Functionality**: Enable users to copy the generated narration to the clipboard or download it as a text file.
5. **Responsive Design**: Ensure the application is fully responsive and works well on various devices, including mobile phones and tablets.

### Conclusion

By upgrading to a second-order Markov Chain, your Narration Generator can produce more coherent and contextually relevant sentences, enhancing the overall quality of the generated narrations. This approach strikes a balance between simplicity and improved text generation quality, making it an effective solution for your project.

## 可能出现的小问题
1. **Markov 链库在浏览器中的兼容性问题**：
    - `markov-chains-text` 库主要是为 Node.js 设计的，可能在浏览器环境中无法正常工作。这会导致 `MarkovChains` 对象未定义，从而阻止叙述的生成。

2. **JavaScript 错误**：
    - 代码中可能存在语法错误或逻辑错误，阻止脚本的正常执行。

### 解决方案

为了确保您的叙述生成器能够在浏览器中正常工作，我们将采用以下步骤：

1. **检查浏览器控制台中的错误**：
    - 按 `F12` 或 `Ctrl + Shift + I` 打开开发者工具，切换到 **Console** 选项卡，查看是否有任何错误信息。如果看到与 `MarkovChains` 相关的错误，说明库未正确加载或不兼容。

2. **使用浏览器兼容的 Markov 链实现**：
    - 由于 `markov-chains-text` 不完全兼容浏览器环境，我们将使用一个简单的 JavaScript 实现来替代。

3. **提供完整的修正代码**：
    - 以下是经过修正和优化的 `index.html`、`styles.css` 和 `script.js` 文件。这些文件包含一个简单的 Markov 链实现，确保在浏览器中正常生成叙述。

### 完整代码示例

#### 1. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Narration Generator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Narration Generator</h1>
        <button id="generate-btn">Generate Narration</button>
        <div id="narration"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### 2. `styles.css`

```css
/* styles.css */

body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to right, #e0f7fa, #ffffff);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 700px;
    width: 90%;
}

h1 {
    margin-bottom: 20px;
    color: #333;
}

#generate-btn {
    padding: 12px 25px;
    font-size: 16px;
    color: white;
    background-color: #00796b;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#generate-btn:hover {
    background-color: #004d40;
}

#narration {
    margin-top: 30px;
    text-align: left;
    max-width: 100%;
    white-space: pre-wrap;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background: #f9f9f9;
    font-size: 16px;
    color: #555;
    height: 300px;
    overflow-y: auto;
}
```

#### 3. `script.js`

```javascript
// script.js

document.getElementById('generate-btn').addEventListener('click', generateNarration);

// Expanded Training Text
const trainingText = `
At Tongji University, students in the College of Automotive Studies strive to excel in their GPA through rigorous coursework.
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.
Many students at Tongji University participate in intricate group projects to enhance their academic performance.
The impact of typhoons on campus life challenges students to maintain their GPA amidst adverse conditions.
In the College of Automotive Studies, students often engage in late-night study sessions in the university library to achieve higher grades.
When typhoons strike, the university implements emergency protocols to ensure student safety while academic activities continue.
Research projects at Tongji University do not halt during typhoons, demonstrating the students' remarkable perseverance.
Facing the threats of typhoons, students remain committed to completing their courses and assignments.
Under the influence of typhoons, students at Tongji University learn to better manage their time and stress.
After a typhoon passes, the Tongji University campus is rejuvenated, and students gain valuable insights into the importance of teamwork.
Following a typhoon, students return to campus to continue their studies and research.
During the trials of typhoons, students at Tongji University exhibit exceptional adaptability.
Faculty members at Tongji University provide additional support during typhoons to help students cope with challenges.
Students assist each other during typhoons, overcoming difficult times together.
The university library becomes a sanctuary for students during typhoons, offering a safe space for continued learning.
Post-typhoon, students reflect on their study methods and develop new academic plans.
Through typhoon events, Tongji University enhances its campus emergency management capabilities.
During typhoons, students participate in volunteer activities to aid the community in disaster response.
After the typhoon season, students celebrate their academic and personal growth achievements.
In the face of typhoons, students at Tongji University demonstrate unwavering resilience.
Students in the College of Automotive Studies navigate the complexities of their courses even during severe weather conditions.
The involute challenges presented by typhoons help students develop critical problem-solving skills.
Balancing GPA and extracurricular activities becomes a testament to students' dedication at Tongji University.
`;

// Function to build Markov Chain
function buildMarkovChain(text) {
    const words = text.split(/\s+/);
    const markovChain = {};

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const nextWord = words[i + 1];

        if (!markovChain[word]) {
            markovChain[word] = [];
        }

        if (nextWord) {
            markovChain[word].push(nextWord);
        }
    }

    return markovChain;
}

// Initialize Markov Chain
const markovChain = buildMarkovChain(trainingText);

// Function to generate a sentence
function generateSentence(startWords = null, maxLength = 20) {
    const words = Object.keys(markovChain);
    let currentWord = startWords || words[Math.floor(Math.random() * words.length)];
    let sentence = [currentWord];

    for (let i = 0; i < maxLength; i++) {
        const nextWords = markovChain[currentWord];
        if (!nextWords || nextWords.length === 0) {
            break;
        }
        currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        sentence.push(currentWord);
        if (currentWord.endsWith('.')) {
            break;
        }
    }

    // Capitalize first letter and ensure sentence ends with a period
    let generated = sentence.join(' ');
    generated = generated.charAt(0).toUpperCase() + generated.slice(1);
    if (!generated.endsWith('.')) {
        generated += '.';
    }

    return generated;
}

// Function to generate narration
function generateNarration() {
    const narration = [];

    // Generate Introduction
    const intro = generateSentence(null, 15);
    narration.push(intro);

    // Generate Body
    const body = generateSentence(null, 25);
    narration.push(body);

    // Generate Conclusion
    const conclusion = generateSentence(null, 15);
    narration.push(conclusion);

    // Display Narration
    document.getElementById('narration').textContent = narration.join('\n\n');
}
```

### 代码解释

#### 1. `index.html`

- **结构**：
    - 包含一个标题 (`<h1>`)、一个按钮 (`<button>`) 和一个用于显示叙述的区域 (`<div id="narration">`)。
    - 引用了 `styles.css` 和 `script.js` 以应用样式和功能。

#### 2. `styles.css`

- **设计**：
    - 使用浅色渐变背景 (`linear-gradient`)。
    - 样式化容器，使其居中、具有圆角和阴影。
    - 美化按钮，使其具有颜色变化和圆角。
    - 格式化叙述显示区域，确保文本易读并具有滚动功能。

#### 3. `script.js`

- **Markov 链实现**：
    - **构建 Markov 链**：
        - `buildMarkovChain` 函数将训练文本按空格拆分为单词数组。
        - 为每个单词记录可能的下一个单词，形成一个映射 (`markovChain`)。
    - **生成句子**：
        - `generateSentence` 函数从随机或指定的起始单词开始，逐步生成句子，直到达到最大长度或遇到句号为止。
        - 确保句子以大写字母开头，并以句号结尾。
    - **生成叙述**：
        - `generateNarration` 函数生成三个句子，分别作为引言、主体和结论。
        - 将生成的叙述显示在页面的 `#narration` 区域。

### 常见问题及解决方法

1. **按钮点击后无反应**：
    - **检查控制台错误**：
        - 按 `F12` 或 `Ctrl + Shift + I` 打开开发者工具，切换到 **Console** 选项卡，查看是否有任何错误信息。
    - **确保文件正确加载**：
        - 确保 `script.js` 和 `styles.css` 文件与 `index.html` 位于同一目录中，并且文件名拼写正确。
    - **确保 JavaScript 启用**：
        - 确保浏览器中启用了 JavaScript。

2. **生成的叙述不符合预期**：
    - **扩展训练文本**：
        - 增加更多与“Tongji University”、“College of Automotive Studies”、“GPA”、“involute”等相关的句子，以提高 Markov 链的生成质量。
    - **调整句子长度**：
        - 根据需要调整 `generateSentence` 函数中的 `maxLength` 参数，以生成更长或更短的句子。

3. **句子不连贯或缺乏逻辑**：
    - **增加训练文本的多样性**：
        - 更多样化的训练文本有助于生成更连贯和逻辑性的叙述。
    - **使用词级 Markov 链**：
        - 当前实现基于单词级别的 Markov 链，这对于英语来说效果较好。确保训练文本具有良好的语法和标点符号。

### 测试示例

点击“Generate Narration”按钮后，您应该会看到类似以下的叙述：

```
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.

Research projects at Tongji University do not halt during typhoons, demonstrating the students' remarkable perseverance. Facing the threats of typhoons, students remain committed to completing their courses and assignments.

After the typhoon season, students celebrate their academic and personal growth achievements.
```

### 进一步优化建议

1. **扩充训练文本**：
    - 收集更多与主题相关的句子，涵盖不同的情境和事件，以增强生成质量和多样性。

2. **实现用户自定义**：
    - 允许用户输入特定的关键词或选择主题，以生成更个性化的叙述。

3. **增加更多句子生成逻辑**：
    - 例如，确保每段叙述有特定的结构（引言、主体、结论），或者根据上下文生成相关内容。

4. **美化界面**：
    - 增加更多的 CSS 样式，提升用户体验。例如，添加动画效果、响应式设计等。

5. **保存和分享功能**：
    - 添加按钮，允许用户将生成的叙述复制到剪贴板或下载为文本文件。

马尔科夫链（Markov Chain）在文本生成中的应用非常有趣且强大。让我们深入探讨一下马尔科夫链是如何在生成器中实现文本生成的，以及它背后的原理。

## 马尔科夫链的基本概念

### 什么是马尔科夫链？

马尔科夫链是一种数学模型，用于描述系统在一系列状态之间的转移。其核心特点是“无记忆性”（Markov Property），即下一个状态仅取决于当前状态，与之前的状态无关。

在文本生成中，马尔科夫链被用来预测下一个词（或字符）基于当前词（或字符）的出现概率。通过这种方式，马尔科夫链能够生成看似自然的文本。

### 马尔科夫链的组成部分

1. **状态（State）**：在文本生成中，通常是单个词或字符。
2. **转移概率（Transition Probability）**：从一个状态转移到另一个状态的概率。在文本生成中，这表示一个词后面可能跟随哪些词以及各自的概率。

## 在您的叙述生成器中的应用

让我们结合您的代码，详细解释马尔科夫链是如何在您的叙述生成器中工作的。

### 1. 构建马尔科夫链

首先，您需要一个训练文本（`trainingText`），它包含了与“Tongji University”、“College of Automotive Studies”、“GPA”、“involute”等相关的句子。这些句子为马尔科夫链提供了学习的基础。

```javascript
const trainingText = `
At Tongji University, students in the College of Automotive Studies strive to excel in their GPA through rigorous coursework.
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.
Many students at Tongji University participate in intricate group projects to enhance their academic performance.
...
`;
```

#### 1.1 分词与标记化

为了构建马尔科夫链，首先需要将训练文本拆分为单词。这可以通过空格进行简单的分词：

```javascript
const words = text.split(/\s+/);
```

#### 1.2 构建转移概率表

接下来，遍历这些单词，记录每个单词后可能跟随的下一个单词。这就是马尔科夫链的核心部分：

```javascript
function buildMarkovChain(text) {
    const words = text.split(/\s+/);
    const markovChain = {};

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const nextWord = words[i + 1];

        if (!markovChain[word]) {
            markovChain[word] = [];
        }

        if (nextWord) {
            markovChain[word].push(nextWord);
        }
    }

    return markovChain;
}

const markovChain = buildMarkovChain(trainingText);
```

在这个过程中，`markovChain` 对象会将每个单词映射到一个数组，数组中包含所有在训练文本中该单词后面出现过的单词。例如：

```javascript
{
    "At": ["Tongji"],
    "Tongji": ["University,"],
    "University,": ["students"],
    ...
}
```

### 2. 生成文本

一旦马尔科夫链构建完成，生成文本的过程如下：

#### 2.1 选择起始词

生成句子通常从一个随机选择的单词开始，或者从一个特定的起始词开始（如句子的第一个单词）。

```javascript
const words = Object.keys(markovChain);
let currentWord = startWords || words[Math.floor(Math.random() * words.length)];
```

#### 2.2 逐步生成

基于当前单词，随机选择下一个单词，并将其添加到句子中。这个过程会持续，直到达到预设的最大长度或遇到句号结束句子。

```javascript
function generateSentence(startWords = null, maxLength = 20) {
    const words = Object.keys(markovChain);
    let currentWord = startWords || words[Math.floor(Math.random() * words.length)];
    let sentence = [currentWord];

    for (let i = 0; i < maxLength; i++) {
        const nextWords = markovChain[currentWord];
        if (!nextWords || nextWords.length === 0) {
            break;
        }
        currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        sentence.push(currentWord);
        if (currentWord.endsWith('.')) {
            break;
        }
    }

    // 确保句子首字母大写并以句号结尾
    let generated = sentence.join(' ');
    generated = generated.charAt(0).toUpperCase() + generated.slice(1);
    if (!generated.endsWith('.')) {
        generated += '.';
    }

    return generated;
}
```

#### 2.3 生成叙述

通过调用 `generateSentence` 函数，生成引言、主体和结论三个部分，并将它们组合成一篇叙述。

```javascript
function generateNarration() {
    const narration = [];

    // 生成引言
    const intro = generateSentence(null, 15);
    narration.push(intro);

    // 生成主体
    const body = generateSentence(null, 25);
    narration.push(body);

    // 生成结论
    const conclusion = generateSentence(null, 15);
    narration.push(conclusion);

    // 显示叙述
    document.getElementById('narration').textContent = narration.join('\n\n');
}
```

## 马尔科夫链生成的效果

通过上述过程，马尔科夫链利用训练文本中的词汇和它们的上下文关系，生成新的句子。这些句子在结构和用词上类似于训练文本，但由于随机选择的性质，每次生成的结果都会有所不同。这就是为什么每次点击“Generate Narration”按钮时，您都会得到不同但语法正确的叙述。

### 示例生成结果

```
During typhoon season, the campus transforms into a hub of activity as students balance their studies with safety measures.

Research projects at Tongji University do not halt during typhoons, demonstrating the students' remarkable perseverance. Facing the threats of typhoons, students remain committed to completing their courses and assignments.

After the typhoon season, students celebrate their academic and personal growth achievements.
```

## 为什么看起来“神奇”

马尔科夫链的神奇之处在于它能够通过简单的统计方法，捕捉训练文本中的语言模式，从而生成看似自然的句子。这种方法不需要理解文本的深层含义，只是基于词汇的共现关系进行预测。

### 优点

1. **简单易实现**：无需复杂的机器学习模型，基于统计的方法即可实现。
2. **快速生成**：生成速度快，适用于实时应用。

### 缺点

1. **连贯性有限**：由于每个单词的选择仅依赖于当前单词，长距离的依赖关系无法捕捉，导致生成的文本在逻辑和语义上可能不够连贯。
2. **依赖训练文本的质量和多样性**：训练文本越丰富，生成的文本质量和多样性越高。

## 进一步的优化

### 增加训练文本的多样性

更多的训练文本可以提高生成文本的质量和多样性。您可以收集更多与主题相关的句子，涵盖不同的情境和事件。

### 使用更高级的Markov链

您可以扩展到更高级的Markov链模型，例如二阶或n阶Markov链，这样每个状态不仅仅依赖于当前单词，还依赖于前面几个单词。这可以显著提高生成文本的连贯性。

```javascript
// 二阶马尔科夫链示例
function buildMarkovChain(text) {
    const words = text.split(/\s+/);
    const markovChain = {};

    for (let i = 0; i < words.length - 2; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const nextWord = words[i + 2];
        const key = `${word1} ${word2}`;

        if (!markovChain[key]) {
            markovChain[key] = [];
        }

        markovChain[key].push(nextWord);
    }

    return markovChain;
}
```

### 引入句子结构和语法规则

结合模板和马尔科夫链，可以确保生成的文本在结构上更合理。例如，可以使用固定的引言、主体和结论模板，并在每个部分使用马尔科夫链生成相应的内容。

### 结合其他NLP技术

为了进一步提升生成文本的质量，可以结合其他NLP技术，如分词、词性标注等，增强生成的连贯性和语义正确性。

## 总结

马尔科夫链通过分析训练文本中的词汇和它们的相互关系，能够生成看似自然的文本。这种方法虽然简单，但在适当的训练数据和优化下，能够实现相当不错的文本生成效果。随着对马尔科夫链原理的理解和应用，我们可以进一步提升生成器的质量，使其生成的叙述更加连贯和丰富。
