/* ============================================================
   凛冬督学局 · 摄像头督学 — app.js
   ============================================================ */

'use strict';

/* ---------- 数据 ---------- */
const OFFICERS = {
  volkov: {
    id: 'volkov', name: '涅斯托尔·沃尔科夫', title: '现任督学官',
    quote: '「同志,我没有眨眼。」', price: 0,
    desc: '现任督学官。红箍檐帽,呢子大衣,从不眨眼。'
  },
  liu: {
    id: 'liu', name: '刘老师', title: '传奇班主任',
    quote: '「后果自负。」', price: 0, trial: true,
    desc: '传奇班主任。竖条纹连衣裙,红框眼镜,别着扩音器。'
  },
  yelena: {
    id: 'yelena', name: '叶莲娜', title: '冷峻女政委',
    quote: '「纪律将带你抵达目标。」', price: 80,
    desc: '冷峻女政委。深色大衣配武装带,身后是地图与老式电话。'
  },
  weber: {
    id: 'weber', name: '克劳斯·韦伯', title: '冷面参谋官',
    quote: '「你没有第二次机会。」', price: 120,
    desc: '冷面参谋官。灰色军装,站在圆规与图纸之间。'
  }
};

const ACTIONS = [
  { id: 'address',  num: '档案 01', name: '开场训话', ru: 'Внимание! Учёба начинается сейчас.', cn: '注意!学习现在开始。', anim: 'anim-enter',   price: 0 },
  { id: 'march',    num: '档案 02', name: '正步入场', ru: 'Шагом марш!', cn: '齐步走!', anim: 'anim-march',   price: 0 },
  { id: 'stealth',  num: '档案 03', name: '潜入巡查', ru: 'Я наблюдаю за вами.', cn: '我正在注视着你。', anim: 'anim-stealth', price: 0 },
  { id: 'patrol',   num: '档案 04', name: '背手巡查', ru: 'Продолжайте работать.', cn: '继续工作。', anim: 'anim-patrol',  price: 0 },
  { id: 'review',   num: '档案 05', name: '贴近审阅', ru: 'Покажите ваши записи.', cn: '出示你的记录。', anim: 'anim-approach', price: 0 },
  { id: 'record',   num: '档案 06', name: '记档留痕', ru: 'Это будет зафиксировано.', cn: '这将被记录在案。', anim: 'anim-stare',   price: 0 },
  { id: 'suspect',  num: '档案 07', name: '怀疑凝视', ru: 'Я не моргну.', cn: '我不会眨眼。', anim: 'anim-stare',   price: 0 },
  { id: 'rebuke',   num: '档案 08', name: '训斥警告', ru: 'Нарушение зафиксировано!', cn: '违纪已记录!', anim: 'anim-shake',   price: 0 },
  { id: 'door',     num: '档案 09', name: '门侧监视', ru: 'Я всегда здесь.', cn: '我一直在这里。', anim: 'anim-stealth', price: 30 },
  { id: 'internal', num: '档案 10', name: '内务部巡查', ru: 'Проверка внутреннего порядка.', cn: '内务检查。', anim: 'anim-patrol', price: 30 },
  { id: 'salute',   num: '档案 11', name: '敬礼放行', ru: 'Можете продолжать.', cn: '你可以继续了。', anim: 'anim-enter',   price: 30 },
  { id: 'sudden',   num: '档案 12', name: '突然退场', ru: 'Я вернусь.', cn: '我会回来。', anim: 'anim-march',   price: 50 },
  { id: 'retreat',  num: '档案 13', name: '后退离场', ru: 'До следующего раза.', cn: '下次见。', anim: 'anim-stealth', price: 50 }
];

const FURNITURE = [
  { id: 'desk',     icon: '🪑', name: '书桌',   price: 0 },
  { id: 'bed',      icon: '🛏', name: '行军床', price: 0 },
  { id: 'shelf',    icon: '📚', name: '书架',   price: 0 },
  { id: 'lamp',     icon: '🕯', name: '台灯',   price: 0 },
  { id: 'radio',    icon: '📻', name: '收音机', price: 20 },
  { id: 'plant',    icon: '🪴', name: '绿植',   price: 20 },
  { id: 'flag',     icon: '🚩', name: '红星旗', price: 40 },
  { id: 'safe',     icon: '🔒', name: '保险柜', price: 60 }
];

const COMRADES = [
  { id: 'c1', name: '伊万',   status: '待命中' },
  { id: 'c2', name: '玛莎',   status: '待命中' },
  { id: 'c3', name: '格里沙', status: '待命中' },
  { id: 'c4', name: '安娜',   status: '待命中' }
];

const VOTE_CANDIDATES = [
  { id: 'v1', name: '新督学官 · 候选人 A', votes: 3 },
  { id: 'v2', name: '新督学官 · 候选人 B', votes: 2 },
  { id: 'v3', name: '新督学官 · 候选人 C', votes: 1 }
];

const VERDICTS_CLEAN = [
  '姿态端正,记录在案。继续保持。',
  '未发现异常。督学官微微点头。',
  '清白。下一个巡查时段,继续保持。'
];
const VERDICTS_VIOL = [
  '检测到异常行为,已记入当日档案。',
  '违纪事实清楚。后果自负。',
  '记录完毕。三次违纪,地牢见。'
];

/* ---------- 状态 ---------- */
const DEFAULT_STATE = {
  coins: 0,
  selectedOfficer: 'volkov',
  unlockedOfficers: ['volkov', 'liu'],
  unlockedActions: ['address','march','stealth','patrol','review','record','suspect','rebuke'],
  unlockedFurniture: ['desk','bed','shelf','lamp'],
  violationsToday: 0,
  lastViolationDate: '',
  dungeonUntil: 0,
  barracksItems: [],
  totalStudyMinutes: 0,
  voteCount: 0,
  voteRewarded: false
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem('winter-bureau-state');
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {}
  return { ...DEFAULT_STATE };
}
function saveState() {
  try { localStorage.setItem('winter-bureau-state', JSON.stringify(state)); } catch (e) {}
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function resetDailyIfNeeded() {
  const today = todayStr();
  if (state.lastViolationDate !== today) {
    state.violationsToday = 0;
    state.lastViolationDate = today;
    saveState();
  }
}

/* ---------- 工具 ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.hidden = true; }, 2400);
}

function officerSVG(id, cls) {
  const tpl = document.getElementById('tpl-' + id);
  if (!tpl) return '';
  const clone = tpl.content.cloneNode(true);
  const svg = clone.querySelector('svg');
  if (cls && svg) svg.setAttribute('class', 'officer-svg ' + cls);
  return clone;
}

function addCoins(n) {
  state.coins += n;
  saveState();
  updateCoinDisplay();
}
function updateCoinDisplay() {
  $('#coin-amount').textContent = state.coins;
}

/* ---------- 路由 ---------- */
const NAV_VIEWS = ['home','actions','equipment','faq','creators','privacy'];
let currentView = 'home';

function navigate(view) {
  if (!NAV_VIEWS.includes(view) && view !== 'duty' && view !== 'comrades' && view !== 'dungeon' && view !== 'barracks') view = 'home';
  currentView = view;
  $$('.view').forEach(v => v.hidden = true);
  const el = document.getElementById('view-' + view);
  if (el) el.hidden = false;
  $$('#topnav a').forEach(a => {
    a.classList.toggle('active', a.dataset.view === view);
  });
  if (view === 'actions') renderActions();
  if (view === 'equipment') renderShop();
  if (view === 'comrades') renderComrades();
  if (view === 'dungeon') renderDungeon();
  if (view === 'barracks') renderBarracks();
  if (view === 'home') renderHome();
  window.scrollTo(0, 0);
}

document.addEventListener('click', e => {
  const link = e.target.closest('[data-view]');
  if (link) {
    e.preventDefault();
    navigate(link.dataset.view);
  }
});

/* ---------- HOME ---------- */
function renderHome() {
  resetDailyIfNeeded();
  const list = $('#roster-list');
  list.innerHTML = '';
  Object.values(OFFICERS).forEach(off => {
    const unlocked = state.unlockedOfficers.includes(off.id);
    const selected = state.selectedOfficer === off.id;
    const card = document.createElement('div');
    card.className = 'roster-card' + (selected ? ' selected' : '') + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="roster-card-avatar"></div>
      <div class="roster-card-info">
        <div class="roster-card-name">${off.name}</div>
        <div class="roster-card-title">${off.title}</div>
      </div>
      <div class="roster-card-badge ${selected ? 'badge-selected' : (off.trial && unlocked ? 'badge-trial' : (unlocked ? '' : 'badge-locked'))}">${selected ? '已选择' : (off.trial && unlocked ? '7天体验' : (unlocked ? '选择' : '未解锁'))}</div>
    `;
    const avatar = card.querySelector('.roster-card-avatar');
    avatar.appendChild(officerSVG(off.id));
    if (unlocked) {
      card.addEventListener('click', () => {
        state.selectedOfficer = off.id;
        saveState();
        renderHome();
      });
    } else {
      card.addEventListener('click', () => {
        toast(`${off.name} 尚未解锁,去装备处购买。`);
        navigate('equipment');
      });
    }
    list.appendChild(card);
  });

  const off = OFFICERS[state.selectedOfficer] || OFFICERS.volkov;
  $('#roster-quote').textContent = off.quote;
  const frame = $('#portrait-frame');
  frame.innerHTML = '';
  frame.appendChild(officerSVG(off.id));
  $('#portrait-name').textContent = off.name;
  $('#portrait-title').textContent = off.title;
}

$('#btn-start').addEventListener('click', () => {
  navigate('duty');
  startDuty();
});

/* ---------- DUTY: 计时 + 巡查 ---------- */
let duty = {
  mode: 'pomodoro',
  running: false,
  phase: 'focus', // focus | break
  focusRemain: 25 * 60,
  breakRemain: 5 * 60,
  sessionMinutes: 0,
  tickTimer: null,
  patrolTimer: null,
  minuteTimer: null
};

function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function renderTimer() {
  const clock = $('#timer-clock');
  const label = $('#timer-mode-label');
  const status = $('#timer-status');
  if (duty.mode === 'pomodoro') {
    if (duty.phase === 'focus') {
      label.textContent = '番茄钟 · 专注';
      clock.textContent = fmt(duty.focusRemain);
    } else {
      label.textContent = '番茄钟 · 休息';
      clock.textContent = fmt(duty.breakRemain);
    }
  } else {
    label.textContent = '无尽学习';
    clock.textContent = fmt(duty.focusRemain);
  }
  clock.classList.toggle('running', duty.running);
  status.textContent = duty.running ? '执勤中' : '待命中';
  status.classList.toggle('on-duty', duty.running);
  $('#stat-min').textContent = duty.sessionMinutes;
  $('#stat-total').textContent = state.totalStudyMinutes;
  const violEl = $('#stat-viol');
  violEl.textContent = state.violationsToday;
  violEl.classList.toggle('warn', state.violationsToday >= 2);
}

function setMode(mode) {
  duty.mode = mode;
  duty.phase = 'focus';
  duty.focusRemain = 25 * 60;
  duty.breakRemain = 5 * 60;
  $$('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  renderTimer();
}
$$('.mode-btn').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));

function startDuty() {
  if (duty.running) return;
  duty.running = true;
  $('#btn-clockin').disabled = true;
  $('#btn-break').disabled = false;
  $('#btn-endduty').disabled = false;
  renderTimer();
  duty.tickTimer = setInterval(tick, 1000);
  duty.minuteTimer = setInterval(minuteEarn, 60000);
  schedulePatrol();
  toast('已开始执勤。督学官在岗。');
}

function endDuty() {
  duty.running = false;
  clearInterval(duty.tickTimer);
  clearInterval(duty.minuteTimer);
  clearTimeout(duty.patrolTimer);
  $('#btn-clockin').disabled = false;
  $('#btn-break').disabled = true;
  $('#btn-endduty').disabled = true;
  renderTimer();
  clearStage();
  toast('已下班。辛苦了,同志。');
}

function tick() {
  if (duty.mode === 'pomodoro') {
    if (duty.phase === 'focus') {
      duty.focusRemain--;
      if (duty.focusRemain <= 0) {
        addCoins(5);
        toast('专注周期完成!奖励 5 军工币。');
        duty.phase = 'break';
        duty.breakRemain = 5 * 60;
      }
    } else {
      duty.breakRemain--;
      if (duty.breakRemain <= 0) {
        duty.phase = 'focus';
        duty.focusRemain = 25 * 60;
      }
    }
  } else {
    duty.focusRemain++;
  }
  renderTimer();
}

function minuteEarn() {
  if (!duty.running) return;
  duty.sessionMinutes++;
  state.totalStudyMinutes++;
  addCoins(1);
  renderTimer();
}

$('#btn-clockin').addEventListener('click', startDuty);
$('#btn-endduty').addEventListener('click', endDuty);
$('#btn-break').addEventListener('click', () => {
  if (duty.mode === 'pomodoro' && duty.phase === 'focus') {
    duty.phase = 'break';
    duty.breakRemain = 5 * 60;
    renderTimer();
    toast('休息 5 分钟。');
  }
});

/* ---------- 巡查 ---------- */
function schedulePatrol() {
  clearTimeout(duty.patrolTimer);
  if (!duty.running) return;
  const delay = 8000 + Math.random() * 12000; // 8-20s 随机推门
  duty.patrolTimer = setTimeout(() => {
    if (!duty.running) return;
    doPatrol();
    schedulePatrol();
  }, delay);
}

function doPatrol() {
  const stage = $('#officer-stage');
  stage.classList.add('knocking');
  setTimeout(() => stage.classList.remove('knocking'), 500);

  // 随机选一个已解锁动作播放
  const unlocked = ACTIONS.filter(a => state.unlockedActions.includes(a.id));
  const action = unlocked[Math.floor(Math.random() * unlocked.length)];
  playOfficerAction(action);

  // 判定
  setTimeout(() => {
    const viol = judgeViolation();
    showVerdict(viol);
    if (viol) recordViolation();
  }, 1800);
}

function playOfficerAction(action) {
  const stage = $('#officer-stage');
  $('#stage-empty')?.remove();
  stage.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'duty-officer';
  wrap.appendChild(officerSVG(state.selectedOfficer));
  stage.appendChild(wrap);
}

function clearStage() {
  const stage = $('#officer-stage');
  stage.innerHTML = '<div class="stage-empty" id="stage-empty">督学官待命中</div>';
  $('#verdict-card').hidden = true;
}

function judgeViolation() {
  if (cameraActive && faceReady) {
    // 人脸识别模式:基于三维信号判定
    if (scores.seat < 20) return { type: '离开座位', msg: VERDICTS_VIOL[1] };
    if (scores.focus < 20) return { type: '打瞌睡', msg: VERDICTS_VIOL[2] };
    if (scores.focus < 40 && scores.posture < 50) return { type: '玩手机', msg: VERDICTS_VIOL[0] };
    if (scores.focus < 50) return { type: '分心走神', msg: VERDICTS_VIOL[1] };
    return null;
  } else if (cameraActive) {
    // 运动分析降级模式
    if (scores.seat < 20) return { type: '离开座位', msg: VERDICTS_VIOL[1] };
    if (scores.focus > 85) return { type: '打瞌睡', msg: VERDICTS_VIOL[2] };
    if (scores.seat < 40 && scores.posture < 40) return { type: '玩手机', msg: VERDICTS_VIOL[0] };
    return null;
  } else {
    // 模拟模式
    return Math.random() < 0.1 ? { type: ['玩手机','离开座位','打瞌睡'][Math.floor(Math.random()*3)], msg: VERDICTS_VIOL[Math.floor(Math.random()*3)] } : null;
  }
}

function showVerdict(viol) {
  const card = $('#verdict-card');
  const stamp = $('#verdict-stamp');
  const text = $('#verdict-text');
  card.hidden = false;
  if (viol) {
    stamp.textContent = '记档';
    stamp.classList.remove('clean');
    text.textContent = `${viol.type} — ${viol.msg}`;
  } else {
    stamp.textContent = '清白';
    stamp.classList.add('clean');
    text.textContent = VERDICTS_CLEAN[Math.floor(Math.random() * VERDICTS_CLEAN.length)];
  }
}

function recordViolation() {
  state.violationsToday++;
  saveState();
  renderTimer();
  const list = $('#violation-list');
  const empty = list.querySelector('.muted');
  if (empty) empty.remove();
  const li = document.createElement('li');
  const now = new Date();
  const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  li.innerHTML = `<span class="v-time">${t}</span><span class="v-type">违纪</span> 已被督学官记录`;
  list.prepend(li);

  if (state.violationsToday >= 3) {
    toast('当日违纪满三次!进地牢。');
    setTimeout(() => navigate('dungeon'), 1500);
  }
}

/* ---------- 摄像头 + 人脸识别 ---------- */
const FACE_MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
let cameraActive = false;
let camStream = null;
let camAnimFrame = null;
let lastFrame = null;
let motionHistory = [];
let faceReady = false;
let faceFailed = false;
let faceLoading = false;
let detecting = false;
let headPoseBuf = [];
let scores = { seat: 0, posture: 0, focus: 0 };
let noFaceSince = 0;

async function initFaceModels() {
  if (faceReady || faceFailed || faceLoading) return;
  faceLoading = true;
  $('#det-status').textContent = '模型加载中…';
  try {
    if (typeof faceapi === 'undefined') throw new Error('face-api.js 未加载');
    await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(FACE_MODEL_URL);
    faceReady = true;
    $('#det-status').textContent = '人脸识别 · 就绪';
  } catch (e) {
    console.warn('face-api 模型加载失败,降级为运动分析', e);
    faceFailed = true;
    $('#det-status').textContent = '运动分析 · 降级';
  }
  faceLoading = false;
}

$('#btn-camera').addEventListener('click', async () => {
  if (cameraActive) { stopCamera(); return; }
  try {
    camStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
    const video = $('#cam-video');
    video.srcObject = camStream;
    video.hidden = false;
    $('#camera-off').hidden = true;
    $('#camera-overlay').hidden = false;
    $('#camera-overlay').innerHTML = '<div class="scan-line"></div>';
    cameraActive = true;
    $('#btn-camera').textContent = '关闭摄像头';
    $('#camera-label').textContent = '摄像头巡查 · 启用中';
    $('#rec-dot').classList.add('on');
    toast('摄像头已启用。画面仅本机分析。');
    initFaceModels();
    analyzeLoop();
  } catch (err) {
    toast('无法访问摄像头,使用模拟巡查。');
  }
});

function stopCamera() {
  cameraActive = false;
  if (camStream) { camStream.getTracks().forEach(t => t.stop()); camStream = null; }
  if (camAnimFrame) cancelAnimationFrame(camAnimFrame);
  const video = $('#cam-video');
  video.srcObject = null;
  video.hidden = true;
  $('#camera-off').hidden = false;
  $('#camera-overlay').hidden = true;
  $('#btn-camera').textContent = '启用摄像头';
  $('#camera-label').textContent = '摄像头巡查 · 未启用';
  $('#rec-dot').classList.remove('on');
  $('#sig-seat').style.width = '0%';
  $('#sig-posture').style.width = '0%';
  $('#sig-focus').style.width = '0%';
  $('#det-status').textContent = '未启用';
  lastFrame = null;
  motionHistory = [];
  headPoseBuf = [];
  scores = { seat: 0, posture: 0, focus: 0 };
  noFaceSince = 0;
}

function analyzeLoop() {
  if (!cameraActive) return;
  const video = $('#cam-video');
  const canvas = $('#cam-canvas');
  canvas.width = 160; canvas.height = 120;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(video, 0, 0, 160, 120);
  const frame = ctx.getImageData(0, 0, 160, 120);

  let motion = 0;
  if (lastFrame) {
    const data = frame.data, last = lastFrame.data;
    for (let i = 0; i < data.length; i += 16) {
      motion += Math.abs(data[i] - last[i]) + Math.abs(data[i+1] - last[i+1]) + Math.abs(data[i+2] - last[i+2]);
    }
    motion = motion / (data.length / 16) / 3;
    motionHistory.push(motion);
    if (motionHistory.length > 30) motionHistory.shift();
  }
  lastFrame = frame;

  if (faceReady && !detecting) {
    detectFaces(video);
  } else {
    motionOnlyAnalysis(motion);
  }

  camAnimFrame = requestAnimationFrame(analyzeLoop);
}

async function detectFaces(video) {
  detecting = true;
  try {
    const opts = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });
    const results = await faceapi.detectAllFaces(video, opts).withFaceLandmarks();
    const now = Date.now();

    if (results.length > 0) {
      noFaceSince = 0;
      const det = results[0];
      const lm = det.landmarks;
      const box = det.detection.box;

      // 在座稳定度: 人脸面积占画面比例
      const faceArea = box.width * box.height;
      const frameArea = 160 * 120;
      const faceRatio = faceArea / frameArea;
      scores.seat = Math.max(0, Math.min(100, Math.round(faceRatio * 400)));

      // 头部姿态估计
      const nose = lm.getNoseTip()[0];
      const leftEye = lm.getLeftEye();
      const rightEye = lm.getRightEye();
      const leC = leftEye.reduce((a,p) => ({x:a.x+p.x/leftEye.length, y:a.y+p.y/leftEye.length}), {x:0,y:0});
      const reC = rightEye.reduce((a,p) => ({x:a.x+p.x/rightEye.length, y:a.y+p.y/rightEye.length}), {x:0,y:0});
      const eyeY = (leC.y + reC.y) / 2;
      const eyeX = (leC.x + reC.x) / 2;
      const faceH = box.height;

      const pitch = (nose.y - eyeY) / faceH;  // 正=低头
      const yaw = (nose.x - (box.x + box.width/2)) / box.width; // 正=右转

      headPoseBuf.push({ pitch, yaw });
      if (headPoseBuf.length > 20) headPoseBuf.shift();

      // 专注度: pitch 和 yaw 都在正常范围
      const pitchOk = Math.abs(pitch) < 0.28;
      const yawOk = Math.abs(yaw) < 0.32;
      scores.focus = (pitchOk && yawOk) ? 100 : Math.max(0, Math.round(100 - Math.abs(pitch)*180 - Math.abs(yaw)*220));

      // 姿态静止度: 头部姿态方差越小越稳定
      if (headPoseBuf.length > 5) {
        const avgP = headPoseBuf.reduce((s,h)=>s+h.pitch,0)/headPoseBuf.length;
        const avgY = headPoseBuf.reduce((s,h)=>s+h.yaw,0)/headPoseBuf.length;
        const pVar = headPoseBuf.reduce((s,h)=>s+Math.abs(h.pitch-avgP),0)/headPoseBuf.length;
        const yVar = headPoseBuf.reduce((s,h)=>s+Math.abs(h.yaw-avgY),0)/headPoseBuf.length;
        scores.posture = Math.max(0, Math.round(100 - (pVar + yVar) * 400));
      }

      // 打瞌睡: 持续低头
      const dozing = pitch > 0.38;
      if (dozing) scores.focus = Math.min(scores.focus, 15);

      // 玩手机: 低头 + 画面下半部运动大
      const lowerMotion = getLowerMotion();
      if (pitch > 0.3 && lowerMotion > 18) {
        scores.focus = Math.min(scores.focus, 25);
      }

    } else {
      // 未检测到人脸
      if (!noFaceSince) noFaceSince = now;
      const awayMs = now - noFaceSince;
      if (awayMs > 1500) {
        scores.seat = 0;
        scores.focus = 0;
        scores.posture = 0;
      } else {
        scores.seat = Math.max(0, scores.seat - 5);
      }
    }
  } catch (e) {
    faceFailed = true;
    $('#det-status').textContent = '运动分析 · 降级';
  }
  detecting = false;
  updateSignalUI();
}

function getLowerMotion() {
  if (!lastFrame || !motionHistory.length) return 0;
  return motionHistory[motionHistory.length - 1] * 2;
}

function motionOnlyAnalysis(motion) {
  const avg = motionHistory.length ? motionHistory.reduce((a,b)=>a+b,0)/motionHistory.length : 0;
  scores.seat = Math.max(0, Math.min(100, Math.round(100 - avg * 8)));
  scores.posture = avg < 3 ? 90 : Math.max(0, Math.min(100, Math.round(100 - Math.abs(avg - 12) * 6)));
  scores.focus = scores.posture;
  updateSignalUI();
}

function updateSignalUI() {
  $('#sig-seat').style.width = scores.seat + '%';
  $('#sig-posture').style.width = scores.posture + '%';
  $('#sig-focus').style.width = scores.focus + '%';
}

/* ---------- ACTION LIBRARY ---------- */
function renderActions() {
  const grid = $('#action-grid');
  grid.innerHTML = '';
  ACTIONS.forEach((a, idx) => {
    const unlocked = state.unlockedActions.includes(a.id);
    const card = document.createElement('div');
    card.className = 'action-card' + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="action-thumb">
        <div class="action-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="action-info">
        <div class="action-num">${a.num}</div>
        <div class="action-name">${a.name}</div>
        ${unlocked ? '' : '<div class="action-lock">🔒 装备处解锁</div>'}
      </div>
    `;
    const thumb = card.querySelector('.action-thumb');
    thumb.insertBefore(officerSVG(state.selectedOfficer), thumb.firstChild);
    if (unlocked) {
      card.addEventListener('click', () => playFilm(a));
    } else {
      card.addEventListener('click', () => {
        toast('该动作尚未解锁,去装备处购买。');
        navigate('equipment');
      });
    }
    grid.appendChild(card);
  });
}

function playFilm(action) {
  const modal = $('#film-modal');
  modal.hidden = false;
  $('#film-label-num').textContent = action.num;
  $('#film-label-name').textContent = action.name;
  $('#film-sub-ru').textContent = action.ru;
  $('#film-sub-cn').textContent = action.cn;
  $('#film-endpanel').hidden = true;

  const officerEl = $('#film-officer');
  officerEl.className = 'film-officer';
  officerEl.innerHTML = '';
  officerEl.appendChild(officerSVG(state.selectedOfficer));

  // 强制重排以重启动画
  void officerEl.offsetWidth;
  officerEl.classList.add(action.anim);

  // 动画结束后显示 endpanel
  const dur = action.anim === 'anim-patrol' || action.anim === 'anim-stare' ? 2500 : 2000;
  setTimeout(() => {
    $('#film-endpanel').hidden = false;
  }, dur);
}

$('#film-close').addEventListener('click', () => { $('#film-modal').hidden = true; });
$('#film-modal').addEventListener('click', e => {
  if (e.target.id === 'film-modal') $('#film-modal').hidden = true;
});

/* ---------- COMRADES / CONSCRIPTION ---------- */
function renderComrades() {
  const list = $('#comrade-list');
  list.innerHTML = '';
  COMRADES.forEach(c => {
    const studying = duty.running;
    const item = document.createElement('div');
    item.className = 'comrade-item' + (studying ? ' on-study' : '');
    item.innerHTML = `
      <div class="comrade-avatar">${c.name[0]}</div>
      <div class="comrade-info">
        <div class="comrade-name">${c.name}</div>
        <div class="comrade-status ${studying ? 'studying' : ''}">${studying ? '陪学中…' : c.status}</div>
      </div>
    `;
    list.appendChild(item);
  });

  $('#vote-current').textContent = state.voteCount;
  $('#vote-needed').textContent = 10;
  $('#vote-fill').style.width = Math.min(100, state.voteCount * 10) + '%';
  $('#vote-reward').hidden = !state.voteRewarded;

  const vc = $('#vote-candidates');
  vc.innerHTML = '';
  VOTE_CANDIDATES.forEach(v => {
    const el = document.createElement('div');
    el.className = 'vote-candidate';
    el.innerHTML = `<span>${v.name}</span><span class="vc-votes">${v.votes} 票</span>`;
    vc.appendChild(el);
  });
}

$('#btn-call-comrade').addEventListener('click', () => {
  const c = COMRADES[Math.floor(Math.random() * COMRADES.length)];
  toast(`${c.name} 已加入陪学。`);
  renderComrades();
});

$('#btn-vote').addEventListener('click', () => {
  if (state.voteRewarded) { toast('本次征召已完成。'); return; }
  state.voteCount++;
  if (state.voteCount >= 10) {
    state.voteRewarded = true;
    addCoins(20);
    toast('征召成功!新兵入伍,奖励 20 军工币。');
  } else {
    toast('已投票。');
  }
  saveState();
  renderComrades();
});

/* ---------- DUNGEON ---------- */
function renderDungeon() {
  resetDailyIfNeeded();
  const status = $('#dungeon-status');
  const countdown = $('#dungeon-countdown');
  const serve = $('#btn-serve');
  const now = Date.now();
  if (state.dungeonUntil > now) {
    status.textContent = '你正在地牢服刑中。';
    status.classList.add('punished');
    countdown.hidden = false;
    serve.disabled = true;
    updateDungeonCountdown();
  } else {
    status.textContent = state.violationsToday > 0 ? `今日违纪 ${state.violationsToday} 次。` : '你今日尚未进地牢。';
    status.classList.remove('punished');
    countdown.hidden = true;
    serve.disabled = state.violationsToday < 3;
  }
  // 显示当前督学官在地牢里
  const off = $('#dungeon-officer');
  off.innerHTML = '';
  off.appendChild(officerSVG(state.selectedOfficer));
}

function updateDungeonCountdown() {
  const remain = Math.max(0, state.dungeonUntil - Date.now());
  const m = Math.floor(remain / 60000);
  const s = Math.floor((remain % 60000) / 1000);
  $('#dungeon-time').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (remain <= 0) {
    releaseFromDungeon();
  } else {
    setTimeout(updateDungeonCountdown, 500);
  }
}

$('#btn-serve').addEventListener('click', () => {
  state.dungeonUntil = Date.now() + 5 * 60 * 1000; // 5分钟
  saveState();
  renderDungeon();
  toast('开始服刑。5 分钟后释放。');
});

function releaseFromDungeon() {
  state.dungeonUntil = 0;
  state.violationsToday = 0;
  saveState();
  renderDungeon();
  toast('已释放。当日计数清零,重新做人。');
}

/* ---------- BARRACKS ---------- */
function renderBarracks() {
  const palette = $('#furniture-palette');
  palette.innerHTML = '';
  FURNITURE.forEach(f => {
    const owned = state.unlockedFurniture.includes(f.id);
    const item = document.createElement('div');
    item.className = 'furniture-item';
    item.innerHTML = `<span class="furniture-icon">${f.icon}</span><span>${f.name}</span>${owned ? '' : `<span class="vc-votes">🔒${f.price}</span>`}`;
    if (owned) {
      item.draggable = true;
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', f.id);
        e.dataTransfer.effectAllowed = 'copy';
      });
      // 点击也可添加(移动端)
      item.addEventListener('click', () => addFurniture(f.id));
    } else {
      item.addEventListener('click', () => {
        if (state.coins >= f.price) {
          if (confirm(`花费 ${f.price} 军工币解锁 ${f.name}?`)) {
            state.coins -= f.price;
            state.unlockedFurniture.push(f.id);
            saveState();
            updateCoinDisplay();
            renderBarracks();
            toast(`已解锁 ${f.name}。`);
          }
        } else {
          toast('军工币不足。');
        }
      });
    }
    palette.appendChild(item);
  });
  renderBarracksItems();
}

function renderBarracksItems() {
  const container = $('#barracks-items');
  container.innerHTML = '';
  state.barracksItems.forEach((it, idx) => {
    const f = FURNITURE.find(x => x.id === it.fid);
    if (!f) return;
    const el = document.createElement('div');
    el.className = 'barracks-placed';
    el.style.left = it.x + '%';
    el.style.top = it.y + '%';
    el.textContent = f.icon;
    el.dataset.idx = idx;
    el.innerHTML += '<span class="remove-btn">×</span>';
    el.querySelector('.remove-btn').addEventListener('click', e => {
      e.stopPropagation();
      state.barracksItems.splice(idx, 1);
      saveState();
      renderBarracksItems();
    });
    makeDraggable(el, idx);
    container.appendChild(el);
  });
}

function addFurniture(fid) {
  const x = 10 + Math.random() * 70;
  const y = 20 + Math.random() * 60;
  state.barracksItems.push({ fid, x, y });
  saveState();
  renderBarracksItems();
}

function makeDraggable(el, idx) {
  let startX, startY, startLeft, startTop;
  el.addEventListener('mousedown', e => {
    if (e.target.classList.contains('remove-btn')) return;
    e.preventDefault();
    const room = $('#barracks-room');
    const r = room.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY;
    startLeft = parseFloat(el.style.left);
    startTop = parseFloat(el.style.top);
    el.classList.add('dragging');
    const onMove = ev => {
      const dx = (ev.clientX - startX) / r.width * 100;
      const dy = (ev.clientY - startY) / r.height * 100;
      el.style.left = Math.max(0, Math.min(90, startLeft + dx)) + '%';
      el.style.top = Math.max(0, Math.min(80, startTop + dy)) + '%';
    };
    const onUp = () => {
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      state.barracksItems[idx].x = parseFloat(el.style.left);
      state.barracksItems[idx].y = parseFloat(el.style.top);
      saveState();
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

$('#barracks-room').addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
$('#barracks-room').addEventListener('drop', e => {
  e.preventDefault();
  const fid = e.dataTransfer.getData('text/plain');
  if (!fid) return;
  const r = $('#barracks-room').getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width * 100;
  const y = (e.clientY - r.top) / r.height * 100;
  state.barracksItems.push({ fid, x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(80, y)) });
  saveState();
  renderBarracksItems();
});

$('#btn-clear-barracks').addEventListener('click', () => {
  if (state.barracksItems.length === 0) { toast('营房已是空的。'); return; }
  if (confirm('清空营房所有家具?')) {
    state.barracksItems = [];
    saveState();
    renderBarracksItems();
    toast('营房已清空。');
  }
});

/* ---------- SHOP ---------- */
function renderShop() {
  // 督学官
  const offGrid = $('#shop-officers');
  offGrid.innerHTML = '';
  Object.values(OFFICERS).forEach(off => {
    const owned = state.unlockedOfficers.includes(off.id);
    const card = document.createElement('div');
    card.className = 'shop-card' + (owned ? ' owned' : '');
    card.innerHTML = `
      <div class="shop-thumb"></div>
      <div class="shop-info">
        <div class="shop-name">${off.name}</div>
        <div class="shop-desc">${off.desc}</div>
        <button class="shop-buy ${owned ? 'owned' : ''}">${owned ? (state.selectedOfficer === off.id ? '执勤中' : '已拥有') : `${off.price} 军工币`}</button>
      </div>
    `;
    card.querySelector('.shop-thumb').appendChild(officerSVG(off.id));
    const btn = card.querySelector('.shop-buy');
    if (owned) {
      btn.disabled = state.selectedOfficer === off.id;
      btn.addEventListener('click', () => {
        state.selectedOfficer = off.id;
        saveState();
        renderShop();
        toast(`${off.name} 已上岗。`);
      });
    } else {
      btn.addEventListener('click', () => {
        if (state.coins >= off.price) {
          if (confirm(`花费 ${off.price} 军工币招募 ${off.name}?`)) {
            state.coins -= off.price;
            state.unlockedOfficers.push(off.id);
            state.selectedOfficer = off.id;
            saveState();
            updateCoinDisplay();
            renderShop();
            toast(`${off.name} 已入伍并上岗。`);
          }
        } else {
          toast('军工币不足。继续学习。');
        }
      });
    }
    offGrid.appendChild(card);
  });

  // 动作
  const actGrid = $('#shop-actions');
  actGrid.innerHTML = '';
  ACTIONS.filter(a => a.price > 0).forEach(a => {
    const owned = state.unlockedActions.includes(a.id);
    const card = document.createElement('div');
    card.className = 'shop-card' + (owned ? ' owned' : '');
    card.innerHTML = `
      <div class="shop-thumb"><div class="shop-icon-big">🎬</div></div>
      <div class="shop-info">
        <div class="shop-name">${a.name}</div>
        <div class="shop-desc">${a.cn}</div>
        <button class="shop-buy ${owned ? 'owned' : ''}">${owned ? '已拥有' : `${a.price} 军工币`}</button>
      </div>
    `;
    const btn = card.querySelector('.shop-buy');
    if (!owned) {
      btn.addEventListener('click', () => {
        if (state.coins >= a.price) {
          if (confirm(`花费 ${a.price} 军工币解锁动作「${a.name}」?`)) {
            state.coins -= a.price;
            state.unlockedActions.push(a.id);
            saveState();
            updateCoinDisplay();
            renderShop();
            toast(`动作「${a.name}」已解锁。`);
          }
        } else {
          toast('军工币不足。');
        }
      });
    }
    actGrid.appendChild(card);
  });

  // 装饰
  const decGrid = $('#shop-decorations');
  decGrid.innerHTML = '';
  FURNITURE.filter(f => f.price > 0).forEach(f => {
    const owned = state.unlockedFurniture.includes(f.id);
    const card = document.createElement('div');
    card.className = 'shop-card' + (owned ? ' owned' : '');
    card.innerHTML = `
      <div class="shop-thumb"><div class="shop-icon-big">${f.icon}</div></div>
      <div class="shop-info">
        <div class="shop-name">${f.name}</div>
        <div class="shop-desc">营房装饰</div>
        <button class="shop-buy ${owned ? 'owned' : ''}">${owned ? '已拥有' : `${f.price} 军工币`}</button>
      </div>
    `;
    const btn = card.querySelector('.shop-buy');
    if (!owned) {
      btn.addEventListener('click', () => {
        if (state.coins >= f.price) {
          if (confirm(`花费 ${f.price} 军工币解锁「${f.name}」?`)) {
            state.coins -= f.price;
            state.unlockedFurniture.push(f.id);
            saveState();
            updateCoinDisplay();
            renderShop();
            toast(`「${f.name}」已解锁。`);
          }
        } else {
          toast('军工币不足。');
        }
      });
    }
    decGrid.appendChild(card);
  });
}

/* ---------- INIT ---------- */
function init() {
  resetDailyIfNeeded();
  updateCoinDisplay();
  renderHome();
  renderTimer();
  navigate('home');
}

init();
