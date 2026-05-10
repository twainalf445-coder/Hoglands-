import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--f:#1b3d2a;--f2:#2a5a3f;--f3:#3a7a52;--t:#c4622d;--t2:#e07a45;--g:#2e7d4f;--g2:#dcfce7;--g3:#f0fdf4;--r:#b83232;--r2:#fee2e2;--b:#1d4ed8;--b2:#dbeafe;--gold:#d97706;--cream:#f6ede0;--sand:#e8d9c5;--stone:#c8b89a;--text:#2d1a0a;--muted:#7a6150}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text)}
button{cursor:pointer;font-family:'DM Sans',sans-serif}
.app{display:flex;min-height:100vh}
.login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(150deg,#0f2419 0%,var(--f) 100%)}
.lcard{background:#fff;border-radius:24px;padding:40px 28px;max-width:390px;width:100%;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.4)}
.lcard h1{font-family:'Playfair Display',serif;font-size:28px;margin:12px 0 4px}
.lsub{color:var(--muted);font-size:13px;margin-bottom:28px}
.ulbl{font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
.ubtns{display:flex;flex-direction:column;gap:12px}
.ubtn{width:100%;padding:18px 20px;border-radius:14px;border:2px solid var(--sand);background:#fff;display:flex;align-items:center;gap:14px;cursor:pointer;transition:.2s;text-align:left}
.ubtn:hover{border-color:var(--f);background:#f6fdf9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(27,61,42,.15)}
.ui{font-size:38px}.un{font-size:17px;font-weight:700;color:var(--text)}.ur{font-size:12px;color:var(--muted)}
.lfoot{margin-top:20px;font-size:12px;color:var(--muted)}
.sb{width:228px;min-height:100vh;background:var(--f);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0}
.sbl{padding:20px 18px 14px;border-bottom:1px solid rgba(255,255,255,.1)}
.sbl h1{font-family:'Playfair Display',serif;color:#fff;font-size:19px;line-height:1.25}
.sbl p{color:rgba(255,255,255,.4);font-size:10px;margin-top:4px;letter-spacing:.6px;text-transform:uppercase}
.sbu{margin:12px 12px 4px;background:rgba(255,255,255,.08);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.sbui{font-size:26px;flex-shrink:0}.sbun{font-weight:700;color:#fff;font-size:13px;flex:1;min-width:0}.sbur{font-size:11px;color:rgba(255,255,255,.45)}
.sw{font-size:11px;color:rgba(255,255,255,.4);cursor:pointer;text-decoration:underline;flex-shrink:0}.sw:hover{color:rgba(255,255,255,.8)}
.nav{padding:8px 10px;flex:1}
.ni{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;cursor:pointer;color:rgba(255,255,255,.6);font-size:13.5px;font-weight:500;transition:.15s;margin-bottom:2px}
.ni:hover{background:rgba(255,255,255,.08);color:#fff}.ni.act{background:var(--t);color:#fff}
.nic{font-size:17px;width:22px;text-align:center;flex-shrink:0}
.sbf{padding:14px;border-top:1px solid rgba(255,255,255,.1)}
.herd{background:rgba(255,255,255,.07);border-radius:8px;padding:10px 12px}
.herd p{color:rgba(255,255,255,.38);font-size:10px;margin-bottom:2px}.herd strong{color:var(--gold);font-size:12px}
.main{flex:1;overflow-x:hidden}
.ph{background:linear-gradient(135deg,var(--f) 0%,var(--f2) 60%,var(--f3) 100%);padding:28px 28px 22px;position:relative;overflow:hidden}
.ph::before{content:'';position:absolute;right:-50px;top:-50px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none}
.ph h2{font-family:'Playfair Display',serif;color:#fff;font-size:26px;position:relative}
.ph p{color:rgba(255,255,255,.55);font-size:13px;margin-top:5px;position:relative}
.pb{padding:22px 26px}
.card{background:#fff;border-radius:14px;padding:20px;box-shadow:0 2px 14px rgba(0,0,0,.07);margin-bottom:16px}
.ct{font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.ga{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
.stat{background:#fff;border-radius:13px;padding:18px 16px;box-shadow:0 2px 10px rgba(0,0,0,.07);border-top:3px solid var(--t)}
.stat.g{border-color:var(--g)}.stat.gold{border-color:var(--gold)}.stat.b{border-color:var(--b)}
.si{font-size:26px;margin-bottom:8px}.sv{font-family:'Playfair Display',serif;font-size:30px;color:var(--text);line-height:1}
.sl{font-size:13px;color:var(--muted);font-weight:500;margin-top:4px}.ss{font-size:12px;color:var(--t);font-weight:600;margin-top:3px}
.al{border-radius:11px;padding:14px 16px;margin-bottom:14px;display:flex;gap:11px;align-items:flex-start}
.al.warn{background:#fff8e8;border:1px solid var(--gold);color:#7a5500}
.al.danger{background:var(--r2);border:1px solid #fca5a5;color:#7f1d1d}
.al.success{background:var(--g2);border:1px solid #86efac;color:#14532d}
.al.info{background:var(--b2);border:1px solid #93c5fd;color:#1e3a5f}
.al.forest{background:#f0fdf4;border:1px solid #6ee7b7;color:#064e3b}
.alic{font-size:20px;flex-shrink:0;margin-top:1px}.alt{font-weight:700;margin-bottom:3px}.alb{font-size:13px;margin-top:2px;line-height:1.55}
.eco-card{border-radius:14px;padding:18px;border:2px solid;margin-bottom:12px}
.eco-card.pig{background:#fff9f5;border-color:#fcd9c0}.eco-card.rabbit{background:#f0f4ff;border-color:#c7d7fb}
.eco-card.chicken{background:#fffbeb;border-color:#fde68a}.eco-card.goat{background:#f5fff0;border-color:#bbf7d0}
.eco-card.crops{background:#f7fdf0;border-color:#d1fae5}
.eco-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.eco-icon{font-size:32px}.eco-title{font-size:16px;font-weight:700}.eco-role{font-size:12px;color:var(--muted);margin-top:2px}
.eco-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.eco-box{border-radius:8px;padding:10px 12px;font-size:12.5px}
.eco-box.gives{background:rgba(46,125,79,.1);border:1px solid rgba(46,125,79,.2)}
.eco-box.needs{background:rgba(184,50,50,.08);border:1px solid rgba(184,50,50,.15)}
.eco-box.earns{background:rgba(217,119,6,.1);border:1px solid rgba(217,119,6,.2)}
.eco-box h4{font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px}
.eco-box.gives h4{color:var(--g)}.eco-box.needs h4{color:var(--r)}.eco-box.earns h4{color:var(--gold)}
.eco-box li{margin-left:14px;margin-top:3px;line-height:1.5}
.flow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:16px;background:var(--g3);border-radius:12px;margin:16px 0}
.fnode{background:#fff;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.farrow{color:var(--g);font-size:18px;font-weight:700}
.hc-card{border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 14px rgba(0,0,0,.08)}
.hc-head{padding:16px 20px;display:flex;align-items:center;gap:12px}
.hc-icon{font-size:30px}.hc-title{color:#fff;font-size:16px;font-weight:700}.hc-budget{color:rgba(255,255,255,.7);font-size:13px;margin-top:2px}
.hc-body{background:#fff;padding:16px 20px}
.hc-row{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--sand);font-size:13.5px;gap:10px}
.hc-row:last-child{border-bottom:none}
.hc-lbl{font-weight:600;flex:1}.hc-note{font-size:12px;color:var(--muted);margin-top:2px}
.hc-cost{font-weight:700;color:var(--g);white-space:nowrap}
.hc-tip{background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;font-size:12.5px;color:#7c5500;margin-top:12px}
.phase-card{border-radius:13px;padding:18px;margin-bottom:14px;border-left:5px solid}
.phase-card.p1{background:#fff9f5;border-color:var(--t)}.phase-card.p2{background:var(--g3);border-color:var(--g)}
.phase-card.p3{background:var(--b2);border-color:var(--b)}.phase-card.p4{background:#fffbeb;border-color:var(--gold)}
.ph-num{font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;opacity:.7}
.ph-title{font-family:'Playfair Display',serif;font-size:18px;margin:4px 0}
.ph-budget{font-size:13px;font-weight:700;color:var(--g);margin-bottom:8px}
.ph-item{font-size:13px;padding:3px 0;display:flex;gap:8px;line-height:1.5}
.ph-item::before{content:'→';color:var(--g);font-weight:700;flex-shrink:0}
.task{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;background:#fff;border-radius:11px;box-shadow:0 1px 7px rgba(0,0,0,.06);border-left:4px solid transparent;margin-bottom:8px}
.task.urgent{border-left-color:var(--r)}.task.normal{border-left-color:var(--g)}
.task.done{opacity:.5}.task.done .tt{text-decoration:line-through}
.tch{width:26px;height:26px;border-radius:7px;border:2.5px solid var(--stone);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#fff;font-size:14px;cursor:pointer;margin-top:1px}
.task.done .tch{background:var(--g);border-color:var(--g);color:#fff}
.tt{font-size:15px;font-weight:600;line-height:1.3}.ta{font-size:12px;color:var(--muted);margin-top:3px}
.tby{font-size:11px;color:var(--t);margin-top:3px;font-style:italic}
.finbar{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
.fincard{background:#fff;border-radius:13px;padding:18px;box-shadow:0 2px 10px rgba(0,0,0,.07);text-align:center}
.famt{font-family:'Playfair Display',serif;font-size:28px;line-height:1}
.famt.inc{color:var(--g)}.famt.exp{color:var(--r)}.famt.prf{color:var(--gold)}
.flbl{font-size:12px;color:var(--muted);margin-top:5px;font-weight:500}
.lrow{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--sand)}
.lrow:last-child{border-bottom:none}
.ldot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.ldot.income{background:var(--g)}.ldot.expense{background:var(--r)}
.lmain{flex:1}.ldesc{font-weight:600;font-size:14px}.lsub{font-size:11px;color:var(--muted)}
.lamt{font-weight:700;font-size:15px}.lamt.income{color:var(--g)}.lamt.expense{color:var(--r)}
.btn{padding:10px 20px;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:.15s;display:inline-flex;align-items:center;gap:6px}
.btn:active{transform:scale(.97)}
.bf{background:var(--f);color:#fff}.bf:hover{background:var(--f2)}
.bo{background:#fff;color:var(--text);border:1.5px solid var(--sand)}.bo:hover{border-color:var(--f);color:var(--f)}
.bsm{padding:7px 14px;font-size:13px}
.aform{background:#fdf9f5;border-radius:11px;padding:18px;border:1.5px solid var(--sand);margin-bottom:18px}
.aform h4{font-size:14px;font-weight:700;margin-bottom:14px}
.fg{margin-bottom:13px}
label{font-size:13px;font-weight:600;color:var(--muted);margin-bottom:5px;display:block}
.fi{width:100%;padding:10px 12px;border:1.5px solid var(--sand);border-radius:9px;font-size:14px;font-family:'DM Sans',sans-serif;background:#fff;outline:none;color:var(--text);transition:.15s}
.fi:focus{border-color:var(--f)}
.frow{display:flex;gap:12px}.frow .fg{flex:1}
.rbg{display:flex;gap:8px;flex-wrap:wrap}
.rb{padding:8px 16px;border-radius:8px;border:2px solid var(--sand);background:#fff;font-size:13px;font-weight:600;cursor:pointer;transition:.15s;font-family:'DM Sans',sans-serif}
.rb.sel{border-color:var(--f);background:var(--f);color:#fff}
.divider{height:1px;background:var(--sand);margin:16px 0}
.fl{display:flex;align-items:center;gap:8px}
.flb{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.mt8{margin-top:8px}.mt14{margin-top:14px}.mt20{margin-top:20px}
.mb8{margin-bottom:8px}.mb14{margin-bottom:14px}.mb20{margin-bottom:20px}
.sh{font-family:'Playfair Display',serif;font-size:20px;color:var(--text);margin-bottom:4px}
.ss2{font-size:13px;color:var(--muted);margin-bottom:18px;line-height:1.5}
.tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700}
.tag.g{background:var(--g2);color:#166534}.tag.r{background:var(--r2);color:var(--r)}
.tag.gold{background:#fef3c7;color:#7c5500}.tag.b{background:var(--b2);color:var(--b)}
.spin{display:inline-block;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.sync{position:fixed;bottom:16px;right:16px;background:var(--f);color:#fff;padding:8px 14px;border-radius:20px;font-size:12px;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,.2);z-index:100;display:flex;align-items:center;gap:6px}
@media(max-width:700px){
  .sb{width:54px}.sbl h1,.sbl p,.sbun,.sbur,.sw,.ni>span:last-child,.herd{display:none}
  .sbu{justify-content:center;padding:8px}.nic{width:100%}.ni{justify-content:center;padding:11px 0}
  .pb{padding:16px 14px}.g4{grid-template-columns:1fr 1fr}.finbar{grid-template-columns:1fr}.g2{grid-template-columns:1fr}
}`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const tsNow = () => new Date().toISOString();
const ec    = n => `EC$${Number(n).toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const fd    = s => { try{return new Date((s||"")+(s?.length===10?"T12:00:00":"")).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}catch{return s||"—";}};
const ft    = s => { try{return new Date(s).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});}catch{return "";}};
const uid   = () => `${Date.now()}_${Math.random().toString(36).slice(2,7)}`;

const USERS = [
  {id:"son",    name:"Junior", role:"Farm Manager", icon:"👨‍🌾"},
  {id:"father", name:"Dad",    role:"Farm Owner",   icon:"👴"},
];
const NAV = [
  {id:"dash",      icon:"🏡", label:"Dashboard"},
  {id:"ecosystem", icon:"🌿", label:"Farm Ecosystem"},
  {id:"housing",   icon:"🏗️", label:"Housing & Pens"},
  {id:"animals",   icon:"🐷", label:"Animals"},
  {id:"piglets",   icon:"🐽", label:"Piglet Litter"},
  {id:"tasks",     icon:"✅", label:"Daily Tasks"},
  {id:"health",    icon:"💉", label:"Health Log"},
  {id:"money",     icon:"💰", label:"Money & Profit"},
  {id:"reinvest",  icon:"📈", label:"Reinvestment Plan"},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,    setUser]    = useState(() => { try{return JSON.parse(sessionStorage.getItem("hf_user"));}catch{return null;} });
  const [ready,   setReady]   = useState(false);
  const [page,    setPage]    = useState("dash");
  const [syncing, setSyncing] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [piglets, setPiglets] = useState([]);
  const [tasks,   setTasks]   = useState([]);
  const [finance, setFinance] = useState([]);
  const [logs,    setLogs]    = useState([]);
  const [act,     setAct]     = useState([]);

  // inject styles once
  useEffect(()=>{
    if(!document.getElementById("hf-css")){
      const s=document.createElement("style");s.id="hf-css";s.textContent=CSS;document.head.appendChild(s);
    }
  },[]);

  // load all data + subscribe to real-time changes
  useEffect(()=>{
    loadAll();
    const channel = supabase.channel("farm")
      .on("postgres_changes",{event:"*",schema:"public",table:"animals"},    ()=>load("animals",    setAnimals,"created_at",true))
      .on("postgres_changes",{event:"*",schema:"public",table:"piglets"},    ()=>load("piglets",    setPiglets,"num",true))
      .on("postgres_changes",{event:"*",schema:"public",table:"tasks"},      ()=>load("tasks",      setTasks,"created_at",true))
      .on("postgres_changes",{event:"*",schema:"public",table:"finance"},    ()=>load("finance",    setFinance,"created_at",false))
      .on("postgres_changes",{event:"*",schema:"public",table:"health_logs"},()=>load("health_logs",setLogs,"created_at",false))
      .on("postgres_changes",{event:"*",schema:"public",table:"activity"},   ()=>load("activity",   setAct,"time",false))
      .subscribe();
    return ()=>supabase.removeChannel(channel);
  },[]);

  const load = async (table, setter, order, asc) => {
    const {data} = await supabase.from(table).select("*").order(order,{ascending:asc});
    if(data) setter(data);
  };

  const loadAll = async () => {
    setSyncing(true);
    await Promise.all([
      load("animals",    setAnimals,"created_at",true),
      load("piglets",    setPiglets,"num",true),
      load("tasks",      setTasks,"created_at",true),
      load("finance",    setFinance,"created_at",false),
      load("health_logs",setLogs,"created_at",false),
      load("activity",   setAct,"time",false),
    ]);
    setSyncing(false);
    setReady(true);
  };

  const addAct = async (action) => {
    if(!user) return;
    const entry = {id:uid(), who:user.name, action, time:tsNow()};
    await supabase.from("activity").insert(entry);
    setAct(p=>[entry,...p].slice(0,60));
  };

  const handleLogin = (u) => {
    sessionStorage.setItem("hf_user", JSON.stringify(u));
    setUser(u);
  };
  const handleSwitch = () => {
    sessionStorage.removeItem("hf_user");
    setUser(null);
  };

  if(!ready) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--f)"}}>
      <div style={{textAlign:"center",color:"#fff"}}>
        <div style={{fontSize:52,marginBottom:12}}>🌿</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22}}>Loading Hoglands Farm…</div>
        <div style={{marginTop:10,fontSize:13,opacity:.6}}>Connecting to database…</div>
      </div>
    </div>
  );

  if(!user) return <Login onSelect={handleLogin}/>;

  const inc = finance.filter(f=>f.type==="income").reduce((a,f)=>a+Number(f.amount),0);
  const exp = finance.filter(f=>f.type==="expense").reduce((a,f)=>a+Number(f.amount),0);
  const prf = inc - exp;
  const ctx = {user,animals,setAnimals,piglets,setPiglets,tasks,setTasks,finance,setFinance,logs,setLogs,act,addAct,inc,exp,prf,setPage,setSyncing};

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} user={user} onSwitch={handleSwitch}/>
      <div className="main">
        {page==="dash"      && <Dashboard  {...ctx}/>}
        {page==="ecosystem" && <Ecosystem/>}
        {page==="housing"   && <Housing/>}
        {page==="animals"   && <Animals    {...ctx}/>}
        {page==="piglets"   && <Piglets    {...ctx}/>}
        {page==="tasks"     && <Tasks      {...ctx}/>}
        {page==="health"    && <Health     {...ctx}/>}
        {page==="money"     && <Money      {...ctx}/>}
        {page==="reinvest"  && <Reinvest   {...ctx}/>}
      </div>
      {syncing && <div className="sync"><span className="spin">⟳</span> Syncing…</div>}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onSelect}){
  return(
    <div className="login">
      <div className="lcard">
        <div style={{fontSize:54}}>🌿</div>
        <h1>Hoglands Farm</h1>
        <p className="lsub">Cayon, St Kitts &amp; Nevis · Farm Business Manager</p>
        <div className="ulbl">Who's logging in today?</div>
        <div className="ubtns">
          {USERS.map(u=>(
            <button key={u.id} className="ubtn" onClick={()=>onSelect(u)}>
              <span className="ui">{u.icon}</span>
              <div><div className="un">{u.name}</div><div className="ur">{u.role}</div></div>
            </button>
          ))}
        </div>
        <div className="lfoot">🔄 Live sync — both phones see the same data</div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({page,setPage,user,onSwitch}){
  return(
    <div className="sb">
      <div className="sbl"><h1>🌿 Hoglands<br/>Farm</h1><p>Cayon · St Kitts</p></div>
      <div className="sbu">
        <span className="sbui">{user.icon}</span>
        <div style={{flex:1,minWidth:0}}><div className="sb
