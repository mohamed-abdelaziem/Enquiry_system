export interface IEnquiry {
  enquiryId: number
  customerName: string
  customerEmail: string
  customerPhone: string
  message: string
  categoryId: number
  statusId: number
  enquiryType: string
  isConverted: boolean
  enquiryDate: string
  followUpDate: string
  feedback: string
};


export interface IMainResponse <T> {
  error: any[]
  result: boolean
  data: T
  message: string
};


export interface ICategory {
  categoryId: number
  categoryName: string
  isActive: boolean
};


export interface IStatus {
  statusId: number
  statusName: string
  isActive: boolean
}
