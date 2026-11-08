const character = {
  name: 'Snortleblat',
  class: 'Swamp Beast Diplomat',
  level: 5,
  health: 100,
  image: 'images/monster.png',

  attacked: function () {
    if (this.health <= 0) return;
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      renderCharacter();
      document.querySelector('#message').textContent = `${this.name} has died.`;
      document.querySelector('#attackBtn').disabled = true;
      document.querySelector('#levelBtn').disabled = true;
      return;
    }
    renderCharacter();
  },

  levelUp: function () {
    this.level += 1;
    renderCharacter();
  }
};

function renderCharacter() {
  const img = document.querySelector('#charImage');
  img.setAttribute('src', character.image);
  img.setAttribute('alt', `${character.name}, the ${character.class}`);

  document.querySelector('#charName').textContent = character.name;
  document.querySelector('#charClass').textContent = character.class;
  document.querySelector('#charLevel').textContent = character.level;
  document.querySelector('#charHealth').textContent = character.health;
}

renderCharacter();

document.querySelector('#attackBtn').addEventListener('click', function () {
  character.attacked();
});

document.querySelector('#levelBtn').addEventListener('click', function () {
  character.levelUp();
});