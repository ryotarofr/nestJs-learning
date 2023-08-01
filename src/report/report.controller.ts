import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReportType } from '../types/type';
import { ReportService } from './report.service';
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from '../dtos/report.dtos';

@Controller('report/:type')
export class ReportController {

  constructor(
    private readonly reportService: ReportService
  ) { }


  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
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
    return this.reportService.getAllReports(reportType)
  }
  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.createReport(reportType, { source, amount })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    console.log(body);
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {

    return this.reportService.deleteReport(id)
  }

}
