import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export const dateToHumanReadable = (date: string): string => {
  return dayjs(date).fromNow()
}
