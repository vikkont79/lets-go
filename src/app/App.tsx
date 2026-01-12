import { Route, Routes } from 'react-router-dom'
import { MainPage } from '@/pages/main'
import { Layout } from '@/widgets/layout'
import { AppRoute } from './router/routes'
import { CatalogPage } from '@/pages/catalog'
import { FormPage } from '@/pages/form'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Catalog} element={<CatalogPage />} />
        <Route path={AppRoute.Form} element={<FormPage />} />
      </Routes>
    </Layout>
  )
}

export default App
