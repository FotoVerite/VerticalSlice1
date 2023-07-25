export type GenericStateType<T> = {
  set: React.Dispatch<React.SetStateAction<T>>;
  state: T;
};

export type GenericOrUndefinedStateType<T> = {
  set: React.Dispatch<React.SetStateAction<T | undefined>>;
  state: T | undefined;
};
