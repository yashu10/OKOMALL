/* OKOMALL — demo data */
const CATS=[
  {id:'Hair',icon:'scissors',n:412},{id:'Nails',icon:'sparkle',n:238},{id:'Facial',icon:'smile',n:305},
  {id:'Massage',icon:'hand',n:154},{id:'Makeup',icon:'brush',n:129},{id:'Spa',icon:'flower',n:96},{id:'Waxing',icon:'feather',n:187}
];
const CATALOG={
  Hair:[['Women’s haircut & styling','Consultation, wash, cut and blow-dry',60,1200],['Men’s haircut','Precision cut and finish',40,600],['Hair colour','Global or root touch-up, ammonia-free',120,2500],['Balayage','Hand-painted highlights with toner',180,5200],['Blow dry','Wash and styled blow-dry',45,700],['Keratin treatment','Smoothing treatment, up to 3 months',150,4500]],
  Nails:[['Classic manicure','Shape, cuticle care and polish',45,800],['Gel manicure','Long-lasting gel polish',60,1200],['Pedicure','Soak, scrub and polish',60,1100],['Nail art','Per hand, custom design',30,500]],
  Facial:[['Classic facial','Cleanse, exfoliate, extract, mask',60,1800],['Hydrating facial','Deep moisture and glow',60,2200],['De-tan treatment','Brightening and tan removal',45,1500]],
  Massage:[['Deep tissue massage','Medium to firm pressure',60,2200],['Swedish massage','Relaxing full-body massage',60,1900],['Head & shoulder massage','Stress relief',30,900]],
  Makeup:[['Party makeup','Full face, lashes included',75,3500],['Bridal trial','Look planning and test run',90,4500]],
  Spa:[['Aroma spa ritual','Scrub, wrap and massage',90,3800],['Foot spa','Soak, scrub and massage',40,1000]],
  Waxing:[['Full arms wax','Rica wax',30,600],['Full legs wax','Rica wax',40,800],['Underarms','Quick and gentle',10,200]]
};
const SALONS=[
  {id:'luma',name:'Luma Hair Studio',area:'Indiranagar',km:1.2,rating:4.8,reviews:212,cats:['Hair'],f:1.0,hue:0,open:'10:00 – 20:30',offer:{type:'pct',v:20,label:'20% off colour',on:['Hair colour','Balayage']},verified:true,
    about:'A quiet eight-chair studio focused on cut and colour. The team trains twice a year with international educators and uses ammonia-free colour lines as standard.',addr:'#42, 12th Main, Indiranagar, Bengaluru 560038',pos:[58,36]},
  {id:'glow',name:'The Glow Room',area:'Koramangala',km:3.4,rating:4.7,reviews:168,cats:['Facial','Waxing'],f:1.0,hue:1,open:'11:00 – 21:00',offer:{type:'flat',v:300,label:'₹300 off your first facial',on:['*']},verified:true,
    about:'A skin-first studio. Every facial begins with a short consultation so the treatment fits your skin, not a menu.',addr:'80 Feet Road, Koramangala 4th Block, Bengaluru 560034',pos:[44,60]},
  {id:'elan',name:'Élan Beauty Lounge',area:'Jayanagar',km:6.1,rating:4.9,reviews:341,cats:['Nails','Makeup','Hair'],f:1.05,hue:2,open:'10:00 – 20:00',offer:{type:'addon',label:'Free nail art with any manicure',on:['Classic manicure','Gel manicure']},verified:true,
    about:'Full-service beauty lounge with a dedicated nail bar, skin studio and bridal team. Established 2016.',addr:'2nd Floor, 4th Block, Jayanagar, Bengaluru 560011',pos:[40,80]},
  {id:'aura',name:'Aura Salon & Spa',area:'Whitefield',km:11.8,rating:4.6,reviews:97,cats:['Spa','Massage','Hair'],f:1.1,hue:3,open:'10:00 – 22:00',offer:null,verified:true,
    about:'Spa and salon under one roof with late evening slots. Ideal after work, with private treatment rooms.',addr:'ITPL Main Road, Whitefield, Bengaluru 560066',pos:[84,52]},
  {id:'verve',name:'Verve Nail Bar',area:'HSR Layout',km:5.2,rating:4.8,reviews:154,cats:['Nails'],f:0.95,hue:4,open:'11:00 – 20:00',offer:null,verified:true,
    about:'A small, busy nail bar with a design-first approach. Walk-ins welcome when there is room.',addr:'27th Main, HSR Layout Sector 1, Bengaluru 560102',pos:[62,78]},
  {id:'serene',name:'Serene Spa & Salon',area:'Malleshwaram',km:8.4,rating:4.7,reviews:604,cats:['Spa','Massage','Facial'],f:1.0,hue:5,open:'09:00 – 21:00',offer:{type:'pct',v:15,label:'15% off weekday massages',on:['Deep tissue massage','Swedish massage']},verified:true,
    about:'Calm, long-standing spa with trained therapists and a quiet courtyard. Bookings are held for 10 minutes.',addr:'8th Cross, Malleshwaram, Bengaluru 560003',pos:[30,22]},
  {id:'blush',name:'Blush Makeup Studio',area:'Indiranagar',km:1.8,rating:4.9,reviews:88,cats:['Makeup'],f:1.1,hue:0,open:'10:00 – 19:00',offer:null,verified:true,
    about:'Occasion and bridal makeup by a team of four artists. Trials are booked separately so there are no surprises.',addr:'100 Feet Road, Indiranagar, Bengaluru 560038',pos:[66,30]},
  {id:'kaya',name:'Kaya Cut & Co.',area:'Koramangala',km:3.9,rating:4.5,reviews:276,cats:['Hair','Waxing'],f:0.85,hue:3,open:'10:00 – 21:00',offer:null,verified:false,
    about:'Friendly neighbourhood salon with reliable cuts at honest prices. Walk-ins and quick appointments.',addr:'5th Block, Koramangala, Bengaluru 560095',pos:[36,52]}
];
const TEAM_POOL=[['Meera Rao','Senior Stylist',9],['Karan Shetty','Colour Specialist',6],['Divya Nair','Skin Therapist',11],['Anil Kumar','Stylist',4],['Riya Mehta','Nail Artist',5],['Aarav Shah','Senior Hair Stylist',7]];
const REVIEWS=[
  ['Priya M.','Absolutely loved my colour — they listened first and the result was exactly what I showed. Booked my next one before leaving.',5,'2 weeks ago'],
  ['Sneha R.','Clean, calm and on time. The slot I booked online was honoured to the minute, which almost never happens.',5,'1 month ago'],
  ['Tanvi B.','Great service and fair pricing. The room was a little busy on Saturday, but staff handled it well.',4,'1 month ago'],
  ['Ishita V.','Friendly team and clear pricing. Would recommend for first-timers.',5,'2 months ago']
];
// build services + team per salon
SALONS.forEach((s,i)=>{
  s.services=[];
  s.cats.forEach(c=>(CATALOG[c]||[]).forEach(x=>s.services.push({id:s.id+'-'+s.services.length,cat:c,name:x[0],desc:x[1],dur:x[2],price:Math.round(x[3]*s.f/50)*50})));
  s.from=Math.min(...s.services.map(x=>x.price));
  s.team=[0,1,2].map(k=>{const t=TEAM_POOL[(i+k*2)%TEAM_POOL.length];return{id:s.id+'-p'+k,name:t[0],role:t[1],years:t[2]}});
  s.revs=[REVIEWS[i%4],REVIEWS[(i+1)%4],REVIEWS[(i+2)%4]];
});
const PALETTES=[['#f3e6e9','#e6ccd4','#7a2f45'],['#e9eee2','#cfdcc0','#4d6a37'],['#f6ecdc','#ead3ab','#8a6414'],['#e6edf3','#c6d6e4','#2a5a8a'],['#efe7f3','#d9c8e3','#6b4a86'],['#f8e8e0','#eec7b4','#a8532f']];

const PHOTOS={"luma":["photo-141.jpg","photo-156.jpg","photo-157.jpg"],"glow":["photo-58.jpg","photo-66.jpg","photo-101.jpg"],"elan":["photo-41.jpg","photo-114.jpg","photo-10.jpg"],"aura":["photo-89.jpg","photo-100.jpg","photo-102.jpg"],"verve":["photo-42.jpg","photo-37.jpg","photo-161.jpg"],"serene":["photo-91.jpg","photo-103.jpg","photo-63.jpg"],"blush":["photo-122.jpg","photo-124.jpg","photo-121.jpg"],"kaya":["photo-137.jpg","photo-5.jpg","photo-138.jpg"]};
SALONS.forEach(s=>s.img=PHOTOS[s.id]);
