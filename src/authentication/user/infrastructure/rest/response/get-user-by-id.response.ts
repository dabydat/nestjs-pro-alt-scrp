import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdResponse {
    @ApiProperty({
        description: 'User ID',
        type: String,
        example: 'da0e4f04-ca3e-43dd-b310-5ca9e23ed902',
    })
    public id: string;

    @ApiProperty({
        description: 'User email',
        type: String,
        example: 'john.doe@example.com',
    })
    public email: string;

    @ApiProperty({
        description: 'User username',
        type: String,
        example: 'johndoe',
    })
    public username: string;

    @ApiProperty({
        description: 'User first name',
        type: String,
        example: 'John',
    })
    public first_name: string;

    @ApiProperty({
        description: 'User last name',
        type: String,
        example: 'Doe',
    })
    public last_name: string;

    @ApiProperty({
        description: 'User active status',
        type: Boolean,
        example: true,
    })
    public is_active: boolean;

    @ApiProperty({
        description: 'User creation date',
        type: String,
        example: '2023-10-01T12:34:56.789Z',
    })
    public created_at: Date;

    @ApiProperty({
        description: 'User last update date',
        type: String,
        example: '2023-10-10T08:21:45.123Z',
    })
    public updated_at: Date;
}