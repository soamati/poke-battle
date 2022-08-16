export type Is<T> = Exclude<T, null | undefined>;

export type Callback = (...args: any[]) => any;
