import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateAskDto, CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post('/ask')
  async createAsk(@Body() createAskDto: CreateAskDto) {
    return this.quizzesService.createAsk(createAskDto);
  }

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Get('turma/:id')
  async findQuizzesByTurma(@Param('id') turmaId: number) {
    return this.quizzesService.findQuizzesByTurma(turmaId);
  }

  @Get(':id')
  async getAsks(@Param('id') id: number) {
    return this.quizzesService.getAsks(id);
  }

  @Patch(':id')
  async updateQuiz(
    @Param('id') id: number,
    @Body()
    updateQuizDto: { title?: string; description?: string; categoria?: string },
  ) {
    return this.quizzesService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: number) {
    return this.quizzesService.deleteQuiz(id);
  }
}
