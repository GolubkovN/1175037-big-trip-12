export const createDaysItemTemplate = (date, number) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number}</span>
          <time class="day__date" datetime="${date.toDateString()}">${date.toDateString().substring(4, 10)}</time>
        </div>
        <ul class="trip-events__list">

        </ul>
      </li>`
  );
};
