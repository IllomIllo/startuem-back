import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { GroupsService } from '../groups/groups.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectsRepository: Repository<SubjectEntity>,
    private groupsService: GroupsService,
  ) {}

  async getAllSubjects() {
    return await this.subjectsRepository.find({
      relations: ['groups'],
    });
  }

  async getSubjectByName(name: string) {
    return await this.subjectsRepository.findOne({ where: { name } });
  }

  async getSubjectById(id: number) {
    return await this.subjectsRepository.findOne({ where: { id } });
  }

  async getAllSubjectsByGroupId(groupId: number) {
    const groupCandidate = await this.groupsService.getGroupById(groupId);

    if (!groupCandidate) {
      throw new BadRequestException(`Группы с id ${groupId} не существует!`);
    }

    return await this.subjectsRepository.find({
      relations: ['groups'],
      where: {
        groups: {
          id: groupCandidate.id,
        },
      },
    });
  }

  async createSubject(dto: CreateSubjectDto) {
    const { groupsIds, ...restDto } = dto;
    const subject = await this.subjectsRepository.create(restDto);
    if (groupsIds && groupsIds.length) {
      const groups = await Promise.all(
        groupsIds.map(async (id) => {
          const group = await this.groupsService.getGroupById(id);
          if (!group) {
            throw new BadRequestException(`Группа с id ${id} не найдена!`);
          }
          return group;
        }),
      );

      subject.groups = groups;
    }
    return this.subjectsRepository.save(subject);
  }

  async removeSubject(id: number) {
    const subjectCandidate = await this.subjectsRepository.findOne({
      where: { id },
    });

    if (!subjectCandidate) {
      throw new BadRequestException(`Предмета с id ${id} не существует!`);
    }

    return this.subjectsRepository.remove(subjectCandidate);
  }
}
