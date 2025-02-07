import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateAskDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async createAsk(data: CreateAskDto) {
    return this.prisma.pergunta.create({
      data: {
        ...data,
        correta: data.correta === 'true' || data.correta === true,
      },
    });
  }
  async createQuiz(data: {
    title: string;
    description?: string;
    turmaId: number;
    categoria: string;
  }) {
    return this.prisma.quiz.create({
      data,
    });
  }

  async getAsks(quizId: number) {
    return this.prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        perguntas: true,
        title: true,
      },
    });
  }

  async findQuizzesByTurma(turmaId: number) {
    return this.prisma.quiz.findMany({
      where: { turmaId },
      include: { perguntas: true },
    });
  }

  async updateQuiz(
    id: number,
    data: { title?: string; description?: string; categoria?: string },
  ) {
    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async deleteQuiz(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
