import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const time = moment('20111031', 'YYYYMMDD').fromNow()
console.log(time)
