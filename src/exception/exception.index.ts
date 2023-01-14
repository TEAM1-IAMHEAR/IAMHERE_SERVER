import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const notConfirmPasswordException = new BadRequestException(
  'Not Confirm Password',
);

export const NotFoundUserIdError = new NotFoundException('NotFound UserId');

export const notFoundUserException = new NotFoundException('Unregistered user');

export const ExistUserException = new ConflictException('User already exist');

export const ExistNicknameException = new ConflictException(
  'Nickname already exits',
);

export const notFoundCommunityIdException = new NotFoundException(
  'Not Found communityId',
);

export const notMatchUserAuthorizedException = new UnauthorizedException(
  'Not Match User Authorized',
);

export const notFoundChatRoomException = new NotFoundException(
  'Not Found ChatRoom',
);
