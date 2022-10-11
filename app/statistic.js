export const statistics = document.querySelector('.statistics');

export const putStatisticRow = (name, number) => {
    const eventTypeElement = document.createElement('div');
    eventTypeElement.className = 'statistics__type';
    const eventTypeElementNumber = document.createElement('div');
    eventTypeElementNumber.className = 'statistics__type-number';
    eventTypeElementNumber.innerHTML = number;
    const eventTypeElementName = document.createElement('div');
    eventTypeElementName.className = 'statistics__type-name';
    eventTypeElementName.innerHTML = name;
    eventTypeElement.append(eventTypeElementName);
    eventTypeElement.append(eventTypeElementNumber);
    statistics.append(eventTypeElement);
}