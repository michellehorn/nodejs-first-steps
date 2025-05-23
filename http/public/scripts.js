const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
  const res = await fetch(`http://localhost:3000/`).then((data) => data.json());
  ul.innerHTML = '';

  res.urls.forEach((el) => {
    renderElement(el);
  });
}

load();

function renderElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const trash = document.createElement('span');

  a.href = url;
  a.innerHTML = name;
  a.target = '_blank';

  trash.innerHTML = 'x';
  trash.onclick = () => removeElement({ name, url });

  li.append(a);
  li.append(trash);
  ul.append(li);
}

async function removeElement(item) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`http://localhost:3000?name=${item.name}&url=${item.url}&del=1`);
    await load();
  }
}

async function addElement(item) {
  await fetch(`http://localhost:3000?name=${item.name}&url=${item.url}`);
  await load();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo');

  let [name, url] = value.split(',');
  url = url.trim();

  if (!url) return alert('formate o texto da maneira correta');

  if (!/^http/.test(url) || !/^https/.test(url)) return alert('Digite a url da maneira correta');

  addElement({ name, url });

  input.value = '';
});
