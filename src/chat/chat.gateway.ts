import { UseFilters, UsePipes, ValidationPipe,UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { SocketAddress } from 'net';
import { Socket, Server } from 'socket.io';
import { User } from 'src/auth/schemas/user.schema';
import { WebsocketsExceptionFilter } from './ws-exception.filter';
import { AuthService } from '../auth/auth.service'
import { AuthGuard } from '@nestjs/passport';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard())
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {

    
    this.server.emit('text-chat', {
      ...message,
      time: new Date().toDateString(),
    });
    console.log(message,new Date().toDateString());
  }
}