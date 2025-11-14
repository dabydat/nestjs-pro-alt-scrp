import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';
import { UserControllerMap, UserControllerName, UserControllerTag } from '@shared/common/domain/constants/user.constant';
import { ErrorResponse, RestDataResponse } from '@shared/common/infrastructure/rest/response';
import { UserIdRequest } from './request/user-id.request';
import { GetUserByIdResponse } from './response/get-user-by-id.response';
import { GetUserById } from '../../application/queries/get-user-by-id/get-user-by-id';
import { UserMapper } from '../mappers/user.mapper';
import { UseCaseBus } from '@shared/use-case-bus/use-case.bus';

@Controller(UserControllerName)
@ApiTags(UserControllerTag)
export class UserController {
    public constructor(private readonly useCaseBus: UseCaseBus) { }

    @Get(UserControllerMap.GET_USER_BY_ID.ROUTE)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: 'Get a user by ID' })
    @ApiOkResponse({ type: Object, description: 'User retrieved successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request parameters', type: ErrorResponse, })
    @ApiNotFoundResponse({ description: 'Resource not found', type: ErrorResponse, })
    @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ErrorResponse, })
    @ApiTooManyRequestsResponse({ description: 'Too many requests - rate limit exceeded', type: ErrorResponse, })
    async getUserById(
        @Param() params: UserIdRequest,
    ): Promise<RestDataResponse<GetUserByIdResponse>> {
        const data = await this.useCaseBus.execute(new GetUserById(params.id));
        const responseData: GetUserByIdResponse = UserMapper.toResponse(data);
        return { data: responseData as GetUserByIdResponse };
    }
}
