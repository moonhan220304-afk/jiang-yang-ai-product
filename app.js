const routes = ['home', 'workflow', 'company', 'honglou', 'sayit', 'radar'];
let currentRoute = 'home';
const view = document.querySelector('#view');
const nav = document.querySelector('#main-nav');
const menuButton = document.querySelector('#menu-button');
const dialog = document.querySelector('#image-dialog');
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function homePage() {
  const p = portfolioData.profile;
  return `
    <section class="route-page home-page">
      <div class="hero-stage">
        <div class="hero-panel glass-panel">
          <span class="eyebrow">个人定位</span>
          <p class="role">${p.role}</p>
          <h1>vibe coding <br class="mobile-break">重度玩家，<br>个人时间探索各种应用的落地。</h1>
          <p class="experience-dream">AI Agent，圆我一个 IT 梦。</p>
          <p class="hero-intro">${p.intro}</p>
          <div class="hero-actions">
            <a class="primary" href="#workflow">查看作品案例 <span>→</span></a>
            <a class="secondary" href="assets/resume.pdf" target="_blank">查看 PDF 简历</a>
          </div>
          <div class="contact-line"><span>${p.name}</span><span>${p.city}</span><span>${p.phone}</span><span>${p.email}</span></div>
        </div>
        <span class="hero-mark">五个作品 · 五种具体问题</span>
      </div>

      <div class="work-index">${manuscriptCases.map((item, i) => `<a href="#${item.id}"><span>作品 ${i+1}</span><strong>${esc(item.name)}</strong><small>${esc(caseMeta(item.id).summary)} →</small></a>`).join('')}</div><div class="profile-bridge glass-panel">
        <span class="eyebrow">我的判断</span>
        <h2>${p.headline}</h2>
        <p>${p.toolNote}</p>
      </div>

      <div class="value-heading">
        <span class="eyebrow">反复在做的事</span>
        <h2>近 7 款产品做下来，有几件事是我反复在做的：</h2>
      </div>
      <div class="value-strip four-up">
        ${p.strengths.map(([title, body], index) => `<article><small>0${index + 1}</small><h3>${title}</h3><p>${body}</p></article>`).join('')}
      </div>
    </section>`;
}

function productShot(src, title, description, className = '') {
  return `<figure class="product-shot ${className}">
    <figcaption><strong>${esc(title)}</strong><span>${esc(description)}</span></figcaption>
    <button class="shot-frame zoomable" data-image="${src}" data-caption="${esc(title)}"><img src="${src}" alt="${esc(title)}"></button>
  </figure>`;
}


function caseMeta(id) {
 const summaries = {workflow:'内容交付怎样全程可追踪',company:'任务、交接与经验怎样持续积累',honglou:'知识内容怎样连接社区交流',sayit:'灵感怎样可靠地留下来',radar:'项目全景怎样连到具体任务'};
 const prior = portfolioData.cases[id];
 if (prior) return {summary:summaries[id], images:prior.images, url:prior.liveUrl};
 const practice = portfolioData.otherPractice[id];
 return {summary:summaries[id], images:[[practice.image, id==='radar'?'DeskRadar 星系全景':'say it 流程架构',id==='radar'?'项目、任务与风险的全景视图。':'录音、转写、整理、保存与导出的处理流程。']],url:practice.url};
}
function inline(text) { return esc(text).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'); }
function prose(body, sectionIndex) {
 const blocks = body.split(/\n\s*\n/);
 return blocks.map((block,i) => {
  if(block.startsWith('- ')) {
   const entries=block.split('\n').map(x=>x.replace(/^- /,''));
   const list=entries.map(x=>{const pos=x.indexOf('：');return pos<0?`<li>${inline(x)}</li>`:`<li><strong>${inline(x.slice(0,pos))}：</strong><p>${inline(x.slice(pos+1))}</p></li>`;}).join('');
   return `<${sectionIndex===1?'ol':'ul'} class="${sectionIndex===1?'operation-steps':'module-list'}">${list}</${sectionIndex===1?'ol':'ul'}>`;
  }
  if(/^\*\*[^\n]+\*\*$/.test(block)) return `<h3>${inline(block.replace(/^\*\*|\*\*$/g,''))}</h3>`;
  return `<p>${inline(block).replaceAll('\n','<br>')}</p>`;
 }).join('');
}
function casePage(id) {
 const item=manuscriptCases.find(x=>x.id===id), meta=caseMeta(id);
 return `<article class="route-page narrative-case">
  <header class="narrative-heading"><a href="#home" class="back-home">← 全部作品</a><h1>${esc(item.name)}</h1><p>${esc(meta.summary)}</p>${meta.url?`<a class="case-live" href="${esc(meta.url)}" target="_blank" rel="noreferrer">${id==='radar'?'进入脱敏体验版':'进入线上产品'} ↗</a>`:''}</header>
  <div class="reading-layout"><aside class="chapter-nav"><span>阅读这个作品</span><nav aria-label="案例章节">${item.sections.map((sec,i)=>`<a href="#${id}/${i}" data-section="${i}"><small>0${i+1}</small>${esc(i===0?'制作中的难题':sec.title)}</a>`).join('')}</nav></aside>
  <div class="case-story">${item.sections.map((sec,i)=>`<section class="story-section section-${i}" id="section-${i}" aria-labelledby="title-${i}"><header><span>0${i+1}</span><h2 id="title-${i}">${esc(sec.title)}</h2></header><div class="section-content">${prose(sec.body,i)}</div>${i===2&&id==='honglou'?`<div class="architecture-evidence"><h3>早期架构设计</h3><p>从首页入口、内容链路到页面职责，记录红楼社早期阅读与知识站的设计。当前产品已迭代为社区，部分结构与现版不同。</p><a class="case-live" href="assets/honglou-architecture.html" target="_blank" rel="noopener">完整查看架构图 ↗</a><iframe title="红楼社早期全站前端架构图" src="assets/honglou-architecture.html" loading="lazy" sandbox></iframe></div>`:''}${i===3&&id==='sayit'?`<figure class="demo-video"><figcaption><strong>say it 操作演示</strong><span>实际操作录屏 · 约 34 秒</span></figcaption><video controls playsinline preload="metadata" poster="assets/sayit-demo-poster.jpg"><source src="assets/sayit-demo.mp4" type="video/mp4">当前浏览器无法播放，请下载视频查看。</video><a href="assets/sayit-demo.mp4" download>下载演示视频 ↓</a></figure>`:''}${i===2?`<details class="screenshots"><summary>查看产品界面与结构图 <span>${meta.images.length} 张 · 点击展开</span></summary><div class="evidence-gallery">${meta.images.map(x=>productShot(...x)).join('')}</div></details>`:''}</section>`).join('')}
  <a class="next-case" href="#${routes[(routes.indexOf(id)+1)%routes.length]}">${id==='radar'?'返回全部作品':'继续阅读：'+manuscriptCases.find(x=>x.id===routes[routes.indexOf(id)+1]).name} →</a></div></div></article>`;
}
let observer;
function render() {
 const [raw,chapter]=location.hash.slice(1).split('/');
 const route=raw==='method'?'sayit':routes.includes(raw)?raw:'home';
 const changed=route!==currentRoute || !view.children.length;
 currentRoute=route;
 if(changed) {
  observer?.disconnect();
  document.body.classList.toggle('home-route',route==='home');
  view.innerHTML=route==='home'?homePage():casePage(route);
  document.querySelectorAll('#main-nav a').forEach(a=>{if(a.hash===`#${route}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.querySelector('#page-position').textContent=`${routes.indexOf(route)+1} / ${routes.length}`;
  document.querySelector('#prev').disabled=route==='home';
  document.querySelector('#next').disabled=route===routes.at(-1);
  observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){document.querySelectorAll('[data-section]').forEach(a=>a.toggleAttribute('aria-current',a.dataset.section===e.target.id.replace('section-','')));}}, {rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('.story-section').forEach(s=>observer.observe(s));
 }
 nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');
 if(chapter && /^[0-4]$/.test(chapter)) document.getElementById(`section-${chapter}`)?.scrollIntoView({behavior:'instant'});
 else if(changed) window.scrollTo({top:0,behavior:'instant'});
}
document.addEventListener('click',event=>{
 const zoom=event.target.closest('.zoomable');if(!zoom)return;
 const img=document.querySelector('#dialog-image');img.src=zoom.dataset.image;img.alt=zoom.dataset.caption;
 document.querySelector('#dialog-caption').textContent=zoom.dataset.caption;dialog.showModal();
});
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
menuButton.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded',String(nav.classList.toggle('open')));});
document.querySelector('#prev').addEventListener('click',()=>{const i=routes.indexOf(currentRoute);if(i>0)location.hash=routes[i-1];});
document.querySelector('#next').addEventListener('click',()=>{const i=routes.indexOf(currentRoute);if(i<routes.length-1)location.hash=routes[i+1];});
window.addEventListener('hashchange',render);
render();
