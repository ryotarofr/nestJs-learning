import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { ReportType } from '../types/type';
import { data } from '../data/data';
import { ReportResponseDto } from 'src/dtos/report.dtos';

interface Report {
  source: string
  amount: number
}

interface UpdateReport {
  source?: string
  amount?: number
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    try {
      const filteredReports = data.report
        .filter((report) => report.type === type)
        .map((report) => new ReportResponseDto(report));
      return filteredReports;
    } catch (error) {
      throw error;
    }
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const filteredReports = data.report.filter((report) => report.type === type);
    const reportById = filteredReports.find((report) => report.id === id);

    if (!reportById) {
      throw new HttpException('利用できるデータがありません', HttpStatus.NOT_FOUND);
    }
    return new ReportResponseDto(reportById);
  }

  createReport(type: ReportType, { source, amount }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
    const filteredReports = data.report.filter((report) => report.type === type);
    const reportUpdateById = filteredReports.find((report) => report.id === id);

    if (!reportUpdateById) {
      throw new HttpException('利用できるデータがありません', HttpStatus.NOT_FOUND);
    }

    const reportUpdatedById = data.report.findIndex((report) => report.id === reportUpdateById.id)

    data.report[reportUpdatedById] = {
      ...data.report[reportUpdatedById],
      ...body,
      updated_at: new Date()
    }

    return new ReportResponseDto(data.report[reportUpdatedById]);
  }

  deleteReport(id: string,) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw new HttpException('指定したidのデータは存在しません', HttpStatus.NOT_FOUND);
    }

    data.report.splice(reportIndex, 1)

    return
  }
}
