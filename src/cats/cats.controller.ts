import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Param,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AllExceptionFilter } from '../http-exception.filter';
// import {  } from 'fastify';

@UseFilters(AllExceptionFilter)
@Controller({ version: '1', path: 'cat' })
export class CatsV1Controller {
  @Get()
  @HttpCode(200)
  findAll(): string {
    return 'This action returns all cats(v1 API)!';
  }

  @Post()
  @HttpCode(201)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() params, @Query('owner') owner, @Query('isMe') isMe): string {
    owner.map((o) => {
      console.log(o);
    });
    return `This action returns a #${params.id} cat owned by ${owner}, and that's isMe=${isMe}.`;
  }
}

@Controller({ version: '2', path: 'cat' })
export class CatsV2Controller {
  @Get()
  findV2(): string {
    return 'This action returns all cats(v2 API)!';
  }

  @Get(':id')
  findV2CatOne(@Param() params, @Res() response) {
    if (params.id === '10') {
      throw new HttpException(
        {
          result: false,
          error: 'Bad Request, guy!',
        },
        HttpStatus.BAD_REQUEST,
      ); // Same with: throw new HttpException('BADREQ', HttpStatus.BAD_REQUEST);
    } else {
      response.status(200).send({
        result: true,
        msg: `This action returns cat API(v2) and cat id=${params.id} ~~~!!!!!!`,
      });
    }
    // res.status(HttpStatus.OK).json([]);
    // return `This action returns cat API(v1) and cat id=${params.id} ~~~!!!!!!`;
  }
}
