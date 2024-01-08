import { configureStore } from '@reduxjs/toolkit'

import snackbarSlice from './snackbar'

export default configureStore({
  reducer: {
    snackbar: snackbarSlice,
  },
})
