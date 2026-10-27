(function (root) {
  'use strict';
  const BASE = 'https://claude.ai/artifact/4QH8LJdmEHccxG7zX9aN8J';
  const questions = [
    { chapter: '出発の朝', title: 'かばんに、ひとつ。\n何を入れていこう？', note: '役に立つかどうかより、なんだか持っていきたいもの。', options: [
      { key: 'adventure', icon: 'map', title: 'まだ白い地図', text: '行き先は、歩きながら見つけたい。', token: '白い地図' },
      { key: 'farm', icon: 'spoon', title: '木のスプーン', text: 'その土地で育ったものを、味わいたい。', token: '木のスプーン' },
      { key: 'support', icon: 'letter', title: '一通の手紙', text: '会えない日も、誰かとつながっていたい。', token: '一通の手紙' },
      { key: 'open', icon: 'bag', title: '余白のあるかばん', text: '何に出会うか、まだ決めずに。', token: '余白のあるかばん' }
    ] },
    { chapter: '小道の途中', title: '少し、寄り道。\n足が止まるのは？', note: 'もし、こんな景色に出会ったら。気になるほうへどうぞ。', options: [
      { key: 'farm', icon: 'sprout', title: '土からのぞく、小さな芽', text: '何が育つんだろう。少し手を動かしてみたい。', token: '小さな芽' },
      { key: 'support', icon: 'cup', title: '縁側で聞こえる、これからの話', text: 'その挑戦が続くように、自分にもできることを。', token: '縁側での話' },
      { key: 'adventure', icon: 'hammer', title: 'みんなでつくる、途中の場所', text: '完成していないから、一緒に考えてみたい。', token: 'つくりかけの場所' },
      { key: 'open', icon: 'wind', title: '風の通る、分かれ道', text: 'どこも気になる。もう少し、眺めていたい。', token: '風の通る道' }
    ] },
    { chapter: '帰り道', title: '今日のおみやげ。\n持ち帰りたいのは？', note: 'ものでも、気持ちでも。今の自分にうれしいものを。', options: [
      { key: 'support', icon: 'letter', title: '「また便りを書くね」の約束', text: '離れていても、育っていく時間を見守りたい。', token: '次の便りの約束' },
      { key: 'adventure', icon: 'flag', title: '「次は何をしよう」のわくわく', text: '今日から始まる物語に、続きがほしい。', token: '次のわくわく' },
      { key: 'farm', icon: 'basket', title: '季節を感じる、ひとくち', text: '育てることと、食べることを近くに。', token: '季節のひとくち' },
      { key: 'open', icon: 'sun', title: 'なんだか、いい一日だった気持ち', text: 'いまはそれだけ。次の楽しみは、これから。', token: 'いい一日の余韻' }
    ] }
  ];
  const paths = {
    adventure: { title: 'まだない景色を、\nつくりにいく旅。', description: '白紙のままのところに、少し惹かれる。手探りの時間も、誰かとなら楽しめそう。そんな今日のあなたには、一緒に開拓していく入口が似合いそうです。', nextTitle: '「一緒につくる」が気になったら。', nextText: 'はらいどゆききの構想と、立ち上げから関わる楽しみをのぞいてみてください。', linkText: '一緒に開拓する案内へ', short: '一緒につくる', hash: '#Back' },
    farm: { title: '土と食卓を、\n近くにする旅。', description: '芽が出ることも、旬を味わうことも、暮らしのそばにあったらうれしい。そんな今日のあなたには、土に触れるところから始める入口が似合いそうです。', nextTitle: '「育てて、食べる」が気になったら。', nextText: 'まずは日帰りで関わる「一時留学」の考え方を。実際の日程や受け入れについては、案内先で相談できます。', linkText: '農にふれる案内へ', short: '育てて、食べる', hash: '#Nou' },
    support: { title: '育つ時間を、\n見守る旅。', description: '自分がそこにいない日も、誰かの挑戦が続いていく。その便りを楽しみに待つのも、ひとつの関わり方。そんな今日のあなたには、応援する入口が似合いそうです。', nextTitle: '「託して、見守る」が気になったら。', nextText: 'モノ・知恵・お金などを託し、活動を支える構想へ。気になることを知るところからで大丈夫です。', linkText: '支えて、見守る案内へ', short: '支えて、見守る', hash: '#Eng' },
    mixed: { title: 'いくつもの道を、\nゆききする旅。', description: 'つくることも、味わうことも、誰かを見守ることも。気になる入口が、ひとつに収まらない日。まずは全体を眺めて、心が動くところを見つけてみませんか。', nextTitle: 'まだ、ひとつに決めなくていい。', nextText: '全体の案内から、いろいろな関わり方を見渡せます。今日選ばなかった道にも、いつでも寄り道してください。', linkText: 'はらいどゆききの全体案内へ', short: '全体を見てみる', hash: '' },
    open: { title: '余白をたのしむ、\n気ままな旅。', description: 'まだ名前のついていない「ちょっと気になる」を、そのまま大切に。急いで関わり方を決めずに、どんな場所なのかを知るところから始めてみませんか。', nextTitle: 'まずは、どんな場所か知るところから。', nextText: '全体の案内を、自分のペースで。読むだけの日も、次に一歩進みたい日も、どちらも大丈夫です。', linkText: 'はらいどゆききの全体案内へ', short: '全体を見てみる', hash: '' }
  };
  const guides = {
    adventure: { label: '一緒に開拓する人へ', points: ['完成した体験に参加するだけでなく、場所や仕組みを仲間とつくる。', 'いまは立ち上げ期。手探りで土台を整える「初期メンバー」を募る案内です。', '農作業だけでなく、知恵や手仕事を持ち寄る関わり方も。'] },
    farm: { label: '農に関心のある人へ', points: ['仕事や今の暮らしを続けながら、土に触れ、育てて食べることに関わる。', 'まずは日帰りの「一時留学」から。慣れたら定期的に通う関わり方も。', '参加できる日程や、現在できる体験は、運営と相談して決めます。'] },
    support: { label: '活動を支えたい人へ', points: ['現地で動く人の暮らしを、モノやお金を託して支える「託し講」の構想。', '年12万円を15人で出し合う例を紹介。便りや収穫のおすそ分けでつながる考え方です。', 'これは元の案内にある構想です。金額・受け入れ・お返しの条件は、運営に確認してから。'] },
    open: { label: 'はらいどゆききの全体像', points: ['舞台は和歌山県橋本市・御幸辻の田畑。都市の暮らしと農の営みを行き来する構想です。', 'モノやお金を託す「講」と、人手や知恵を持ち寄る「結」。両方で場所を育てます。', '遠くから見守る、日帰りで訪れる、定期的に通う。関わり方は変えていけます。'] }
  };
  function resultFor(answers) {
    const scores = { adventure: 0, farm: 0, support: 0 };
    for (const answer of answers) if (Object.hasOwn(scores, answer)) scores[answer]++;
    const maximum = Math.max(...Object.values(scores));
    const leaders = Object.keys(scores).filter(key => scores[key] === maximum);
    const key = maximum === 0 ? 'open' : leaders.length > 1 ? 'mixed' : leaders[0];
    return { key, ...paths[key], guide: guides[key === 'mixed' ? 'open' : key], url: BASE + paths[key].hash };
  }
  const api = { BASE, questions, paths, resultFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.YukikiJourney = api;
})(typeof window !== 'undefined' ? window : globalThis);
