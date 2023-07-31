import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { ReportType } from './types/type';
import { data } from './data/data';

interface Report {
  source: string
  amount: number
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    try {
      const filteredReports = data.report.filter((report) => report.type === type);
      return filteredReports;
    } catch (error) {
      throw error;
    }
  }

  getReportById(type: ReportType, id: string) {
    const filteredReports = data.report.filter((report) => report.type === type);
    const reportById = filteredReports.find((report) => report.id === id);

    if (!reportById) {
      throw new HttpException('利用できるデータがありません', HttpStatus.NOT_FOUND);
    }
    return reportById;
  }

  createReport(type: ReportType, { source, amount }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }
    data.report.push(newReport)
    return newReport
  }

  updateReport(type: ReportType, id: string, body: Report) {
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

    return data.report[reportUpdatedById];
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
