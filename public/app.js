(() => {
  'use strict';
  const { BASE, questions, paths, resultFor } = window.YukikiJourney;
  const $ = id => document.getElementById(id);
  const answers = Array(questions.length).fill(null);
  let step = 0;
  let currentResult = null;
  const drawings = {
    map: '<path d="m9 15 15-5 16 5 15-5v36l-15 5-16-5-15 5Z M24 10v36m16-31v36"/><path class="accent" d="m16 31 9-8 9 13 13-9"/>',
    spoon: '<ellipse cx="25" cy="21" rx="10" ry="13" transform="rotate(30 25 21)"/><path d="m30 32 15 22 5-3-16-23"/>',
    letter: '<path d="M8 17h48v32H8Z m0-32 24 19 24-19 M8 49l17-15m31 15L39 34"/><path class="accent" d="M43 12h9"/>',
    bag: '<path d="M15 24h34l5 29H10Z M23 25v-8a9 9 0 0 1 18 0v8"/><path class="accent" d="m27 38 5 5 7-10"/>',
    sprout: '<path d="M32 52V27 M32 35C15 35 12 24 14 15c16 0 18 12 18 20Zm0-7c0-14 9-20 20-18 0 15-8 20-20 18Z"/><path class="accent" d="M15 54c10-5 24-5 34 0"/>',
    cup: '<path d="M12 25h31v12a15 15 0 0 1-31 0Z M43 27h5a7 7 0 0 1 0 14h-6 M7 55h43"/><path class="accent" d="M22 17c-7-5 6-6 0-12m12 12c-7-5 6-6 0-12"/>',
    hammer: '<path d="m15 14 13-6 14 10-8 9-8-7-8 5-7-6Z m17 10 20 25-7 6-20-27"/><path class="accent" d="m6 39 6 2m42-20-4 5"/>',
    wind: '<path d="M7 22h36c13 0 13-15 3-15-6 0-8 4-8 7 M7 32h46 M15 42h24c13 0 13 15 3 15-6 0-8-4-8-7"/>',
    flag: '<path d="M17 56V10c12-9 18 9 31 0v24c-13 9-19-9-31 0"/><path class="accent" d="M9 56h20"/>',
    basket: '<path d="M8 28h48l-7 25H15Z M19 28 27 9m18 19L36 9 M24 36v10m16-10v10"/><path class="accent" d="M8 28h48"/>',
    sun: '<circle cx="32" cy="32" r="12"/><path d="M32 5v8m0 38v8M5 32h8m38 0h8M13 13l6 6m26 26 6 6M13 51l6-6m26-26 6-6"/>'
  };
  function icon(name) {
    return `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name]}</svg>`;
  }
  function showScreen(id, heading) {
    for (const screen of ['intro', 'play', 'result']) $(screen).hidden = screen !== id;
    window.scrollTo({ top: 0, behavior: 'instant' });
    $(heading).focus({ preventScroll: true });
  }
  function renderRoute() {
    $('route').innerHTML = questions.map((q, index) => `<li ${index === step ? 'aria-current="step"' : ''} class="${index < step ? 'done' : ''}"><span aria-hidden="true">${index < step ? '✓' : index + 1}</span>${q.chapter}</li>`).join('');
    const picked = questions.map((q, index) => q.options.find(o => o.key === answers[index])).filter(Boolean);
    $('pocket-list').innerHTML = picked.length ? picked.map(o => `<li>${o.token}</li>`).join('') : '<li class="empty-pocket">まだ空っぽ。ここから、ひとつずつ。</li>';
    $('route-number').textContent = String(step + 1).padStart(2, '0');
  }
  function renderQuestion() {
    const question = questions[step];
    $('chapter').textContent = question.chapter;
    $('step-count').textContent = `${String(step + 1).padStart(2, '0')} / 03`;
    $('question-title').textContent = question.title;
    $('question-note').textContent = question.note;
    $('options').innerHTML = '<legend class="sr-only">気になるものを1つ選んでください</legend>' + question.options.map((option, index) => `<label class="choice"><input type="radio" name="choice" value="${option.key}" ${answers[step] === option.key ? 'checked' : ''}><span class="choice-icon">${icon(option.icon)}</span><span class="choice-copy"><strong>${option.title}</strong><span>${option.text}</span></span><span class="choice-check" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></label>`).join('');
    $('next').disabled = !answers[step];
    $('next').innerHTML = step === questions.length - 1 ? '旅のしおりをひらく <span aria-hidden="true">↗</span>' : '次の寄り道へ <span aria-hidden="true">→</span>';
    $('back').textContent = step === 0 ? '← 表紙に戻る' : '← ひとつ戻る';
    $('selection-hint').textContent = answers[step] ? '選び直しても大丈夫。今の気分でどうぞ。' : '気になるものを1つ選ぶと、先へ進めます。';
    renderRoute();
    showScreen('play', 'question-title');
  }
  function renderResult() {
    currentResult = resultFor(answers);
    $('postcard-title').textContent = currentResult.title;
    $('result-description').textContent = currentResult.description;
    $('next-title').textContent = currentResult.nextTitle;
    $('next-description').textContent = currentResult.nextText;
    $('source-title').textContent = currentResult.guide.label;
    $('source-points').replaceChildren(...currentResult.guide.points.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    $('result-link').href = currentResult.url;
    $('result-link').textContent = currentResult.linkText + ' ↗';
    $('result-items').innerHTML = questions.map((q, index) => `<li>${q.options.find(o => o.key === answers[index]).token}</li>`).join('');
    $('other-links').innerHTML = ['adventure', 'farm', 'support', 'open'].map(key => `<a href="${BASE + paths[key].hash}" target="_blank" rel="noopener noreferrer">${paths[key].short}<span aria-hidden="true">↗</span><span class="sr-only">（新しいタブ）</span></a>`).join('');
    $('copy-status').textContent = '';
    $('copy-fallback').hidden = true;
    showScreen('result', 'result-title');
  }
  function bookmarkText() {
    const items = questions.map((q, index) => q.options.find(o => o.key === answers[index]).token);
    return ['土の国への小さな旅', currentResult.title.replace('\n', ''), '', '旅のポケット：' + items.join('、'), '今日の気分に似合う入口。関わり方は、ひとつじゃない。', currentResult.url].join('\n');
  }
  $('start').addEventListener('click', renderQuestion);
  $('home').addEventListener('click', event => {
    event.preventDefault();
    showScreen('intro', 'intro-title');
  });
  $('options').addEventListener('change', event => {
    if (!(event.target instanceof HTMLInputElement)) return;
    answers[step] = event.target.value;
    $('next').disabled = false;
    $('selection-hint').textContent = 'ポケットに入りました。選び直しても大丈夫。';
    renderRoute();
  });
  $('next').addEventListener('click', () => {
    if (!answers[step]) return;
    if (step === questions.length - 1) renderResult();
    else { step++; renderQuestion(); }
  });
  $('back').addEventListener('click', () => {
    if (step === 0) showScreen('intro', 'intro-title');
    else { step--; renderQuestion(); }
  });
  $('restart').addEventListener('click', () => {
    answers.fill(null);
    step = 0;
    currentResult = null;
    showScreen('intro', 'intro-title');
  });
  $('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bookmarkText());
      $('copy-status').textContent = 'しおりの文をコピーしました。';
    } catch {
      $('copy-fallback').hidden = false;
      $('copy-text').value = bookmarkText();
      $('copy-text').focus();
      $('copy-text').select();
      $('copy-status').textContent = 'コピーできなかったため、下に文を表示しました。';
    }
  });
})();
