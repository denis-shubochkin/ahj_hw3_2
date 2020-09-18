import Task from './task';

const input = document.querySelector('.input');
const activeTasksList = document.querySelector('.active-tasks-list');
const pinnedTasksList = document.querySelector('.pinned-tasks-list');
const main = document.querySelector('.main');
const array = [];
let cId = 0;


function clearTasks() {
  const aTasks = activeTasksList.getElementsByClassName('task');
  const pTasks = pinnedTasksList.getElementsByClassName('task');
  do {
    aTasks.forEach((element) => {
      element.remove();
    });
  }
  while (aTasks.length > 0);

  do {
    pTasks.forEach((element) => {
      element.remove();
    });
  }
  while (pTasks.length > 0);
}

function hiddenTasks(arr) {
  let pCount = 0;
  let aCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === 'pinned') {
      document.querySelector('.pinned-hidden').style.display = 'none';
      pCount += 1;
    } else if (arr[i].type === 'active') {
      document.querySelector('.active-hidden').style.display = 'none';
      aCount += 1;
    }
  }
  if (pCount === 0) {
    document.querySelector('.pinned-hidden').style.display = 'block';
  }
  if (aCount === 0) {
    document.querySelector('.active-hidden').style.display = 'block';
  }
}


function redraw(arr) {
  clearTasks();
  if (arr) {
    hiddenTasks(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].type === 'active') {
        activeTasksList.insertAdjacentHTML('beforeend', `<div id = ${arr[i].id} class="task all"> <span class="active-name">${arr[i].name}</span> </div>`);
      }
      if (arr[i].type === 'pinned') {
        pinnedTasksList.insertAdjacentHTML('beforeend', `<div id = ${arr[i].id} class="task pinned"> <span class="pinned-name">${arr[i].name}</span> </div>`);
      }
    }
  }
}


main.addEventListener('click', (event) => {
  console.log(event.target);
  for (let i = 0; i < array.length; i++) {
    console.log(event.target.closest('.task'));
    if (array[i].id === Number(event.target.id) || array[i].id === Number(event.target.closest('.task').id)) {
      if (array[i].type === 'active') {
        array[i].type = 'pinned';
      } else {
        array[i].type = 'active';
      }
    }
  }
  redraw(array);
});

function genId() {
  cId += 1;
  return cId;
}

input.addEventListener('keyup', (event) => {
  console.log(input.value);
  if (event.key === 'Enter') {
    if (input.value !== '') {
      array.push(new Task(genId(), input.value));
      input.value = '';
      redraw(array);
    } else {
      document.querySelector('.empty-hidden').style.display = 'block';
    }
  } else if (input.value !== '') {
    document.querySelector('.empty-hidden').style.display = 'none';
    const newArr = array.filter((elem) => {
      if (elem.type === 'active') {
        return elem.name.includes(input.value);
      } return true;
    });
    redraw(newArr);
  } else if (input.value === '') {
    redraw(array);
  }
});
