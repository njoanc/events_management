export class Result<T> {
    public static Success<T>(data: T): Result<T> {
        return new Result<T>(data);
    }

    public static Error<T>(error: string): Result<T> {
        return new Result<T>(undefined, error);
    }

    public static Exception<T>(error: Error): Result<T> {
        return new Result<T>(undefined, error.message);
    }

    private readonly data?: T;
    private readonly error?: string;

    private constructor(data?: T, error?: string) {
        this.data = data;
        this.error = error;
    }

    public isSuccessful(): boolean {
        return this.data != undefined;
    }

    public getData(): T {
        return this.data as T;
    }

    public getError(): string {
        return this.error as string;
    }

    public throwIfError(): void {
        if (!this.isSuccessful()) {
            throw new Error(this.getError());
        }
    }
}
