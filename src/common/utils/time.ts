import { AvailableTime, WorkingHour, dayNames } from './time.types';

export function isAvailable(timezone: string, timezones: WorkingHour[]) {
  let currentTime: any = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    hour12: false,
  });

  currentTime = currentTime.split(' ')[1];
  // get only hours and minutes from HH:MM:SS
  currentTime = currentTime.split(':');
  // HH:MM
  currentTime = currentTime[0] + ':' + currentTime[1];
  // console.log(currentTime);

  let currentDay: number | string = new Date().getDay();
  // name to string
  currentDay = dayNames[currentDay];

  // check if currentTime is inside the timezone 6h range
  const currentTimeInHours = parseInt(currentTime.split(':')[0]);
  const currentTimeInMinutes = parseInt(currentTime.split(':')[1]);

  const timezoneId = timezones.findIndex((t) => t.day === currentDay);
  // console.log(timezones[timezoneId].human_time);

  // RETORNAR VALOR NULO O ALGO PARECIDO SI NO ESTA EN UN TEAM

  const from = timezones[timezoneId].from;
  const to = timezones[timezoneId].to;

  const fromInHours: any = parseInt(from.split(':')[0]);
  const fromInMinutes: any = parseInt(from.split(':')[1]);
  const toInHours: any = parseInt(to.split(':')[0]);
  const toInMinutes: any = parseInt(to.split(':')[1]);

  if (currentTimeInHours >= fromInHours && currentTimeInHours <= toInHours) {
    // check 60 minutes diff
    if (currentTimeInHours === toInHours) {
      if (
        currentTimeInMinutes >= fromInMinutes &&
        currentTimeInMinutes <= toInMinutes
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// const availableAllDays: AvailableTime = {
//   days: [
//     { day: 'Sunday', from: '00:00', to: '23:59' },
//     { day: 'Monday', from: '00:00', to: '23:59' },
//     { day: 'Tuesday', from: '00:00', to: '23:59' },
//     { day: 'Wednesday', from: '00:00', to: '23:59' },
//     { day: 'Thursday', from: '00:00', to: '23:59' },
//     { day: 'Friday', from: '00:00', to: '23:59' },
//     { day: 'Saturday', from: '00:00', to: '23:59' },
//   ],
//   timezone: 'America/Caracas',
// };

// console.log(isAvailable(availableAllDays.timezone, availableAllDays.days));
