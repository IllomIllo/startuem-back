import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { CoursesService } from '../courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupsRepository: Repository<GroupEntity>,
    @Inject(forwardRef(() => CoursesService))
    private coursesService: CoursesService,
  ) {}

  async getAllGroups() {
    return await this.groupsRepository.find({
      relations: ['course'],
    });
  }

  async getGroupByName(name: string) {
    return await this.groupsRepository.findOne({ where: { name } });
  }

  async getGroupById(id: number) {
    return await this.groupsRepository.findOne({ where: { id } });
  }

  async getAllGroupsByCourseId(courseId: number) {
    const courseCandidate = await this.coursesService.getCourseById(courseId);

    if (!courseCandidate) {
      throw new BadRequestException(`Курса с id ${courseId} не существует!`);
    }

    return await this.groupsRepository.find({
      where: { course: courseCandidate },
      relations: ['course'],
    });
  }

  async createGroup(dto: CreateGroupDto) {
    const courseCandidate = await this.coursesService.getCourseById(
      dto.courseId,
    );

    if (!courseCandidate) {
      throw new BadRequestException(
        `Курса с id ${dto.courseId} не существует!`,
      );
    }

    const group = await this.groupsRepository.create(dto);

    group.course = courseCandidate;

    return this.groupsRepository.save(group);
  }
}
