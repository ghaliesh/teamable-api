type TNowFormat = "string" | "unix";

interface NowArgs {
  format: TNowFormat;
}

export const getNow = (options?: NowArgs): DateTime => {
  const { format = "string" } = options;

  switch (format) {
    case "string":
      const date: DateTime = new Date().toISOString();
      return date;

    case "unix":
      const unix: DateTime = Date.now();
      return unix;

    default:
      const dateObj: DateTime = new Date();
      return dateObj;
  }
};
