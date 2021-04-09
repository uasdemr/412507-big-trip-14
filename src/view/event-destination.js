const createEventDestination = (destination) => {

  const imgCreator = (pictures) => {

    return pictures.map((picture) => {
      return `<img class="event__photo"
        src="${picture.src}"
        alt="${picture.description}"
      >`;
    }).join('');
  };

  return destination.description === '' ? '' : `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${imgCreator(destination.pictures)}
      </div>
    </div>
  </section>`;


};
export { createEventDestination };
