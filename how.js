(function () {
  const st = [...document.querySelectorAll('.step')], pb = document.getElementById('prog');
  let i = 0;
  const go = () => { st.forEach((s, k) => s.classList.toggle('on', k === i)); pb.style.width = ((i + 1) / st.length * 100) + '%'; i = (i + 1) % st.length; };
  go(); setInterval(go, 2600);
})();
