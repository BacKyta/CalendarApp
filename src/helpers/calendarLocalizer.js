import { dateFnsLocalizer } from 'react-big-calendar';
import  format  from 'date-fns/format';
import  parse  from 'date-fns/parse';
import  startOfWeek  from 'date-fns/startOfDay';
import  getDay  from 'date-fns/getDay';

import esES from 'date-fns/locale/es';

const locales = {
//   'en-US': enUS,
    'es': esES
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});