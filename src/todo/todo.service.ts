import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTodoDto) {
    return this.prisma.todo.create({ data });
  }

  findAll() {
    return this.prisma.todo.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  async update(id: number, data: UpdateTodoDto) {
    // ensure exists
    await this.findOne(id);
    return this.prisma.todo.update({ where: { id }, data });
  }

  async remove(id: number) {
    // ensure exists
    await this.findOne(id);
    return this.prisma.todo.delete({ where: { id } });
  }
}
