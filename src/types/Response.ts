export type Response<T> = {
    data?: T | undefined;
    status: 'success' | 'failure';
    error?: string;
}
