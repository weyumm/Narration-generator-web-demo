// script.js

document.getElementById('generate-btn').addEventListener('click', generateNarration);

function generateNarration() {
    const narration = [];

    // Expanded Vocabulary Library
    const characters = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah"];
    const settings = [
        "at Tongji University",
        "in the bustling city of Shanghai",
        "during a severe typhoon",
        "in a quiet study room",
        "on the university campus",
        "during finals week",
        "at the university library",
        "in the student dormitory"
    ];
    const actions = [
        "studying for exams",
        "attending a lecture",
        "participating in a group project",
        "preparing for a presentation",
        "researching for a thesis",
        "juggling multiple assignments",
        "seeking help from professors",
        "balancing extracurricular activities"
    ];
    const emotions = [
        "feeling stressed",
        "feeling accomplished",
        "feeling overwhelmed",
        "feeling determined",
        "feeling motivated",
        "feeling anxious",
        "feeling hopeful",
        "feeling tired"
    ];
    const conclusions = [
        "The day turned out to be highly productive.",
        "They managed to improve their GPA significantly.",
        "This experience taught them valuable time management skills.",
        "They decided to seek better work-life balance in the future.",
        "Their hard work paid off during the final exams.",
        "They learned the importance of resilience.",
        "The typhoon unexpectedly gave them extra study time.",
        "They formed lasting friendships through collaborative projects."
    ];

    // Paragraph Templates
    const introductionTemplates = [
        "{character} was {setting} and decided to start {action}.",
        "One day, {character} found themselves {setting} while {action}.",
        "At {setting}, {character} wanted to {action}."
    ];

    const bodyTemplates = [
        "While {action}, {character} was {emotion}.",
        "As time passed, {character} gradually {emotion}.",
        "During the {action}, {character} started {emotion}.",
        "While {action}, {character} couldn't help but feel {emotion}."
    ];

    const conclusionTemplates = [
        "{conclusion}",
        "Ultimately, {conclusion}",
        "As a result, {conclusion}",
        "In the end, {conclusion}",
        "Consequently, {conclusion}"
    ];

    // Random Selection and Placeholder Replacement
    // Introduction
    let introTemplate = getRandomItem(introductionTemplates);
    const selectedCharacter = getRandomItem(characters);
    const selectedSetting = getRandomItem(settings);
    const selectedAction = getRandomItem(actions);
    introTemplate = replacePlaceholders(introTemplate, {
        character: selectedCharacter,
        setting: selectedSetting,
        action: selectedAction
    });
    narration.push(introTemplate);

    // Body
    let bodyTemplate = getRandomItem(bodyTemplates);
    const selectedEmotion = getRandomItem(emotions);
    bodyTemplate = replacePlaceholders(bodyTemplate, {
        action: selectedAction,
        character: selectedCharacter,
        emotion: selectedEmotion
    });
    narration.push(bodyTemplate);

    // Conclusion
    let conclusionTemplate = getRandomItem(conclusionTemplates);
    const selectedConclusion = getRandomItem(conclusions);
    conclusionTemplate = replacePlaceholders(conclusionTemplate, {
        conclusion: selectedConclusion
    });
    narration.push(conclusionTemplate);

    // Display Narration
    document.getElementById('narration').textContent = narration.join('\n\n');
}

// Utility Function: Randomly select an item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Utility Function: Replace placeholders in the template with actual data
function replacePlaceholders(template, data) {
    return template.replace(/{(\w+)}/g, (_, key) => data[key] || `{${key}}`);
}
