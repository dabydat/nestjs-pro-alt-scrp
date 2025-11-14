import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserIdRequest {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    id: string;
}