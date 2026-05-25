// ── CURSOR GLOW ──
const glow=document.getElementById('glow');
document.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

// ── NAVIGATION ──
function showPage(id,link){
  document.querySelectorAll('section').forEach(s=>{s.classList.remove('active')});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const sec=document.getElementById(id);
  sec.classList.add('active');
  if(link&&link.classList) link.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='projetos') loadGitHub();
  return false;
}

// ── GITHUB API ──
async function loadGitHub(){
  const grid=document.getElementById('projects-grid');
  const username='Devalice-braz'; // Username de demonstração — troque pelo seu!
  grid.innerHTML='<div class="proj-loading"><p>Buscando repositórios de <span>'+username+'</span>...</p></div>';
  try{
    const res=await fetch('https://api.github.com/users/'+username+'/repos?sort=updated&per_page=6&type=public');
    if(!res.ok) throw new Error('API error: '+res.status);
    const repos=await res.json();
    if(!repos.length){
      grid.innerHTML='<div class="proj-loading"><p>Nenhum repositório público encontrado.</p></div>';
      return;
    }
    const langColors={
      'JavaScript':'#f7df1e','TypeScript':'#3178c6','Python':'#3572A5',
      'HTML':'#e34c26','CSS':'#563d7c','Java':'#b07219',
      'PHP':'#4F5D95','null':'#8887a0'
    };
    grid.innerHTML=repos.map(r=>{
      const color=langColors[r.language]||langColors['null'];
      const desc=r.description?r.description.substring(0,90)+(r.description.length>90?'…':''):'Sem descrição.';
      return `<a class="proj-card" href="${r.html_url}" target="_blank">
        <div class="proj-lang">
          <span class="lang-dot" style="background:${color}"></span>
          ${r.language||'Sem linguagem'}
        </div>
        <div class="proj-name">${r.name}</div>
        <div class="proj-desc">${desc}</div>
        <div class="proj-stats">
          <span class="proj-stat">⭐ ${r.stargazers_count}</span>
          <span class="proj-stat">🍴 ${r.forks_count}</span>
          <span class="proj-stat">👁 ${r.watchers_count}</span>
        </div>
      </a>`;
    }).join('');
  }catch(e){
    grid.innerHTML=`<div class="proj-loading" style="text-align:left;padding:1.5rem;border:1px solid var(--border);border-radius:6px;border-left:3px solid var(--accent2)">
      <p style="color:var(--accent2);margin-bottom:.5rem;font-size:.85rem">⚠ GitHub API — Demonstração</p>
      <p style="color:var(--muted);font-size:.8rem">
        Para exibir seus repositórios reais, substitua <span style="color:var(--accent)">'octocat'</span> pelo seu username do GitHub na função <span style="color:var(--accent)">loadGitHub()</span> no código JavaScript.<br><br>
        Erro: ${e.message}
      </p>
    </div>`;
  }
}

// Animar barras de skill quando a seção Sobre estiver ativa
document.querySelector('.nav-links li:nth-child(2) a').addEventListener('click',()=>{
  setTimeout(()=>{
    document.querySelectorAll('.stat-fill').forEach(b=>{
      const w=b.style.width;b.style.width='0';
      setTimeout(()=>{b.style.width=w},50);
    });
  },100);
});