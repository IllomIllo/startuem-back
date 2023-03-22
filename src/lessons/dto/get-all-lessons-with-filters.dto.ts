export class GetAllLessonsWithFiltersDto {
  readonly studentUID: string;
  readonly dateStart?: string;
  readonly dateEnd?: string;
  readonly subjectId?: number;
}
