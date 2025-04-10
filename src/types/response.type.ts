export type ResponseType<T = undefined> = {
    success: boolean;
    message: string;
    status?: number;
    data: T;
};

export type ResponseCreateDataType<T = undefined, C = undefined, E = undefined> = {
  success: boolean;
  message: string;
  status?: number;
  data?: T;
  response?: C;
  errors: E | null;
};



export type ResponseLoginType<T = undefined, C = undefined> = {
  success: boolean;
  message: string;
  status?: number;
  data?: T;
  response?: C;
};
    