import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { GroupsService } from 'src/groups/groups.service';
import { GroupEntity } from '../groups/entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @Inject(forwardRef(() => GroupsService))
    private groupsService: GroupsService,
  ) {}

  async getAllCourses() {
    return await this.coursesRepository.find({
      relations: ['groups'],
    });
  }

  async getCourseByName(name: string) {
    return await this.coursesRepository.findOne({ where: { name } });
  }

  async getCourseById(id: number) {
    return await this.coursesRepository.findOne({
      where: { id },
      relations: ['groups'],
    });
  }

  async createCourse(dto: CreateCourseDto) {
    let groups = [];

    if (dto.groupIds && dto.groupIds.length > 0) {
      const groupIds = dto.groupIds;

      groups = await Promise.all(groupIds.map(this.checkAndReturnGroupById));
    }

    const course = await this.coursesRepository.create(dto);

    course.groups = groups;

    return await this.coursesRepository.save(course);
  }

  async removeCourse(id: number) {
    const courseCandidate = await this.coursesRepository.findOne({
      where: { id },
    });

    if (!courseCandidate) {
      throw new BadRequestException(`Курса с id ${id} не существует!`);
    }

    return this.coursesRepository.remove(courseCandidate);
  }

  private async checkAndReturnGroupById(id: number): Promise<GroupEntity> {
    const groupCandidate = await this.groupsService.getGroupById(id);
    if (!groupCandidate) {
      throw new BadRequestException(`Группы c id ${id} не существует!`);
    }
    return groupCandidate;
  }
}
