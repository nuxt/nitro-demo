import { Router } from '@layer0/core'

export default new Router()
  .static('.output/public')
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  })
