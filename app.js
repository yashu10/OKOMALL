/* OKOMALL — customer website. Vanilla JS, hash router, no build step. */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const INR=n=>'₹'+Number(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};

/* ---------- icons ---------- */
const IC={
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/>',heart:'<path d="M12 20s-7-4.4-9-9.3C1.8 7 4 4 7.2 4c2 0 3.6 1 4.8 2.7C13.2 5 14.800 4 16.800 4 20 4 22.200 7 21 10.700 19 15.600 12 20 12 20z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>',check:'<path d="M5 12.500l4.500 4.500L19 7.500"/>',chev:'<path d="M9 5l7 7-7 7"/>',back:'<path d="M15 5l-7 7 7 7"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.600-6.500 8-6.500s8 2.500 8 6.500"/>',
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',tag:'<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.500" cy="8.500" r="1.300"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 114 2c-.9.600-1.500 1.100-1.500 2.200M12 17.500v.01"/>',
 shield:'<path d="M12 3l8 3v6c0 4.500-3.200 7.800-8 9-4.800-1.200-8-4.500-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',share:'<path d="M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>',
 phone:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',nav:'<path d="M3 11l18-8-8 18-2-8z"/>',
 scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.100 8.100L20 20M8.100 15.900L20 4"/>',sparkle:'<path d="M12 3l1.900 5.600L19.500 10l-5.600 1.900L12 17.500l-1.900-5.600L4.500 10l5.600-1.400L12 3z"/><path d="M19 17v4M17 19h4"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.500 2.300 2.200 4 2.200s3-.700 4-2.200M9 9.500v.01M15 9.500v.01"/>',hand:'<path d="M8 13V5.500a1.500 1.500 0 013 0V12M11 11.500V4a1.500 1.500 0 013 0v8M14 12V6a1.500 1.500 0 013 0v8.500c0 4-2.500 6.500-6 6.500-2.500 0-4-1-5.400-3L3.500 14a1.500 1.500 0 012.300-1.900L8 14"/>',
 brush:'<path d="M18.400 2.600a2 2 0 012.800 2.800L12 14.600 9.400 12 18.400 2.600z"/><path d="M9.400 12C6.500 12 5 14 5 16.500c0 1.600-1 2.800-2 3.500 3.500 1 8-.5 8-4.500L9.400 12z"/>',
 flower:'<circle cx="12" cy="12" r="2.500"/><path d="M12 9.500C12 6 10.500 4 12 3c1.500 1 0 3 0 6.500zM14.500 12C18 12 20 10.500 21 12c-1 1.500-3 0-6.500 0zM12 14.500c0 3.500 1.500 5.500 0 6.500-1.500-1-0-3 0-6.500zM9.500 12C6 12 4 13.500 3 12c1-1.500 3 0 6.500 0z"/>',
 feather:'<path d="M20 4a8 8 0 00-11 0L5 8v8l-2 5h1l3-2h8l4-4c3-3 3-8 1-11z"/><path d="M5 19L15 9"/>',bell:'<path d="M6 9a6 6 0 1112 0c0 6 2.500 8 2.500 8h-17S6 15 6 9z"/><path d="M10 21a2 2 0 004 0"/>',
 download:'<path d="M12 3v12M8 11l4 4 4-4M5 20h14"/>',map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',logout:'<path d="M9 4H5a2 2 0 00-2 2v12a2 2 0 002 2h4M16 8l4 4-4 4M20 12H9"/>',repeat:'<path d="M17 3l4 4-4 4M3 11V9a2 2 0 012-2h16M7 21l-4-4 4-4M21 13v2a2 2 0 01-2 2H3"/>'
};
const ic=(n,c='')=>`<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||''}</svg>`;

/* ---------- state ---------- */
const KEY='maison.web.v2';
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const addDays=(n)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+n);return d};
const parseISO=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const dlabel=(s,long)=>{const d=parseISO(s),t=iso(new Date());if(s===t)return long?'Today':'Today';if(s===iso(addDays(1)))return 'Tomorrow';return d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})};
const dfull=s=>parseISO(s).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
const tlabel=t=>{const [h,m]=t.split(':').map(Number);return (h%12||12)+':'+String(m).padStart(2,'0')+(h<12?' am':' pm')};
function load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
const GUEST=()=>({name:'',phone:'',email:'',notify:true,remind:true});
const SEED=()=>({user:{name:'Ananya Kapoor',phone:'+91 98980 11223',email:'ananya@email.com',notify:true,remind:true},fav:['luma','elan'],bookings:[
  {ref:'OKO-48213',salon:'luma',svc:['luma-0'],pro:'Meera Rao',date:iso(addDays(2)),time:'11:30',status:'confirmed',total:1200,notes:''},
  {ref:'OKO-47110',salon:'glow',svc:['glow-0'],pro:'Divya Nair',date:iso(addDays(-12)),time:'15:00',status:'completed',total:1800,notes:'',rated:0}]});
let S=load()||{cur:null,users:{'9898011223':SEED()},...{user:GUEST(),fav:[],bookings:[]}};
if(S.cur&&S.users&&S.users[S.cur])Object.assign(S,S.users[S.cur]);else{S.cur=null}
const save=()=>{if(S.cur&&S.users)S.users[S.cur]={user:S.user,fav:S.fav,bookings:S.bookings};try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
let draft=null;
const salon=id=>SALONS.find(s=>s.id===id);
const svcOf=(s,id)=>s.services.find(x=>x.id===id);

/* ---------- salon art ---------- */
function cover(s,v=0){
  if(s.img){const f=s.img[v%s.img.length];return `<img src="images/${f}" alt="${esc(s.name)} — ${['salon photo','treatment photo','detail photo'][v%3]}" loading="lazy" decoding="async">`}
  const p=PALETTES[(s.hue+v)%PALETTES.length],id='g'+s.id+v,k=(v+hash(s.id))%3,ini=s.name.replace(/[^A-ZÉ]/g,'').slice(0,2)||s.name[0];
  const art=k===0?`<circle cx="110" cy="115" r="78" fill="${p[2]}" opacity=".13"/><path d="M232 300V120a60 60 0 01120 0v180z" fill="#fff" opacity=".55"/><path d="M246 300V124a46 46 0 0192 0v176z" fill="${p[1]}" opacity=".7"/><rect y="262" width="400" height="38" fill="${p[2]}" opacity=".10"/><circle cx="292" cy="150" r="22" fill="${p[2]}" opacity=".22"/>`
  :k===1?`<rect x="48" y="130" width="46" height="132" rx="23" fill="#fff" opacity=".6"/><rect x="108" y="84" width="46" height="178" rx="23" fill="${p[2]}" opacity=".25"/><rect x="168" y="150" width="46" height="112" rx="23" fill="#fff" opacity=".5"/><path d="M300 262c-8-60 6-110 40-150 6 56-8 108-40 150zm0 0c-30-36-52-70-52-122 36 22 56 66 52 122z" fill="${p[2]}" opacity=".30"/><rect y="262" width="400" height="38" fill="${p[2]}" opacity=".10"/>`
  :`<circle cx="130" cy="150" r="96" fill="none" stroke="${p[2]}" stroke-width="2" opacity=".28"/><circle cx="130" cy="150" r="66" fill="#fff" opacity=".5"/><circle cx="270" cy="110" r="46" fill="${p[2]}" opacity=".20"/><circle cx="300" cy="215" r="26" fill="#fff" opacity=".6"/><path d="M0 250 C 120 210 240 290 400 230 V300 H0z" fill="${p[2]}" opacity=".12"/>`;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(s.name)} — illustrative image"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>${art}<text x="20" y="288" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="34" fill="${p[2]}" opacity=".55">${esc(ini)}</text></svg>`;
}
const initials=n=>n.split(' ').map(x=>x[0]).slice(0,2).join('');

/* ---------- availability & pricing ---------- */
const ALL_TIMES=[];for(let h=10;h<20;h++){ALL_TIMES.push(String(h).padStart(2,'0')+':00');ALL_TIMES.push(String(h).padStart(2,'0')+':30')}
function slotsFor(s,date,pro){
  const now=new Date(),isToday=date===iso(now),mins=now.getHours()*60+now.getMinutes()+45;
  return ALL_TIMES.map(t=>{const [h,m]=t.split(':').map(Number);const past=isToday&&h*60+m<mins;const busy=hash(s.id+date+t+(pro||''))%100<30;return{t,ok:!past&&!busy}});
}
function nextSlots(s,n=3){const out=[];for(let d=0;d<4&&out.length<n;d++){const date=iso(addDays(d));for(const x of slotsFor(s,date)){if(x.ok){out.push({date,t:x.t});if(out.length>=n)break}}}return out}
function price(s,ids){
  const list=ids.map(i=>svcOf(s,i)).filter(Boolean);const sub=list.reduce((a,x)=>a+x.price,0),dur=list.reduce((a,x)=>a+x.dur,0);
  let disc=0,note='';const o=s.offer;
  if(o&&list.length){const hit=list.filter(x=>o.on.includes('*')||o.on.includes(x.name));
    if(hit.length){if(o.type==='pct'){disc=Math.round(hit.reduce((a,x)=>a+x.price,0)*o.v/100)}else if(o.type==='flat'){disc=Math.min(o.v,sub)}else note=o.label}}
  return{list,sub,dur,disc,total:sub-disc,note};
}
const durL=m=>m>=60?(Math.floor(m/60)+' hr'+(m%60?' '+m%60+' min':'')):m+' min';
const nextTxt=s=>{const n=nextSlots(s,1)[0];return n?`${dlabel(n.date)} · ${tlabel(n.t)}`:'No slots soon'};

/* ---------- view helpers ---------- */
const rating=(r,n)=>`<span class="rating">${ic('star')}${r.toFixed(1)}${n!=null?`<span class="muted" style="font-weight:500"> (${n})</span>`:''}</span>`;
const favBtn=s=>`<button class="icon-btn fav ${S.fav.includes(s.id)?'on':''}" data-act="fav" data-id="${s.id}" aria-pressed="${S.fav.includes(s.id)}" aria-label="${S.fav.includes(s.id)?'Remove':'Save'} ${esc(s.name)}">${ic('heart')}</button>`;
function salonCard(s,opts={}){
  const sl=nextSlots(s,3);
  return `<article class="scard"><div class="cover">${cover(s)}${s.offer?`<span class="tag badge b-brand" style="background:#fff">${ic('tag','sm')}${esc(s.offer.label)}</span>`:''}${favBtn(s)}</div>
  <div class="body"><div class="row between"><h3><a class="stretched" href="#/salon/${s.id}">${esc(s.name)}</a></h3>${rating(s.rating)}</div>
  <div class="meta"><span>${esc(s.area)}</span><span aria-hidden="true">·</span><span>${s.km} km</span>${s.verified?`<span aria-hidden="true">·</span><span style="color:var(--green)">Verified</span>`:''}</div>
  <div class="small muted">${esc(s.cats.join(' · '))} · from <span class="price" style="color:var(--ink)">${INR(s.from)}</span></div>
  <div class="slots" role="group" aria-label="Next available times">${sl.map(x=>`<button class="slot" data-act="quick" data-id="${s.id}" data-date="${x.date}" data-time="${x.t}" aria-label="Book ${dlabel(x.date)} at ${tlabel(x.t)}">${x.date===iso(new Date())?'':dlabel(x.date).split(' ')[0]+' '}${tlabel(x.t).replace(' ','')}</button>`).join('')}</div></div></article>`;
}
function rowCard(s){
  const sl=nextSlots(s,3);
  return `<article class="rcard" data-sid="${s.id}"><div class="cover">${cover(s)}</div>
  <div style="display:flex;flex-direction:column;gap:5px;min-width:0"><div class="row between" style="align-items:flex-start"><h3><a class="stretched" href="#/salon/${s.id}">${esc(s.name)}</a></h3>${favBtn(s).replace('class="icon-btn fav','class="icon-btn fav" style="position:relative;z-index:2;width:36px;height:36px;margin:-4px -4px 0 0')}</div>
  <div class="row small muted wrapflex" style="gap:6px">${rating(s.rating,s.reviews)}<span aria-hidden="true">·</span><span>${esc(s.area)} · ${s.km} km</span></div>
  <div class="small muted">${esc(s.cats.join(' · '))} · from <b style="color:var(--ink)">${INR(s.from)}</b></div>
  ${s.offer?`<div><span class="badge b-brand">${ic('tag','sm')}${esc(s.offer.label)}</span></div>`:''}
  <div class="slots" style="position:relative;z-index:2">${sl.map(x=>`<button class="slot" data-act="quick" data-id="${s.id}" data-date="${x.date}" data-time="${x.t}">${x.date===iso(new Date())?'':dlabel(x.date).split(' ')[0]+' '}${tlabel(x.t).replace(' ','')}</button>`).join('')}</div></div></article>`;
}
const skeleton=(n=4)=>`<div class="wrap" style="padding-top:28px"><div class="skeleton" style="height:44px;width:50%;margin-bottom:22px"></div><div class="grid g2">${Array(n).fill('<div class="skeleton" style="height:300px"></div>').join('')}</div></div>`;

/* ---------- toast & sheet ---------- */
function toast(msg,icon='check'){const w=$('#toasts'),t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.innerHTML=ic(icon,'sm')+esc(msg);w.appendChild(t);setTimeout(()=>t.remove(),3200)}
let lastFocus=null;
function sheet(html,label){lastFocus=document.activeElement;const m=$('#modal');m.innerHTML=`<div class="scrim" data-act="closeScrim"><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(label||'Dialog')}" tabindex="-1"><div class="grab"></div>${html}</div></div>`;document.body.style.overflow='hidden';const d=$('.sheet',m);d.focus();}
function closeSheet(){$('#modal').innerHTML='';document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}

/* ---------- pages ---------- */
const FAQS=[["Do I pay online?","No. You book online for free and pay at the salon after your service. No card is needed to reserve."],["Can I cancel or reschedule?","Yes. Cancel or reschedule free up to 4 hours before your appointment from My appointments. Later changes may affect future booking priority."],["How do I know the time slot is real?","Slots come straight from each salon’s live calendar. If a time is shown, it is open — and it is held for you once you confirm."],["How do offers work?","Offers are funded by the salon and applied automatically when you pick an eligible service. You will see the saving on the review step before you confirm."],["Can I choose a specific professional?","Yes. Pick a named professional on the second step, or choose “Any professional” for the earliest available time."],["What if the salon cancels?","You get notified right away and can rebook another time or a similar salon with one tap. You are never charged."]];
const HOME_REVIEWS=[
 ['Priya M.','Absolutely loved my colour — they listened first and the result was exactly what I showed. Booked my next one before leaving.',5,'luma','Hair colour'],
 ['Sneha R.','Clean, calm and on time. The slot I booked online was honoured to the minute, which almost never happens.',5,'glow','Facial'],
 ['Tanvi B.','Great service and fair pricing. The room was busy on Saturday, but the staff handled it really well.',4,'serene','Massage'],
 ['Ishita V.','Friendly team and clear pricing. I was nervous about my first nail art and they made it so easy.',5,'elan','Gel manicure'],
 ['Rohan K.','Booked a haircut during lunch from my phone. Walked in, walked out in 40 minutes. Exactly what I needed.',5,'kaya','Men’s haircut'],
 ['Meghna S.','The bridal trial was thorough and stress free. They noted everything for the big day.',5,'blush','Bridal trial'],
 ['Aditya N.','Loved that I could pick the therapist and see the price upfront. No surprises at the counter.',5,'aura','Deep tissue massage'],
 ['Kavya D.','Reminder came 3 hours before, and rescheduling took two taps when my meeting ran over.',4,'verve','Pedicure']];
function pgHome(){
  const feat=SALONS.slice(0,4), top=[...SALONS].sort((a,b)=>b.rating-a.rating).slice(0,4), today=SALONS.filter(s=>nextSlots(s,1)[0]&&nextSlots(s,1)[0].date===iso(new Date()));
  return `<section class="hero"><div class="wrap hero-grid"><div>
    <span class="eyebrow">${ic('sparkle','sm')}1,240 salons · Bengaluru</span>
    <h1>Beauty, booked <em>in a minute.</em></h1>
    <p class="lead">See real availability, pick your professional and your time. No calls, no waiting for a reply — most salons confirm within two hours.</p>
    <form class="searchbox" data-form="home-search" role="search">
      <div class="sfield">${ic('search')}<div style="flex:1"><label for="hq">Service or salon</label><input id="hq" name="q" placeholder="Haircut, facial…" autocomplete="off"></div></div>
      <div class="sfield">${ic('pin')}<div style="flex:1"><label for="hl">Area</label><select id="hl" name="area"><option>Indiranagar</option><option>Koramangala</option><option>Jayanagar</option><option>HSR Layout</option><option>Whitefield</option></select></div></div>
      <div class="sfield">${ic('cal')}<div style="flex:1"><label for="hw">When</label><select id="hw" name="when"><option value="">Any time</option><option value="today">Today</option><option value="tomorrow">Tomorrow</option><option value="weekend">This weekend</option></select></div></div>
      <button class="btn btn-primary" type="submit">Search</button></form>
    <div class="quick" role="group" aria-label="Quick searches"><a class="chip" href="#/search?when=today">${ic('clock','sm')}Free today</a><a class="chip" href="#/search?max=1000">Under ₹1,000</a><a class="chip" href="#/search?rating=4.8">Top rated</a><a class="chip" href="#/search?offers=1">${ic('tag','sm')}Offers</a><a class="chip" href="#/search?cat=Nails">Nails</a></div>
  </div>
  <div class="collage" aria-hidden="true"><div class="c1 cover">${cover(SALONS[0],0)}</div><div class="c2 cover">${cover(SALONS[2],1)}</div><div class="c3 cover">${cover(SALONS[1],2)}</div>
    <div class="float f1"><span class="dot"></span><div><b>Next free 11:30</b><div class="xs muted">Luma Hair Studio</div></div></div>
    <div class="float f2">${rating(4.9)}<div><b>341 reviews</b><div class="xs muted">Élan Beauty Lounge</div></div></div></div></div>
  <div class="wrap"><div class="trust"><div>${ic('clock')}Live availability</div><div>${ic('shield')}Free cancellation up to 4 hrs</div><div>${ic('check')}Verified salons</div><div>${ic('star')}Reviews from real bookings</div></div></div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><div><h2>What are you booking?</h2></div></div><div class="cats">${CATS.map(c=>`<a class="cat" href="#/search?cat=${c.id}"><span class="ico">${ic(c.icon,'lg')}</span>${c.id}<small>${c.n} salons</small></a>`).join('')}</div></div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><div><h2>Free today near you</h2><p>Tap a time to start booking. Based on Indiranagar, Bengaluru.</p></div><a class="btn-text btn" href="#/search?when=today">See all</a></div><div class="hscroll">${(today.length?today:feat).slice(0,4).map(salonCard).join('')}</div></div></section>
  <section class="section"><div class="wrap"><div class="promo"><span class="deco" aria-hidden="true"></span><div><div class="stamp" aria-hidden="true"><div>UP TO<br>20%<small>off</small></div></div><br><span class="eyebrow" style="background:rgba(255,255,255,.14);color:#fff">${ic('tag','sm')}This week</span><h2 style="margin:14px 0 10px">Offers that apply <em style="font-style:normal;color:#ffd9e2">themselves.</em></h2><p>Salon-funded discounts are applied automatically at the review step. No codes to remember.</p><a class="btn btn-primary" href="#/offers" style="margin-top:20px">Explore all offers ${ic('chev','sm')}</a></div>
    <div class="offers-row">${SALONS.filter(s=>s.offer).slice(0,3).map(s=>`<a class="offer" href="#/salon/${s.id}"><span class="th">${cover(s,0)}</span><span class="tx"><b>${s.offer.type==='pct'?s.offer.v+'% off':s.offer.type==='flat'?INR(s.offer.v)+' off':'Free add-on'}</b><strong style="font-weight:600">${esc(s.name)}</strong><span class="small">${esc(s.offer.label)}</span></span></a>`).join('')}</div></div></div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><div><h2>Top rated this month</h2><p>Highest reviewed by customers who actually visited.</p></div></div><div class="hscroll">${top.map(salonCard).join('')}</div></div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><h2>How booking works</h2></div><div class="steps"><div class="step"><div class="n">1</div><h3>Find and compare</h3><p class="small muted">Search by service or area. Prices, ratings, distance and the next free time are on every card.</p></div><div class="step"><div class="n">2</div><h3>Choose your slot</h3><p class="small muted">Pick services, a professional (or “anyone”), and a time that’s genuinely open.</p></div><div class="step"><div class="n">3</div><h3>Show up</h3><p class="small muted">The salon confirms by notification. Reschedule or cancel free up to 4 hours before.</p></div></div></div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><div><h2>Explore by neighbourhood</h2><p>Find salons a short ride from home or work.</p></div></div>
    <div class="hoods">${["Indiranagar","Koramangala","Jayanagar","HSR Layout","Whitefield","Malleshwaram"].map((n,i)=>{const k=SALONS.filter(s=>s.area===n).length;const s=SALONS.find(x=>x.area===n)||SALONS[i];return `<a class="hood" href="#/search?q=${encodeURIComponent(n)}"><span class="th">${cover(s,i%3)}</span><span class="tx"><b>${n}</b><small>${k?k+(k>1?' salons':' salon')+' on OKOMALL':'Coming soon'}</small></span>${ic('chev','sm')}</a>`}).join('')}</div></div></section>
  <section class="section"><div class="wrap"><div class="stats"><div><b>1,240+</b><span>verified salons</span></div><div><b>48,000+</b><span>appointments booked</span></div><div><b>4.8★</b><span>average rating</span></div><div><b>&lt; 2 hrs</b><span>typical confirmation</span></div></div></div></section>
  <section class="section" id="app-promo"><div class="wrap"><div class="appband">
    <div class="ap-copy"><span class="eyebrow">${ic('sparkle','sm')}OKOMALL app</span><h2>Your salon, always in your pocket.</h2><p>Book in two taps, get reminders before every visit, reschedule on the go and see your offers the moment they drop.</p>
      <ul class="ap-list"><li>${ic('check','sm')}Live slots and instant booking</li><li>${ic('check','sm')}Reminders and easy reschedule</li><li>${ic('check','sm')}App-only offers every week</li></ul>
      <div class="stores"><a class="store" href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.1-2.800.9-3.500.9-.7 0-1.800-.8-3-.8-1.500 0-3 .9-3.800 2.300-1.600 2.800-.4 7 1.200 9.300.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.200 0 2-1.100 2.800-2.200.9-1.300 1.200-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.900zM14.200 5.600c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.600 1.400-.6.700-1.100 1.800-.9 2.800 1 .1 2-.5 2.600-1.300z"/></svg><span><small>Download on the</small><b>App Store</b></span></a>
      <a class="store" href="https://play.google.com" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M4 3.200v17.600c0 .4.400.6.800.4l15-8.800c.3-.2.3-.6 0-.8L4.800 2.800c-.4-.2-.8 0-.8.400z"/></svg><span><small>Get it on</small><b>Google Play</b></span></a></div>
      <form class="smsform" data-form="app-sms"><label class="xs" for="appph">Or get the download link by SMS</label><div class="smsrow"><input id="appph" name="ph" inputmode="tel" autocomplete="tel" placeholder="+91 98765 43210" aria-label="Mobile number"><button class="btn btn-primary btn-sm" type="submit">Send link</button></div></form></div>
    <div class="ap-phones" aria-hidden="true">
      <div class="phone p2"><div class="scr"><div class="ph-hd">Offers</div><div class="ph-card">${cover(SALONS[2],0)}<b>Free nail art</b></div><div class="ph-card">${cover(SALONS[1],0)}<b>₹300 off facial</b></div></div></div>
      <div class="phone p1"><div class="scr"><div class="ph-hd"><span>OKOMALL<i></i></span></div><div class="ph-hero">${cover(SALONS[0],0)}</div><div class="ph-t">Luma Hair Studio</div><div class="ph-s">★ 4.8 · Indiranagar</div><div class="ph-slots"><i>3:00pm</i><i>3:30pm</i><i>4:00pm</i></div><div class="ph-btn">Book now</div></div></div>
    </div></div></div></section>
  <section class="section" aria-labelledby="rvh"><div class="wrap"><div class="sec-head"><div><h2 id="rvh">Loved by customers</h2><p>Real feedback from verified bookings.</p></div><div class="rv-nav"><button class="icon-btn" data-act="rvnav" data-d="-1" aria-label="Previous reviews">${ic('back')}</button><button class="icon-btn" data-act="rvnav" data-d="1" aria-label="Next reviews">${ic('chev')}</button></div></div>
    <div class="rv-sum"><div><b>4.8</b>${rating(4.8)}<span class="small muted">from 2,100+ verified bookings</span></div></div>
    <div class="rv-scroll" id="rvs" tabindex="0" role="region" aria-label="Customer reviews, scroll sideways">${HOME_REVIEWS.map(r=>{const s=salon(r[3]);return `<figure class="rvcard"><div class="rv-top"><div class="stars" aria-label="${r[2]} out of 5">${'★'.repeat(r[2])}<span>${'★'.repeat(5-r[2])}</span></div><span class="vbadge">${ic('check','sm')}Verified</span></div><blockquote>“${esc(r[1])}”</blockquote><figcaption><div class="avatar" style="width:40px;height:40px">${initials(r[0])}</div><div><b>${r[0]}</b><div class="xs muted">${esc(r[4])} · ${esc(s.name)}</div></div></figcaption></figure>`}).join('')}</div></div></section>
  <section class="section" id="faq" aria-labelledby="faqh"><div class="wrap faq-wrap"><div class="faq-intro"><span class="eyebrow">${ic('help','sm')}FAQ</span><h2 id="faqh">Questions, answered</h2><p class="muted">Everything you need to know before your first booking.</p>
    <div class="faq-help"><div class="fh-ic">${ic('help')}</div><div><b>Still have a question?</b><p class="small muted">Our support team replies within a few hours, 9am–9pm.</p></div><a class="btn btn-ghost btn-sm" href="#/help">Help centre ${ic('chev','sm')}</a></div></div>
    <div class="faq">${FAQS.map((f,i)=>`<details${i===0?' open':''}><summary><span class="q-n">${String(i+1).padStart(2,'0')}</span><span class="q-t">${f[0]}</span><span class="q-i" aria-hidden="true"></span></summary><div class="q-a"><p>${f[1]}</p></div></details>`).join('')}</div></div></section>
  <section class="section"><div class="wrap"><div class="owner"><div><h2>Own a salon? Fill your empty chairs.</h2><p>List your salon on OKOMALL, manage bookings from one calendar and reach thousands of new customers in Bengaluru.</p></div><a class="btn btn-primary" href="mailto:partners@okomall.app">List your salon ${ic('chev','sm')}</a></div></div></section>`;
}

function parseQS(){const q=location.hash.split('?')[1]||'';return Object.fromEntries(new URLSearchParams(q))}
function filtered(q){
  let r=SALONS.filter(s=>{
    if(q.q){const t=q.q.toLowerCase();if(!(s.name.toLowerCase().includes(t)||s.area.toLowerCase().includes(t)||s.services.some(x=>x.name.toLowerCase().includes(t))||s.cats.some(c=>c.toLowerCase().includes(t))))return false}
    if(q.cat&&!s.cats.includes(q.cat))return false;
    if(q.max&&s.from>+q.max)return false;
    if(q.rating&&s.rating<+q.rating)return false;
    if(q.offers&&!s.offer)return false;
    if(q.when){const dates=q.when==='today'?[iso(addDays(0))]:q.when==='tomorrow'?[iso(addDays(1))]:[0,1,2,3,4,5,6].map(i=>addDays(i)).filter(d=>[0,6].includes(d.getDay())).map(iso);
      if(!dates.some(d=>slotsFor(s,d).some(x=>x.ok)))return false}
    return true});
  const so=q.sort||'rec';
  r.sort((a,b)=>so==='near'?a.km-b.km:so==='price'?a.from-b.from:so==='rating'?b.rating-a.rating:(b.rating*Math.log(b.reviews+2)-a.rating*Math.log(a.reviews+2)));
  return r;
}
function filterUI(q){
  const cur=k=>q[k]||'';
  return `<h3>Category</h3><div class="row wrapflex" style="gap:8px">${CATS.map(c=>`<button type="button" class="chip" data-act="setf" data-k="cat" data-v="${c.id}" aria-pressed="${cur('cat')===c.id}">${c.id}</button>`).join('')}</div>
  <h3>When</h3><div class="row wrapflex" style="gap:8px">${[['today','Today'],['tomorrow','Tomorrow'],['weekend','Weekend']].map(([v,l])=>`<button type="button" class="chip" data-act="setf" data-k="when" data-v="${v}" aria-pressed="${cur('when')===v}">${l}</button>`).join('')}</div>
  <h3>Max starting price · <span id="mx">${cur('max')?INR(cur('max')):'Any'}</span></h3><input class="range" type="range" min="500" max="6000" step="500" value="${cur('max')||6000}" data-act="range" aria-label="Maximum price">
  <h3>Rating</h3><div class="row wrapflex" style="gap:8px">${[['4','4.0+'],['4.5','4.5+'],['4.8','4.8+']].map(([v,l])=>`<button type="button" class="chip" data-act="setf" data-k="rating" data-v="${v}" aria-pressed="${cur('rating')===v}">${ic('star','sm')}${l}</button>`).join('')}</div>
  <h3>Offers</h3><button type="button" class="chip" data-act="setf" data-k="offers" data-v="1" aria-pressed="${cur('offers')==='1'}">${ic('tag','sm')}Has an offer</button>
  <div style="margin-top:22px"><button class="btn btn-ghost btn-block" data-act="clearf">Clear all filters</button></div>`;
}
function mapHTML(list){
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true"><rect width="100" height="100" fill="#efe9e1"/><path d="M0 70 C 25 62 40 80 60 66 S 90 60 100 68 V100 H0z" fill="#e3ddd2"/><circle cx="18" cy="26" r="9" fill="#dfe6d3"/><circle cx="82" cy="82" r="11" fill="#dfe6d3"/><g fill="none" stroke="#fff" stroke-linecap="round"><path d="M-5 30 L105 52" stroke-width="2.4"/><path d="M20 -5 L46 105" stroke-width="2.4"/><path d="M72 -5 L60 105" stroke-width="1.8"/><path d="M-5 78 L105 20" stroke-width="1.6"/><path d="M-5 50 L105 44" stroke-width="1.2"/></g></svg>`+
  list.map(s=>`<a href="#/salon/${s.id}" data-pin="${s.id}" class="badge pin" style="position:absolute;left:${s.pos[0]}%;top:${s.pos[1]}%;transform:translate(-50%,-100%);background:var(--surface);color:var(--ink);box-shadow:var(--sh-2);padding:5px 11px;font-size:13px;border:1px solid var(--line)" aria-label="${esc(s.name)}, from ${INR(s.from)}">${INR(s.from)}</a>`).join('')+
  `<div style="position:absolute;left:12px;bottom:12px" class="badge b-gray">Illustrative map</div>`;
}
function pgSearch(){
  const q=parseQS(), list=filtered(q), n=list.length;
  const title=q.cat?q.cat+' salons':q.q?`Results for “${esc(q.q)}”`:'Find a salon';
  const chips=Object.entries(q).filter(([k])=>k!=='sort').map(([k,v])=>`<button class="chip on" data-act="rmf" data-k="${k}" aria-label="Remove filter ${k} ${v}">${esc(({max:'Under ₹'+v,rating:v+'★+',offers:'Offers',when:v,cat:v,q:'“'+v+'”'})[k]||v)}${ic('x','sm')}</button>`).join('');
  return `<div class="wrap"><div class="page-head"><h1>${title}</h1><p class="muted">${n} ${n===1?'salon':'salons'} near Indiranagar, Bengaluru</p>
  <form class="sbar" data-form="search" role="search"><input name="q" value="${esc(q.q||'')}" placeholder="Search services or salons" aria-label="Search services or salons">${ic('search')}<button class="btn btn-primary btn-sm" type="submit">Search</button></form></div>
  <div class="toolbar" role="group" aria-label="Filters"><button class="chip mobile-btn" data-act="openFilters">${ic('filter','sm')}Filters</button>${CATS.map(c=>`<button class="chip mob" data-act="setf" data-k="cat" data-v="${c.id}" aria-pressed="${q.cat===c.id}">${c.id}</button>`).join('')}<button class="chip mob" data-act="setf" data-k="when" data-v="today" aria-pressed="${q.when==='today'}">Today</button><button class="chip mob" data-act="setf" data-k="offers" data-v="1" aria-pressed="${q.offers==='1'}">Offers</button>
   <select class="chip" data-act="sort" aria-label="Sort by" style="padding-right:10px"><option value="rec" ${q.sort==='rec'||!q.sort?'selected':''}>Recommended</option><option value="near" ${q.sort==='near'?'selected':''}>Nearest</option><option value="price" ${q.sort==='price'?'selected':''}>Price: low to high</option><option value="rating" ${q.sort==='rating'?'selected':''}>Top rated</option></select></div>
  ${chips?`<div class="row wrapflex" style="gap:8px;margin:4px 0 14px">${chips}</div>`:''}
  <div class="layout"><aside class="rail" aria-label="Filters"><div class="filter-card">${filterUI(q)}</div></aside>
  <div class="results">${n?list.map(rowCard).join(''):`<div class="empty"><div class="ico">${ic('search','lg')}</div><h2 class="serif" style="font-size:30px">No salons match yet</h2><p class="muted" style="margin:6px auto 18px;max-width:380px">Try removing a filter or widening the date. Most salons add new slots every morning.</p><button class="btn btn-primary" data-act="clearf">Clear filters</button></div>`}</div>
  <aside class="mapbox" aria-label="Map of results">${mapHTML(list)}</aside></div></div>`;
}

function related(s){return SALONS.filter(x=>x.id!==s.id).map(x=>({x,sc:x.cats.filter(c=>s.cats.includes(c)).length*10+(x.area===s.area?6:0)+x.rating-Math.abs(x.km-s.km)/10})).sort((p,q)=>q.sc-p.sc).slice(0,4).map(o=>o.x)}
function pgSalon(id){
  const s=salon(id);if(!s)return nf();
  const sel=(draft&&draft.salonId===id)?draft.svc:[];const pr=price(s,sel);
  const cats=[...new Set(s.services.map(x=>x.cat))];
  const dist=[5,4,3,2,1].map(k=>[k,k===5?72:k===4?20:k===3?5:2]);
  const sum=`<div class="bookcard" id="sumcard">${bookSide(s,sel,pr)}</div>`;
  return `<div class="wrap"><nav class="small muted" aria-label="Breadcrumb" style="padding-top:16px"><a href="#/search" style="text-decoration:underline">Salons</a> / ${esc(s.name)}</nav>
  <div class="gallery"><div class="cover main">${cover(s,0)}</div><div class="cover side">${cover(s,1)}</div><div class="cover side">${cover(s,2)}</div></div>
  <div class="sal-head"><div class="row between" style="align-items:flex-start"><div><h1>${esc(s.name)}</h1><div class="row wrapflex small" style="margin-top:8px;gap:8px">${rating(s.rating,s.reviews)}<span class="muted">·</span><span class="muted">${ic('pin','sm')} ${esc(s.area)}, Bengaluru · ${s.km} km</span><span class="muted">·</span><span style="color:var(--green);font-weight:600">${ic('clock','sm')} Open today ${s.open}</span></div></div>
   <div class="row" style="gap:8px">${favBtn(s).replace('fav ','').replace('class="icon-btn','class="icon-btn')}<button class="icon-btn" data-act="share" data-id="${s.id}" aria-label="Share">${ic('share')}</button></div></div>
   ${s.offer?`<div class="note brand">${ic('tag')}<div><b>${esc(s.offer.label)}</b><div class="small">Applied automatically when you book an eligible service.</div></div></div>`:''}</div>
  <div class="sal-layout"><div>
   <nav class="subnav" aria-label="Sections">${['services','team','reviews','about'].map((x,i)=>`<a href="#/salon/${s.id}" data-act="jump" data-to="${x}" ${i?'':'aria-current="true"'}>${x[0].toUpperCase()+x.slice(1)}</a>`).join('')}</nav>
   <section class="block" id="services"><h2>Services</h2>${cats.map(c=>`<div class="svc-cat">${c}</div>${s.services.filter(x=>x.cat===c).map(x=>{const on=sel.includes(x.id);return `<div class="svc ${on?'on':''}"><div><h3>${esc(x.name)}</h3><p class="small muted">${esc(x.desc)}</p><p class="small" style="margin-top:4px">${durL(x.dur)} · <b>${INR(x.price)}</b>${s.offer&&(s.offer.on.includes('*')||s.offer.on.includes(x.name))?` <span class="badge b-brand" style="margin-left:6px">Offer</span>`:''}</p></div><button class="btn ${on?'btn-dark':'btn-ghost'} btn-sm add" data-act="svc" data-id="${x.id}" data-s="${s.id}" aria-pressed="${on}" aria-label="${on?'Remove':'Add'} ${esc(x.name)}">${on?ic('check','sm')+'Added':ic('plus','sm')+'Add'}</button></div>`}).join('')}`).join('')}</section>
   <section class="block" id="team"><h2>Team</h2><div class="grid g2">${s.team.map(t=>`<div class="pro"><div class="avatar md">${initials(t.name)}</div><div><b>${t.name}</b><div class="small muted">${t.role} · ${t.years} yrs</div><div class="small" style="color:var(--green)">${nextTxt(s)}</div></div></div>`).join('')}</div></section>
   <section class="block" id="reviews"><h2>Reviews</h2><div class="row" style="gap:28px;align-items:flex-start;flex-wrap:wrap"><div><div class="serif" style="font-size:64px;line-height:1">${s.rating.toFixed(1)}</div>${rating(s.rating)}<div class="small muted">${s.reviews} verified bookings</div></div><div class="bars" style="flex:1;min-width:220px">${dist.map(([k,v])=>`<div class="bar"><span>${k}</span><i><b style="width:${v}%"></b></i><span>${v}%</span></div>`).join('')}</div></div>
    ${s.revs.map(r=>`<div class="rev"><div class="row between"><div class="row"><div class="avatar" style="width:36px;height:36px">${initials(r[0])}</div><b>${r[0]}</b></div><span class="small muted">${r[3]}</span></div><div style="margin:8px 0 4px">${'★'.repeat(r[2])}<span style="color:var(--line-2)">${'★'.repeat(5-r[2])}</span></div><p class="muted">${esc(r[1])}</p></div>`).join('')}</section>
   <section class="block" id="about"><h2>About</h2><p class="muted" style="max-width:640px">${esc(s.about)}</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:22px"><div><h3 style="margin-bottom:10px">Opening hours</h3><div class="hours"><div><span>Mon – Fri</span><span>${s.open}</span></div><div><span>Saturday</span><span>${s.open}</span></div><div><span>Sunday</span><span>Closed</span></div></div></div>
    <div><h3 style="margin-bottom:10px">Location</h3><div class="mapbox" style="display:block;position:relative;height:150px;top:0">${mapHTML([s])}</div><p class="small muted" style="margin-top:8px">${esc(s.addr)}</p></div></div>
    <div class="note green" style="margin-top:22px">${ic('shield')}<div><b>Cancellation policy</b><div class="small">Free cancellation up to 4 hours before. Later cancellations may affect future booking priority. No payment is taken online — you pay at the salon.</div></div></div></section></div>
   <aside class="sal-side" aria-label="Your booking">${sum}</aside></div></div>
   <section class="section similar" aria-labelledby="simh"><div class="wrap"><div class="sec-head"><div><h2 id="simh">You might also like</h2><p>Similar salons near ${esc(s.area)} and across Bengaluru.</p></div><a class="btn-text btn" href="#/search${s.cats[0]?'?cat='+encodeURIComponent(s.cats[0]):''}">See all ${esc(s.cats[0]||'salons')}</a></div><div class="hscroll">${related(s).map(salonCard).join('')}</div></div></section>
   <div class="stickybar" id="stickybar">${stickyBar(s,sel,pr)}</div>`;
}
function bookSide(s,sel,pr){
  if(!sel.length)return `<h2 style="font-size:20px">Book an appointment</h2><p class="muted small" style="margin:6px 0 14px">Choose one or more services to see your price and times.</p><div class="small" style="color:var(--green)"><span class="dot" style="display:inline-block;margin-right:6px"></span>Next free: ${nextTxt(s)}</div><button class="btn btn-primary btn-block disabled" style="margin-top:16px" disabled>Select a service</button>`;
  return `<h2 style="font-size:20px;margin-bottom:12px">Your selection</h2>${pr.list.map(x=>`<div class="line" style="margin-bottom:8px"><span>${esc(x.name)}<div class="xs muted">${durL(x.dur)}</div></span><span>${INR(x.price)}</span></div>`).join('')}
  ${pr.disc?`<div class="line"><span>Offer applied</span><span class="save">−${INR(pr.disc)}</span></div>`:''}${pr.note?`<div class="note brand small" style="margin:8px 0">${ic('tag','sm')}${esc(pr.note)} — added at the salon</div>`:''}
  <div class="line total" style="margin-top:10px"><span>Total · ${durL(pr.dur)}</span><span>${INR(pr.total)}</span></div><button class="btn btn-primary btn-block" style="margin-top:16px" data-act="start" data-id="${s.id}">Choose time ${ic('chev','sm')}</button><p class="xs muted" style="text-align:center;margin-top:10px">No payment now · Free cancellation up to 4 hrs</p>`;
}
function stickyBar(s,sel,pr){return sel.length?`<div style="flex:1"><div class="small muted">${sel.length} service${sel.length>1?'s':''} · ${durL(pr.dur)}</div><b style="font-size:18px">${INR(pr.total)}</b>${pr.disc?` <s class="small muted">${INR(pr.sub)}</s>`:''}</div><button class="btn btn-primary" data-act="start" data-id="${s.id}">Choose time</button>`:`<div style="flex:1"><div class="small muted">From</div><b style="font-size:18px">${INR(s.from)}</b></div><a class="btn btn-primary" href="#/salon/${s.id}" data-act="jump" data-to="services">Select services</a>`}

/* ---------- booking flow ---------- */
const STEPS=['Services','Professional','Date & time','Review'];
function pgBook(id){
  const s=salon(id);if(!s)return nf();
  if(!draft||draft.salonId!==id){draft={salonId:id,svc:[],pro:'any',date:iso(addDays(0)),time:'',notes:'',step:0,name:S.user.name,phone:S.user.phone}}
  if(!draft.svc.length){location.hash='#/salon/'+id;return ''}
  const pr=price(s,draft.svc),st=draft.step;
  const body=[bkServices,bkPro,bkTime,bkReview][st](s,pr);
  const side=`<aside class="bk-side summary"><div class="head"><div class="cover">${cover(s)}</div><div><b>${esc(s.name)}</b><div class="small muted">${esc(s.area)}</div></div></div><div class="body">
   ${pr.list.map(x=>`<div class="line"><span>${esc(x.name)}</span><span>${INR(x.price)}</span></div>`).join('')}
   ${draft.time?`<div class="line muted"><span>${ic('cal','sm')} ${dlabel(draft.date)}, ${tlabel(draft.time)}</span></div>`:''}
   ${st>=1?`<div class="line muted"><span>${ic('user','sm')} ${draft.pro==='any'?'Any professional':esc(draft.pro)}</span></div>`:''}
   ${pr.disc?`<div class="line"><span>Offer</span><span class="save">−${INR(pr.disc)}</span></div>`:''}<div class="line total"><span>Total</span><span>${INR(pr.total)}</span></div><p class="xs muted">Pay at the salon · Free cancellation up to 4 hrs</p></div></aside>`;
  const next=st===3?'Confirm booking':'Continue';
  const can=st===2?!!draft.time:st===3?(draft.name.trim().length>1&&/^[+\d][\d\s-]{8,}$/.test(draft.phone.trim())):true;
  return `<div class="wrap bk"><div><div class="bk-top"><button class="icon-btn" data-act="bkback" aria-label="Back">${ic('back')}</button><div><div class="small muted">Step ${st+1} of 4 · ${STEPS[st]}</div></div></div><ol class="stepper" aria-label="Progress">${STEPS.map((_,i)=>`<li class="${i<st?'done':i===st?'cur':''}"></li>`).join('')}</ol>${body}
   <div class="bk-bar"><div style="flex:1"><div class="small muted">Total</div><b style="font-size:20px">${INR(pr.total)}</b></div><button class="btn btn-primary ${can?'':'disabled'}" data-act="bknext" ${can?'':'disabled'} style="min-width:190px">${next}</button></div></div>${side}</div>`;
}
function bkServices(s,pr){return `<h1 style="margin:14px 0 6px">Confirm your services</h1><p class="muted" style="margin-bottom:18px">${durL(pr.dur)} in total. You can add more now.</p>${pr.list.map(x=>`<div class="svc on"><div><h3>${esc(x.name)}</h3><p class="small muted">${durL(x.dur)} · ${INR(x.price)}</p></div><button class="btn btn-ghost btn-sm" data-act="bkrm" data-id="${x.id}" aria-label="Remove ${esc(x.name)}">${ic('x','sm')}Remove</button></div>`).join('')}<a class="btn btn-ghost" href="#/salon/${s.id}" style="margin-top:6px">${ic('plus','sm')}Add another service</a>`}
function bkPro(s){const opts=[{n:'any',t:'Any professional',d:'Fastest — we’ll match you with whoever is free.'},...s.team.map(t=>({n:t.name,t:t.name,d:`${t.role} · ${t.years} yrs experience`}))];
  return `<h1 style="margin:14px 0 6px">Who would you like?</h1><p class="muted" style="margin-bottom:18px">Choosing a specific person can limit the times you see.</p><div class="stack" role="radiogroup" aria-label="Professional" style="--s:10px">${opts.map(o=>`<button class="opt" role="radio" aria-checked="${draft.pro===o.n}" data-act="pro" data-v="${esc(o.n)}"><span class="radio"></span><span class="avatar">${o.n==='any'?ic('sparkle','sm'):initials(o.n)}</span><span style="flex:1"><b>${esc(o.t)}</b><div class="small muted">${esc(o.d)}</div></span></button>`).join('')}</div>`}
function bkTime(s){
  const sl=slotsFor(s,draft.date,draft.pro==='any'?'':draft.pro),grp=[['Morning',x=>+x.t.slice(0,2)<12],['Afternoon',x=>+x.t.slice(0,2)>=12&&+x.t.slice(0,2)<17],['Evening',x=>+x.t.slice(0,2)>=17]];
  return `<h1 style="margin:14px 0 6px">Pick a date and time</h1><p class="muted" style="margin-bottom:16px">Greyed times are taken. Times shown for ${draft.pro==='any'?'any professional':esc(draft.pro)}.</p>
  <div class="days" role="group" aria-label="Date">${Array.from({length:14},(_,i)=>{const d=addDays(i),k=iso(d),sun=d.getDay()===0;return `<button class="day" data-act="day" data-v="${k}" aria-pressed="${draft.date===k}" ${sun?'disabled aria-label="Closed"':''}><small>${i===0?'Today':d.toLocaleDateString('en-IN',{weekday:'short'})}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-IN',{month:'short'})}</small></button>`}).join('')}</div>
  ${grp.map(([n,f])=>{const g=sl.filter(f);return g.length?`<h3 style="margin:22px 0 10px;font-size:15px" class="muted">${n}</h3><div class="slotgrid">${g.map(x=>`<button class="slot" data-act="time" data-v="${x.t}" aria-pressed="${draft.time===x.t}" ${x.ok?'':'disabled'}>${tlabel(x.t)}</button>`).join('')}</div>`:''}).join('')}
  ${sl.every(x=>!x.ok)?`<div class="note amber" style="margin-top:18px">${ic('info')}<div>No times left on this day. Try another date.</div></div>`:''}`}
function bkReview(s,pr){
  return `<h1 style="margin:14px 0 6px">Review and confirm</h1><div class="card" style="margin:16px 0"><div class="row between"><div><b>${dfull(draft.date)}</b><div class="muted">${tlabel(draft.time)} · ${durL(pr.dur)} · ${draft.pro==='any'?'Any professional':esc(draft.pro)}</div></div><button class="btn-text btn" data-act="bkjump" data-v="2">Change</button></div></div>
  <div class="card stack" style="--s:16px"><h2 style="font-size:18px">Your details</h2><div class="field"><label for="fn">Full name</label><input class="input" id="fn" value="${esc(draft.name)}" data-act="inp" data-k="name" autocomplete="name"></div><div class="field"><label for="fp">Mobile number</label><input class="input" id="fp" type="tel" inputmode="tel" value="${esc(draft.phone)}" data-act="inp" data-k="phone" autocomplete="tel"><span class="xs muted">We’ll send the confirmation and reminders here.</span></div><div class="field"><label for="fno">Note for the salon <span class="muted" style="font-weight:400">(optional)</span></label><textarea class="textarea" id="fno" data-act="inp" data-k="notes" placeholder="e.g. allergies, reference photo, running late">${esc(draft.notes)}</textarea></div></div>
  <div class="note green" style="margin-top:16px">${ic('shield')}<div><b>Free cancellation up to 4 hours before.</b><div class="small">You pay at the salon. The salon confirms your request — usually within 2 hours.</div></div></div>`;
}
function pgBooked(ref){
  const b=S.bookings.find(x=>x.ref===ref);if(!b)return nf();const s=salon(b.salon),pr=price(s,b.svc);
  return `<div class="wrap" style="max-width:720px"><div class="success"><div class="tick">${ic('check')}</div><h1 class="serif" style="font-size:clamp(34px,6vw,48px);line-height:1.05">Request sent</h1><p class="muted" style="margin-top:8px">${esc(s.name)} will confirm shortly. We’ll notify you on ${esc(S.user.phone)}.</p></div>
  <div class="ticket"><div class="top"><div><div class="xs" style="color:#cfc7c0">Booking reference</div><b style="font-size:20px;letter-spacing:.04em">${b.ref}</b></div><span class="badge b-amber" style="align-self:flex-start">Awaiting confirmation</span></div><div class="rows"><div><span class="muted">When</span><b>${dfull(b.date)}, ${tlabel(b.time)}</b></div><div><span class="muted">Where</span><b style="text-align:right">${esc(s.name)}<div class="small muted" style="font-weight:400">${esc(s.addr)}</div></b></div><div><span class="muted">Services</span><b style="text-align:right">${pr.list.map(x=>esc(x.name)).join('<br>')}</b></div><div><span class="muted">With</span><b>${b.pro==='any'?'Any professional':esc(b.pro)}</b></div><div><span class="muted">Pay at salon</span><b>${INR(b.total)}</b></div></div></div>
  <div class="row wrapflex" style="justify-content:center;gap:10px"><button class="btn btn-dark" data-act="ics" data-ref="${b.ref}">${ic('cal','sm')}Add to calendar</button><a class="btn btn-ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(s.name+' '+s.addr)}">${ic('nav','sm')}Directions</a><a class="btn btn-ghost" href="#/bookings">View my bookings</a></div></div>`;
}

/* ---------- bookings, saved, offers, help, profile ---------- */
let bTab='upcoming';
function pgBookings(){
  const list=S.bookings.filter(b=>bTab==='upcoming'?['confirmed','pending'].includes(b.status):bTab==='past'?b.status==='completed':b.status==='cancelled').sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)*(bTab==='upcoming'?1:-1));
  const cnt=k=>S.bookings.filter(b=>k==='upcoming'?['confirmed','pending'].includes(b.status):k==='past'?b.status==='completed':b.status==='cancelled').length;
  return `<div class="wrap" style="padding-top:26px"><h1 class="serif" style="font-size:clamp(34px,6vw,52px);line-height:1.05;margin-bottom:16px">My appointments</h1>
  <div class="tabs" role="tablist">${['upcoming','past','cancelled'].map(k=>`<button role="tab" aria-selected="${bTab===k}" data-act="btab" data-v="${k}">${k[0].toUpperCase()+k.slice(1)} (${cnt(k)})</button>`).join('')}</div>
  <div class="bgrid">${list.length?list.map(bCard).join(''):`<div class="empty" style="grid-column:1/-1"><div class="ico">${ic('cal','lg')}</div><h2 class="serif" style="font-size:28px">Nothing here yet</h2><p class="muted" style="margin:6px 0 16px">${bTab==='upcoming'?'Book your next appointment in under a minute.':'Your '+bTab+' appointments will show up here.'}</p><a class="btn btn-primary" href="#/search">Find a salon</a></div>`}</div></div>`;
}
function bCard(b){const s=salon(b.salon),d=parseISO(b.date),pr=price(s,b.svc);
  const st={confirmed:['b-green','Confirmed'],pending:['b-amber','Awaiting confirmation'],completed:['b-gray','Completed'],cancelled:['b-red','Cancelled']}[b.status];
  return `<article class="bcard"><div class="datebox"><small>${d.toLocaleDateString('en-IN',{month:'short'})}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-IN',{weekday:'short'})}</small></div><div><div class="row between" style="align-items:flex-start"><div><h3 style="font-size:18px"><a href="#/salon/${s.id}">${esc(s.name)}</a></h3><div class="muted small">${tlabel(b.time)} · ${pr.list.map(x=>esc(x.name)).join(', ')}</div></div><span class="badge ${st[0]}">${st[1]}</span></div>
  <div class="small muted" style="margin-top:6px">${b.pro==='any'?'Any professional':'With '+esc(b.pro)} · ${INR(b.total)} · <span style="font-family:ui-monospace,monospace">${b.ref}</span></div>
  <div class="actions">${['confirmed','pending'].includes(b.status)?`<button class="btn btn-ghost btn-sm" data-act="resched" data-ref="${b.ref}">Reschedule</button><button class="btn btn-danger btn-sm" data-act="cancel" data-ref="${b.ref}">Cancel</button><a class="btn btn-text btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(s.name+' '+s.addr)}">${ic('nav','sm')}Directions</a>`:b.status==='completed'?`<button class="btn btn-primary btn-sm" data-act="rebook" data-ref="${b.ref}">${ic('repeat','sm')}Book again</button>${b.rated?`<span class="small muted" style="align-self:center">You rated ${b.rated}★</span>`:`<button class="btn btn-ghost btn-sm" data-act="rate" data-ref="${b.ref}">${ic('star','sm')}Rate visit</button>`}`:`<button class="btn btn-ghost btn-sm" data-act="rebook" data-ref="${b.ref}">Book again</button>`}</div></div></article>`}
function pgSaved(){const l=SALONS.filter(s=>S.fav.includes(s.id));return `<div class="wrap" style="padding-top:26px"><h1 class="serif" style="font-size:clamp(34px,6vw,52px);line-height:1.05;margin-bottom:18px">Saved salons</h1>${l.length?`<div class="grid g2">${l.map(salonCard).join('')}</div>`:`<div class="empty"><div class="ico">${ic('heart','lg')}</div><h2 class="serif" style="font-size:28px">No saved salons</h2><p class="muted" style="margin:6px 0 16px">Tap the heart on any salon to keep it here for later.</p><a class="btn btn-primary" href="#/search">Explore salons</a></div>`}</div>`}
function pgOffers(){return `<div class="wrap" style="padding-top:26px"><h1 class="serif" style="font-size:clamp(34px,6vw,52px);line-height:1.05">Offers</h1><p class="muted" style="margin:6px 0 22px">Funded by the salons themselves and applied automatically at checkout.</p><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${SALONS.filter(s=>s.offer).map(s=>`<article class="scard"><div class="cover" style="aspect-ratio:16/8">${cover(s,1)}</div><div class="body"><div class="serif" style="font-size:36px;line-height:1;color:var(--brand)">${s.offer.type==='pct'?s.offer.v+'% off':s.offer.type==='flat'?INR(s.offer.v)+' off':'Free add-on'}</div><h3>${esc(s.offer.label)}</h3><div class="small muted">${esc(s.name)} · ${esc(s.area)}</div><div style="margin-top:auto;padding-top:12px"><a class="btn btn-primary btn-sm btn-block" href="#/salon/${s.id}">Book with offer</a></div></div></article>`).join('')}</div></div>`}
function pgHelp(){const F=[['Is my appointment confirmed straight away?','Bookings arrive at the salon as a request. Most salons confirm within two hours during business hours, and you get a notification the moment they do.'],['Can I cancel for free?','Yes — up to 4 hours before your appointment. Later cancellations may affect your booking priority with that salon.'],['Do I pay when I book?','No. You pay at the salon after your service. Nothing is charged online.'],['How do offers work?','Eligible offers are applied automatically at the review step. You will see the saving before you confirm.'],['What if my professional is unavailable?','The salon will contact you with alternatives, or you can reschedule or cancel for free.']];
  return `<div class="wrap" style="padding-top:26px"><h1 class="serif" style="font-size:clamp(34px,6vw,52px);line-height:1.05">Help &amp; support</h1><p class="muted" style="margin:6px 0 22px">Quick answers about booking, cancellations and your account.</p>${F.map(f=>`<details class="faq"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}<div class="promo" style="margin-top:24px;grid-template-columns:1fr;min-height:0;padding:32px"><div><h2>Still stuck?</h2><p style="margin:8px 0 18px">Support replies within a few hours, 9am–9pm IST.</p><div class="row wrapflex"><a class="btn btn-primary" href="mailto:support@okomall.app">Email support</a><a class="btn" style="background:rgba(255,255,255,.12);color:#fff" href="tel:+918000000000">${ic('phone','sm')}Call us</a></div></div></div></div>`}
function pgMe(){const u=S.user;return `<div class="wrap" style="padding-top:26px"><div class="row" style="gap:16px;margin-bottom:22px"><div class="avatar lg">${initials(u.name)}</div><div><h1 class="serif" style="font-size:38px;line-height:1.05">${esc(u.name)}</h1><div class="muted">${[u.phone,u.email].filter(Boolean).map(esc).join(' · ')}</div></div></div>
  <div class="card"><h2 style="font-size:18px;margin-bottom:6px">Preferences</h2>${[['notify','Booking updates','Confirmations and changes by SMS and push'],['remind','Reminders','A nudge 3 hours before each appointment']].map(([k,t,d])=>`<div class="prow"><div><b>${t}</b><div class="small muted">${d}</div></div><button class="switch" role="switch" aria-checked="${!!u[k]}" aria-label="${t}" data-act="pref" data-k="${k}"></button></div>`).join('')}</div>
  <div class="card" style="margin-top:16px"><h2 style="font-size:18px;margin-bottom:6px">Account</h2><div class="prow"><span>Saved salons</span><a class="btn-text btn" href="#/saved">${S.fav.length} saved ${ic('chev','sm')}</a></div><div class="prow"><span>My appointments</span><a class="btn-text btn" href="#/bookings">${S.bookings.length} total ${ic('chev','sm')}</a></div><div class="prow" style="border:0"><span>Help &amp; support</span><a class="btn-text btn" href="#/help">Open ${ic('chev','sm')}</a></div></div>
  <div class="row" style="gap:10px;margin-top:20px;flex-wrap:wrap"><button class="btn btn-primary" data-act="logout">${ic('logout','sm')}Log out</button><button class="btn btn-text" data-act="reset">Reset demo data</button></div></div>`}
function nf(){return `<div class="wrap"><div class="empty" style="margin-top:40px"><h2 class="serif" style="font-size:34px">Page not found</h2><p class="muted" style="margin:8px 0 16px">That page doesn’t exist.</p><a class="btn btn-primary" href="#/">Back home</a></div></div>`}


/* ---------- auth ---------- */
const k10=p=>(p||'').replace(/\D/g,'').slice(-10);
const fmtPh=p=>'+91 '+p.slice(0,5)+' '+p.slice(5);
const fresh=()=>({mode:'login',step:'phone',phone:'',name:'',next:'#/',msg:'',resume:0,pendFav:null});
let au=fresh();
const safeNext=n=>(typeof n==='string'&&/^#\//.test(n)&&!/^#\/(login|signup)/.test(n))?n:'#/';
function needLogin(msg,icon,fav,next,resume){au.next=next||(location.hash&&location.hash!=='#'?location.hash:'#/');au.resume=resume||0;au.pendFav=fav||null;au.msg=msg;au.mode='login';au.step='phone';toast(msg,icon||'user');location.hash='#/login?next='+encodeURIComponent(au.next)}
function authBits(){
  if(!S.cur)return `<a class="btn btn-ghost btn-sm hide-sm" href="#/login">Log in</a><a class="btn btn-primary btn-sm" href="#/signup">Sign up</a>`;
  return `<div class="umenu-wrap"><button class="avatar-btn" data-act="umenu" aria-haspopup="menu" aria-expanded="false" aria-label="Account menu"><span class="avatar">${esc(initials(S.user.name||'U'))}</span></button>
  <div class="umenu" id="umenu" role="menu" hidden><div class="um-head"><b>${esc(S.user.name)}</b><span>${esc(S.user.phone)}</span></div><a role="menuitem" href="#/bookings">${ic('cal','sm')}My appointments</a><a role="menuitem" href="#/saved">${ic('heart','sm')}Saved salons</a><a role="menuitem" href="#/me">${ic('user','sm')}Account settings</a><button role="menuitem" data-act="logout">${ic('logout','sm')}Log out</button></div></div>`;
}
function pgAuth(mode){
  const q=parseQS();
  if(q.next){au.next=safeNext(q.next)}else if(au.step==='phone'){au.msg=''}
  if(au.mode!==mode){au.mode=mode;au.step='phone';au.name=''}
  const su=mode==='signup', otp=au.step==='otp', nx=encodeURIComponent(au.next);
  const title=otp?'Verify your number':su?'Create your account':'Welcome back';
  const sub=otp?`Enter the 4-digit code we sent to <b>${esc(fmtPh(au.phone))}</b>.`:su?'Book beauty appointments in under a minute.':'Log in to manage your appointments and saved salons.';
  const form=otp?`<form data-form="auth" novalidate><label class="flabel" for="auth-in">Verification code</label><input id="auth-in" class="finput otp" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="••••" aria-describedby="auth-err"><div class="hint">Demo code: <b>1234</b></div><div id="auth-err" class="ferr" role="alert" hidden></div>
    <button class="btn btn-primary btn-block" type="submit" style="margin-top:16px">${su?'Verify & create account':'Verify & log in'}</button>
    <div class="row between small" style="margin-top:14px"><button type="button" class="link" data-act="auchange">Change number</button><button type="button" class="link" data-act="auresend">Resend code</button></div></form>`
   :`<form data-form="auth" novalidate>${su?`<label class="flabel" for="auth-name">Full name</label><input id="auth-name" class="finput" name="name" autocomplete="name" placeholder="e.g. Ananya Kapoor" value="${esc(au.name)}">`:''}
    <label class="flabel" for="auth-in">Mobile number</label><div class="phone-in"><span>+91</span><input id="auth-in" name="ph" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="98765 43210" value="${esc(au.phone)}" aria-describedby="auth-err"></div>
    ${su?`<label class="check"><input type="checkbox" name="terms"><span>I agree to the <a href="#/help" class="ul">Terms</a> and <a href="#/help" class="ul">Privacy Policy</a></span></label>`:''}
    <div id="auth-err" class="ferr" role="alert" hidden></div>
    <button class="btn btn-primary btn-block" type="submit" style="margin-top:16px">Send code</button></form>
    <div class="or"><span>or</span></div>
    <button class="btn btn-ghost btn-block" data-act="augoogle"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.300-.2-1.900H12v3.700h5.400a4.600 4.600 0 0 1-2 3v2.500h3.200c1.900-1.700 3-4.300 3-7.300z"/><path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.400l-3.200-2.500c-.9.600-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.400 13.900a6 6 0 0 1 0-3.800V7.500H3.100a10 10 0 0 0 0 9z"/><path fill="#EA4335" d="M12 6c1.500 0 2.800.5 3.800 1.500l2.800-2.800A10 10 0 0 0 3.100 7.500l3.300 2.600C7.200 7.800 9.400 6 12 6z"/></svg>Continue with Google</button>
    <p class="small muted" style="text-align:center;margin-top:18px">${su?'Already have an account? ':'New to OKOMALL? '}<a class="ul" href="#/${su?'login':'signup'}?next=${nx}">${su?'Log in':'Sign up'}</a></p>
    <div class="note brand small" style="margin-top:18px">${ic('info','sm')}<div>Demo account: <b>98980 11223</b> · code <b>1234</b></div></div>`;
  return `<div class="authpage"><aside class="auth-art" aria-hidden="true"><div class="aa-in"><a class="logo on-dark" href="#/" aria-label="OKOMALL home"><svg class="logo-mark" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true" focusable="false"><defs><linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a3d59"/><stop offset="1" stop-color="#5e2236"/></linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#lg2)"/><circle cx="19.5" cy="21.5" r="8.6" fill="none" stroke="#fff" stroke-width="3.8"/><path d="M30.2 6.6l1.3 3.3 3.3 1.3-3.3 1.3-1.3 3.3-1.3-3.3-3.300-1.3 3.300-1.3z" fill="#ffd9e2"/></svg><span class="logo-word">OKO<b>MALL</b></span></a><div><h2>Your next appointment is a minute away.</h2><ul><li>${ic('check','sm')}Live availability, no waiting for replies</li><li>${ic('check','sm')}Free cancellation up to 4 hours before</li><li>${ic('check','sm')}Offers applied automatically</li></ul></div></div></aside>
  <section class="auth-card" aria-labelledby="auth-h"><div class="auth-tabs" role="tablist"><a role="tab" aria-selected="${!su}" href="#/login?next=${nx}">Log in</a><a role="tab" aria-selected="${su}" href="#/signup?next=${nx}">Sign up</a></div>
  <h1 id="auth-h">${title}</h1><p class="muted" style="margin:6px 0 18px">${sub}</p>${au.msg&&!otp?`<div class="note brand" style="margin-bottom:16px">${ic('user','sm')}<div>${esc(au.msg)}</div></div>`:''}${form}</section></div>`;
}
function aerr(html,field){const e=$('#auth-err');if(e){e.innerHTML=html;e.hidden=false}const f=field&&$('[name="'+field+'"]');if(f){f.setAttribute('aria-invalid','true');f.focus()}}
function authSubmit(f){
  const d=Object.fromEntries(new FormData(f)),nx=encodeURIComponent(au.next);
  if(au.step==='phone'){
    const ph=k10(d.ph);
    if(au.mode==='signup'){const nm=(d.name||'').trim();au.name=nm;if(nm.length<2)return aerr('Please enter your full name.','name')}
    au.phone=ph;
    if(!/^[6-9]\d{9}$/.test(ph))return aerr('Enter a valid 10-digit mobile number.','ph');
    const exists=!!S.users[ph];
    if(au.mode==='login'&&!exists)return aerr('No account found for this number. <a class="ul" href="#/signup?next='+nx+'">Sign up instead</a>','ph');
    if(au.mode==='signup'&&exists)return aerr('This number is already registered. <a class="ul" href="#/login?next='+nx+'">Log in instead</a>','ph');
    if(au.mode==='signup'&&!d.terms)return aerr('Please accept the Terms to continue.','terms');
    au.step='otp';route();const i=$('#auth-in');if(i)i.focus();
  }else{
    if((d.otp||'').trim()!=='1234')return aerr('That code is not right. Use 1234 in this demo.','otp');
    if(au.mode==='signup')S.users[au.phone]={user:{name:au.name,phone:fmtPh(au.phone),email:'',notify:true,remind:true},fav:[],bookings:[]};
    loginAs(au.phone);
  }
}
function loginAs(p){
  save();S.cur=p;const u=S.users[p];S.user=u.user;S.fav=u.fav;S.bookings=u.bookings;
  if(au.pendFav&&!S.fav.includes(au.pendFav))S.fav.push(au.pendFav);
  if(draft){if(!draft.name)draft.name=S.user.name;if(!draft.phone)draft.phone=S.user.phone;if(au.resume)draft.step=au.resume}
  save();const nx=safeNext(au.next),first=(S.user.name||'there').split(' ')[0];au=fresh();
  toast('Welcome, '+first,'check');
  if(location.hash===nx)route();else location.hash=nx;
}
function doLogout(){save();S.cur=null;S.user=GUEST();S.fav=[];S.bookings=[];draft=null;bTab='upcoming';save();au=fresh();closeSheet();toast('You have been logged out','logout');if(location.hash==='#/'||location.hash==='')route();else location.hash='#/'}

/* ---------- shell ---------- */
function chrome(route){
  const links=[['#/search','Explore','search'],['#/offers','Offers','tag'],['#/bookings','My appointments','cal'],['#/help','Help','help']];
  const cur=r=>route.startsWith(r.slice(2).split('?')[0])&&r.length>2;
  $('#hdr').innerHTML=`<div class="wrap"><a class="logo" href="#/" aria-label="OKOMALL home"><svg class="logo-mark" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true" focusable="false"><defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a3d59"/><stop offset="1" stop-color="#5e2236"/></linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#lg1)"/><circle cx="19.5" cy="21.5" r="8.6" fill="none" stroke="#fff" stroke-width="3.8"/><path d="M30.2 6.6l1.3 3.3 3.3 1.3-3.3 1.3-1.3 3.3-1.3-3.3-3.300-1.3 3.300-1.3z" fill="#ffd9e2"/></svg><span class="logo-word">OKO<b>MALL</b></span></a><nav class="nav" aria-label="Main">${links.map(l=>`<a href="${l[0]}" ${cur(l[0])?'aria-current="page"':''}>${l[1]}</a>`).join('')}</nav>
  <div class="hdr-end"><button class="loc" aria-label="Change location">${ic('pin','sm')}Bengaluru</button><a class="icon-btn" href="#/saved" aria-label="Saved salons">${ic('heart')}</a>${authBits()}</div></div>`;
  const tabs=[['#/','Home','home',route===''],['#/search','Explore','search',route.startsWith('search')],['#/bookings','Bookings','cal',route.startsWith('bookings')],['#/saved','Saved','heart',route.startsWith('saved')],['#/me',S.cur?'Me':'Log in','user',route.startsWith('me')||route.startsWith('login')||route.startsWith('signup')]];
  $('#tabbar').innerHTML=tabs.map(t=>`<a href="${t[0]}" ${t[3]?'aria-current="page"':''}>${ic(t[2])}${t[1]}</a>`).join('');
  const focusFlow=route.startsWith('book/')||route.startsWith('booked/')||route.startsWith('salon/')||route.startsWith('login')||route.startsWith('signup');
  $('#tabbar').style.display=focusFlow?'none':'';document.body.classList.toggle('has-tabbar',!focusFlow);
}
let busy=false;
function route(){
  {const h0=location.hash.replace(/^#\/?/,''),a0=h0.split('?')[0].split('/')[0];
   if(!S.cur){
    if(['bookings','saved','me'].includes(a0)){au.next='#/'+h0;au.mode='login';au.step='phone';au.msg={bookings:'Log in to view your appointments',saved:'Log in to see your saved salons',me:'Log in to manage your account'}[a0];location.replace('#/login?next='+encodeURIComponent(au.next));return}
    if(a0==='book'&&draft&&draft.step>=3){au.resume=3;draft.step=2;au.next='#/'+h0.split('?')[0];au.mode='login';au.step='phone';au.msg='Log in to review and confirm your booking';location.replace('#/login?next='+encodeURIComponent(au.next));return}
   }else if(a0==='login'||a0==='signup'){location.replace(safeNext(parseQS().next));return}}
  const h=location.hash.replace(/^#\/?/,'');const [path]=h.split('?');const [a,b]=path.split('/');
  chrome(path);const app=$('#app');
  const views={'':()=>pgHome(),search:()=>pgSearch(),salon:()=>pgSalon(b),book:()=>pgBook(b),booked:()=>pgBooked(b),bookings:pgBookings,saved:pgSaved,offers:pgOffers,help:pgHelp,me:pgMe,login:()=>pgAuth('login'),signup:()=>pgAuth('signup')};
  const titles={'':'OKOMALL — book beauty in a minute',search:'Find a salon · OKOMALL',salon:(salon(b)||{}).name,book:'Book · OKOMALL',booked:'Request sent · OKOMALL',bookings:'My appointments · OKOMALL',saved:'Saved · OKOMALL',offers:'Offers · OKOMALL',help:'Help · OKOMALL',me:'Account · OKOMALL',login:'Log in · OKOMALL',signup:'Sign up · OKOMALL'};
  if(!(a in views)){app.innerHTML=nf();return}
  const heavy=['search','salon'].includes(a)&&!busy;
  const paint=()=>{app.innerHTML=views[a]();document.title=(titles[a]||'OKOMALL')+((a==='salon')?' · OKOMALL':'');if(!location.hash.includes('#keep'))window.scrollTo(0,0);app.focus({preventScroll:true});if(a==='salon')spy();busy=false};
  if(heavy&&!app.dataset.painted){app.innerHTML=skeleton();app.dataset.painted=1;setTimeout(paint,160)}else paint();
  $('footer').style.display=['book','booked','login','signup'].includes(a)?'none':'';
}
let spyOff=null;
function spy(){const secs=['services','team','reviews','about'].map(i=>document.getElementById(i)).filter(Boolean);if(spyOff)spyOff();const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){$$('.subnav a').forEach(a=>a.setAttribute('aria-current',a.dataset.to===e.target.id?'true':'false'))}})},{rootMargin:'-120px 0px -65% 0px'});secs.forEach(s=>io.observe(s));spyOff=()=>io.disconnect()}

/* ---------- actions ---------- */
function setQS(patch){const q={...parseQS(),...patch};Object.keys(q).forEach(k=>{if(q[k]===''||q[k]==null)delete q[k]});const qs=new URLSearchParams(q).toString();location.hash='#/search'+(qs?'?'+qs:'')}
function rerender(){const y=window.scrollY;const app=$('#app');const s=location.hash.replace(/^#\/?/,'').split('/');route();window.scrollTo(0,y)}
function refreshSalon(id){const s=salon(id),sel=draft&&draft.salonId===id?draft.svc:[],pr=price(s,sel);$('#sumcard').innerHTML=bookSide(s,sel,pr);$('#stickybar').innerHTML=stickyBar(s,sel,pr);$$('.svc').forEach(el=>{const b=$('[data-act=svc]',el);const on=sel.includes(b.dataset.id);el.classList.toggle('on',on);b.className='btn '+(on?'btn-dark':'btn-ghost')+' btn-sm add';b.setAttribute('aria-pressed',on);b.innerHTML=on?ic('check','sm')+'Added':ic('plus','sm')+'Add'})}
function ensureDraft(id){if(!draft||draft.salonId!==id)draft={salonId:id,svc:[],pro:'any',date:iso(addDays(0)),time:'',notes:'',step:0,name:S.user.name,phone:S.user.phone}}
function icsFor(b){const s=salon(b.salon),pr=price(s,b.svc);const st=b.date.replace(/-/g,'')+'T'+b.time.replace(':','')+'00';const [h,m]=b.time.split(':').map(Number);const e=new Date(2000,0,1,h,m+pr.dur);const et=b.date.replace(/-/g,'')+'T'+String(e.getHours()).padStart(2,'0')+String(e.getMinutes()).padStart(2,'0')+'00';
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//OKOMALL//EN','BEGIN:VEVENT','UID:'+b.ref+'@okomall.app','DTSTAMP:'+st,'DTSTART:'+st,'DTEND:'+et,'SUMMARY:'+s.name+' — '+pr.list.map(x=>x.name).join(', '),'LOCATION:'+s.addr,'DESCRIPTION:Booking '+b.ref+'. Free cancellation up to 4 hours before.','END:VEVENT','END:VCALENDAR'].join('\r\n')}

document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='closeScrim'){if(e.target===t)closeSheet();return}
  if(a==='rvnav'){const r=$('#rvs');if(r)r.scrollBy({left:+t.dataset.d*Math.min(r.clientWidth*.85,700),behavior:'smooth'});return}
  if(a==='umenu'){const m=$('#umenu');if(m){const open=m.hidden;m.hidden=!open;t.setAttribute('aria-expanded',open)}return}
  if(a==='logout'){const m=$('#umenu');if(m)m.hidden=true;sheet(`<h2>Log out?</h2><p class="muted" style="margin:6px 0 20px">You will need to log in again to see your appointments and saved salons.</p><div class="row" style="gap:10px"><button class="btn btn-ghost" style="flex:1" data-act="closeSheet">Stay logged in</button><button class="btn btn-primary" style="flex:1" data-act="dologout">Log out</button></div>`,'Log out');return}
  if(a==='dologout'){doLogout();return}
  if(a==='auchange'){au.step='phone';route();const i=$('#auth-in');if(i)i.focus();return}
  if(a==='auresend'){toast('Code sent again — use 1234','check');return}
  if(a==='augoogle'){S.users['9898011223']=S.users['9898011223']||SEED();au.mode='login';loginAs('9898011223');return}
  if(a==='jump'){e.preventDefault();const el=document.getElementById(t.dataset.to);if(el)el.scrollIntoView({behavior:'smooth'});return}
  if(['range','inp','sort'].includes(a))return;
  e.stopPropagation();
  if(a==='fav'){e.preventDefault();if(!S.cur){needLogin('Log in to save salons','heart',t.dataset.id);return}const id=t.dataset.id,i=S.fav.indexOf(id);i<0?S.fav.push(id):S.fav.splice(i,1);save();toast(i<0?'Saved to your list':'Removed from saved','heart');const on=S.fav.includes(id);$$(`[data-act=fav][data-id=${id}]`).forEach(b=>{b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});if(location.hash.startsWith('#/saved'))route();return}
  if(a==='quick'){e.preventDefault();const s=salon(t.dataset.id);ensureDraft(s.id);draft.svc=[s.services[0].id];draft.date=t.dataset.date;draft.time=t.dataset.time;draft.step=0;toast('Added '+s.services[0].name+' — change it on the next screen','info');location.hash='#/book/'+s.id;return}
  if(a==='svc'){const s=salon(t.dataset.s);ensureDraft(s.id);const i=draft.svc.indexOf(t.dataset.id);i<0?draft.svc.push(t.dataset.id):draft.svc.splice(i,1);refreshSalon(s.id);return}
  if(a==='start'){ensureDraft(t.dataset.id);draft.step=0;location.hash='#/book/'+t.dataset.id;return}
  if(a==='share'){const url=location.href;(navigator.share?navigator.share({title:salon(t.dataset.id).name,url}):navigator.clipboard.writeText(url)).then(()=>toast('Link ready to share','share')).catch(()=>{});return}
  if(a==='bkback'){if(draft.step>0){draft.step--;route()}else history.back();return}
  if(a==='bknext'){if(draft.step<3){if(draft.step===2&&!draft.time)return;if(draft.step===2&&!S.cur){needLogin('Log in to review and confirm your booking','user',null,'#/book/'+draft.salonId,3);return}draft.step++;route();return}
    const s=salon(draft.salonId),pr=price(s,draft.svc);const ref='OKO-'+(40000+Math.floor(Math.random()*9999));
    S.bookings.push({ref,salon:s.id,svc:[...draft.svc],pro:draft.pro,date:draft.date,time:draft.time,status:s.id==='luma'?'confirmed':'pending',total:pr.total,notes:draft.notes});S.user.name=draft.name;S.user.phone=draft.phone;save();draft=null;location.hash='#/booked/'+ref;return}
  if(a==='bkrm'){draft.svc=draft.svc.filter(x=>x!==t.dataset.id);if(!draft.svc.length){location.hash='#/salon/'+draft.salonId;return}route();return}
  if(a==='bkjump'){draft.step=+t.dataset.v;route();return}
  if(a==='pro'){draft.pro=t.dataset.v;draft.time='';route();return}
  if(a==='day'){draft.date=t.dataset.v;draft.time='';const y=scrollY;route();scrollTo(0,y);return}
  if(a==='time'){draft.time=t.dataset.v;const y=scrollY;route();scrollTo(0,y);return}
  if(a==='btab'){bTab=t.dataset.v;route();return}
  if(a==='cancel'){const b=S.bookings.find(x=>x.ref===t.dataset.ref);sheet(`<h2>Cancel this appointment?</h2><p class="muted" style="margin-bottom:16px">${esc(salon(b.salon).name)} · ${dfull(b.date)}, ${tlabel(b.time)}. Cancelling more than 4 hours before is free.</p><div class="stack" style="--s:10px"><button class="btn btn-danger btn-block" data-act="docancel" data-ref="${b.ref}">Yes, cancel it</button><button class="btn btn-ghost btn-block" data-act="closeSheet">Keep appointment</button></div>`,'Cancel appointment');return}
  if(a==='docancel'){S.bookings.find(x=>x.ref===t.dataset.ref).status='cancelled';save();closeSheet();toast('Appointment cancelled','check');route();return}
  if(a==='closeSheet'){closeSheet();return}
  if(a==='resched'){const b=S.bookings.find(x=>x.ref===t.dataset.ref),s=salon(b.salon);window._rs={ref:b.ref,date:b.date,time:''};rsSheet(s);return}
  if(a==='rsday'){window._rs.date=t.dataset.v;window._rs.time='';rsSheet(salon(S.bookings.find(x=>x.ref===window._rs.ref).salon));return}
  if(a==='rstime'){window._rs.time=t.dataset.v;rsSheet(salon(S.bookings.find(x=>x.ref===window._rs.ref).salon));return}
  if(a==='dorsch'){const b=S.bookings.find(x=>x.ref===window._rs.ref);b.date=window._rs.date;b.time=window._rs.time;b.status='pending';save();closeSheet();toast('Reschedule requested','check');route();return}
  if(a==='rebook'){const b=S.bookings.find(x=>x.ref===t.dataset.ref);ensureDraft(b.salon);draft.svc=[...b.svc];draft.pro=b.pro;draft.step=1;location.hash='#/book/'+b.salon;return}
  if(a==='rate'){window._rt={ref:t.dataset.ref,v:0};rateSheet();return}
  if(a==='star'){window._rt.v=+t.dataset.v;rateSheet();return}
  if(a==='dorate'){S.bookings.find(x=>x.ref===window._rt.ref).rated=window._rt.v;save();closeSheet();toast('Thanks for your review','star');route();return}
  if(a==='ics'){const b=S.bookings.find(x=>x.ref===t.dataset.ref);const url=URL.createObjectURL(new Blob([icsFor(b)],{type:'text/calendar'}));const l=document.createElement('a');l.href=url;l.download='maison-'+b.ref+'.ics';l.click();URL.revokeObjectURL(url);return}
  if(a==='pref'){S.user[t.dataset.k]=!S.user[t.dataset.k];save();t.setAttribute('aria-checked',!!S.user[t.dataset.k]);return}
  if(a==='reset'){localStorage.removeItem(KEY);location.hash='#/';location.reload();return}
  if(a==='setf'){const k=t.dataset.k,cur=parseQS()[k];setQS({[k]:cur===t.dataset.v?'':t.dataset.v});return}
  if(a==='rmf'){setQS({[t.dataset.k]:''});return}
  if(a==='clearf'){location.hash='#/search';return}
  if(a==='openFilters'){sheet(`<h2>Filters</h2><div>${filterUI(parseQS())}</div><button class="btn btn-primary btn-block" style="margin-top:14px" data-act="closeSheet">Show results</button>`,'Filters');return}
});
function rsSheet(s){const r=window._rs;const sl=slotsFor(s,r.date);
  sheet(`<h2>Reschedule</h2><p class="muted" style="margin-bottom:14px">${esc(s.name)} will confirm the new time.</p><div class="days" role="group" aria-label="Date">${Array.from({length:10},(_,i)=>{const d=addDays(i),k=iso(d);return `<button class="day" data-act="rsday" data-v="${k}" aria-pressed="${r.date===k}" ${d.getDay()===0?'disabled':''}><small>${i===0?'Today':d.toLocaleDateString('en-IN',{weekday:'short'})}</small><b>${d.getDate()}</b></button>`}).join('')}</div><div class="slotgrid" style="margin:16px 0">${sl.map(x=>`<button class="slot" data-act="rstime" data-v="${x.t}" aria-pressed="${r.time===x.t}" ${x.ok?'':'disabled'}>${tlabel(x.t)}</button>`).join('')}</div><button class="btn btn-primary btn-block ${r.time?'':'disabled'}" data-act="dorsch" ${r.time?'':'disabled'}>Request new time</button>`,'Reschedule appointment')}
function rateSheet(){const r=window._rt;sheet(`<h2>How was your visit?</h2><p class="muted">Your rating helps others choose.</p><div class="stars" role="group" aria-label="Rating" style="margin:16px 0">${[1,2,3,4,5].map(i=>`<button data-act="star" data-v="${i}" aria-pressed="${r.v>=i}" aria-label="${i} star${i>1?'s':''}">${ic('star')}</button>`).join('')}</div><button class="btn btn-primary btn-block ${r.v?'':'disabled'}" data-act="dorate" ${r.v?'':'disabled'}>Submit review</button>`,'Rate your visit')}
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.act==='range'){const v=+t.value;$('#mx').textContent=v>=6000?'Any':INR(v);t._v=v}if(t.dataset.act==='inp'){draft[t.dataset.k]=t.value;if(draft.step===3){const ok=draft.name.trim().length>1&&/^[+\d][\d\s-]{8,}$/.test(draft.phone.trim());$$('[data-act=bknext]').forEach(b=>{b.disabled=!ok;b.classList.toggle('disabled',!ok)})}}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.act==='range')setQS({max:+t.value>=6000?'':t.value});if(t.dataset.act==='sort')setQS({sort:t.value})});
document.addEventListener('submit',e=>{const af=e.target.closest('[data-form="auth"]');if(af){e.preventDefault();authSubmit(af);return}
  const sf=e.target.closest('[data-form="app-sms"]');if(sf){e.preventDefault();const v=(new FormData(sf).get('ph')||'').toString().trim();if(!/^[+\d][\d\s-]{8,}$/.test(v)){toast('Enter a valid mobile number','x');return}toast('Download link sent to '+v);sf.reset();return}
  const f=e.target.closest('[data-form]');if(!f)return;e.preventDefault();const d=Object.fromEntries(new FormData(f));if(f.dataset.form==='home-search')setQS({q:d.q,when:d.when});else setQS({q:d.q})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').innerHTML)closeSheet()});
window.addEventListener('hashchange',()=>{closeSheet();route()});
document.addEventListener('DOMContentLoaded',()=>{if(!location.hash)location.hash='#/';route()});
})();

/* map pin <-> card hover sync */
(function(){
  const hl=(id,on)=>{document.querySelectorAll('[data-pin="'+id+'"]').forEach(p=>p.classList.toggle('hl',on));document.querySelectorAll('[data-sid="'+id+'"]').forEach(c=>c.classList.toggle('hl',on))};
  document.addEventListener('mouseover',e=>{const t=e.target.closest('[data-sid],[data-pin]');if(t)hl(t.dataset.sid||t.dataset.pin,true)});
  document.addEventListener('mouseout',e=>{const t=e.target.closest('[data-sid],[data-pin]');if(t)hl(t.dataset.sid||t.dataset.pin,false)});
})();

/* close account menu on outside click / Escape */
document.addEventListener('click',e=>{const m=document.getElementById('umenu');if(m&&!m.hidden&&!e.target.closest('.umenu-wrap')){m.hidden=true;const b=document.querySelector('[data-act=umenu]');if(b)b.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=document.getElementById('umenu');if(m&&!m.hidden){m.hidden=true;const b=document.querySelector('[data-act=umenu]');if(b){b.setAttribute('aria-expanded','false');b.focus()}}}});
