/** func is used to ensure a value is not null or undefined and provides type safety by narrowing down the type of val to exclude null and undefined; If val is null or undefined will throw error;*/
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' to be defined, but received" + val);
    }
}