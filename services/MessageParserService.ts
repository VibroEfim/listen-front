export default class MessageParserService {
  static parse(message: string) {
    let args = message.split(";");

    let fields: any = {};

    args.forEach(prop => {
      let args = prop.split("=");

      if (args[1] != undefined)
        fields[args[0]] = args[1];
    })

    return fields;
  }

  static stringify(fields: any) {
    let message = "";

    for (let field in fields) {
      message += field + "=" + fields[field] + ";";
    }

    if (message.length == 0) {
      return ""; console.error("Empty object");
    }

    return message;
  }
}