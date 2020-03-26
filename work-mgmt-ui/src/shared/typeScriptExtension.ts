
// Interface definition for arbitrary Object Literal
export interface ObjectLiteral {
  [key: string]: any;
};

// Async with void return
export declare type ActionEmptyVoid = () => void;
export declare type ActionArgsVoid = (...args: any[]) => void;

// Async with any-type return
export declare type FuncEmptyReturn = () => any;
export declare type FuncReturn = (...args: any[]) => any;

// Async with void return
export declare type ActionEmptyVoidAsync = () => Promise<void>;
export declare type ActionArgsVoidAsync = (...args: any[]) => Promise<void>;

// Async with any-type return
export declare type FuncEmptyReturnAsync = () => Promise<any>;
export declare type FuncReturnAsync = (...args: any[]) => Promise<any>;
