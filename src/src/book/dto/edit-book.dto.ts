
export class EditBookDto {
    readonly id: number;
    readonly name?: string;
    readonly ownerId?: number;
    readonly isUsed?: boolean;
}