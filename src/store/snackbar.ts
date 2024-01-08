import { createSlice } from '@reduxjs/toolkit'

export enum NotificationType {
  CASH_OUT = 'cash_out',
  TRANSACTION_NOT_ACCEPTED = 'transaction_not_accepted'
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    notifications: [],
  },
  reducers: {
    push(state, { payload }) {
      const time = Date.now()
      state.notifications.push({ time, ...payload })
    },
    remove(state) {
      const now = Date.now()
      state.notifications = state.notifications.filter(
        (notification) =>
          now - notification.time <= notification.timeout
      )
    },
  },
})

export default snackbarSlice.reducer
