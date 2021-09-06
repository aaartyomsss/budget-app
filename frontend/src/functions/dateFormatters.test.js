import { getYear } from './dateFromatters';

describe('Get year function', () => {
  // test('Formats properly date JSON string', () => {
  //     const dateString = JSON.stringify(new Date(2019)) // 1970

  //     expect(getYear(dateString)).toBe('1970')
  // })

  test('Already formatted object', () => {
    const dateFormatted = '19/12/2020';

    expect(getYear(dateFormatted)).toBe('2020');
  });
});
