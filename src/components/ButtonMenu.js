import { openMenu } from './taskmenu';

export default function ButtonMenu(id) {
  const cardButtonMenu = document.createElement('button');
  cardButtonMenu.innerHTML = '<i class="material-icons">more_vert</i>';
  cardButtonMenu.className = 'button-icon';
  cardButtonMenu.value = id;
  cardButtonMenu.addEventListener('click', openMenu);

  return cardButtonMenu;
}
