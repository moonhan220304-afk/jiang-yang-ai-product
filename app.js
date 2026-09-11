const routes = ['home', 'workflow', 'company', 'honglou', 'method', 'experience'];
let currentRoute = 'home';
let currentTab = 'overview';

const view = document.querySelector('#view');
const nav = document.querySelector('#main-nav');
const menuButton = document.querySelector('#menu-button');
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');

const esc = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function homePage() {
  const p = portfolioData.profile;
  return `
    <section class="route-page home-page">
      <div class="hero-stage">
        <div class="hero-panel glass-panel">
          <span class="eyebrow">AI APPLICATION PRODUCT · AGENT WORKFLOW</span>
          <p class="role">${p.role}</p>
          <h1>把真实问题，<br>做成能跑的<br>AI 产品。</h1>
          <p class="hero-intro">${p.intro}</p>
          <div class="hero-actions">
            <a class="primary" href="#workflow">查看三个核心案例 <span>→</span></a>
            <a class="secondary" href="#experience">了解我的经历</a>
          </div>
          <div class="contact-line"><span>${p.name}</span><span>${p.city}</span><span>${p.phone}</span><span>${p.email}</span></div>
        </div>
        <span class="hero-mark">7 EXPERIMENTS · 3 CORE CASES · 1 PRODUCT PATH</span>
      </div>

      <div class="profile-bridge glass-panel">
        <span class="eyebrow">HOW I DEFINE MYSELF</span>
        <h2>${p.headline}</h2>
        <p>${p.toolNote}</p>
      </div>

      <div class="value-heading">
        <span class="eyebrow">WHAT I KEEP DOING</span>
        <h2>近 7 款产品做下来，我反复在做四件事。</h2>
      </div>
      <div class="value-strip four-up">
        ${p.strengths.map(([title, body], index) => `<article><small>0${index + 1}</small><h3>${title}</h3><p>${body}</p></article>`).join('')}
      </div>
    </section>`;
}

function caseTabs(item) {
  return `<div class="case-tabs" role="tablist" aria-label="案例内容">
    <button data-tab="overview" aria-selected="${currentTab === 'overview'}">${item.overviewLabel}</button>
    <button data-tab="decision" aria-selected="${currentTab === 'decision'}">02 产品判断</button>
    <button data-tab="proof" aria-selected="${currentTab === 'proof'}">03 成果与边界</button>
  </div>`;
}

function productShot(src, title, description, className = '') {
  return `<figure class="product-shot ${className}">
    <figcaption><strong>${esc(title)}</strong><span>${esc(description)}</span></figcaption>
    <button class="shot-frame zoomable" data-image="${src}" data-caption="${esc(title)}"><img src="${src}" alt="${esc(title)}"></button>
  </figure>`;
}

function overviewTab(item) {
  const hero = item.images.find(([src]) => src === item.hero) || item.images[0];
  return `<section class="case-panel overview-panel">
    <div class="overview-grid">
      <article class="problem-card glass-panel">
        <span class="eyebrow">${item.overviewKicker}</span>
        <h2>${item.overviewTitle}</h2>
        <p class="case-background">${item.summary}</p>
        <ul>${item.problems.map(problem => `<li>${problem}</li>`).join('')}</ul>
      </article>
      ${productShot(hero[0], hero[1], hero[2], 'hero-shot')}
    </div>
    <div class="flow-row glass-panel"><span>产品主线</span><div>${item.flow.map((step, index) => `<b>${step}</b>${index < item.flow.length - 1 ? '<i>→</i>' : ''}`).join('')}</div></div>
    <div class="core-conclusion"><span>核心结论</span><strong>${item.conclusion}</strong></div>
  </section>`;
}

function decisionTab(item) {
  const metrics = item.measures ? `<div class="measure-block glass-panel"><div><span class="eyebrow">HOW I MEASURE IT</span><h3>我会用这些指标判断系统是否真的减少损耗</h3></div><ul>${item.measures.map(measure => `<li>${measure}</li>`).join('')}</ul></div>` : '';
  return `<section class="case-panel decision-panel">
    <div class="judgment-lead glass-panel"><span class="eyebrow">MY JUDGMENT</span><h2>${item.judgment}</h2><p>${item.insight}</p></div>
    <div class="choice-grid">${item.choices.map((choice, index) => `<article tabindex="0"><small>0${index + 1}</small><h3>${choice.title}</h3><p>${choice.body}</p></article>`).join('')}</div>
    ${metrics}
  </section>`;
}

function proofTab(item) {
  return `<section class="case-panel proof-panel">
    <div class="proof-summary">
      <article><span>本人负责</span><p>${item.owner}</p></article>
      <article><span>AI 如何参与</span><p>${item.ai}</p></article>
      <article><span>当前成果</span><p>${item.result}</p></article>
    </div>
    <div class="evidence-boundary glass-panel"><span>当前边界</span><p>${item.boundary}</p></div>
    <div class="evidence-gallery">${item.images.map(([src, title, description]) => productShot(src, title, description)).join('')}</div>
  </section>`;
}

function casePage(id) {
  const item = portfolioData.cases[id];
  const panel = currentTab === 'decision' ? decisionTab(item) : currentTab === 'proof' ? proofTab(item) : overviewTab(item);
  return `<section class="route-page case-page case-${id}">
    <div class="case-signal" aria-hidden="true"><span>context</span><span>decision</span><span>experience</span><span>review</span></div>
    <div class="case-heading glass-panel">
      <div><span class="eyebrow">CASE ${item.number} / ${item.type}</span><h1>${item.name}</h1><p>${item.definition}</p></div>
      <div class="case-actions"><span class="status">${item.status}</span>${item.liveUrl ? `<a class="case-live" href="${item.liveUrl}" target="_blank" rel="noreferrer">进入线上产品 ↗</a>` : ''}</div>
    </div>
    <blockquote>“${item.hook}”</blockquote>
    ${caseTabs(item)}${panel}
  </section>`;
}

function methodPage() {
  const { sayit, radar, harness } = portfolioData.otherPractice;
  return `<section class="route-page method-page">
    <div class="page-heading glass-panel"><span class="eyebrow">OTHER AI PRACTICE</span><h1>核心案例之外，<br>我还在持续做小实验。</h1><p>每个实验都从一个具体问题开始。产品可以很小，但问题判断、失败边界和使用体验仍然要完整。</p></div>

    <section class="practice-feature sayit-feature">
      <article class="glass-panel"><span class="eyebrow">${sayit.label}</span><h2>${sayit.name}</h2><h3>${sayit.title}</h3><p>${sayit.body}</p><strong>${sayit.principle}</strong><blockquote>${sayit.conclusion}</blockquote></article>
      ${productShot(sayit.image, 'say it 流程架构', '语音 → 转写 → AI 整理 → 保存 → 导出；原始录音始终先保存在本地。')}
    </section>

    <section class="practice-feature radar-feature">
      <article class="glass-panel"><span class="eyebrow">${radar.label}</span><h2>${radar.name}</h2><h3>${radar.title}</h3><p>${radar.body}</p><strong>${radar.principle}</strong><blockquote>${radar.conclusion}</blockquote><a class="case-live practice-link" href="${radar.url}" target="_blank" rel="noreferrer">进入个人作战指挥中心 ↗</a></article>
      ${productShot(radar.image, 'DeskRadar 星系全景', '项目是 Hub，任务是卫星；在同一张图里切换全局扫描与具体推进。')}
    </section>

    <section class="harness-feature glass-panel">
      <div><span class="eyebrow">${harness.label}</span><h2>${harness.name}</h2></div>
      <div><h3>${harness.title}</h3><p>${harness.body}</p><strong>${harness.conclusion}</strong></div>
    </section>

    <div class="method-heading"><span class="eyebrow">WHAT THESE PROJECTS TAUGHT ME</span><h2>这些产品共同训练的，不只是做页面的能力。</h2></div>
    <div class="method-grid">
      <article><small>01</small><h3>先问真正的问题</h3><p>功能诉求背后，用户究竟要完成什么任务、减少什么损耗。</p></article>
      <article><small>02</small><h3>知道何时做减法</h3><p>需求受欢迎，也要判断它是否服务定位、是否值得长期投入。</p></article>
      <article><small>03</small><h3>让结果可以接续</h3><p>状态、上下文、验收和资产，让一次执行成为下一次工作的起点。</p></article>
      <article><small>04</small><h3>先守住可靠体验</h3><p>原始输入、失败恢复和数据边界，是模型能力发挥作用的基础。</p></article>
    </div>
  </section>`;
}

function experiencePage() {
  const p = portfolioData.profile;
  return `<section class="route-page experience-page">
    <div class="page-heading experience-heading glass-panel"><span class="eyebrow">EXPERIENCE / DELIVERY / TRANSFER</span><h1>从具体执行走到项目统筹，<br>我开始看见系统性问题。</h1><p class="experience-dream">对 AI Agent 的探索圆了我程序员的梦想。</p><p>广告行业给我的不是一个需要隐藏的标签，而是理解客户、协调复杂角色、对交付结果负责的基本盘。</p></div>

    <div class="current-role"><span>2023.07 — 至今</span><h2>线上金融广告公司 · 资深项目经理</h2><h3>正式职级是资深项目经理，实际承担项目总监级的项目统筹、人员与资源协调职责。</h3><p>负责金融客户账号内容项目整体统筹，覆盖编导合作、人员招募、内容板块和资源匹配、项目推进与客户沟通；协调客户、内容、制作和内部协作团队，把控项目节奏、交付质量及跨部门信息同步。</p></div>

    <section class="experience-section"><div class="section-label"><span>01</span><h2>当前负责的代表项目</h2></div><div class="finance-projects">
      <article><small>项目负责人 · 两年期合作</small><h3>中国人寿抖音自媒体账号</h3><p>从内容交付走向人员、资源、客户和整体结果统筹。</p></article>
      <article><small>2024—2025</small><h3>中国人寿养老视频号</h3><p>负责视频号内容制作项目推进与交付。</p></article>
      <article><small>项目总控</small><h3>中国人寿“悦动未来”</h3><p>营销项目负责人，统筹跨团队协作与落地。</p></article>
    </div></section>

    <section class="experience-section"><div class="section-label"><span>02</span><h2>我的职责怎样一步步扩展</h2></div><div class="role-evolution">
      <article><small>01</small><h3>接下账号</h3><p>从金融视频内容制作走向抖音账号项目负责人。</p></article>
      <article><small>02</small><h3>搭建团队</h3><p>招募外部合作导演、公司专职编导，并带教年轻成员。</p></article>
      <article><small>03</small><h3>统筹资源</h3><p>协调客户、内容、制作与投放运营，承担前期商务对接。</p></article>
      <article><small>04</small><h3>扩展业务</h3><p>继续接手新的小红书与抖音双平台账号项目。</p></article>
      <article><small>05</small><h3>做出产品</h3><p>把反复出现的协作断点抽象成自媒体工作台。</p></article>
    </div><blockquote class="experience-quote">经历过不同项目里的不同角色，也从具体执行一步步走上来，我更容易从统筹视角发现工作流中的痛点。</blockquote></section>

    <section class="experience-section"><div class="section-label"><span>03</span><h2>职业路径与主动探索</h2></div><div class="career-timeline">
      <article><small>2016.09—2019.04</small><h3>上海格罗科广告｜市场策划</h3><p>负责全案策划、投标统筹、跨部门协作、客户沟通和项目推进；从品牌活动与执行现场建立业务基本功。</p></article>
      <article><small>2019.04—2022.07</small><h3>上海极度智慧展览｜高级客户经理</h3><p>负责活动统筹、策划、客户沟通和执行落地；多次担任汽车品牌大型项目总控。</p></article>
      <article class="gap-card"><small>2022.07—2023.07</small><h3>个人内容创作 / 职业探索</h3><p>尝试小说、短篇、观点写作和拆书视频，完成约 10 万字长篇小说；也短暂进入线上快消公司，进一步确认自己更适合项目管理与产品推进。</p></article>
      <article><small>2023.07—至今</small><h3>线上金融广告｜从内容项目到业务统筹</h3><p>先负责宣传片、广告片，随后承担账号、团队、资源和客户统筹；真实协作问题成为 AI 产品实践的起点。</p></article>
    </div></section>

    <section class="experience-section"><div class="section-label"><span>04</span><h2>更早的训练与教育背景</h2></div><div class="education-grid">
      <article class="glass-panel"><small>2013—2016</small><h3>韩国中央大学｜工商管理｜本科</h3><p>经营管理专业背景，让我习惯从业务目标、组织关系和结果角度理解问题。</p></article>
      <article class="glass-panel"><small>2012.11—2013.02</small><h3>浙江省广播电视台民生栏目｜实习记者</h3><p>参与一线采访、编辑、后期协作和现场连线，包括杭州地铁首次开通、杭州国际马拉松等报道。</p></article>
    </div></section>

    <div class="fit-block"><span>希望加入的方向</span><h2>${p.target}</h2><p>希望进入 AI 应用产品、Agent 工作流、模型质量控制与用户体验方向，把商业项目统筹能力、真实业务判断和 AI 产品实践带入正式产品团队。</p><blockquote>我已经完整跑过从发现问题、定义产品，到用 AI 协作落地、自己验收结果的链路。希望争取一次交流机会，带着产品演示，把每个设计决策背后的业务问题讲清楚。</blockquote><div><a href="mailto:${p.email}">${p.email}</a><a href="tel:${p.phone}">${p.phone}</a><span>微信 ${p.wechat}</span><span>${p.city}</span></div></div>
  </section>`;
}

function render() {
  const hash = location.hash.slice(1).split('/')[0];
  currentRoute = routes.includes(hash) ? hash : 'home';
  document.body.classList.toggle('home-route', currentRoute === 'home');
  if (currentRoute === 'home') view.innerHTML = homePage();
  else if (['workflow', 'company', 'honglou'].includes(currentRoute)) view.innerHTML = casePage(currentRoute);
  else if (currentRoute === 'method') view.innerHTML = methodPage();
  else view.innerHTML = experiencePage();

  document.querySelectorAll('#main-nav a').forEach(anchor => anchor.toggleAttribute('aria-current', anchor.getAttribute('href') === `#${currentRoute}`));
  document.querySelector('#page-position').textContent = `${String(routes.indexOf(currentRoute) + 1).padStart(2, '0')} / ${String(routes.length).padStart(2, '0')}`;
  document.querySelector('#prev').disabled = currentRoute === routes[0];
  document.querySelector('#next').disabled = currentRoute === routes.at(-1);
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.addEventListener('click', event => {
  const tab = event.target.closest('[data-tab]');
  if (tab) { currentTab = tab.dataset.tab; render(); return; }
  const zoom = event.target.closest('.zoomable');
  if (zoom) {
    dialogImage.src = zoom.dataset.image;
    dialogImage.alt = zoom.dataset.caption || '产品图片';
    dialogCaption.textContent = zoom.dataset.caption || '';
    dialog.showModal();
  }
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
document.querySelector('#prev').addEventListener('click', () => { const index = routes.indexOf(currentRoute); if (index > 0) location.hash = routes[index - 1]; });
document.querySelector('#next').addEventListener('click', () => { const index = routes.indexOf(currentRoute); if (index < routes.length - 1) location.hash = routes[index + 1]; });
document.addEventListener('keydown', event => {
  if (dialog.open && event.key === 'Escape') return;
  if (event.key === 'ArrowRight') document.querySelector('#next').click();
  if (event.key === 'ArrowLeft') document.querySelector('#prev').click();
});
window.addEventListener('hashchange', () => { currentTab = 'overview'; render(); });
render();
