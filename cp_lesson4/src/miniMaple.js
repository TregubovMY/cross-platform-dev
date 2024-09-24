class MiniMaple {
  constructor(expression) {
    this.#validateExpression(expression);
    this.members = this.#parseMembers(expression);
  }

  #validateExpression(expression) {
    if (/[^0-9*+\-\^a-z ]/.test(expression)) {
      throw new Error("Invalid expression");
    }
  }

  #parseMembers(expression) {
    return expression.split(/(?=[-+])/).map(member => member.replaceAll(' ', ''));
  }

  #differentiateMember(member, variable) {
    const match = member.match(`([-+]?\\d*)\\*?${variable}\\^?(\\d*)`);

    if (!match) return null; // Нет переменной в данном члене

    const coefficient = match[1] === '' || match[1].match(/[-+]/) ? (match[1] === '-' ? -1 : 1) : parseInt(match[1]);
    const degree = match[2] === '' ? 1 : parseInt(match[2]);

    // Производная
    const newCoefficient = coefficient * degree;
    const newDegree = degree - 1;

    return `${newCoefficient > 0 && member[0] === '+' ? '+' : ''}${newCoefficient === 1 && newDegree !== 0 ? '' : newCoefficient}${newDegree > 0 ? `*${variable}${newDegree > 1 ? '^' + newDegree : ''}` : ''}`;
  }

  // Основной метод для дифференцирования выражения по переменной
  diff(variable) {
    const result = this.members.map(member => this.#differentiateMember(member, variable))
                               .filter(member => member) // Фильтрация пустых значений
                               .join('');

    return new MiniMaple(result !== '' ? result : '0');
  }
}

export { MiniMaple };
