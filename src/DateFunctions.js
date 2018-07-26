/**
 * Create `createInTimezone` function.
 *
 * @param {momnent} moment Moment JS object.
 *
 * @return {CreateInTimezoneFunction} `CreateInTimezone` function.
 */
export function makeCreateInTimezone (moment) {
  return (value, tz) => {
    const momentFixedTimezoneValue = moment.parseZone(value)
    if (tz.indexOf('UTC') !== 0) {
      return moment.tz(momentFixedTimezoneValue, tz)
    }
    let offset = Number(tz.replace(/UTC\+?/g, ''))
    return momentFixedTimezoneValue.utcOffset(offset)
  }
}

/**
 * Create `parseInTimezone` function.
 *
 * @param {momnent} moment Moment JS object.
 *
 * @return {ParseInTimezoneFunction} `parseInTimezone` function.
 */
export function makeParseInTimezone (moment) {
  return (value, tz) => {
    const momentFixedTimezoneValue = moment.parseZone(value)
    if (tz.indexOf('UTC') !== 0) {
      return moment.tz(momentFixedTimezoneValue.format(formats.tzFree), formats.tzFree, tz)
    }
    let offset = Number(tz.replace(/UTC\+?/g, ''))
    return momentFixedTimezoneValue.utcOffset(offset, true)
  }
}