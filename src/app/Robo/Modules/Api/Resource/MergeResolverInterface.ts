
export interface MergeResolverInterface {
    resolver(resource: string, content: string[]): string;
}
