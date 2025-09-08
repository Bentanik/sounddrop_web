declare type TError = {
  message: string;
  code: string;
};

declare type TErrorResponse = {
  errors: TError[];
  isSuccess: boolean;
  isFailure: boolean;
};

declare type TResponse<T = object | null> = {
  code: string;
  message: string;
  data: T | null;
  isSuccess: boolean;
  isFailure: boolean;
};
