// ---------- Business Idea Data (kept same) ----------
const ideaData = {
  1:{title:"Dairy Farm Smart Management", text:""},
  2:{title:"Beekeeping & Honey Production", text:"Modern apiary with hive-monitoring, pest detection and scheduled harvest to produce high-quality honey."},
  3:{title:"Mushroom Cultivation", text:"Controlled-environment indoor farming with automated humidity, temperature and lighting for high yields."},
  4:{title:"Café & Mini Mart", text:"Small neighborhood cafe and mini-mart with smart inventory, daily fresh items and local sourcing."},
  5:{title:"Startup Co-Working Centre", text:"Use historical & weather data to forecast crop supply and help farmers plan planting & distribution."},
  6:{title:"Adventure Park + Food Street", text:"Interactive agri-park for education & recreation combining farm tours, workshops and smart demos."},
  7:{title:"Plant Nursery", text:"Nursery with automated irrigation, growth-tracking and online ordering for landscapers and home gardeners."},
  8:{title:"Sports Training Academy", text:"Data-driven coaching with wearable sensors, video analytics and personalized training plans."},
  9:{title:"Apartment Complexes", text:"Smart apartment management with IoT meters, shared-services booking and predictive maintenance."},
  10:{title:"Gym & Fitness Centre", text:"Fitness centre with smart machines, member tracking, personalized workout plans and progress monitoring."}
};

// ---------- Tree ----------
const tree = {
  id:'root', title:'Business Ideas',
  children:[
    { id:'agri', title:'AGRICULTUR' <span class="bright-text"></span>, children:[1,2,3]},
    { id:'retail', title:'RETAIL & LIVING', children:[4]},
    { id:'ship', title:" Business & Entrepreneurship' , children:[5]},
    { id:'ent', title:'Etertainment', children:[6]},
    { id:'nursery', title:'Plant Nursery', children:[7]},
    { id:'sport', title:'Sports & Health', children:[8,10]},
    { id:'apartment', title:'Apartment Complexes', children:[9]}
  ]
};
<span class="bright-text"></span>
// ---------- Render Tree ----------
const treeWrap = document.getElementById('treeWrap');
const detailedIdeas = document.getElementById('detailed-ideas');

function renderTree(){
  treeWrap.innerHTML='';
  tree.children.forEach(cat=>{
    const catDiv = document.createElement('div');
    catDiv.className='category';
    catDiv.textContent=cat.title;

    const childrenDiv = document.createElement('div');
    childrenDiv.className='children';

    cat.children.forEach(id=>{
      const node = document.createElement('div');
      node.className='node';
      node.dataset.id=id;
      node.tabIndex=0;
      node.textContent=ideaData[id].title;

      node.addEventListener('click',()=>showIdea(id,node));

      childrenDiv.appendChild(node);
    });

    catDiv.appendChild(childrenDiv);
    treeWrap.appendChild(catDiv);
  });
}
renderTree();

// ---------- Show Idea ----------
function showIdea(id, nodeEl) {
  document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
  nodeEl.classList.add('active');

  // hide all idea cards first
  document.querySelectorAll('.idea-card').forEach(card => card.style.display = 'none');
  // then show only the selected one
  const selected = document.getElementById(`idea-${id}`);
  if (selected) selected.style.display = 'block';

  selected?.scrollIntoView({ behavior: 'smooth' });
}

// ---------- DFS/BFS ----------
function buildAdjacency(){
  const adj={};
  adj['root']=tree.children.map(c=>c.id);

  tree.children.forEach(c=>{
    adj[c.id]=c.children.map(String);
    c.children.forEach(ch=>{
      adj[String(ch)]=[];
    });
  });

  return adj;
}

const adjacency = buildAdjacency();

function dfs(start='root'){
  const visited=[], seen=new Set();
  (function rec(u){
    seen.add(u); visited.push(u);
    for(const v of adjacency[u]||[]) if(!seen.has(v)) rec(v);
  })(start);
  return visited;
}

function bfs(start='root'){
  const q=[start], seen=new Set([start]), order=[];
  while(q.length){
    const u=q.shift();
    order.push(u);
    for(const v of adjacency[u]||[]) if(!seen.has(v)){
      seen.add(v); q.push(v);
    }
  }
  return order;
}

function animateTraversal(order){
  document.querySelectorAll('.node').forEach(n=>n.classList.remove('visited'));
  const leafIds = order.filter(x=>/^\d+$/.test(String(x))).map(Number);
  const out=document.getElementById('traversalOutput');

  out.textContent='Visiting...';

  leafIds.forEach((id,idx)=>{
    setTimeout(()=>{
      document.querySelectorAll('.node').forEach(n=>n.classList.remove('visited'));

      const nodeDom=document.querySelector(`.node[data-id="${id}"]`);
      if(nodeDom) nodeDom.classList.add('visited');

      const labels = leafIds.slice(0,idx+1).map(i=>ideaData[i].title);
      out.textContent='Order: '+labels.join(' → ');

      if(idx===leafIds.length-1){ if(nodeDom) nodeDom.click(); }
    }, idx*700);
  });
}

document.getElementById('runDFS').addEventListener('click',()=>animateTraversal(dfs()));
document.getElementById('runBFS').addEventListener('click',()=>animateTraversal(bfs()));
document.getElementById('resetVisit').addEventListener('click',()=>{
  document.querySelectorAll('.node').forEach(n=>n.classList.remove('visited','active'));
  detailedIdeas.innerHTML='';
  document.getElementById('traversalOutput').textContent='Traversal order will appear here.';
});
