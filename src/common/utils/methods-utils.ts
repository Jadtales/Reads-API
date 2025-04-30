import { MoreThanOrEqual, LessThanOrEqual, Equal } from 'typeorm';

export class DateUtils {
  constructor() {}

  public static getDateOffset({ weeks = 0, month = 0, year = 0 }): Date {
    const date = new Date();

    if (weeks) date.setDate(date.getDate() - weeks * 7);
    if (month) date.setDate(date.getMonth() - month);
    if (year) date.setDate(date.getFullYear() - year);

    return date;
  }

  public static getDateOn(date: Date, getOn: string) {
    switch (getOn) {
      case 'after':
        return LessThanOrEqual(date);
      case 'before':
        return MoreThanOrEqual(date);
      case 'on':
        return Equal(date);
      default:
        return MoreThanOrEqual(date);
    }
  }
}
