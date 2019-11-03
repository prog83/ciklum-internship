import './style.scss';
import ButtonMenu from '../ButtonMenu';

export default function CardTask(props) {
  const { id, title = '', description = '', status, priority } = props;

  const card = document.createElement('div');
  card.className = 'task-card';

  const cardTitle = document.createElement('p');
  cardTitle.className = 'task-card-title';

  const cardDescription = document.createElement('p');
  cardDescription.className = 'task-card-description';

  const cardActions = document.createElement('div');
  cardActions.className = 'task-card-actions';
  const cardPriority = document.createElement('div');
  cardPriority.className = 'task-card-priority';
  cardActions.appendChild(cardPriority);
  // Menu button
  cardActions.appendChild(ButtonMenu(id));

  const titleText = document.createTextNode(title);
  cardTitle.appendChild(titleText);
  const descriptionText = document.createTextNode(description);
  cardDescription.appendChild(descriptionText);
  const priorityText = document.createTextNode(priority);
  cardPriority.appendChild(priorityText);

  // Done
  if (status === 'done') {
    const cardStatusDone = document.createElement('div');
    cardStatusDone.innerHTML = '<i class="material-icons done">done</i>';
    cardStatusDone.className = 'task-card-status-done';
    card.appendChild(cardStatusDone);
    card.classList.add('done');
  }

  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(cardActions);

  return card;
}
