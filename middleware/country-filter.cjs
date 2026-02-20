// middleware/country-filter.cjs
module.exports = (req, res, next) => {
  // Сохраняем параметры запроса
  const countryCode = req.query.countryCode;
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const path = req.path;

  // Пропускаем запросы не к /trips или без countryCode
  if (path !== '/trips' || !countryCode) {
    return next();
  }

  console.log(`🔍 Фильтрация по стране: ${countryCode}, страница: ${page}, лимит: ${limit}`);

  // Делаем запрос ко всем трипам
  fetch('http://localhost:3001/trips')
    .then(response => response.json())
    .then(allTrips => {
      // Фильтруем по стране
      const filteredTrips = allTrips.filter(trip =>
        trip.countries && trip.countries.some(c => c.code === countryCode)
      );

      // Применяем пагинацию
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedTrips = filteredTrips.slice(start, end);

      // Устанавливаем заголовки
      res.set('X-Total-Count', filteredTrips.length);
      res.set('Access-Control-Expose-Headers', 'X-Total-Count');

      // Отправляем результат
      res.json(paginatedTrips);
    })
    .catch(error => {
      console.error('Ошибка в middleware:', error);
      next(error);
    });
};
