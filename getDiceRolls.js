import random from 'random';
import seedrandom from 'seedrandom';

function parseRollString(rollString) {
  const bits = rollString.split('d');
  return bits.map((bit) => parseInt(bit));
}

function getRollScores(count, sides = 6) {
  random.use(seedrandom(`${Date.now()}x${count}d${sides}`));
  const roll = random.uniformInt(1, sides);

  return Array.apply(null, Array(count)).map(() => roll());
}

function getRollsTotal(rolls, modifier = 0) {
  return rolls.reduce((x, roll) => x + roll) + modifier;
}

export default function getDiceRolls(roll, modifier = 0) {
  const rollInfo = parseRollString(roll);
  const rolls = getRollScores(...rollInfo);
  const total = getRollsTotal(rolls, modifier);

  return {roll, rolls, modifier, total};
}