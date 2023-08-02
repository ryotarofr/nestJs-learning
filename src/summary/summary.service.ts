import { Injectable } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { ReportType } from 'src/types/type';

@Injectable()
export class SummaryService {

  constructor(private readonly reportService: ReportService) { }

  calculateSummary() {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0)


    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0)

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    }
  }
}
