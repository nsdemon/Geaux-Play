import { useState, useEffect } from "react";

const C = {
  purple:"#3B0764", purpleMid:"#5B21B6", purpleLight:"#7C3AED",
  gold:"#F5C518", goldLight:"#FDE68A", goldDark:"#B7860B",
  dark:"#0D0120", darkMid:"#1A0533",
  lsuPurple:"#461D7C", lsuGold:"#FDD023",
};

const CATEGORIES = [
  { id:"food",     label:"Food",              icon:"🍴", color:"#B7860B" },
  { id:"music",    label:"Music",             icon:"🎵", color:"#7C3AED" },
  { id:"festival", label:"Festivals",         icon:"🎉", color:"#DB2777" },
  { id:"art",      label:"Art Shows",         icon:"🎨", color:"#0891B2" },
  { id:"openmic",  label:"Open Mic Night",    icon:"🎤", color:"#E11D48" },
  { id:"run",      label:"Running Marathons", icon:"🏃", color:"#059669" },
  { id:"bar",      label:"LSU Bar Events",    icon:"🍺", color:"#EA580C" },
  { id:"social",   label:"LSU Social Events",  icon:"🥂", color:"#9333EA" },
  { id:"tailgate", label:"Tailgate",          icon:"🏈", color:"#461D7C" },
];
const ALL_CATS = [{ id:"all", label:"All", icon:"✦" }, ...CATEGORIES];

// ── All Events (BR-wide + LSU area) ──────────────────────────────────────────
const EVENTS = [
  // Downtown / General BR
  { id:1,  category:"music",    lsu:false, title:"Red Stick Revel Music Festival",  date:"Mar 14–16", time:"5:00 PM",  location:"Shaw Center for the Arts",           distance:"2.4 mi", hot:true,  desc:"Three days of live music across 4 stages featuring indie, jazz, and blues from across Louisiana.", color:"#7C3AED", lat:128, lng:195 },
  { id:2,  category:"food",     lsu:false, title:"Boudin & Cracklins Cook-Off",     date:"Mar 22",    time:"11:00 AM", location:"Repentance Park",                    distance:"2.8 mi", hot:false, desc:"Taste the best Cajun boudin and cracklins in the parish. 30+ competitors, live zydeco, cold beer.", color:"#B7860B", lat:108, lng:158 },
  { id:3,  category:"run",      lsu:false, title:"Mardi Gras Half Marathon",        date:"Mar 29",    time:"7:00 AM",  location:"Downtown Baton Rouge",               distance:"3.1 mi", hot:true,  desc:"Run through the heart of BR in beads and costumes! 5K, 10K, and half marathon distances.", color:"#059669", lat:115, lng:172 },
  { id:4,  category:"festival", lsu:false, title:"FestForAll Arts & Crafts",        date:"Apr 5–6",   time:"10:00 AM", location:"Perkins Road Community Park",        distance:"1.2 mi", hot:false, desc:"Louisiana's largest juried arts & crafts festival with 300+ artisans, food, and family fun.", color:"#DB2777", lat:248, lng:222 },
  { id:5,  category:"art",      lsu:false, title:"Emerge Gallery Opening Night",    date:"Apr 3",     time:"7:00 PM",  location:"Emerge Gallery & Art Center",        distance:"1.8 mi", hot:false, desc:"Opening reception showcasing emerging Louisiana visual artists. Wine, jazz, hors d'oeuvres.", color:"#0891B2", lat:198, lng:202 },
  { id:6,  category:"bar",      lsu:false, title:"Baton Rouge Trivia Crawl",        date:"Mar 21",    time:"6:30 PM",  location:"Perkins Row Entertainment District", distance:"1.5 mi", hot:true,  desc:"Team trivia across 5 bars — winners get BR-wide bragging rights and a $500 bar tab.", color:"#EA580C", lat:218, lng:178 },
  { id:7,  category:"food",     lsu:false, title:"Louisiana Seafood Festival",      date:"Apr 12–13", time:"12:00 PM", location:"Raising Cane's River Center",        distance:"3.0 mi", hot:true,  desc:"Crawfish, shrimp, oysters and more. Cooking demos, live music, fresh Gulf seafood.", color:"#B7860B", lat:95,  lng:155 },
  { id:8,  category:"music",    lsu:false, title:"Blues on the Bluffs",             date:"Apr 19",    time:"4:00 PM",  location:"Baton Rouge Blues Park",             distance:"3.8 mi", hot:false, desc:"Outdoor blues on the Mississippi bluffs with legendary local and national acts.", color:"#7C3AED", lat:82,  lng:175 },
  { id:19, category:"openmic", lsu:false, title:"Downtown Open Mic Night",          date:"Mar 18",    time:"8:00 PM",  location:"Chelsea's Live, Baton Rouge",         distance:"2.2 mi", hot:false, desc:"Singers, poets, and comedians take the stage every Tuesday. Sign up at the door. No cover.", color:"#E11D48", lat:125, lng:168 },
  { id:20, category:"openmic", lsu:false, title:"Red Stick Poetry Slam",             date:"Apr 9",     time:"7:00 PM",  location:"Mid City Ballroom",                    distance:"1.6 mi", hot:false, desc:"Monthly spoken word and poetry slam. Cash prizes. All ages welcome. Louisiana's finest wordsmiths.", color:"#E11D48", lat:205, lng:185 },

  // ── LSU Area Events ────────────────────────────────────────────────────────
  { id:9,  category:"tailgate", lsu:true,  title:"Tiger Stadium Tailgate Party",    date:"Mar 15",    time:"2:00 PM",  location:"Tiger Stadium Lots, LSU Campus",     distance:"0.4 mi", hot:true,  desc:"The biggest tailgate on the bayou. Live brass band, crawfish boil, purple & gold everything. Geaux Tigers!", color:"#461D7C", lat:318, lng:192 },
  { id:10, category:"music",    lsu:true,  title:"Free Speech Alley Live",          date:"Mar 20",    time:"12:00 PM", location:"Free Speech Alley, LSU",             distance:"0.2 mi", hot:false, desc:"Local and up-and-coming bands perform live on LSU's iconic Free Speech Alley. Bring a blanket and lunch.", color:"#7C3AED", lat:305, lng:175 },
  { id:11, category:"food",     lsu:true,  title:"The Parade Food Truck Rally",     date:"Mar 28",    time:"5:00 PM",  location:"The Parade, LSU Campus",             distance:"0.3 mi", hot:true,  desc:"20+ food trucks lined up on The Parade. From boudin balls to bubble tea — the ultimate campus street food night.", color:"#B7860B", lat:295, lng:210 },
  { id:12, category:"run",      lsu:true,  title:"Tiger Trot 5K",                   date:"Apr 6",     time:"7:30 AM",  location:"LSU Lakes, Baton Rouge",             distance:"0.5 mi", hot:false, desc:"A scenic 5K around the beautiful LSU Lakes. All fitness levels welcome. Post-race crawfish breakfast included!", color:"#059669", lat:338, lng:165 },
  { id:13, category:"bar",      lsu:true,  title:"Tigerland Bar Crawl",             date:"Apr 11",    time:"8:00 PM",  location:"Tigerland, Baton Rouge",             distance:"0.6 mi", hot:true,  desc:"Hit every legendary Tigerland bar in one epic crawl. Drink specials, costume contest, DJ at every stop.", color:"#EA580C", lat:355, lng:195 },
  { id:21, category:"bar",      lsu:true,  title:"Fred's Tailgate Thursday",        date:"Mar 27",    time:"5:00 PM",  location:"Fred's on the River, Tigerland",      distance:"0.5 mi", hot:true,  desc:"LSU game-day vibes every Thursday. $3 domestics, live DJ, crawfish when in season. Purple & gold crowd.", color:"#EA580C", lat:348, lng:200 },
  { id:22, category:"openmic", lsu:true,  title:"LSU Union Open Mic Night",         date:"Mar 24",    time:"7:00 PM",  location:"LSU Student Union, Free Speech Alley", distance:"0.2 mi", hot:false, desc:"Students and locals share music, comedy, and poetry. First-come sign-up. Free and open to all.", color:"#E11D48", lat:308, lng:178 },
  { id:14, category:"art",      lsu:true,  title:"LSU Student Art Showcase",        date:"Apr 4",     time:"6:00 PM",  location:"LSU Museum of Art, Shaw Center",     distance:"0.4 mi", hot:false, desc:"Annual showcase of LSU fine arts students. Paintings, sculpture, digital art, and live performance pieces.", color:"#0891B2", lat:325, lng:215 },
  { id:15, category:"festival", lsu:true,  title:"Highland Road Festival",          date:"Apr 18–19", time:"10:00 AM", location:"Highland Road Park",                 distance:"0.7 mi", hot:true,  desc:"Family-friendly arts, crafts and music festival along the iconic Highland Road corridor near LSU.", color:"#DB2777", lat:342, lng:240 },
  { id:16, category:"music",    lsu:true,  title:"Bluegrass on the Bayou",          date:"Apr 25",    time:"4:00 PM",  location:"LSU Lakes Amphitheater",             distance:"0.5 mi", hot:false, desc:"Sunset bluegrass session by the LSU Lakes. Local bands, craft beer garden, food vendors. Dogs welcome!", color:"#7C3AED", lat:360, lng:175 },
  { id:17, category:"social",   lsu:true,  title:"Campus Comedy Night",             date:"Mar 26",    time:"7:30 PM",  location:"LSU Student Union Theater",          distance:"0.3 mi", hot:false, desc:"Stand-up comedy showcase featuring LSU students and a headlining Louisiana comedian. Free admission.", color:"#9333EA", lat:312, lng:198 },
  { id:18, category:"food",     lsu:true,  title:"Cajun Cookoff at the PMAC",       date:"Apr 8",     time:"11:00 AM", location:"Pete Maravich Assembly Center",       distance:"0.4 mi", hot:true,  desc:"Parish-wide gumbo and jambalaya cookoff. Student orgs, local restaurants, and campus chefs all competing.", color:"#B7860B", lat:330, lng:182 },
];

const NOTIFS = [
  { id:1, icon:"🔥", title:"Hot near LSU!", body:"Tigerland Bar Crawl is trending tonight", time:"now" },
  { id:2, icon:"🏈", title:"Tailgate alert!", body:"Tiger Stadium lots open in 2 hours", time:"5m ago" },
  { id:3, icon:"🍴", title:"Food trucks incoming", body:"The Parade Food Truck Rally starts at 5 PM", time:"1h ago" },
];

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Stars() {
  const s = Array.from({length:22},(_,i)=>({id:i,top:Math.random()*100,left:Math.random()*100,size:Math.random()*2.5+1,d:Math.random()*3}));
  return <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
    {s.map(x=><div key={x.id} style={{position:"absolute",top:`${x.top}%`,left:`${x.left}%`,width:x.size,height:x.size,borderRadius:"50%",background:C.goldLight,opacity:.18,animation:`tw ${2+x.d}s ease-in-out infinite alternate`,animationDelay:`${x.d}s`}}/>)}
  </div>;
}
function Fleur({style}) {
  return <svg viewBox="0 0 60 80" style={style} fill={C.gold} opacity=".07">
    <path d="M30 0C30 0 20 15 20 25c0 7 5 12 10 13 5-1 10-6 10-13C40 15 30 0 30 0z"/>
    <path d="M30 38C30 38 10 30 5 42c-3 8 3 16 15 14 5-1 8-6 10-11 2 5 5 10 10 11 12 2 18-6 15-14C50 30 30 38 30 38z"/>
    <rect x="25" y="55" width="10" height="18" rx="3"/>
    <rect x="18" y="68" width="24" height="5" rx="2.5"/>
  </svg>;
}

// ── LSU Badge ─────────────────────────────────────────────────────────────────
function LSUBadge() {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:4,
      background:`linear-gradient(135deg,${C.lsuPurple},#5a2d9e)`,
      border:`1px solid ${C.lsuGold}`,
      color:C.lsuGold,fontSize:10,fontWeight:800,
      padding:"3px 9px",borderRadius:99,
      fontFamily:"monospace",letterSpacing:.8,flexShrink:0,
    }}>🐯 LSU AREA</span>
  );
}

// ── Notification Banner ───────────────────────────────────────────────────────
function NotifBanner({ notif, onDismiss }) {
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    setTimeout(()=>setVis(true),80);
    const t=setTimeout(()=>{ setVis(false); setTimeout(onDismiss,400); },4500);
    return()=>clearTimeout(t);
  },[]);
  return (
    <div style={{position:"fixed",top:16,left:14,right:14,zIndex:9999,background:"linear-gradient(135deg,rgba(59,7,100,.97),rgba(26,5,51,.97))",border:`1.5px solid rgba(245,197,24,.4)`,borderRadius:18,padding:"14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 40px rgba(0,0,0,.6)",backdropFilter:"blur(20px)",transform:vis?"translateY(0)":"translateY(-130%)",opacity:vis?1:0,transition:"all .4s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{width:44,height:44,borderRadius:13,flexShrink:0,background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 0 12px rgba(245,197,24,.4)`}}>{notif.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif"}}>{notif.title}</div>
        <div style={{fontSize:12,color:"rgba(253,230,138,.75)",marginTop:3,lineHeight:1.4}}>{notif.body}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
        <div style={{fontSize:11,color:`rgba(245,197,24,.5)`,fontFamily:"monospace"}}>{notif.time}</div>
        <button onClick={()=>{setVis(false);setTimeout(onDismiss,400);}} style={{background:"none",border:"none",color:`rgba(245,197,24,.5)`,fontSize:16,cursor:"pointer",padding:0,lineHeight:1}}>✕</button>
      </div>
    </div>
  );
}

// ── Onboarding ────────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState([]);
  const [anim, setAnim] = useState(true);
  function next() { setAnim(false); setTimeout(()=>{ setStep(s=>s+1); setAnim(true); },280); }
  function toggle(id) { setSel(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]); }
  return (
    <div style={{position:"fixed",inset:0,zIndex:50,background:`linear-gradient(170deg,${C.dark} 0%,#0A0118 60%,${C.darkMid} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",opacity:anim?1:0,transform:anim?"translateY(0)":"translateY(20px)",transition:"all .28s ease",overflowY:"auto"}}>
      <Stars/>
      <Fleur style={{position:"fixed",top:30,right:10,width:110,height:140}}/>
      <Fleur style={{position:"fixed",bottom:80,left:5,width:90,height:115}}/>

      {step===0&&<div style={{textAlign:"center",position:"relative",zIndex:2,maxWidth:400,width:"100%"}}>
        <div style={{width:96,height:96,borderRadius:28,margin:"0 auto 28px",background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,fontFamily:"'Playfair Display',serif",fontWeight:900,color:C.dark,boxShadow:`0 0 50px rgba(245,197,24,.5)`}}>G</div>
        <div style={{fontSize:40,fontWeight:900,color:"white",fontFamily:"'Playfair Display',serif",lineHeight:1.1,marginBottom:10}}>Geaux <span style={{color:C.gold}}>Play</span></div>
        <div style={{fontSize:16,color:"rgba(253,230,138,.65)",marginBottom:52,lineHeight:1.7}}>Your guide to the best events<br/>in Baton Rouge & LSU, Louisiana</div>
        <button onClick={next} style={{background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,border:"none",borderRadius:18,padding:"18px 52px",color:C.dark,fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 28px rgba(245,197,24,.4)`,width:"100%"}}>Let's Geaux! →</button>
        <div style={{marginTop:20,fontSize:12,color:"rgba(245,197,24,.3)",fontFamily:"monospace",letterSpacing:1}}>FREE · NO ADS · ALWAYS LOCAL</div>
      </div>}

      {step===1&&<div style={{width:"100%",position:"relative",zIndex:2,maxWidth:480}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{fontSize:30,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",marginBottom:8}}>What's your <span style={{color:C.gold}}>vibe?</span></div>
          <div style={{fontSize:14,color:"rgba(253,230,138,.55)"}}>Pick the events you love most</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:26}}>
          {CATEGORIES.map(c=>{const on=sel.includes(c.id);return <button key={c.id} onClick={()=>toggle(c.id)} style={{background:on?`${c.color}33`:"rgba(255,255,255,.05)",border:`2px solid ${on?c.color:"rgba(255,255,255,.08)"}`,borderRadius:16,padding:"18px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",transition:"all .18s ease",transform:on?"scale(1.05)":"scale(1)"}}>
            <span style={{fontSize:28}}>{c.icon}</span>
            <span style={{fontSize:13,fontWeight:700,color:on?"white":"rgba(255,255,255,.45)",fontFamily:"'Playfair Display',serif",textAlign:"center",lineHeight:1.2}}>{c.label}</span>
            {on&&<div style={{width:6,height:6,borderRadius:"50%",background:C.gold}}/>}
          </button>;})}
        </div>
        <button onClick={next} disabled={!sel.length} style={{width:"100%",background:sel.length?`linear-gradient(135deg,${C.goldDark},${C.gold})`:"rgba(255,255,255,.08)",border:"none",borderRadius:16,padding:"17px 0",color:sel.length?C.dark:"rgba(255,255,255,.25)",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,cursor:sel.length?"pointer":"default",transition:"all .2s"}}>
          {sel.length===0?"Pick at least one":`Continue (${sel.length} selected) →`}
        </button>
      </div>}

      {step===2&&<div style={{width:"100%",textAlign:"center",position:"relative",zIndex:2,maxWidth:400}}>
        <div style={{fontSize:60,marginBottom:20}}>📍</div>
        <div style={{fontSize:28,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",marginBottom:12}}>You're in <span style={{color:C.gold}}>Baton Rouge</span></div>
        <div style={{fontSize:14,color:"rgba(253,230,138,.58)",marginBottom:16,lineHeight:1.7}}>We'll show you events across BR and the LSU campus area.</div>
        <div style={{background:"rgba(245,197,24,.08)",border:`1px solid rgba(245,197,24,.2)`,borderRadius:14,padding:"16px 18px",marginBottom:16,textAlign:"left"}}>
          <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:1.5,marginBottom:8}}>YOUR AREA</div>
          <div style={{fontSize:16,color:"white",fontWeight:600}}>📍 Baton Rouge, Louisiana</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.38)",marginTop:4}}>Events within 10 miles shown by default</div>
        </div>
        <div style={{background:`rgba(70,29,124,.3)`,border:`1px solid ${C.lsuGold}44`,borderRadius:14,padding:"14px 18px",marginBottom:28,textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>🐯</span>
          <div>
            <div style={{fontSize:13,color:C.lsuGold,fontWeight:700,fontFamily:"monospace",letterSpacing:.5}}>LSU CAMPUS COVERAGE</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>Tigerland, The Parade, Free Speech Alley, LSU Lakes & more</div>
          </div>
        </div>
        <button onClick={()=>onDone(sel)} style={{width:"100%",background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,border:"none",borderRadius:16,padding:"18px 0",color:C.dark,fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 28px rgba(245,197,24,.38)`}}>Start Exploring →</button>
      </div>}

      {step>0&&<div style={{position:"fixed",bottom:50,display:"flex",gap:10,zIndex:2}}>
        {[1,2].map(i=><div key={i} style={{width:step===i?24:8,height:8,borderRadius:99,background:step===i?C.gold:"rgba(245,197,24,.2)",transition:"all .3s"}}/>)}
      </div>}
    </div>
  );
}

// ── Map View ──────────────────────────────────────────────────────────────────
function MapView({ events, onPick }) {
  const [hov, setHov] = useState(null);
  const river=[{x:55,y:50},{x:65,y:85},{x:58,y:118},{x:68,y:148},{x:56,y:178},{x:63,y:210},{x:55,y:240},{x:60,y:270}];
  const roads=[
    {x1:85,y1:90,x2:340,y2:90},{x1:85,y1:140,x2:340,y2:140},{x1:85,y1:190,x2:340,y2:190},
    {x1:85,y1:240,x2:340,y2:240},{x1:85,y1:290,x2:340,y2:290},{x1:85,y1:340,x2:340,y2:340},{x1:85,y1:385,x2:340,y2:385},
    {x1:140,y1:50,x2:140,y2:430},{x1:195,y1:50,x2:195,y2:430},{x1:255,y1:50,x2:255,y2:430},{x1:305,y1:50,x2:305,y2:430},
  ];
  return (
    <div style={{flex:1,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#0a1628 0%,#0d1f3c 100%)"}}>
      <svg width="100%" height="100%" viewBox="0 0 390 480" preserveAspectRatio="xMidYMid meet" style={{position:"absolute",inset:0}}>
        {roads.map((r,i)=><line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="rgba(124,58,237,.13)" strokeWidth="1.5"/>)}
        <polyline points={river.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="rgba(8,145,178,.38)" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points={river.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="rgba(8,145,178,.7)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="28" y="175" fill="rgba(8,145,178,.55)" fontSize="9" transform="rotate(-90,28,175)" fontFamily="monospace" letterSpacing="1">MISSISSIPPI</text>

        {/* LSU Campus zone highlight */}
        <rect x="160" y="278" width="170" height="140" rx="18" fill="rgba(70,29,124,.22)" stroke={C.lsuGold} strokeWidth="1.5" strokeDasharray="6,4"/>
        <text x="245" y="298" textAnchor="middle" fill={C.lsuGold} fontSize="8.5" fontFamily="monospace" letterSpacing="1" opacity=".7">🐯 LSU AREA</text>

        {/* Neighborhood labels */}
        {[{x:155,y:80,t:"DOWNTOWN"},{x:215,y:105,t:"MID CITY"},{x:215,y:250,t:"PERKINS"},{x:130,y:310,t:"SOUTH BR"},{x:252,y:370,t:"LSU / TIGERLAND"}].map((n,i)=>(
          <text key={i} x={n.x} y={n.y} fill="rgba(245,197,24,.18)" fontSize="7.5" fontFamily="monospace" letterSpacing="1">{n.t}</text>
        ))}

        {/* Event pins */}
        {events.map(ev=>{
          const h=hov===ev.id;
          const pinColor = ev.lsu ? C.lsuGold : ev.color;
          return <g key={ev.id} onClick={()=>onPick(ev)} onMouseEnter={()=>setHov(ev.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
            {h&&<circle cx={ev.lng} cy={ev.lat} r="28" fill={pinColor} opacity=".14"/>}
            <circle cx={ev.lng} cy={ev.lat} r={h?19:13} fill={pinColor} opacity={h?1:.88} style={{transition:"all .2s",filter:`drop-shadow(0 0 ${h?14:6}px ${pinColor})`}}/>
            <circle cx={ev.lng} cy={ev.lat} r={h?9:5.5} fill="white" opacity=".92"/>
            <text x={ev.lng} y={ev.lat+4} textAnchor="middle" fontSize="7.5" fill={ev.lsu?C.lsuPurple:ev.color} fontFamily="monospace" fontWeight="bold">
              {CATEGORIES.find(c=>c.id===ev.category)?.icon||"•"}
            </text>
            {h&&<>
              <rect x={ev.lng-60} y={ev.lat-58} width="120" height="36" rx="8" fill="rgba(10,1,25,.97)" stroke={ev.lsu?C.lsuGold:C.gold} strokeWidth="1.2"/>
              <text x={ev.lng} y={ev.lat-40} textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold">{ev.title.length>20?ev.title.slice(0,20)+"…":ev.title}</text>
              <text x={ev.lng} y={ev.lat-26} textAnchor="middle" fontSize="8" fill={ev.lsu?C.lsuGold:C.gold} fontFamily="monospace">{ev.distance} away {ev.lsu?"· 🐯":""}</text>
            </>}
          </g>;
        })}
        {/* You are here */}
        <circle cx="200" cy="310" r="22" fill={C.gold} opacity=".1"/>
        <circle cx="200" cy="310" r="8" fill="none" stroke={C.gold} strokeWidth="2.5"/>
        <circle cx="200" cy="310" r="3.5" fill={C.gold}/>
        <text x="200" y="338" textAnchor="middle" fill={C.gold} fontSize="8" fontFamily="monospace" opacity=".6">YOU</text>
      </svg>
      {/* Legend */}
      <div style={{position:"absolute",bottom:12,left:12,right:12,background:"rgba(10,1,25,.93)",borderRadius:14,border:`1px solid rgba(245,197,24,.18)`,padding:"10px 14px",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:1}}>{events.length} EVENTS</span>
        {CATEGORIES.map(c=><div key={c.id} style={{display:"flex",alignItems:"center",gap:4}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:c.id==="tailgate"?C.lsuGold:c.color}}/>
          <span style={{fontSize:9,color:"rgba(255,255,255,.45)",fontFamily:"monospace"}}>{c.label}</span>
        </div>)}
      </div>
    </div>
  );
}

// ── Submit Form ───────────────────────────────────────────────────────────────
function SubmitForm({ onBack }) {
  const [f, setF] = useState({title:"",category:"",date:"",time:"",location:"",lsu:false,desc:"",org:"",contact:""});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const inp={width:"100%",background:"rgba(255,255,255,.06)",border:`1.5px solid rgba(245,197,24,.15)`,borderRadius:12,padding:"14px 15px",color:"white",fontSize:15,outline:"none",fontFamily:"system-ui",boxSizing:"border-box",colorScheme:"dark"};
  const lbl={fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:1.5,marginBottom:7,display:"block"};
  const ok=f.title&&f.category&&f.date&&f.location;

  async function submit() {
    if(!ok) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1100));
    setLoading(false); setDone(true);
  }

  if(done) return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",textAlign:"center"}}>
    <div style={{width:84,height:84,borderRadius:24,background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,margin:"0 auto 20px",boxShadow:`0 0 40px rgba(245,197,24,.4)`}}>✓</div>
    <div style={{fontSize:26,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",marginBottom:10}}>Event Submitted!</div>
    <div style={{fontSize:15,color:"rgba(253,230,138,.62)",lineHeight:1.75,marginBottom:10}}><strong style={{color:C.gold}}>{f.title}</strong> is under review.</div>
    {f.lsu&&<div style={{background:`rgba(70,29,124,.3)`,border:`1px solid ${C.lsuGold}55`,borderRadius:12,padding:"10px 16px",marginBottom:22,fontSize:13,color:C.lsuGold}}>🐯 Tagged as LSU Area event</div>}
    <button onClick={onBack} style={{background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,border:"none",borderRadius:14,padding:"15px 36px",color:C.dark,fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,cursor:"pointer"}}>Back to Events</button>
  </div>;

  return <div style={{flex:1,overflowY:"auto",padding:"0 20px 110px"}}>
    <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:2,marginBottom:4}}>FREE LISTING</div>
    <div style={{fontSize:24,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",marginBottom:4}}>Submit Your Event</div>
    <div style={{fontSize:13,color:"rgba(253,230,138,.45)",marginBottom:20}}>Reach thousands of BR locals — always free</div>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><label style={lbl}>Event Name *</label><input value={f.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Second Line Sundays" style={inp}/></div>
      <div>
        <label style={lbl}>Category *</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
          {CATEGORIES.map(c=>{const on=f.category===c.id;return <button key={c.id} onClick={()=>set("category",c.id)} style={{background:on?`${c.color}44`:"rgba(255,255,255,.05)",border:`1.5px solid ${on?c.color:"rgba(255,255,255,.08)"}`,borderRadius:11,padding:"11px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer"}}>
            <span style={{fontSize:22}}>{c.icon}</span>
            <span style={{fontSize:11,color:on?"white":"rgba(255,255,255,.4)",fontFamily:"monospace"}}>{c.label}</span>
          </button>;})}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><label style={lbl}>Date *</label><input type="date" value={f.date} onChange={e=>set("date",e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Time</label><input type="time" value={f.time} onChange={e=>set("time",e.target.value)} style={inp}/></div>
      </div>
      <div><label style={lbl}>Venue / Location *</label><input value={f.location} onChange={e=>set("location",e.target.value)} placeholder="e.g. Tiger Stadium, Free Speech Alley" style={inp}/></div>

      {/* LSU Area toggle */}
      <div onClick={()=>set("lsu",!f.lsu)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:f.lsu?`rgba(70,29,124,.4)`:"rgba(255,255,255,.05)",border:`1.5px solid ${f.lsu?C.lsuGold:"rgba(255,255,255,.08)"}`,borderRadius:13,padding:"14px 16px",cursor:"pointer",transition:"all .2s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🐯</span>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:f.lsu?C.lsuGold:"rgba(255,255,255,.7)",fontFamily:"'Playfair Display',serif"}}>LSU Area Event</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.38)",marginTop:2}}>Near campus, Tigerland, or LSU Lakes</div>
          </div>
        </div>
        <div style={{width:44,height:26,borderRadius:99,background:f.lsu?C.lsuGold:"rgba(255,255,255,.15)",position:"relative",transition:"all .25s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:f.lsu?20:3,width:20,height:20,borderRadius:"50%",background:"white",transition:"all .25s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
        </div>
      </div>

      <div><label style={lbl}>Description</label><textarea value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="What makes your event special?" rows={4} style={{...inp,resize:"none",lineHeight:1.65}}/></div>
      <div style={{background:"rgba(245,197,24,.07)",border:`1px solid rgba(245,197,24,.14)`,borderRadius:13,padding:16}}>
        <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>ORGANIZER INFO</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input value={f.org} onChange={e=>set("org",e.target.value)} placeholder="Organizer / Organization name" style={inp}/>
          <input value={f.contact} onChange={e=>set("contact",e.target.value)} placeholder="Contact email or phone" style={inp}/>
        </div>
      </div>
      <button onClick={submit} disabled={!ok||loading} style={{width:"100%",background:ok&&!loading?`linear-gradient(135deg,${C.goldDark},${C.gold})`:"rgba(255,255,255,.08)",border:"none",borderRadius:14,padding:"17px 0",color:ok&&!loading?C.dark:"rgba(255,255,255,.22)",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,cursor:ok&&!loading?"pointer":"default",transition:"all .2s"}}>
        {loading?"Submitting…":ok?"Submit Event for Free →":"Fill required fields *"}
      </button>
    </div>
  </div>;
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ ev, onClick }) {
  const [press, setPress] = useState(false);
  return (
    <div onClick={()=>onClick(ev)} onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)} onMouseLeave={()=>setPress(false)}
      style={{background:ev.lsu?"linear-gradient(145deg,rgba(70,29,124,.55),rgba(26,5,51,.96))":"linear-gradient(145deg,rgba(59,7,100,.85),rgba(26,5,51,.96))",border:`1.5px solid ${ev.lsu?`rgba(253,208,35,.28)`:"rgba(245,197,24,.16)"}`,borderRadius:20,padding:"18px 18px 16px",cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.35)",transition:"transform .15s ease",transform:press?"scale(.98)":"scale(1)"}}>
      {/* Accent bar */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:ev.lsu?`linear-gradient(90deg,${C.lsuPurple},${C.lsuGold})`:`linear-gradient(90deg,${ev.color},${C.gold})`,borderRadius:"20px 20px 0 0"}}/>
      {/* Badges row */}
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6,flexWrap:"wrap"}}>
        <div style={{fontSize:11,color:ev.lsu?C.lsuGold:C.gold,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:"monospace"}}>
          {ev.date} · {ev.time}
        </div>
        {ev.lsu&&<LSUBadge/>}
        {ev.hot&&<span style={{background:"linear-gradient(135deg,#FF6B35,#FF4500)",color:"white",fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:99,letterSpacing:1,fontFamily:"monospace"}}>🔥 HOT</span>}
      </div>
      {/* Title */}
      <div style={{fontSize:18,fontWeight:700,color:"white",fontFamily:"'Playfair Display',serif",lineHeight:1.35,marginBottom:8}}>
        {ev.title}
      </div>
      {/* Location */}
      <div style={{fontSize:13,color:"rgba(253,230,138,.65)",marginBottom:10,display:"flex",alignItems:"center",gap:4}}>
        <span>📍</span>
        <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.location}</span>
        <span style={{color:ev.lsu?C.lsuGold:C.gold,fontWeight:700,fontSize:12,flexShrink:0,marginLeft:8}}>{ev.distance}</span>
      </div>
      {/* Description */}
      <div style={{fontSize:14,color:"rgba(255,255,255,.52)",lineHeight:1.6}}>{ev.desc}</div>
    </div>
  );
}

// ── Event Modal ───────────────────────────────────────────────────────────────
function EventModal({ ev, onClose, tip, loadingTip }) {
  if(!ev) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(5,1,15,.88)",backdropFilter:"blur(14px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",animation:"slideUp .32s cubic-bezier(.34,1.3,.64,1)"}}>
      <div style={{background:ev.lsu?`linear-gradient(180deg,#1e0a3c 0%,${C.dark} 100%)`:`linear-gradient(180deg,${C.darkMid} 0%,${C.dark} 100%)`,borderRadius:"28px 28px 0 0",border:`1.5px solid ${ev.lsu?"rgba(253,208,35,.3)":"rgba(245,197,24,.22)"}`,borderBottom:"none",padding:"24px 22px 40px",maxHeight:"82vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div style={{flex:1,paddingRight:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
              <div style={{fontSize:12,color:ev.lsu?C.lsuGold:C.gold,fontFamily:"monospace",letterSpacing:2}}>{ev.date} · {ev.time}</div>
              {ev.lsu&&<LSUBadge/>}
            </div>
            <div style={{fontSize:22,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",lineHeight:1.3}}>{ev.title}</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(245,197,24,.12)",border:"none",color:C.gold,fontSize:18,borderRadius:"50%",width:38,height:38,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          <span style={{background:"rgba(245,197,24,.12)",color:C.gold,fontSize:12,padding:"5px 12px",borderRadius:99,fontFamily:"monospace"}}>📍 {ev.location}</span>
          <span style={{background:"rgba(124,58,237,.22)",color:"#C4B5FD",fontSize:12,padding:"5px 12px",borderRadius:99,fontFamily:"monospace"}}>📏 {ev.distance}</span>
          {ev.hot&&<span style={{background:"linear-gradient(135deg,#FF6B35,#FF4500)",color:"white",fontSize:11,padding:"5px 12px",borderRadius:99,fontFamily:"monospace",fontWeight:800}}>🔥 TRENDING</span>}
        </div>
        <div style={{background:"rgba(91,33,182,.18)",border:"1px solid rgba(245,197,24,.1)",borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:2,marginBottom:8}}>ABOUT</div>
          <div style={{fontSize:15,color:"rgba(255,255,255,.8)",lineHeight:1.7}}>{ev.desc}</div>
        </div>
        {(loadingTip||tip)&&<div style={{background:"linear-gradient(135deg,rgba(59,7,100,.45),rgba(183,134,11,.1))",border:`1px solid rgba(245,197,24,.2)`,borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:2,marginBottom:8,display:"flex",gap:6,alignItems:"center"}}>✦ AI CONCIERGE {loadingTip&&<span style={{animation:"blink 1s infinite"}}>· thinking…</span>}</div>
          <div style={{fontSize:14,color:"rgba(253,230,138,.9)",lineHeight:1.7}}>{tip}</div>
        </div>}
        <button style={{width:"100%",background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,border:"none",borderRadius:14,padding:"17px 0",fontSize:17,fontFamily:"'Playfair Display',serif",fontWeight:800,color:C.dark,cursor:"pointer"}}>🎟 Get Tickets / RSVP</button>
      </div>
    </div>
  );
}

// ── Zone Filter Bar ───────────────────────────────────────────────────────────
function ZoneFilter({ zone, setZone }) {
  return (
    <div style={{display:"flex",gap:8,padding:"0 20px 10px",flexShrink:0,zIndex:10}}>
      {[
        {id:"all",    label:"All of BR",   icon:"📍"},
        {id:"lsu",    label:"LSU Area",    icon:"🐯"},
        {id:"br",     label:"Downtown BR", icon:"🏙"},
      ].map(z=>{const on=zone===z.id; return (
        <button key={z.id} onClick={()=>setZone(z.id)} style={{
          display:"flex",alignItems:"center",gap:5,
          padding:"8px 14px",borderRadius:99,
          border:`1.5px solid ${on?(z.id==="lsu"?C.lsuGold:C.gold):"rgba(255,255,255,.1)"}`,
          background:on?(z.id==="lsu"?`linear-gradient(135deg,${C.lsuPurple},#5a2d9e)`:`linear-gradient(135deg,${C.goldDark},${C.gold})`):"rgba(255,255,255,.05)",
          color:on?(z.id==="lsu"?C.lsuGold:C.dark):"rgba(255,255,255,.45)",
          fontSize:12,fontFamily:"monospace",fontWeight:on?700:400,
          cursor:"pointer",whiteSpace:"nowrap",transition:"all .18s",flexShrink:0,
        }}>
          <span style={{fontSize:13}}>{z.icon}</span>{z.label}
        </button>
      );})}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function GeauxPlay() {
  const [onboarded, setOnboarded]   = useState(false);
  const [tab, setTab]               = useState("events");
  const [cat, setCat]               = useState("all");
  const [zone, setZone]             = useState("all");
  const [search, setSearch]         = useState("");
  const [selEv, setSelEv]           = useState(null);
  const [tip, setTip]               = useState("");
  const [loadTip, setLoadTip]       = useState(false);
  const [notifs, setNotifs]         = useState([]);
  const [notifFired, setNotifFired] = useState(false);

  useEffect(()=>{
    if(!onboarded||notifFired) return;
    const t=setTimeout(()=>{ setNotifs([NOTIFS[0]]); setNotifFired(true); },3200);
    return()=>clearTimeout(t);
  },[onboarded,notifFired]);

  async function openEvent(ev) {
    setSelEv(ev); setTip(""); setLoadTip(true);
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:220,messages:[{role:"user",content:`As a friendly Baton Rouge local${ev.lsu?" and LSU fan":""}, give 2 quick insider tips for attending "${ev.title}" at ${ev.location} on ${ev.date}. Under 65 words, conversational, include one Louisiana cultural detail${ev.lsu?", and one LSU-specific tip":""}.  No bullets.`}]})});
      const d=await r.json();
      setTip(d.content?.find(b=>b.type==="text")?.text||"Laissez les bons temps rouler! Arrive early and bring cash for local vendors.");
    } catch {
      setTip("Laissez les bons temps rouler! Arrive early and bring cash for local vendors.");
    }
    setLoadTip(false);
  }

  const filtered = EVENTS.filter(e=>{
    const mc = cat==="all" || e.category===cat;
    const mz = zone==="all" || (zone==="lsu"&&e.lsu) || (zone==="br"&&!e.lsu);
    const ms = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    return mc&&mz&&ms;
  });

  const lsuCount = EVENTS.filter(e=>e.lsu).length;

  const TABS=[
    {id:"events",icon:"✦",label:"Events"},
    {id:"map",   icon:"🗺",label:"Map"},
    {id:"submit",icon:"＋",label:"Submit"},
    {id:"saved", icon:"❤",label:"Saved"},
  ];

  return (
    <div style={{width:"100%",height:"100dvh",background:`linear-gradient(170deg,${C.dark} 0%,#0A0118 60%,${C.darkMid} 100%)`,display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&display=swap');
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        body{margin:0;padding:0;background:${C.dark};}
        @keyframes tw{from{opacity:.06}to{opacity:.32}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(245,197,24,.25);border-radius:99px}
        input,textarea,button{-webkit-appearance:none;}
      `}</style>

      <Stars/>
      <Fleur style={{position:"fixed",top:-10,right:-10,width:130,height:160,zIndex:1,pointerEvents:"none"}}/>
      <Fleur style={{position:"fixed",bottom:90,left:-15,width:110,height:140,zIndex:1,pointerEvents:"none"}}/>

      {notifs.map(n=><NotifBanner key={n.id} notif={n} onDismiss={()=>setNotifs(q=>q.filter(x=>x.id!==n.id))}/>)}

      {/* ── EVENTS TAB ── */}
      {tab==="events"&&<>
        <div style={{padding:"max(env(safe-area-inset-top),16px) 20px 0",flexShrink:0,zIndex:10}}>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:40,height:40,borderRadius:12,background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:C.dark,fontFamily:"'Playfair Display',serif",boxShadow:`0 0 16px rgba(245,197,24,.45)`,flexShrink:0}}>G</div>
              <div>
                <div style={{fontSize:26,fontWeight:900,color:"white",fontFamily:"'Playfair Display',serif",lineHeight:1,letterSpacing:-.5}}>Geaux <span style={{color:C.gold}}>Play</span></div>
                <div style={{fontSize:12,color:"rgba(253,230,138,.5)",marginTop:2}}>📍 Baton Rouge · 🐯 LSU Area</div>
              </div>
            </div>
            <button onClick={()=>setNotifs([NOTIFS[Math.floor(Math.random()*NOTIFS.length)]])} style={{width:42,height:42,borderRadius:13,background:"rgba(245,197,24,.1)",border:`1.5px solid rgba(245,197,24,.2)`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20,flexShrink:0}}>🔔</button>
          </div>
          {/* Search */}
          <div style={{marginTop:12,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(245,197,24,.13)",borderRadius:14,padding:"12px 15px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{color:"rgba(245,197,24,.45)",fontSize:16,flexShrink:0}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search events, venues, LSU..." style={{background:"none",border:"none",outline:"none",color:"white",fontSize:15,flex:1,fontFamily:"system-ui",minWidth:0}}/>
            {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"rgba(245,197,24,.45)",cursor:"pointer",fontSize:16,padding:0,flexShrink:0}}>✕</button>}
          </div>
        </div>

        {/* LSU Area promo banner */}
        {zone==="all"&&<div onClick={()=>setZone("lsu")} style={{margin:"10px 20px 0",background:`linear-gradient(135deg,rgba(70,29,124,.5),rgba(91,45,158,.3))`,border:`1.5px solid ${C.lsuGold}44`,borderRadius:14,padding:"12px 15px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",flexShrink:0,zIndex:10}}>
          <span style={{fontSize:26,flexShrink:0}}>🐯</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:700,color:C.lsuGold,fontFamily:"'Playfair Display',serif"}}>LSU Area Events</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:1}}>{lsuCount} events near campus · Tigerland · The Parade · LSU Lakes</div>
          </div>
          <div style={{fontSize:13,color:C.lsuGold,fontFamily:"monospace",flexShrink:0}}>See all →</div>
        </div>}

        {/* Zone filter */}
        <div style={{paddingTop:10,flexShrink:0,zIndex:10}}>
          <ZoneFilter zone={zone} setZone={setZone}/>
        </div>

        {/* Category pills */}
        <div style={{display:"flex",gap:9,padding:"0 20px 10px",overflowX:"auto",scrollbarWidth:"none",flexShrink:0,zIndex:10}}>
          {ALL_CATS.map(c=>{const on=cat===c.id;return(
            <button key={c.id} onClick={()=>setCat(c.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:99,border:`2px solid ${on?C.gold:"rgba(245,197,24,.15)"}`,background:on?`linear-gradient(135deg,${C.goldDark},${C.gold})`:"rgba(91,33,182,.22)",color:on?C.dark:C.goldLight,fontFamily:"'Playfair Display',serif",fontWeight:on?700:400,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .18s"}}>
              <span style={{fontSize:14}}>{c.icon}</span>{c.label}
            </button>
          );})}
        </div>

        {/* Count */}
        <div style={{padding:"0 20px 8px",flexShrink:0,zIndex:10}}>
          <span style={{fontSize:11,color:"rgba(253,230,138,.4)",fontFamily:"monospace",letterSpacing:1.5}}>
            {filtered.length} EVENTS {zone==="lsu"?"NEAR LSU":zone==="br"?"IN DOWNTOWN BR":"NEAR YOU"}
          </span>
        </div>

        {/* Feed */}
        <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",display:"flex",flexDirection:"column",gap:13,zIndex:10}}>
          {filtered.map(ev=><EventCard key={ev.id} ev={ev} onClick={openEvent}/>)}
          {!filtered.length&&<div style={{textAlign:"center",padding:"50px 0",color:"rgba(245,197,24,.32)",fontFamily:"monospace",fontSize:14}}>No events found. Try a different filter!</div>}
        </div>
      </>}

      {/* ── MAP TAB ── */}
      {tab==="map"&&<>
        <div style={{padding:"max(env(safe-area-inset-top),16px) 20px 12px",flexShrink:0,zIndex:10}}>
          <div style={{fontSize:11,color:C.gold,fontFamily:"monospace",letterSpacing:2,marginBottom:3}}>EVENT MAP</div>
          <div style={{fontSize:24,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif"}}>Baton Rouge <span style={{color:C.gold}}>&</span> <span style={{color:C.lsuGold}}>LSU</span></div>
          <div style={{fontSize:13,color:"rgba(253,230,138,.45)",marginTop:3}}>Tap any pin for details · 🐯 = LSU Area</div>
        </div>
        <MapView events={EVENTS} onPick={openEvent}/>
      </>}

      {/* ── SUBMIT TAB ── */}
      {tab==="submit"&&<>
        <div style={{padding:"max(env(safe-area-inset-top),16px) 20px 10px",flexShrink:0,zIndex:10}}>
          <button onClick={()=>setTab("events")} style={{background:"none",border:"none",color:C.gold,fontSize:14,cursor:"pointer",fontFamily:"monospace",padding:0,marginBottom:6}}>← Back</button>
        </div>
        <SubmitForm onBack={()=>setTab("events")}/>
      </>}

      {/* ── SAVED TAB ── */}
      {tab==="saved"&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px",textAlign:"center",zIndex:10}}>
        <div style={{fontSize:56,marginBottom:16}}>❤</div>
        <div style={{fontSize:24,fontWeight:800,color:"white",fontFamily:"'Playfair Display',serif",marginBottom:10}}>No saved events yet</div>
        <div style={{fontSize:15,color:"rgba(253,230,138,.52)",lineHeight:1.75,marginBottom:30}}>Tap ❤ on any event to save it.<br/>Never miss a good time in BR or at LSU.</div>
        <button onClick={()=>setTab("events")} style={{background:`linear-gradient(135deg,${C.goldDark},${C.gold})`,border:"none",borderRadius:14,padding:"15px 36px",color:C.dark,fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,cursor:"pointer"}}>Browse Events</button>
      </div>}

      {/* ── Bottom Nav ── */}
      <div style={{flexShrink:0,zIndex:20,background:`linear-gradient(0deg,${C.dark} 70%,transparent)`,paddingBottom:`env(safe-area-inset-bottom,12px)`}}>
        <div style={{display:"flex",justifyContent:"space-around",padding:"10px 16px 8px"}}>
          {TABS.map(t=>{const on=tab===t.id;return(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",flex:1}}>
              <div style={{width:48,height:48,borderRadius:15,background:on?`linear-gradient(135deg,${C.goldDark},${C.gold})`:"rgba(255,255,255,.06)",border:on?"none":"1.5px solid rgba(245,197,24,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:on?C.dark:"rgba(245,197,24,.4)",fontWeight:on?900:400,boxShadow:on?`0 4px 18px rgba(245,197,24,.32)`:"none",transition:"all .2s"}}>{t.icon}</div>
              <span style={{fontSize:11,color:on?C.gold:"rgba(255,255,255,.25)",fontFamily:"monospace",letterSpacing:.4}}>{t.label}</span>
            </div>
          );})}
        </div>
      </div>

      {!onboarded&&<Onboarding onDone={()=>setOnboarded(true)}/>}
      {selEv&&<EventModal ev={selEv} onClose={()=>setSelEv(null)} tip={tip} loadingTip={loadTip}/>}
    </div>
  );
}
