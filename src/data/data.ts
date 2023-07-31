import { Data, ReportType } from "src/types/type";

export const data: Data = {
  report: [
    {
      id: "uuid1",
      source: "Salary",
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: "uuid2",
      source: "Youtube",
      amount: 2500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: "uuid3",
      source: "Food",
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    }
  ]
}