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
