module.exports = (req, res, next) => {
  if (req.method !== 'GET') {
    return next()
  }

  const countryCode = req.query.countryCode;
  const page = parseInt(req.query._page) || 1
  const limit = parseInt(req.query._limit) || 10
  const path = req.path

  if (path !== '/trips' || !countryCode) {
    return next()
  }

  fetch('http://localhost:3001/trips')
    .then(response => response.json())
    .then(allTrips => {
      const filteredTrips = allTrips.filter(trip =>
        trip.countries && trip.countries.some(c => c.code === countryCode)
      );

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
