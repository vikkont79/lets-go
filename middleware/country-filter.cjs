module.exports = (req, res, next) => {
  if (req.method !== 'GET') {
    return next()
  }

  // 👇 1. Прочитали транспорт из запроса
  const countryCode = req.query.countryCode;
  const transport = req.query.transport;  // <-- ЭТО ДОБАВИЛИ
  const page = parseInt(req.query._page) || 1
  const limit = parseInt(req.query._limit) || 10
  const path = req.path

  // 👇 2. В условии добавили transport
  if (path !== '/trips' || (!countryCode && !transport)) {  // <-- ИЗМЕНИЛИ
    return next()
  }

  // 👇 3. Лог для отладки (чтобы видеть что приходит)
  console.log('Фильтры:', { countryCode, transport });

  fetch('http://localhost:3001/trips')
    .then(response => response.json())
    .then(allTrips => {
      let filteredTrips = allTrips;  // <-- СДЕЛАЛИ let вместо const

      // Фильтр по стране (был)
      if (countryCode) {
        filteredTrips = filteredTrips.filter(trip =>
          trip.countries && trip.countries.some(c => c.code === countryCode)
        );
      }

      // 👇 4. Фильтр по транспорту (НОВЫЙ)
      if (transport) {
        const transportList = Array.isArray(transport) ? transport : [transport];
        filteredTrips = filteredTrips.filter(trip =>
          trip.transport && trip.transport.some(t => transportList.includes(t))
        );
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
