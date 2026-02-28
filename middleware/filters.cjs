module.exports = (req, res, next) => {
  if (req.method !== 'GET') {
    return next()
  }

  const countryCode = req.query.countryCode;
  const transport = req.query.transport;
  const hobbies = req.query.hobby;
  const music = req.query.music;
  const food = req.query.food;
  const minLevel = req.query.minLevel ? parseInt(req.query.minLevel) : undefined;
  const maxLevel = req.query.maxLevel ? parseInt(req.query.maxLevel) : undefined;
  const page = parseInt(req.query._page) || 1
  const limit = parseInt(req.query._limit) || 10
  const path = req.path

  if (path !== '/trips') {
    return next()
  }

  // Если нет ни одного фильтра - пропускаем
  if (!countryCode && !transport && !hobbies && !music && !food && !minLevel && !maxLevel) {
    return next()
  }

  console.log('🔍 Фильтры:', { countryCode, transport, hobbies, music, food, minLevel, maxLevel });

  fetch('http://localhost:3001/trips')
    .then(response => response.json())
    .then(allTrips => {
      let filteredTrips = allTrips;

      // Фильтр по стране
      if (countryCode) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.countries && trip.countries.some(c => c.code === countryCode)
        );
      }

      // Фильтр по транспорту
      if (transport) {
        const transportList = Array.isArray(transport) ? transport : [transport];
        filteredTrips = filteredTrips.filter(trip =>
          trip.transport && trip.transport.some(t => transportList.includes(t))
        );
      }

      if (minLevel !== undefined || maxLevel !== undefined) {
        const min = minLevel || 1;
        const max = maxLevel || 100;

        filteredTrips = filteredTrips.filter(trip => {
          const level = trip.user?.level;
          return level && level >= min && level <= max;
        });

        console.log(`📊 Уровень от ${min} до ${max}: осталось ${filteredTrips.length}`);
      }

      // Фильтр по хобби
      if (hobbies) {
        const hobbyList = Array.isArray(hobbies) ? hobbies : [hobbies];
        filteredTrips = filteredTrips.filter(trip => {
          // У trip нет поля hobbies, поэтому фильтр не применяем
          return true; // временно пропускаем все
        });
      }

      /*Фильтр по хобби - рабочий
      if (hobbies) {
        const hobbyList = Array.isArray(hobbies) ? hobbies : [hobbies];
        filteredTrips = filteredTrips.filter(trip => {
          // Проверяем что поле существует и это массив
          if (!trip.hobbies || !Array.isArray(trip.hobbies)) return false;
          // Ищем хотя бы одно совпадение
          return trip.hobbies.some(h => hobbyList.includes(h));
        });
      }*/

      // Фильтр по музыке
      if (music) {
        const musicList = Array.isArray(music) ? music : [music];
        filteredTrips = filteredTrips.filter(trip => {
          return true; // временно пропускаем все
        });
      }

      // Фильтр по еде
      if (food) {
        const foodList = Array.isArray(food) ? food : [food];
        filteredTrips = filteredTrips.filter(trip => {
          return true; // временно пропускаем все
        });
      }

      const start = (page - 1) * limit
      const end = start + limit
      const paginatedTrips = filteredTrips.slice(start, end)

      res.set('X-Total-Count', filteredTrips.length)
      res.set('Access-Control-Expose-Headers', 'X-Total-Count')

      res.json(paginatedTrips);
    })
    .catch(error => {
      console.error('Ошибка в middleware:', error);
      next(error);
    })
}
