

export const getYear = date => {

  const deteminer = new RegExp('-')

  if (deteminer.test(date)) {
    return date.split('-', 3)[0]
  }

  const year = date.split('/')[2]

  return year


}

export const getMonth = date => {
  const deteminer = new RegExp('-')

  if (deteminer.test(date)) {
    return date.split('-', 3)[1]
  }

  return date.split('/')[1]
}