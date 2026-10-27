const assert = require('node:assert/strict');
const { questions, resultFor, BASE } = require('../public/journey.js');
const choices = ['adventure', 'farm', 'support', 'open'];
let count = 0;
for (const first of choices) for (const second of choices) for (const third of choices) {
  const answers = [first, second, third];
  const result = resultFor(answers);
  assert.ok(result.title && result.description && result.url.startsWith(BASE));
  assert.equal(result.guide.points.length, 3);
  assert.ok(result.guide.label);
  for (let step = 0; step < answers.length; step++) {
    assert.equal(questions[step].options.filter(option => option.key === answers[step]).length, 1);
  }
  count++;
}
assert.equal(resultFor(['adventure', 'adventure', 'farm']).key, 'adventure');
assert.equal(resultFor(['farm', 'farm', 'support']).url, BASE + '#Nou');
assert.equal(resultFor(['support', 'support', 'open']).url, BASE + '#Eng');
assert.equal(resultFor(['adventure', 'farm', 'support']).key, 'mixed');
assert.equal(resultFor(['open', 'open', 'open']).key, 'open');
assert.equal(resultFor(['open', 'farm', 'support']).key, 'mixed');
console.log(`PASS: ${count} answer combinations; all routes, ties and open exploration verified.`);
