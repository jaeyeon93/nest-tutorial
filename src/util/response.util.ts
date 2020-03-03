
export class ResponseMessage {
  private data: any | any[]; // response data
  private code: number; // response code;

  public success(): ResponseMessage {
    this.code = 1;
    return this;
  }

  public error(code: number, message:string = "Error"): ResponseMessage {
    this.code = code;
    this.data = {message};
    return this;
  }

  public body(data: any | any[] = ""): ResponseMessage {
    this.data = data;
    return this;
  }

  getData(): any | any[] {
    return this.data;
  }

  getCode(): number {
    return this.code;
  }

  public build(): Response {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new Response(this);
  }
}

export class Response {
  data: any | any[];
  code: number;

  constructor(message: ResponseMessage) {
    this.data = message.getData();
    this.code = message.getCode()
  }
}

/*
  {
    "code":1 // 정상적으로 처리되면 1, 비정상으로 Error
    "data": {
      // 기존 데이터그대로 들어온다.
    }
  }
 */
