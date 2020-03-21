import { getUnixTime } from "date-fns";

type TNowFormat = "string" | "unix";

interface NowArgs {
  format: TNowFormat;
}

export class DateObject {
  constructor(private date: Date = new Date()) {}

  getUnix(): DateTime {
    const unix: DateTime = getUnixTime(this.date);
    return unix;
  }

  getISOString(): DateTime {
    const iso: DateTime = this.date.toISOString();
    return iso;
  }
}
