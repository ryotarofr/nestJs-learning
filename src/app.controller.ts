import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReportType } from './types/type';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) { }


  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    // const reportType = (type: string): ReportType => {
    //   switch (type) {
    //     case 'income':
    //       return ReportType.INCOME
    //     case 'expense':
    //       return ReportType.EXPENSE
    //     default:
    //       throw new HttpException('レポートタイプに誤りがあります。: ' + type, HttpStatus.BAD_REQUEST);
    //   }
    // }

    // return this.appService.getAllReports(reportType(type))
    return this.appService.getAllReports(reportType)
  }
  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    // const reportType = (type: string): ReportType => {
    //   switch (type) {
    //     case 'income':
    //       return ReportType.INCOME
    //     case 'expense':
    //       return ReportType.EXPENSE
    //     default:
    //       throw new HttpException('レポートタイプに誤りがあります。: ' + type, HttpStatus.BAD_REQUEST);
    //   }
    // }
    // return this.appService.getReportById(reportType(type), id)
    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { source, amount }: {
      source: string
      amount: number
    },
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ) {
    // const reportType = (type: string): ReportType => {
    //   switch (type) {
    //     case 'income':
    //       return ReportType.INCOME
    //     case 'expense':
    //       return ReportType.EXPENSE
    //     default:
    //       throw new HttpException('レポートタイプに誤りがあります。: ' + type, HttpStatus.BAD_REQUEST);
    //   }
    // }
    // return this.appService.createReport(reportType(type), { source, amount })
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, { source, amount })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: {
      source: string
      amount: number
    }
  ) {
    // const reportType = (type: string): ReportType => {
    //   switch (type) {
    //     case 'income':
    //       return ReportType.INCOME
    //     case 'expense':
    //       return ReportType.EXPENSE
    //     default:
    //       throw new HttpException('レポートタイプに誤りがあります。: ' + type, HttpStatus.BAD_REQUEST);
    //   }
    // }
    // return this.appService.updateReport(reportType(type), id, body)
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {

    return this.appService.deleteReport(id)
  }

}
