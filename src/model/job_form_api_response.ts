export type JobApiResponse = {
  data: {
    Date: Date;
    Description: string;
    Title: string;
    JobType: string;
    Location: string;
    Rate: number;
    UserID: number;
    JobID: number;
    name: string;
    Posted_Date: string;
  }    
  message: string;     
};