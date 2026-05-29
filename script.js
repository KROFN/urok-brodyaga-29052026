const STORAGE_KEY = "ege-russian-lesson-29052026";
const DEBUG_KEY = "ege-russian-lesson-29052026-debug";

const blocks = [
  { id: "stress", number: "Блок 4", title: "Ударения", practice: true },
  { id: "paronyms", number: "Блок 5", title: "Паронимы", practice: true },
  { id: "lexis", number: "Блок 6", title: "Лексическая правка", practice: true },
  { id: "microtext", number: "Блоки 1-3", title: "Микротекст", practice: false },
  { id: "expressive", number: "Блок 22", title: "Изобразительно-выразительные средства", practice: true },
  { id: "cohesion", number: "Блок 26", title: "Средства связи", practice: false },
  { id: "homework", number: "ДЗ", title: "Домашка", practice: false }
];

const state = loadState();

const stressWords = [
  { word: "газопровод", answer: "газопровОд", hint: "Система проведения вещества: ударение обычно на -вод." },
  { word: "нефтепровод", answer: "нефтепровОд", hint: "Это не электрический провод, а система проведения нефти." },
  { word: "водопровод", answer: "водопровОд", hint: "Ориентир -провод: труба / система для вещества." },
  { word: "красивее", answer: "красИвее", hint: "Сравнительная степень от красИвый сохраняет ударение." },
  { word: "взялась", answer: "взялАсь", hint: "Женский род прошедшего времени часто тянет ударение на конец." },
  { word: "ворвалась", answer: "ворвалАсь", hint: "Частая мина ЕГЭ: если ошибся, занеси в словарь." },
  { word: "снята", answer: "снятА", hint: "Ориентир из плана: женский род / краткая форма." },
  { word: "облегченный", answer: "облегчЁнный", hint: "Причастия на -ённый: Ё держит ударение." },
  { word: "углубленный", answer: "углублЁнный", hint: "Если видишь Ё, это сильный сигнал." },
  { word: "прирученный", answer: "приручЁнный", hint: "Ориентир -ённый." },
  { word: "довезенный", answer: "довезЁнный", hint: "Ориентир -ённый." }
];

const paronyms = [
  { wrong: "враждебный полк", answer: "вражеский полк", pair: "враждебный / вражеский", link: "полк", why: "Полк не настроен как человек; это полк врага." },
  { wrong: "эффектное производство", answer: "эффективное производство", pair: "эффектный / эффективный", link: "производство", why: "Производство должно давать результат, а не выглядеть красиво." },
  { wrong: "изобретательный деятельность", answer: "изобретательская деятельность", pair: "изобретательный / изобретательский", link: "деятельность", why: "Деятельность связана с изобретениями; находчивым бывает человек." },
  { wrong: "памятливые места", answer: "памятные места", pair: "памятливый / памятный", link: "места", why: "Места связаны с памятью; памятливым бывает человек." },
  { wrong: "дождливые потоки", answer: "дождевые потоки", pair: "дождливый / дождевой", link: "потоки", why: "Потоки связаны с дождём; дождливым бывает день." },
  { wrong: "надеть ребёнка", answer: "одеть ребёнка", pair: "одеть / надеть", link: "ребёнка", why: "Одевают кого-то, надевают что-то." }
];

const lexis = [
  { text: "главная суть", answer: "главная", mode: "исключить лишнее слово", type: "плеоназм", why: "Суть уже содержит смысл главного." },
  { text: "первые азы", answer: "первые", mode: "исключить лишнее слово", type: "плеоназм", why: "Азы уже первые основы." },
  { text: "очень оптимальный", answer: "очень", mode: "исключить лишнее слово", type: "плеоназм", why: "Оптимальный уже означает наилучший." },
  { text: "прейскурант цен", answer: "цен", mode: "исключить лишнее слово", type: "плеоназм", why: "Прейскурант уже связан с ценами." },
  { text: "завоевать рекорд", answer: "установить рекорд", mode: "заменить неверное слово", type: "неверная сочетаемость", why: "Рекорд устанавливают, а не завоёвывают." },
  { text: "совершить победу", answer: "одержать победу", mode: "заменить неверное слово", type: "неверная сочетаемость", why: "Победу одерживают." },
  { text: "нести ценность", answer: "представлять ценность", mode: "заменить неверное слово", type: "неверная сочетаемость", why: "Ценность представляют или имеют." }
];

const expressiveVisible = [
  ["Сравнение", "Прямо сопоставляет одно с другим.", "Ищи как, будто, словно, точно, похож на.", "От метафоры отличается наличием явного сравнительного слова.", "Пламя белое, будто снег."],
  ["Анафора", "Одинаковое начало строк или фраз.", "Смотри на позицию повтора: начало.", "Лексический повтор может быть где угодно; анафора именно в начале.", "Я не забуду... / Я не прощу... / Я не вернусь..."],
  ["Эпифора", "Одинаковый конец строк или фраз.", "Смотри на конец соседних фраз.", "Анафора в начале, эпифора в конце.", "Он ждал весны. / Она боялась весны. / Город жил ради весны."],
  ["Лексический повтор", "Повторяется одно и то же слово.", "Проверь, повторено ли слово почти буквально.", "Если повтор строго в начале, это может быть анафора.", "Пример в плане дан через отличие от анафоры."],
  ["Антитеза", "Противопоставление.", "Ищи контрастные пары и конфликт смыслов.", "Не вся разница антитеза; нужен явный контраст.", "белый аист - чёрный аист; небо - земля; жизнь - смерть"],
  ["Многосоюзие", "Намеренный повтор союзов.", "Ищи повторяющиеся союзы в ряду.", "Это приём, а не случайная перегрузка.", "И гул, и брань, и разговор, и смех..."],
  ["Бессоюзие", "Союзы убраны, идёт резкий ряд.", "Ищи перечисление или части без союзов.", "Многосоюзие добавляет союзы, бессоюзие убирает.", "Лес, поле, река, туман."],
  ["Парцелляция", "Фразу специально дробят точками.", "Проверь, могла ли часть быть внутри одного предложения.", "Обычная короткая фраза не всегда парцелляция; нужно намеренное отделение.", "Он ушёл. Навсегда."],
  ["Риторический вопрос", "Вопрос, на который не ждут ответа.", "Вопрос усиливает мысль автора.", "От вопросно-ответной формы отличается отсутствием ответа рядом.", "Кто же этого не понимает?"],
  ["Вопросно-ответная форма", "Автор сам задаёт вопрос и сам отвечает.", "Ищи вопрос и ответ рядом.", "Риторический вопрос ответа не требует.", "Что делать? Терпеть нельзя. Надо действовать."],
  ["Синтаксический параллелизм", "Похожие синтаксические конструкции рядом.", "Сравни грамматический рисунок соседних фраз.", "Не просто повтор слова, а повтор построения.", "Пример в плане не предоставлен."]
];

const expressiveImage = [
  ["Эпитет", "Образное определение.", "Ищи определение, которое делает образ ярче и оценочнее.", "Обычное определение называет признак; эпитет добавляет образ.", "изощрённая мудрость; первозданная радость; ликующий возглас"],
  ["Метафора", "Скрытое сравнение без как.", "Проверь, буквальный ли смысл невозможен.", "От сравнения отличается отсутствием как / будто / словно.", "богатство красок; исчезли во времени"],
  ["Олицетворение", "Неживое ведёт себя как живое.", "Ищи действие живого у неживого.", "Это частный случай метафоры.", "ветер поёт; город спит; совесть говорит"],
  ["Метонимия", "Замена по соседству или связи.", "Названо не само лицо/предмет, а связанное с ним место, материал, автор.", "Не образное сходство, а связь рядом.", "Зал аплодировал."],
  ["Гипербола", "Преувеличение.", "Ищи намеренно невозможный масштаб.", "От метафоры отличается именно увеличением меры.", "ждал тысячу лет; море слёз"],
  ["Литота", "Преуменьшение.", "Ищи намеренно уменьшенный масштаб.", "Противоположна гиперболе.", "мальчик с пальчик; кот наплакал"],
  ["Градация", "Нарастание или спад.", "Проверь, усиливается или ослабевает ряд.", "Не любое перечисление: должна меняться сила.", "попросил, потребовал, закричал"]
];

const cohesionItems = [
  ["Личное местоимение", "он, она, оно, они; его, её, их, если заменяют предмет или человека", "Я увидел его -> кого? его."],
  ["Притяжательное местоимение", "мой, твой, наш, ваш, свой, его, её, их; вопрос чей?", "Его книга лежала на столе -> чья книга? его."],
  ["Указательное местоимение", "этот, тот, такой, таков, столько", "Эти записи указывает назад на дневники / записи."],
  ["Определительное местоимение", "каждый, весь, всякий, любой, сам, самый, иной, другой", "Не указывает назад как этот, а обобщает."],
  ["Наречие", "где? куда? когда? как? почему? там, здесь, тогда, потом, затем, поэтому, так", "Мы приехали в город. Там было тихо."],
  ["Союз", "и, но, а, однако, зато, поэтому, потому что", "Он устал. Но продолжил работу."],
  ["Частица", "же, ведь, именно, только, лишь, даже", "Именно это усиливает указание."],
  ["Лексический повтор", "повторяется то же слово", "Дневники помогали выживать. Дневники сохраняли память."],
  ["Форма слова", "то же слово, но другая форма", "книга - книге; город - городе"],
  ["Однокоренные слова", "новые слова с тем же корнем", "память - памятный; наука - научный"],
  ["Синонимы", "близкие по значению слова", "писатель - автор; врач - доктор"],
  ["Контекстные синонимы", "в этом тексте называют одно и то же", "Лиза Глинка - доктор Лиза - обыкновенная женщина"]
];

function loadState() {
  const fallback = { blocks: {}, answers: {}, dictionary: [] };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const el = document.querySelector("#saveState");
  if (el) {
    el.textContent = "сохранено " + new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }
  renderProgress();
}

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[.,;:!?"]/g, "");
}

function setBlockState(id, patch) {
  state.blocks[id] = { ...(state.blocks[id] || {}), ...patch };
  saveState();
}

function renderShell() {
  renderBlock("stress", renderStress);
  renderBlock("paronyms", renderParonyms);
  renderBlock("lexis", renderLexis);
  renderBlock("microtext", renderMicrotext);
  renderBlock("expressive", renderExpressive);
  renderBlock("cohesion", renderCohesion);
  renderBlock("homework", renderHomework);
  renderProgress();
}

function renderBlock(id, renderer) {
  const meta = blocks.find((block) => block.id === id);
  const host = document.querySelector(`[data-block="${id}"]`);
  const template = document.querySelector("#blockTemplate").content.cloneNode(true);
  template.querySelector(".section-number").textContent = meta.number;
  template.querySelector("h2").textContent = meta.title;
  template.querySelector(".status-pill").textContent = meta.practice ? "есть интерактив" : "теория / шаблон";
  host.appendChild(template);
  renderer(host.querySelector(".block-main"), host.querySelector(".block-aside"));
}

function card(title, html, className = "content-card") {
  return `<article class="${className}"><h3>${title}</h3>${html}</article>`;
}

function savedField(saved, index) {
  return saved?.[`field${index}`] || "";
}

function debugLog(lines) {
  return `<div class="debug-log"><strong>debug-log</strong>\n${lines.join("\n")}</div>`;
}

function renderStress(main, aside) {
  main.innerHTML = [
    card("Что проверяет задание", `<p>Нужно выбрать нормативное ударение. Важно не изображать, что каждое слово объясняется правилом: часть слов ловится ориентиром, часть уходит в личный словарь.</p><div class="quote">Если правило не работает быстро - записали и пошли дальше.</div>`),
    card("Алгоритм", `<ol class="algorithm"><li>Сначала ищу знакомый ориентир: -провод, сравнительная степень, женский род прошедшего времени, -ённый.</li><li>Если ориентир есть, проверяю по нему.</li><li>Если ориентира нет или сомневаюсь, не спорю с памятью: заношу слово в личный словарь.</li><li>После проверки фиксирую: где сомневался, где ошибся, что повторить завтра.</li></ol>`),
    card("Ориентиры из плана", `<div class="card-grid">${[
      ["-провод", "газопровОд, нефтепровОд, водопровОд"],
      ["Сравнительная степень", "красИвый -> красИвее"],
      ["Женский род прошедшего времени", "взялАсь, ворвалАсь, снятА"],
      ["Причастия на -ённый", "облегчЁнный, углублЁнный, приручЁнный, довезЁнный"]
    ].map(([h, p]) => `<div class="term-card"><h4>${h}</h4><p>${p}</p></div>`).join("")}</div>`)
  ].join("");

  main.insertAdjacentHTML("beforeend", card("Практика по словам из плана", `<p>Впиши слово с большой буквой на ударной гласной: например, красИвее. Это не новые задания ЕГЭ, а тренировка только на словах, которые даны в плане.</p><div class="practice-list">${stressWords.map((item, index) => practiceStress(item, index)).join("")}</div>`, "practice-card"));
  aside.innerHTML = dictionaryHtml();
}

function practiceStress(item, index) {
  const key = `stress-${index}`;
  const saved = state.answers[key] || {};
  return `<div class="practice-item" data-key="${key}" data-answer="${item.answer}" data-word="${item.word}">
    <h4>${item.word}</h4>
    <p class="answer-prompt">Что вписать: слово целиком, ударную гласную обозначь заглавной буквой.</p>
    <div class="field-grid">
      <div class="practice-row"><label>Ответ</label><input value="${savedField(saved, 0)}" placeholder="например: газопровОд"></div>
      <div class="practice-row"><label>Моя ошибка / что запомнить (необязательно)</label><input value="${savedField(saved, 1)}" placeholder="например: тянул ударение на О"></div>
    </div>
    ${debugLog([`ожидаемый ответ: ${item.answer}`, `формат: слово целиком с заглавной ударной гласной`, `ориентир: ${item.hint}`])}
    <div class="practice-actions">
      <button class="small-btn primary" data-check="stress" type="button">Проверить</button>
      <button class="small-btn" data-explain type="button">Показать объяснение</button>
      <button class="small-btn warn" data-dict type="button">Добавить в личный словарь ошибок</button>
    </div>
    <div class="feedback">${item.hint} Правильно: <strong>${item.answer}</strong>.</div>
  </div>`;
}

function renderParonyms(main, aside) {
  main.innerHTML = [
    card("Что проверяет задание", `<p>Паронимы проверяют не похожесть слов, а связь выбранного слова с соседним существительным.</p>`),
    card("Алгоритм", `<ol class="algorithm"><li>Нахожу выделенное слово.</li><li>Смотрю, к какому слову оно относится.</li><li>Вспоминаю паронимическую пару.</li><li>Объясняю разницу.</li><li>Подставляю правильное слово.</li></ol>`),
    card("Пары из плана", `<div class="card-grid">${paronyms.map((item) => `<div class="term-card"><h4>${item.pair}</h4><p><strong>Тренировочная связка:</strong> ${item.wrong} -> ${item.answer}</p><small>${item.why}</small></div>`).join("")}</div>`),
    card("Тренажёр паронимов", `<p>Для проверки обязательны правильное сочетание, пара и связанное слово. Пояснение сохраняется как заметка ученика.</p><div class="practice-list">${paronyms.map((item, index) => practiceParonym(item, index)).join("")}</div>`, "practice-card")
  ].join("");
  aside.innerHTML = sideChecklist("Критерий закрытия", ["Правильное слово выписано.", "Пара названа.", "Связь с существительным указана.", "Пояснение можно оставить для себя."]);
}

function practiceParonym(item, index) {
  const key = `paronym-${index}`;
  const saved = state.answers[key] || {};
  return `<div class="practice-item" data-key="${key}" data-answer="${item.answer}" data-pair="${item.pair}" data-link="${item.link}">
    <h4>${item.wrong}</h4>
    <p class="answer-prompt">Что вписать для проверки: правильное сочетание, пару и связанное слово. Пояснение можно сохранить для себя.</p>
    <div class="field-grid">
      <div class="practice-row"><label>1. Правильное сочетание</label><input value="${savedField(saved, 0)}" placeholder="например: вражеский полк"></div>
      <div class="practice-row"><label>2. Паронимическая пара</label><input value="${savedField(saved, 1)}" placeholder="враждебный / вражеский"></div>
      <div class="practice-row"><label>3. Связано со словом</label><input value="${savedField(saved, 2)}" placeholder="например: полк"></div>
      <div class="practice-row"><label>4. Почему не подходит (необязательно)</label><input value="${savedField(saved, 3)}" placeholder="коротко объясни смысл"></div>
    </div>
    ${debugLog([`ожидаемый ответ: ${item.answer}`, `пара: ${item.pair}`, `связано со словом: ${item.link}`, `объяснение: ${item.why}`])}
    <div class="practice-actions"><button class="small-btn primary" data-check="paronym" type="button">Проверить</button><button class="small-btn" data-explain type="button">Показать объяснение</button></div>
    <div class="feedback">Правильно: <strong>${item.answer}</strong>. Пара: <strong>${item.pair}</strong>. Связано со словом <strong>${item.link}</strong>. ${item.why}</div>
  </div>`;
}

function renderLexis(main, aside) {
  main.innerHTML = [
    card("Два режима задания", `<div class="notice">Сначала ищи лишнее слово. Если лишнего нет - ищи неверную сочетаемость.</div><div class="card-grid"><div class="term-card"><h4>Исключить лишнее слово</h4><p>Если формулировка просит исключить лишнее слово, выписывается именно лишнее слово.</p></div><div class="term-card"><h4>Заменить неверное слово</h4><p>Если формулировка просит заменить, выписывается правильная замена.</p></div></div>`),
    card("Мини-правила", `<div class="card-grid"><div class="term-card"><h4>Плеоназм</h4><p>Одно слово уже содержит смысл другого: главная суть, первые азы, неожиданный сюрприз.</p></div><div class="term-card"><h4>Неверная сочетаемость</h4><p>Слова не сцепились: рекорд устанавливают, победу одерживают, ценность представляют.</p></div></div>`),
    card("Практика по конструкциям из плана", `<div class="practice-list">${lexis.map((item, index) => practiceLexis(item, index)).join("")}</div>`, "practice-card")
  ].join("");
  aside.innerHTML = sideChecklist("Тип ошибки", ["плеоназм", "неверная сочетаемость", "неверный глагол", "другое"]);
}

function practiceLexis(item, index) {
  const key = `lexis-${index}`;
  const saved = state.answers[key] || {};
  return `<div class="practice-item" data-key="${key}" data-answer="${item.answer}" data-mode="${item.mode}" data-type="${item.type}">
    <h4>${item.text}</h4>
    <p class="answer-prompt">Что вписать для проверки: ответ, режим и тип ошибки. Пояснение можно сохранить для себя.</p>
    <div class="field-grid">
      <div class="practice-row"><label>1. Ответ</label><input value="${savedField(saved, 0)}" placeholder="лишнее слово или правильная замена"></div>
      <div class="practice-row"><label>2. Режим</label><select><option></option><option ${savedField(saved, 1) === "исключить лишнее слово" ? "selected" : ""}>исключить лишнее слово</option><option ${savedField(saved, 1) === "заменить неверное слово" ? "selected" : ""}>заменить неверное слово</option></select></div>
      <div class="practice-row"><label>3. Тип ошибки</label><select><option></option><option ${savedField(saved, 2) === "плеоназм" ? "selected" : ""}>плеоназм</option><option ${savedField(saved, 2) === "неверная сочетаемость" ? "selected" : ""}>неверная сочетаемость</option><option ${savedField(saved, 2) === "неверный глагол" ? "selected" : ""}>неверный глагол</option><option ${savedField(saved, 2) === "другое" ? "selected" : ""}>другое</option></select></div>
      <div class="practice-row"><label>4. Почему (необязательно)</label><input value="${savedField(saved, 3)}" placeholder="одно предложение"></div>
    </div>
    ${debugLog([`ожидаемый ответ: ${item.answer}`, `режим: ${item.mode}`, `тип ошибки: ${item.type}`, `объяснение: ${item.why}`])}
    <div class="practice-actions"><button class="small-btn primary" data-check="lexis" type="button">Проверить</button><button class="small-btn" data-explain type="button">Показать объяснение</button></div>
    <div class="feedback">Ответ: <strong>${item.answer}</strong>. Режим: <strong>${item.mode}</strong>. Тип: <strong>${item.type}</strong>. ${item.why}</div>
  </div>`;
}

function renderMicrotext(main, aside) {
  main.innerHTML = [
    card("№1. Логическая функция пропуска", `<p>В первом задании мы не угадываем слово. Мы ищем, какую работу выполняет пропуск.</p><div class="card-grid">${[
      ["противопоставление", "но / однако / зато"],
      ["уступка", "хотя"],
      ["уточнение", "именно / как раз"],
      ["указание назад", "этот / такой / это"],
      ["следствие", "поэтому"]
    ].map(([a, b]) => `<div class="term-card"><h4>${a}</h4><p>${b}</p></div>`).join("")}</div>`),
    card("№2. Значение слова в контексте", `<ol class="algorithm"><li>Нашёл слово.</li><li>Прочитал предложение.</li><li>Сказал значение своими словами.</li><li>Сравнил с вариантами.</li></ol><p>Например, “среда” может быть днём недели, а может быть окружением: научная среда, социальная среда. Смотрим только контекст.</p>`),
    card("№3. Характеристики текста", `<div class="quote">Красивый вариант без доказательства - мусор. Нужно доказательство из текста.</div>${styleCards()}${speechTypeCards()}`),
    card("Шаблон разбора №3", `<ol class="algorithm"><li>Беру вариант 1 и формулирую, что он утверждает.</li><li>Ищу место в тексте, где это прямо видно.</li><li>Если доказательства нет, выкидываю вариант.</li><li>Повторяю по каждому варианту.</li></ol><p>В плане не дан конкретный микротекст, поэтому тренировка с выбором ответа не добавлена.</p>`)
  ].join("");
  aside.innerHTML = sideChecklist("Ловушки", ["Красивый текст не всегда художественный.", "Прямая речь не делает весь текст разговорным.", "Официально-деловой часто ложный вариант.", "Ответ должен быть доказан текстом."]);
}

function styleCards() {
  const styles = [
    ["Научный", "Объясняет понятия, связи, закономерности.", "термины, определения, классификации, нейтральная лексика", "Не пытается растрогать."],
    ["Публицистический", "Убеждает читателя в общественно важной мысли.", "общественная тема, оценка автора, эмоция, риторические вопросы", "Может быть красивым, но цель - воздействие."],
    ["Художественный", "Создаёт образ: герои, детали, настроение, картина.", "сцены, персонажи, образность, эпитеты, метафоры", "Красота сама по себе не доказательство."],
    ["Разговорный", "Речь живого общения.", "реплики, простые фразы, бытовая ситуация, неполные предложения", "Один диалог внутри текста не делает весь текст разговорным."],
    ["Официально-деловой", "Документы, инструкции, законы, заявления.", "канцелярит, стандартные формулы, точные предписания", "В ЕГЭ часто ложный вариант."]
  ];
  return `<h3>Стили: как узнать, признаки, ловушки</h3><div class="card-grid">${styles.map(([name, know, signs, trap]) => `<div class="term-card"><h4>${name}</h4><p><strong>Как узнать:</strong> ${know}</p><p><strong>Признаки:</strong> ${signs}.</p><small><strong>Ловушка:</strong> ${trap}</small></div>`).join("")}</div>`;
}

function speechTypeCards() {
  return `<h3>Тип речи</h3><div class="card-grid">${[
    ["Повествование", "Что произошло? События, действия, последовательность."],
    ["Описание", "Какой предмет / человек / место? Признаки и детали."],
    ["Рассуждение", "Почему? Зачем? В чём смысл? Тезис и доказательства."]
  ].map(([h, p]) => `<div class="term-card"><h4>${h}</h4><p>${p}</p></div>`).join("")}</div>`;
}

function renderExpressive(main, aside) {
  main.innerHTML = [
    card("Что проверяет задание", `<p>Нужно не вспоминать список терминов, а распознать средство по признаку.</p><ol class="algorithm"><li>Сначала ищу то, что видно глазами: повтор, вопрос, союз, противопоставление, как / будто / словно.</li><li>Потом ищу синтаксис: анафора, эпифора, параллелизм, парцелляция.</li><li>Потом ищу образ: эпитет, метафора, олицетворение, метонимия.</li><li>Ответ засчитывается только если я могу показать признак.</li></ol>`),
    card("А. Видно глазами по конструкции", `<p>Карточки свёрнуты, чтобы сначала видеть карту терминов, а детали открывать по необходимости.</p><div class="card-grid">${expressiveVisible.map(foldTermCard).join("")}</div>`),
    card("Б. Надо понять образ", `<p>Открывай карточку, когда нужно уточнить отличие от похожего средства.</p><div class="card-grid">${expressiveImage.map(foldTermCard).join("")}</div>`),
    card("Тренажёр распознавания на примерах из плана", `<div class="practice-list">${[...expressiveVisible, ...expressiveImage].filter((item) => !item[4].includes("не предоставлен") && !item[4].includes("отличие")).map((item, index) => practiceExpressive(item, index)).join("")}</div>`, "practice-card")
  ].join("");
  aside.innerHTML = sideChecklist("Порядок поиска", ["Сначала видимое глазами.", "Потом синтаксическая конструкция.", "Потом образ.", "Всегда показывай признак."]);
}

function termCard(item) {
  return `<div class="term-card"><h4>${item[0]}</h4><p><strong>Определение:</strong> ${item[1]}</p><p><strong>Как найти:</strong> ${item[2]}</p><p><strong>Отличие:</strong> ${item[3]}</p><small><strong>Пример:</strong> ${item[4]}</small></div>`;
}

function foldTermCard(item) {
  return `<details class="term-card fold-card">
    <summary><span class="fold-card__title"><strong>${item[0]}</strong><span>${item[2]}</span></span></summary>
    <div class="fold-card__body">
      <p><strong>Определение:</strong> ${item[1]}</p>
      <p><strong>Как найти:</strong> ${item[2]}</p>
      <p><strong>Отличие:</strong> ${item[3]}</p>
      <small><strong>Пример:</strong> ${item[4]}</small>
    </div>
  </details>`;
}

function foldSimpleCard(title, body, detail) {
  return `<details class="term-card fold-card">
    <summary><span class="fold-card__title"><strong>${title}</strong><span>${body}</span></span></summary>
    <div class="fold-card__body">
      <p>${body}</p>
      <small>${detail}</small>
    </div>
  </details>`;
}

function practiceExpressive(item, index) {
  const key = `expressive-${index}`;
  const saved = state.answers[key] || {};
  return `<div class="practice-item" data-key="${key}" data-answer="${item[0]}">
    <h4>${item[4]}</h4>
    <p class="answer-prompt">Что вписать для проверки: название средства. Признак можно сохранить как пояснение.</p>
    <div class="field-grid">
      <div class="practice-row"><label>1. Средство</label><input value="${savedField(saved, 0)}" placeholder="например: анафора"></div>
      <div class="practice-row"><label>2. Признак (необязательно)</label><input value="${savedField(saved, 1)}" placeholder="докажи по конструкции или образу"></div>
    </div>
    ${debugLog([`ожидаемый ответ: ${item[0]}`, `как найти: ${item[2]}`, `отличие: ${item[3]}`])}
    <div class="practice-actions"><button class="small-btn primary" data-check="expressive" type="button">Проверить</button><button class="small-btn" data-explain type="button">Показать объяснение</button></div>
    <div class="feedback">Это <strong>${item[0]}</strong>. ${item[2]}</div>
  </div>`;
}

function renderCohesion(main, aside) {
  main.innerHTML = [
    card("Главная идея", `<div class="quote">Средство связи = крючок между предложениями.</div><p>Нужно смотреть не только само предложение, но и предыдущее. Если указано несколько средств, нужно найти все.</p>`),
    card("Большая карта 26", `<p>Сначала пробеги названия средств, затем раскрывай только спорные карточки.</p><div class="card-grid">${cohesionItems.map(([h, p, ex]) => foldSimpleCard(h, p, ex)).join("")}</div>`),
    card("Его: личное или притяжательное", `<div class="card-grid"><div class="term-card"><h4>Я увидел его.</h4><p>Кого? его. Это личное местоимение.</p></div><div class="term-card"><h4>Его книга лежала на столе.</h4><p>Чья книга? его. Это притяжательное местоимение.</p></div></div>`),
    card("Алгоритм 26", `<ol class="algorithm"><li>Беру указанное предложение.</li><li>Смотрю предыдущее.</li><li>Спрашиваю: чем новое предложение цепляется за старое?</li><li>Ищу заявленные средства.</li><li>Если сказано “союз И местоимение”, должны быть оба.</li></ol><div class="notice">В плане нет восьми конкретных заданий №26, поэтому добавлен подробный шаблон самостоятельного разбора без выдуманных новых заданий.</div>`),
    card("Шаблон для самостоятельного разбора", `<div class="practice-item"><p class="answer-prompt">Что вписать: конкретное средство связи, слово из предложения и его связь с предыдущим предложением.</p><div class="field-grid"><div class="practice-row"><label>1. Ответ</label><input placeholder="номер / ответ по заданию"></div><div class="practice-row"><label>2. Предложение</label><input placeholder="указанное предложение"></div><div class="practice-row"><label>3. Средство связи</label><input placeholder="например: личное местоимение"></div><div class="practice-row"><label>4. Конкретное слово</label><input placeholder="например: он"></div><div class="practice-row practice-row--wide"><label>5. С чем связано в предыдущем предложении</label><input placeholder="например: он = Пушкин из предыдущего предложения"></div></div>${debugLog(["шаблон проверки: средство связи + конкретное слово + связь с предыдущим предложением", "важно: если в формулировке несколько средств, должны быть найдены все", "для 26 нет конкретных заданий в плане, поэтому правильный ответ здесь не автопроверяется"])}<div class="practice-actions"><button class="small-btn primary" data-done-block="cohesion" type="button">Шаблон заполнен</button></div></div>`)
  ].join("");
  aside.innerHTML = sideChecklist("Предупреждение", ["Не надо просто найти местоимение.", "Нужно понять, связывает ли оно с предыдущим.", "Его / её / их проверяй вопросом.", "Несколько средств - ищи все."]);
}

function renderHomework(main, aside) {
  main.innerHTML = [
    card("Домашка", `<div class="homework-grid">${[
      ["№4", "5 заданий", "Ответ; сомневался в словах; ошибся в словах; личный словарь."],
      ["№5", "5 заданий", "Ответ; пара; с чем связано выделенное слово; почему исходное слово не подходит."],
      ["№6", "5 заданий", "Ответ; лишнее слово или замена; тип ошибки; почему."],
      ["№22", "3 задания", "Средство; признак; пример из текста."],
      ["№26", "8 отдельных заданий", "Ответ; предложение; средство связи; конкретное слово; с чем связано в предыдущем."],
      ["23-25", "1 быстрый блок", "Короткий контроль без подробного расписывания."]
    ].map(([h, count, fmt]) => `<div class="term-card"><h4>${h}</h4><p>${count}</p><small><strong>Формат:</strong> ${fmt}</small></div>`).join("")}</div>`)
  ].join("");
  aside.innerHTML = `<article class="content-card"><h3>Статус</h3><div class="practice-actions"><button class="small-btn primary" data-done-block="homework" type="button">Домашка понятна</button></div></article>`;
}

function sideChecklist(title, items) {
  return `<article class="content-card"><h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul><div class="confidence"><button class="small-btn primary" data-done-current type="button">Отметить пройдено</button></div></article>`;
}

function dictionaryHtml() {
  return `<article class="dictionary"><h3>Личный словарь ошибок</h3><table><thead><tr><th>Слово</th><th>Правильно</th><th>Моя ошибка</th><th>Повторить</th></tr></thead><tbody id="dictRows"></tbody></table><p class="empty" id="dictEmpty">Пока пусто. Добавляй слова после проверки.</p></article>`;
}

function bindEvents() {
  const debugToggle = document.querySelector("#debugToggle");
  if (debugToggle) {
    debugToggle.checked = localStorage.getItem(DEBUG_KEY) === "1";
    document.body.classList.toggle("debug-enabled", debugToggle.checked);
    debugToggle.addEventListener("change", () => {
      document.body.classList.toggle("debug-enabled", debugToggle.checked);
      localStorage.setItem(DEBUG_KEY, debugToggle.checked ? "1" : "0");
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    const side = document.querySelector(".side");
    if (!button) {
      if (side.classList.contains("open") && !event.target.closest(".side")) side.classList.remove("open");
      return;
    }

    if (button.id === "menuBtn") side.classList.toggle("open");
    if (button.id === "resetBtn") resetAll();
    if (button.id === "scrollTopBtn") window.scrollTo({ top: 0, behavior: "smooth" });
    if (button.dataset.explain !== undefined) button.closest(".practice-item").querySelector(".feedback").classList.toggle("show");
    if (button.dataset.dict !== undefined) addDictionary(button.closest(".practice-item"));
    if (button.dataset.check) checkPractice(button.dataset.check, button.closest(".practice-item"));
    if (button.dataset.doneCurrent !== undefined) setCurrentBlock(button, "done");
    if (button.dataset.doneBlock) setBlockState(button.dataset.doneBlock, { done: true, confidence: "sure" });
  });

  document.addEventListener("input", (event) => {
    const item = event.target.closest(".practice-item");
    if (!item) return;
    const key = item.dataset.key;
    if (!key) return;
    state.answers[key] = collectInputs(item);
    saveState();
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => document.querySelector(".side").classList.remove("open"));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  blocks.forEach((block) => observer.observe(document.querySelector(`#${block.id}`)));

  const scrollTopBtn = document.querySelector("#scrollTopBtn");
  if (scrollTopBtn) {
    const syncScrollTop = () => scrollTopBtn.classList.toggle("visible", window.scrollY > 620);
    syncScrollTop();
    window.addEventListener("scroll", syncScrollTop, { passive: true });
  }
}

function collectInputs(item) {
  const fields = [...item.querySelectorAll("input, textarea, select")];
  return fields.reduce((acc, field, index) => {
    acc[`field${index}`] = field.value;
    return acc;
  }, {});
}

function checkPractice(type, item) {
  const feedback = item.querySelector(".feedback");
  const inputs = [...item.querySelectorAll("input, textarea, select")];
  let ok = false;

  if (type === "stress") {
    ok = normalize(inputs[0].value) === normalize(item.dataset.answer);
  }
  if (type === "paronym") {
    ok = normalize(inputs[0].value).includes(normalize(item.dataset.answer)) &&
      normalize(inputs[1].value).includes(normalize(item.dataset.pair)) &&
      normalize(inputs[2].value).includes(normalize(item.dataset.link));
  }
  if (type === "lexis") {
    ok = normalize(inputs[0].value).includes(normalize(item.dataset.answer)) &&
      inputs[1].value === item.dataset.mode &&
      inputs[2].value === item.dataset.type;
  }
  if (type === "expressive") {
    ok = normalize(inputs[0].value).includes(normalize(item.dataset.answer));
  }

  feedback.classList.add("show");
  feedback.classList.toggle("correct", ok);
  feedback.classList.toggle("error", !ok);
  const block = item.closest(".lesson-block").dataset.block;
  setBlockState(block, { done: true, confidence: ok ? "sure" : "error", hasError: !ok });
}

function addDictionary(item) {
  const word = item.dataset.word || item.querySelector("h4").textContent;
  const answer = item.dataset.answer || "";
  const note = item.querySelectorAll("input")[1]?.value || item.querySelector("textarea")?.value || "";
  state.dictionary.push({ word, answer, note, repeat: "завтра" });
  saveState();
  renderDictionary();
}

function renderDictionary() {
  const rows = document.querySelector("#dictRows");
  const empty = document.querySelector("#dictEmpty");
  if (!rows) return;
  rows.innerHTML = state.dictionary.map((item) => `<tr><td>${item.word}</td><td>${item.answer}</td><td>${item.note || "не указано"}</td><td>${item.repeat}</td></tr>`).join("");
  empty.style.display = state.dictionary.length ? "none" : "block";
}

function setCurrentBlock(button, status) {
  const block = button.closest(".lesson-block").dataset.block;
  setBlockState(block, { done: true, confidence: "sure" });
}

function renderProgress() {
  const done = blocks.filter((block) => state.blocks[block.id]?.done).length;
  const percent = Math.round((done / blocks.length) * 100);
  document.querySelector("#sideProgress").textContent = `${done}/${blocks.length}`;
  document.querySelector("#blocksDone").textContent = `${done} из ${blocks.length}`;
  document.querySelector("#sideBar").style.width = `${percent}%`;
  document.querySelector("#mainBar").style.width = `${percent}%`;
  const errors = blocks.filter((block) => state.blocks[block.id]?.hasError || state.blocks[block.id]?.confidence === "error").length;
  const topStats = document.querySelector("#topStats");
  if (topStats) {
    topStats.innerHTML = [
      `<span class="top-stat" title="Пройдено блоков">${done}/${blocks.length}</span>`,
      `<span class="top-stat top-stat--error" title="Блоки с ошибками">ошибки ${errors}</span>`,
      `<span class="top-stat top-stat--dict" title="Слов в личном словаре">словарь ${state.dictionary.length}</span>`
    ].join("");
  }

  const map = document.querySelector("#blockMap");
  if (map) {
    map.innerHTML = blocks.map((block) => {
      const item = state.blocks[block.id] || {};
      const cls = item.hasError || item.confidence === "error" ? "error" : item.done ? "done" : "";
      const status = item.confidence === "error" ? "есть ошибка" : item.done ? "пройден" : "открыт";
      return `<div class="map-item ${cls}"><strong>${block.number}. ${block.title}</strong><span>${status} · ${block.practice ? "практика есть" : "без конкретных заданий"}</span></div>`;
    }).join("");
  }

  renderDictionary();
}

function resetAll() {
  if (!confirm("Сбросить локальный прогресс этого урока?")) return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function scrollToCurrentHash() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  const offset = window.innerWidth <= 1120 ? 76 : 86;
  const y = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
}

renderShell();
bindEvents();
requestAnimationFrame(() => {
  [0, 80, 220, 520, 900].forEach((delay) => setTimeout(scrollToCurrentHash, delay));
});
window.addEventListener("hashchange", () => setTimeout(scrollToCurrentHash, 0));
